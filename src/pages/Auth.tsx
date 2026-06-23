import { useState } from 'react';
import Icon from '@/components/ui/icon';

const AUTH_URL = 'https://functions.poehali.dev/7620a252-ed4f-4b1d-9a87-041f7f7fcb6c';

const EMOJIS = ['🧅', '🦄', '🐉', '🌸', '🦊', '🐱', '🦁', '🦋', '🐸', '🦉', '🐺', '🦈'];

interface AuthPageProps {
  onLogin: (token: string, user: { id: number; username: string; emoji: string; bio: string; level: number; xp: number }) => void;
}

export default function Auth({ onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [emoji, setEmoji] = useState('🧅');
  const [form, setForm] = useState({ username: '', email: '', password: '', login: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    setError('');
    setLoading(true);
    try {
      const isReg = mode === 'register';
      const body = isReg
        ? { username: form.username, email: form.email, password: form.password, emoji }
        : { login: form.login, password: form.password };

      const res = await fetch(`${AUTH_URL}/?action=${isReg ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Что-то пошло не так'); return; }
      localStorage.setItem('luk_token', data.token);
      onLogin(data.token, data.user);
    } catch {
      setError('Ошибка соединения, попробуй ещё раз');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* bg blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl -top-20 -left-20 animate-float" />
        <div className="absolute w-72 h-72 rounded-full bg-secondary/20 blur-3xl top-1/2 -right-16 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl bottom-0 left-1/3 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl game-shadow mb-4 animate-float">
            🧅
          </div>
          <h1 className="font-display text-5xl text-primary">Лук</h1>
          <p className="text-muted-foreground font-medium mt-1">Игровая социальная сеть</p>
        </div>

        {/* Card */}
        <div className="rounded-[2rem] bg-white p-7 game-shadow">
          {/* Tabs */}
          <div className="flex rounded-2xl bg-muted p-1 mb-6">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${mode === m ? 'bg-white game-shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {m === 'login' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'register' && (
              <>
                {/* Emoji picker */}
                <div>
                  <label className="text-sm font-bold text-muted-foreground mb-2 block">Выбери аватар</label>
                  <div className="flex flex-wrap gap-2">
                    {EMOJIS.map(e => (
                      <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={`w-11 h-11 rounded-2xl text-2xl flex items-center justify-center transition-all hover-scale ${emoji === e ? 'bg-primary/20 ring-2 ring-primary scale-110' : 'bg-muted'}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-muted-foreground mb-1.5 block">Имя пользователя</label>
                  <div className="relative">
                    <Icon name="User" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={form.username}
                      onChange={e => set('username', e.target.value)}
                      placeholder="луковый_боец"
                      className="w-full rounded-2xl bg-muted pl-11 pr-4 py-3 font-medium outline-none focus:ring-2 ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-muted-foreground mb-1.5 block">Email</label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="лук@mail.ru"
                      className="w-full rounded-2xl bg-muted pl-11 pr-4 py-3 font-medium outline-none focus:ring-2 ring-primary"
                    />
                  </div>
                </div>
              </>
            )}

            {mode === 'login' && (
              <div>
                <label className="text-sm font-bold text-muted-foreground mb-1.5 block">Логин или email</label>
                <div className="relative">
                  <Icon name="User" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={form.login}
                    onChange={e => set('login', e.target.value)}
                    placeholder="луковый_боец"
                    className="w-full rounded-2xl bg-muted pl-11 pr-4 py-3 font-medium outline-none focus:ring-2 ring-primary"
                    onKeyDown={e => e.key === 'Enter' && submit()}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-bold text-muted-foreground mb-1.5 block">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl bg-muted pl-11 pr-4 py-3 font-medium outline-none focus:ring-2 ring-primary"
                  onKeyDown={e => e.key === 'Enter' && submit()}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm font-bold text-destructive flex items-center gap-2 animate-fade-in">
                <Icon name="AlertCircle" size={16} />
                {error}
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-lg hover-scale game-shadow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Icon name="Loader" size={20} className="animate-spin" /> Загрузка...</>
              ) : mode === 'login' ? (
                <><Icon name="LogIn" size={20} /> Войти</>
              ) : (
                <><Icon name="Rocket" size={20} /> Поехали!</>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
          {mode === 'login' ? 'Ещё нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} className="text-primary font-bold hover:underline">
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
}
