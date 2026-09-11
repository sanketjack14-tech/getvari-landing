import { useState, useEffect } from 'react';

export function useAutoTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    
    // Check if user manually saved a preference
    const saved = localStorage.getItem('getvari_theme_mode');
    if (saved === 'light' || saved === 'dark') {
      return saved as 'dark' | 'light';
    }

    // Dynamic local time evaluation (6 AM to 6 PM is Daytime / Light Mode, 6 PM to 6 AM is Nighttime / Dark Mode)
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour < 18;

    return isDaytime ? 'light' : 'dark';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('getvari_theme_mode', next);
    } catch (e) {
      console.error(e);
    }
  };

  return { theme, toggleTheme, setTheme };
}
