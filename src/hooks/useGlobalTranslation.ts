import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useGlobalTranslation = () => {
  const translation = useTranslation();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    window.addEventListener('i18nLanguageChanged', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('forceGlobalUpdate', handleLanguageChange);

    return () => {
      window.removeEventListener('i18nLanguageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('forceGlobalUpdate', handleLanguageChange);
    };
  }, []);

  return translation;
};
