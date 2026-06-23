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
  { name: 'Аня', emoji: '🦄', online: true, lvl: 42 },
  { name: 'Макс', emoji: '🐉', online: true, lvl: 38 },
  { name: 'Лера', emoji: '🌸', online: false, lvl: 51 },
  { name: 'Дима', emoji: '🦊', online: true, lvl: 29 },
];

const Index = () => {
  const [tab, setTab] = useState('profile');

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
          <section className="animate-fade-in">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2"><span>🤝</span> Мои друзья</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {FRIENDS.map((f) => (
                <div key={f.name} className="flex items-center gap-4 rounded-3xl bg-white p-4 game-shadow hover-scale">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                    {f.emoji}
                    {f.online && <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-black">{f.name}</div>
                    <div className="text-xs font-bold text-muted-foreground">LVL {f.lvl} · {f.online ? 'в сети' : 'не в сети'}</div>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover-scale">Чат</button>
                </div>
              ))}
            </div>
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
