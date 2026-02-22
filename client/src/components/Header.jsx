import { useAuth } from '../context/AuthContext';
import { getLocalDateTime } from '../utils/time';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(getLocalDateTime());
    const timer = setInterval(() => {
      setCurrentTime(getLocalDateTime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">✂️ Barber Shop Manager</h1>
          <span className="text-sm opacity-80 hidden md:block">{currentTime}</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            <div className="text-right hidden md:block">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs opacity-70 capitalize">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <button
              onClick={logout}
              className="ml-2 px-4 py-2 bg-danger/20 hover:bg-danger/40 rounded-lg text-sm transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}