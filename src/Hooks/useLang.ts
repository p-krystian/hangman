import langs from '@/Assets/Langs';
import { useContext, useMemo, useCallback } from 'react';
import { getDictionaries } from '@/Utils/lang';
import AppContext from '@/Contexts/AppContext';

function useLanguage() {
  const { appLang: currentLang, setLang } = useContext(AppContext);
  const [translations, /*words*/, langData] = useMemo(
    () => [...getDictionaries(), langs[currentLang]],
    [currentLang]
  );

  const l = useCallback((key: keyof LangDictTranslations) => (
    translations[key] || key
  ), [translations]);

  // const getRandomWord = useCallback(() => ());

  return { l, langData, setLang, currentLang } as const;
}

export default useLanguage;
