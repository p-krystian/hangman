import langs from '@/Assets/Langs';
import { useContext, useMemo, useCallback } from 'react';
import { getDictionaries } from '@/Utils/lang';
import AppContext from '@/Contexts/AppContext';
import random from 'random';

function useLanguage() {
  const { appLang: currentLang, setLang } = useContext(AppContext);
  const [translations, words, langData] = useMemo(
    () => [...getDictionaries(), langs[currentLang]],
    [currentLang]
  );

  const l = useCallback((key: keyof LangDictTranslations) => (
    translations[key] || key
  ), [translations]);

  const getWordCategory = useCallback((word: string) => {
    for (const [category, entries] of Object.entries(words)) {
      if (entries.includes(word)) {
        return category;
      }
    }
    return null;
  }, [words]);

  const getRandomWord = useCallback((): string => (
    random.choice(Object.values(words).flat()) || 'RANDOM ERR'
  ), [words]);

  return { l, langData, setLang, currentLang, getWordCategory, getRandomWord } as const;
}

export default useLanguage;
