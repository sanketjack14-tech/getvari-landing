import { useState, useEffect } from 'react';

export function useAutoTheme() {
  const getAutoThemeByTime = (): 'dark' | 'light' => {
    const hour = new Date().getHours();
    // Light Mode: 6:00 AM (6) to 7:00 PM (19)
    // Dark Mode: 7:00 PM (19) to 6:00 AM (6)
    return (hour >= 6 && hour < 19) ? 'light' : 'dark';
  };

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    
    // Check if user manually toggled in current session
    const sessionOverride = sessionStorage.getItem('getvari_theme_manual_override');
    if (sessionOverride === 'light' || sessionOverride === 'dark') {
      return sessionOverride as 'dark' | 'light';
    }

    // Dynamic local time evaluation
    return getAutoThemeByTime();
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
      sessionStorage.setItem('getvari_theme_manual_override', next);
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


