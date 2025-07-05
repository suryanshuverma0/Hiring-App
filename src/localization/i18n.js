import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en.json';
import np from './np.json';

// Create a new instance of I18n
const i18n = new I18n();

// Set translations
i18n.translations = {
  en,
  np,
};

// Fallback to English if key or language missing
i18n.fallbacks = true;

// Set locale safely
const deviceLocale = Localization.locale?.split('-')[0] || 'en'; // e.g. en-US -> en
i18n.locale = deviceLocale; 

export default i18n;
