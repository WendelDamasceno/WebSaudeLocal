import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext({});

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    language: 'pt-BR'
  });

  useEffect(() => {
    const stored = localStorage.getItem('preferences');
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  const updatePreferences = (newPrefs) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    localStorage.setItem('preferences', JSON.stringify(updated));
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
