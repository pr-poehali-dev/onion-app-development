import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_AVATAR = 'https://cdn.poehali.dev/projects/967d51c2-31dc-4e2a-9fe1-405a052649ae/files/e9457d39-94ef-4034-97c3-d59134967b00.jpg';

const NAV = [
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'friends', label: 'Друзья', icon: 'Users' },
  { id: 'chat', label: 'Чат', icon: 'MessageCircle' },
  { id: 'leaders', label: 'Рейтинг', icon: 'Trophy' },
  { id: 'clubs', label: 'Сообщества', icon: 'Sparkles' },
];

const ACHIEVEMENTS = [
  { emoji: '🔥', name: 'Огонь', desc: '7 дней подряд', color: 'from-orange-400 to-red-500' },
  { emoji: '💎', name: 'Алмаз', desc: '1000 лайков', color: 'from-cyan-400 to-blue-500' },
  { emoji: '🚀', name: 'Ракета', desc: 'Топ-10 недели', color: 'from-violet-400 to-purple-600' },
  { emoji: '👑', name: 'Король', desc: '500 друзей', color: 'from-amber-400 to-yellow-500' },
  { emoji: '⚡', name: 'Молния', desc: 'Быстрый ответ', color: 'from-pink-400 to-rose-500' },
  { emoji: '🌟', name: 'Звезда', desc: 'Идеальный месяц', color: 'from-emerald-400 to-green-500' },
];

const LEADERS = [
  { rank: 1, name: 'ЛуковыйКороль', score: 24850, medal: '🥇', up: true },
  { rank: 2, name: 'ZestyZoe', score: 23120, medal: '🥈', up: true },
  { rank: 3, name: 'Маринка_777', score: 21900, medal: '🥉', up: false },
  { rank: 4, name: 'CyberOnion', score: 19450, medal: '🍀', up: true },
  { rank: 5, name: 'Витаминка', score: 18200, medal: '✨', up: false },
];

const CLUBS = [
  { emoji: '🎮', name: 'Геймеры', members: '12.4k', color: 'from-violet-500 to-purple-600', join: true },
  { emoji: '🎨', name: 'Арт-Лук', members: '8.1k', color: 'from-pink-500 to-rose-600', join: false },
  { emoji: '🎵', name: 'Музыка', members: '15.7k', color: 'from-amber-500 to-orange-600', join: true },
  { emoji: '⚽', name: 'Спорт', members: '9.3k', color: 'from-emerald-500 to-green-600', join: false },
];

const FRIENDS = [
  { name: 'Аня', emoji: '🦄', online: true, lvl: 42, handle: '@unicorn_anya', bio: 'Рисую и мечтаю 🎨', xp: 62, stats: [['Друзья', '318'], ['Лайки', '5.1k'], ['Рейтинг', '#7']], badges: ['🔥', '💎', '🌟'] },
  { name: 'Макс', emoji: '🐉', online: true, lvl: 38, handle: '@dragon_max', bio: 'Геймер до мозга костей 🎮', xp: 45, stats: [['Друзья', '274'], ['Лайки', '4.2k'], ['Рейтинг', '#12']], badges: ['🚀', '⚡'] },
  { name: 'Лера', emoji: '🌸', online: false, lvl: 51, handle: '@lera_blossom', bio: 'Музыка — моя жизнь 🎵', xp: 80, stats: [['Друзья', '521'], ['Лайки', '9.7k'], ['Рейтинг', '#3']], badges: ['👑', '💎', '🌟', '🔥'] },
  { name: 'Дима', emoji: '🦊', online: true, lvl: 29, handle: '@foxy_dima', bio: 'Спорт каждый день ⚽', xp: 33, stats: [['Друзья', '198'], ['Лайки', '2.8k'], ['Рейтинг', '#21']], badges: ['⚡', '🌟'] },
];

type Friend = typeof FRIENDS[number];

