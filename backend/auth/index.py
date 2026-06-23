"""
Авторизация пользователей Лук: регистрация, вход, получение профиля.
"""
import json
import os
import hashlib
import secrets
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
}

EMOJIS = ['🧅', '🦄', '🐉', '🌸', '🦊', '🐱', '🦁', '🦋', '🐸', '🦉', '🐺', '🦈']



def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_schema():
    return os.environ.get('MAIN_DB_SCHEMA', 'public')


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def make_token() -> str:
    return secrets.token_hex(32)


def ok(data: dict, status: int = 200) -> dict:
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps(data, ensure_ascii=False)}


def err(msg: str, status: int = 400) -> dict:
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps({'error': msg}, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    schema = get_schema()
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')

    # GET ?action=me — получение профиля по токену
    if method == 'GET' and action == 'me':
        token = event.get('headers', {}).get('X-Auth-Token', '')
        if not token:
            return err('Токен не передан', 401)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, username, emoji, bio, level, xp FROM {schema}.users WHERE token = %s", (token,))
        row = cur.fetchone()
        conn.close()
        if not row:
            return err('Неверный токен', 401)
        return ok({'id': row[0], 'username': row[1], 'emoji': row[2], 'bio': row[3], 'level': row[4], 'xp': row[5]})

    body = {}
    if event.get('body'):
        body = json.loads(event['body'])

    # POST ?action=register
    if method == 'POST' and action == 'register':
        username = (body.get('username') or '').strip()
        email = (body.get('email') or '').strip().lower()
        password = body.get('password', '')
        emoji = body.get('emoji', '🧅')

        if not username or len(username) < 3:
            return err('Имя пользователя должно быть не менее 3 символов')
        if not email or '@' not in email:
            return err('Некорректный email')
        if not password or len(password) < 6:
            return err('Пароль должен быть не менее 6 символов')
        if emoji not in EMOJIS:
            emoji = '🧅'

        token = make_token()
        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(
                f"INSERT INTO {schema}.users (username, email, password_hash, emoji, token) VALUES (%s, %s, %s, %s, %s) RETURNING id, username, emoji, bio, level, xp",
                (username, email, hash_password(password), emoji, token)
            )
            row = cur.fetchone()
            conn.commit()
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            conn.close()
            return err('Такой логин или email уже занят')
        finally:
            conn.close()

        return ok({'token': token, 'user': {'id': row[0], 'username': row[1], 'emoji': row[2], 'bio': row[3], 'level': row[4], 'xp': row[5]}}, 201)

    # POST ?action=login
    if method == 'POST' and action == 'login':
        login = (body.get('login') or '').strip().lower()
        password = body.get('password', '')

        if not login or not password:
            return err('Заполни все поля')

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, username, emoji, bio, level, xp, token FROM {schema}.users WHERE (LOWER(username) = %s OR email = %s) AND password_hash = %s",
            (login, login, hash_password(password))
        )
        row = cur.fetchone()
        if not row:
            conn.close()
            return err('Неверный логин или пароль', 401)

        token = row[6] or make_token()
        cur.execute(f"UPDATE {schema}.users SET token = %s WHERE id = %s", (token, row[0]))
        conn.commit()
        conn.close()

        return ok({'token': token, 'user': {'id': row[0], 'username': row[1], 'emoji': row[2], 'bio': row[3], 'level': row[4], 'xp': row[5]}})

    # POST ?action=update — обновление профиля
    if method == 'POST' and action == 'update':
        token = event.get('headers', {}).get('X-Auth-Token', '')
        if not token:
            return err('Токен не передан', 401)

        new_username = (body.get('username') or '').strip()
        new_bio = (body.get('bio') or '').strip()
        new_emoji = body.get('emoji', '')

        if new_username and len(new_username) < 3:
            return err('Имя должно быть не менее 3 символов')
        if new_emoji and new_emoji not in EMOJIS:
            return err('Недопустимый эмодзи')

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {schema}.users WHERE token = %s", (token,))
        row = cur.fetchone()
        if not row:
            conn.close()
            return err('Неверный токен', 401)
        uid = row[0]

        fields, vals = [], []
        if new_username:
            fields.append('username = %s')
            vals.append(new_username)
        if new_bio is not None and 'bio' in body:
            fields.append('bio = %s')
            vals.append(new_bio)
        if new_emoji:
            fields.append('emoji = %s')
            vals.append(new_emoji)

        if not fields:
            conn.close()
            return err('Нечего обновлять')

        vals.append(uid)
        try:
            cur.execute(f"UPDATE {schema}.users SET {', '.join(fields)} WHERE id = %s RETURNING id, username, emoji, bio, level, xp", vals)
            updated = cur.fetchone()
            conn.commit()
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            conn.close()
            return err('Такой ник уже занят')
        finally:
            conn.close()

        return ok({'user': {'id': updated[0], 'username': updated[1], 'emoji': updated[2], 'bio': updated[3], 'level': updated[4], 'xp': updated[5]}})

    return err('Не найдено', 404)