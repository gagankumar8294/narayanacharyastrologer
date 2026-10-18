import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import english from '@/locales/english.json';
import kannada from '@/locales/kannada.json';
import telugu from '@/locales/telugu.json';
import hindi from '@/locales/hindi.json';

const translations = {
  kannada,
  telugu,
  hindi,
  english,
};

export function useTranslation() {
  const { language, changeLanguage } = useContext(LanguageContext);
  const t = translations[language] || translations.kannada;
  return { t, language, changeLanguage };
}
