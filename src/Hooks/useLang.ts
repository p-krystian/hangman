import random from 'random';
import { useCallback, useContext, useMemo } from 'react';
import langs from '@/Assets/Langs';
import AppContext from '@/Contexts/AppContext';
import { getDictionaries } from '@/Utils/lang';

function useLanguage() {
  const { appLang: currentLang, setLang } = useContext(AppContext);
  const [translations, words, langData] = useMemo(
    () => [...getDictionaries(), langs[currentLang]],
    [currentLang]
  );

  const l = useCallback(
    (key: keyof LangDictTranslations) => translations[key] || key,
    [translations]
  );

  const getWordCategory = useCallback(
    (word: string) => {
      for (const [category, entries] of Object.entries(words)) {
        if (entries.includes(word)) {
          return category;
        }
      }
      return null;
    },
    [words]
  );

  const getRandomWord = useCallback(
    (): string => random.choice(Object.values(words).flat()) || 'RANDOM ERR',
    [words]
  );

  return { l, langData, setLang, currentLang, getWordCategory, getRandomWord } as const;
}

export default useLanguage;
