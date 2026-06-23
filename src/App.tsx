import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const AUTH_URL = 'https://functions.poehali.dev/7620a252-ed4f-4b1d-9a87-041f7f7fcb6c';

const queryClient = new QueryClient();

type User = { id: number; username: string; emoji: string; bio: string; level: number; xp: number };

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('luk_token');
    if (!token) { setChecking(false); return; }
    fetch(`${AUTH_URL}/?action=me`, { headers: { 'X-Auth-Token': token } })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data && data.username) setUser(data); else localStorage.removeItem('luk_token'); })
      .catch(() => localStorage.removeItem('luk_token'))
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = (_token: string, u: User) => setUser(u);

  const handleLogout = () => {
    localStorage.removeItem('luk_token');
    setUser(null);
  };

  const handleUpdateUser = (updated: User) => setUser(updated);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl animate-float mb-4">🧅</div>
          <div className="font-display text-3xl text-primary">Лук</div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <Index user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/auth"
              element={user ? <Navigate to="/" replace /> : <Auth onLogin={handleLogin} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;