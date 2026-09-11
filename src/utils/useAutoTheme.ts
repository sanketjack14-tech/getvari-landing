import { useState, useEffect } from 'react';

export function useAutoTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    
    if (document.documentElement.classList.contains('light-mode')) return 'light';

    const saved = localStorage.getItem('getvari_theme_mode');
    if (saved === 'light' || saved === 'dark') {
      return saved as 'dark' | 'light';
    }

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

    const handleThemeEvent = () => {
      const isLightNow = document.documentElement.classList.contains('light-mode');
      setTheme(isLightNow ? 'light' : 'dark');
    };

    window.addEventListener('getvari-theme-change', handleThemeEvent);
    return () => {
      window.removeEventListener('getvari-theme-change', handleThemeEvent);
    };
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('getvari_theme_mode', next);
      if (next === 'light') {
        document.documentElement.classList.add('light-mode');
        document.body.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
        document.body.classList.remove('light-mode');
      }
      window.dispatchEvent(new Event('getvari-theme-change'));
    } catch (e) {
      console.error(e);
    }
  };

  return { theme, toggleTheme, setTheme };
}