const Index = () => {
  const [tab, setTab] = useState('profile');
  const [openFriend, setOpenFriend] = useState<Friend | null>(null);
  const [search, setSearch] = useState('');
  const [myFriends, setMyFriends] = useState(FRIENDS.map(f => f.name));

  const SUGGESTIONS = [
    { name: 'Соня', emoji: '🐱', online: false, lvl: 34, handle: '@cat_sonya', bio: 'Котики и аниме 🌸', xp: 50, stats: [['Друзья', '120'], ['Лайки', '3.1k'], ['Рейтинг', '#18']], badges: ['🌟', '⚡'] },
    { name: 'Паша', emoji: '🦁', online: true, lvl: 45, handle: '@lion_pasha', bio: 'Программирую миры 💻', xp: 70, stats: [['Друзья', '440'], ['Лайки', '7.2k'], ['Рейтинг', '#6']], badges: ['🔥', '🚀', '💎'] },
    { name: 'Катя', emoji: '🦋', online: true, lvl: 23, handle: '@butterfly_k', bio: 'Танцую и пою 🎤', xp: 20, stats: [['Друзья', '89'], ['Лайки', '1.5k'], ['Рейтинг', '#35']], badges: ['🌟'] },
  ] as Friend[];

  const allPeople = [...FRIENDS, ...SUGGESTIONS];
  const filtered = search.trim()
    ? allPeople.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.handle.toLowerCase().includes(search.toLowerCase()))
    : null;
  const currentFriends = FRIENDS.filter(f => myFriends.includes(f.name));

  return (
    <div className="min-h-screen pb-28 md:pb-10">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b-2 border-white/60">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl game-shadow animate-float">
              🧅
            </div>
            <span className="font-display text-3xl text-primary">Лук</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-11 h-11 rounded-2xl bg-white game-shadow-pink flex items-center justify-center hover-scale">
              <Icon name="Bell" size={20} className="text-secondary" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">3</span>
            </button>
            <img src={HERO_AVATAR} alt="Я" className="w-11 h-11 rounded-2xl object-cover border-2 border-accent" />
          </div>
        </div>
      </header>

      {/* Desktop tabs */}
      <nav className="container hidden md:flex gap-2 py-5">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all hover-scale ${
              tab === n.id ? 'bg-primary text-primary-foreground game-shadow' : 'bg-white text-foreground'
            }`}
          >
            <Icon name={n.icon} size={18} />
            {n.label}
          </button>
        ))}
      </nav>

      <main className="container mt-4 md:mt-0 space-y-6">
        {/* PROFILE */}
        {tab === 'profile' && (
          <section className="space-y-6 animate-fade-in">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-secondary to-accent p-1 game-shadow">
              <div className="rounded-[1.85rem] bg-white p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img src={HERO_AVATAR} alt="Профиль" className="w-28 h-28 rounded-3xl object-cover border-4 border-accent" />
                    <span className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-sm font-black px-3 py-1 rounded-full game-shadow-gold">LVL 47</span>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-black">Луковый Боец 🧅</h1>
                    <p className="text-muted-foreground font-medium">@onion_warrior · в космосе с 2021</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm font-bold mb-1">
                        <span>Опыт до LVL 48</span>
                        <span className="text-primary">7320 / 10000 XP</span>
                      </div>
                      <div className="h-4 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: '73%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[['Друзья', '512'], ['Лайки', '8.4k'], ['Рейтинг', '#4']].map(([l, v]) => (
                    <div key={l} className="rounded-2xl bg-muted p-4 text-center">
                      <div className="text-2xl font-black text-primary">{v}</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black mb-3 flex items-center gap-2"><span>🏆</span> Достижения</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={a.name} className="rounded-3xl bg-white p-5 text-center hover-scale game-shadow animate-scale-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-3xl mb-2`}>{a.emoji}</div>
                    <div className="font-black">{a.name}</div>
                    <div className="text-xs text-muted-foreground font-medium">{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FRIENDS */}
        {tab === 'friends' && (
          <section className="animate-fade-in space-y-5">
            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Найти пользователя..."
                className="w-full rounded-2xl bg-white game-shadow pl-11 pr-4 py-3 font-medium outline-none focus:ring-2 ring-primary"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>

            {/* Search results */}
            {filtered ? (
              <div>
                <h2 className="text-sm font-black text-muted-foreground uppercase mb-3">Результаты поиска · {filtered.length}</h2>
                {filtered.length === 0 && (
                  <div className="rounded-3xl bg-white p-8 text-center game-shadow">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="font-black">Никого не нашлось</div>
                    <div className="text-sm text-muted-foreground">Попробуй другой запрос</div>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  {filtered.map(f => {
                    const isFriend = myFriends.includes(f.name);
                    return (
                      <div key={f.name} className="flex items-center gap-4 rounded-3xl bg-white p-4 game-shadow animate-fade-in">
                        <button onClick={() => setOpenFriend(f)} className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl flex-shrink-0">
                          {f.emoji}
                          {f.online && <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />}
                        </button>
                        <button onClick={() => setOpenFriend(f)} className="flex-1 text-left">
                          <div className="font-black">{f.name}</div>
                          <div className="text-xs font-bold text-muted-foreground">LVL {f.lvl} · {f.handle}</div>
                        </button>
                        <button
                          onClick={() => setMyFriends(prev => isFriend ? prev.filter(n => n !== f.name) : [...prev, f.name])}
                          className={`px-3 py-2 rounded-xl font-bold text-sm hover-scale flex items-center gap-1 ${isFriend ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground game-shadow'}`}
                        >
                          <Icon name={isFriend ? 'UserCheck' : 'UserPlus'} size={15} />
                          {isFriend ? 'Друг' : 'Добавить'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                {/* My friends */}
                <div>
                  <h2 className="text-xl font-black mb-3 flex items-center gap-2"><span>🤝</span> Мои друзья · {currentFriends.length}</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {currentFriends.map((f) => (
                      <button key={f.name} onClick={() => setOpenFriend(f)} className="flex items-center gap-4 rounded-3xl bg-white p-4 game-shadow hover-scale text-left w-full">
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                          {f.emoji}
                          {f.online && <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-black">{f.name}</div>
                          <div className="text-xs font-bold text-muted-foreground">LVL {f.lvl} · {f.online ? 'в сети' : 'не в сети'}</div>
                        </div>
                        <span className="px-3 py-2 rounded-xl bg-muted text-foreground font-bold text-sm flex items-center gap-1">
                          Профиль <Icon name="ChevronRight" size={15} />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div>
                  <h2 className="text-xl font-black mb-3 flex items-center gap-2"><span>💡</span> Возможно знаешь</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {SUGGESTIONS.map((f) => {
                      const isFriend = myFriends.includes(f.name);
                      return (
                        <div key={f.name} className="flex items-center gap-4 rounded-3xl bg-white p-4 game-shadow">
                          <button onClick={() => setOpenFriend(f)} className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-3xl flex-shrink-0">
                            {f.emoji}
                            {f.online && <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />}
                          </button>
                          <button onClick={() => setOpenFriend(f)} className="flex-1 text-left">
                            <div className="font-black">{f.name}</div>
                            <div className="text-xs font-bold text-muted-foreground">LVL {f.lvl} · {f.handle}</div>
                          </button>
                          <button
                            onClick={() => setMyFriends(prev => isFriend ? prev.filter(n => n !== f.name) : [...prev, f.name])}
                            className={`px-3 py-2 rounded-xl font-bold text-sm hover-scale flex items-center gap-1 ${isFriend ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground game-shadow'}`}
                          >
                            <Icon name={isFriend ? 'UserCheck' : 'UserPlus'} size={15} />
                            {isFriend ? 'Друг' : 'Добавить'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* CHAT */}
        {tab === 'chat' && (
          <section className="animate-fade-in">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2"><span>💬</span> Приватный чат с Аней 🦄</h2>
            <div className="rounded-[2rem] bg-white p-5 game-shadow space-y-3">
              {[
                { me: false, t: 'Привет! Видел новый лидерборд? 👀' },
                { me: true, t: 'Да! Я уже на 4 месте 🚀' },
                { me: false, t: 'Огонь! Погнали в Геймеры вместе 🎮' },
                { me: true, t: 'Поехали! 🧅' },
              ].map((m, i) => (
                <div key={i} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl font-medium ${m.me ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'}`}>{m.t}</div>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <input placeholder="Напиши сообщение..." className="flex-1 rounded-2xl bg-muted px-4 py-3 font-medium outline-none focus:ring-2 ring-primary" />
                <button className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center hover-scale game-shadow">
                  <Icon name="Send" size={20} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* LEADERS */}
        {tab === 'leaders' && (
          <section className="animate-fade-in">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2"><span>🏅</span> Лидерборд недели</h2>
            <div className="space-y-3">
              {LEADERS.map((l, i) => (
                <div key={l.rank} className={`flex items-center gap-4 rounded-3xl p-4 game-shadow hover-scale animate-fade-in ${l.rank <= 3 ? 'bg-gradient-to-r from-accent/30 to-white' : 'bg-white'}`} style={{ animationDelay: `${i * 70}ms` }}>
                  <div className="text-3xl w-12 text-center">{l.medal}</div>
                  <div className="flex-1">
                    <div className="font-black">{l.name}</div>
                    <div className="text-xs font-bold text-muted-foreground">{l.score.toLocaleString('ru')} очков</div>
                  </div>
                  <Icon name={l.up ? 'TrendingUp' : 'TrendingDown'} size={20} className={l.up ? 'text-emerald-500' : 'text-rose-500'} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CLUBS */}
        {tab === 'clubs' && (
          <section className="animate-fade-in">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2"><span>✨</span> Сообщества по интересам</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {CLUBS.map((c, i) => (
                <div key={c.name} className="rounded-3xl bg-white p-5 game-shadow hover-scale animate-scale-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl`}>{c.emoji}</div>
                    <div className="flex-1">
                      <div className="font-black text-lg">{c.name}</div>
                      <div className="text-sm font-bold text-muted-foreground">{c.members} участников</div>
                    </div>
                  </div>
                  <button className={`mt-4 w-full py-3 rounded-2xl font-bold hover-scale ${c.join ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {c.join ? 'Вы участник ✓' : 'Вступить'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Friend profile modal */}
      {openFriend && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={() => setOpenFriend(null)}>
          <div className="relative w-full max-w-md rounded-[2rem] bg-white p-6 game-shadow animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpenFriend(null)} className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover-scale">
              <Icon name="X" size={18} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl">
                {openFriend.emoji}
                <span className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-xs font-black px-2.5 py-1 rounded-full game-shadow-gold">LVL {openFriend.lvl}</span>
              </div>
              <h2 className="text-2xl font-black mt-4">{openFriend.name}</h2>
              <p className="text-sm font-bold text-muted-foreground">{openFriend.handle}</p>
              <p className="font-medium mt-2">{openFriend.bio}</p>
              <span className={`mt-2 text-xs font-bold px-3 py-1 rounded-full ${openFriend.online ? 'bg-emerald-100 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                {openFriend.online ? '● в сети' : '○ не в сети'}
              </span>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Прогресс уровня</span>
                <span className="text-primary">{openFriend.xp}%</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${openFriend.xp}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              {openFriend.stats.map(([l, v]) => (
                <div key={l} className="rounded-2xl bg-muted p-3 text-center">
                  <div className="text-xl font-black text-primary">{v}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">{l}</div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="text-sm font-black mb-2">🏆 Достижения</div>
              <div className="flex gap-2 flex-wrap">
                {openFriend.badges.map((b, i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/40 to-white flex items-center justify-center text-2xl game-shadow-gold">{b}</div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button onClick={() => { setOpenFriend(null); setTab('chat'); }} className="py-3 rounded-2xl bg-primary text-primary-foreground font-bold hover-scale flex items-center justify-center gap-2">
                <Icon name="MessageCircle" size={18} /> Чат
              </button>
              <button className="py-3 rounded-2xl bg-muted text-foreground font-bold hover-scale flex items-center justify-center gap-2">
                <Icon name="UserPlus" size={18} /> Подписки
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/80 backdrop-blur-xl border-t-2 border-white/60 px-2 py-2">
        <div className="flex justify-around">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)} className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all ${tab === n.id ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
              <Icon name={n.icon} size={22} />
              <span className="text-[10px] font-bold">{n.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;