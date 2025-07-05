import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../localization/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale); // default to device locale or 'en'

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('userLanguage');
        if (savedLang && typeof savedLang === 'string') {
          i18n.locale = savedLang;
          setLanguage(savedLang);
        } else {
          // Fallback to English if nothing is saved
          i18n.locale = 'en';
          setLanguage('en');
        }
      } catch (error) {
        console.error('Failed to load language', error);
        i18n.locale = 'en';
        setLanguage('en');
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    if (!lang || typeof lang !== 'string') {
      console.error('Invalid language passed to changeLanguage:', lang);
      return;
    }
    try {
      i18n.locale = lang; // Apply language
      setLanguage(lang);
      await AsyncStorage.setItem('userLanguage', lang);
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
