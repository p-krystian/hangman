import langs from '@/Assets/Langs';
import { useContext, useMemo, useCallback } from 'react';
import { getDictionaries } from '@/Utils/international';
import AppContext from '@/Contexts/AppContext';

function useLanguage() {
  const { lang: selectedLang } = useContext(AppContext);
  const [translations, /*words*/, data] = useMemo(
    () => [...getDictionaries(), langs[selectedLang]],
    [selectedLang]
  );

  const getTranslation = useCallback((key: string) => (
    translations[key] as string || key
  ), [translations]);

  // const getRandomWord = useCallback(() => ());

  return [getTranslation, data] as const;
}

export default useLanguage;
