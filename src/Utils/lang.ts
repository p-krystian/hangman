import { loadTranslations, loadWords, availableLangs } from '@/Assets/Langs';
import { AppLangsT } from '@/Parsers/AppLangs';
import { mainLang } from '@/conf';

let TRANSLATIONS = {} as LangDictTranslations;
let WORDS = {} as LangDictWords;

async function updateDictionaries(language: AppLangsT) {
  const [t, w] = await Promise.all([loadTranslations(language), loadWords(language)]);

  TRANSLATIONS = t.default;
  WORDS = w.default;
}

function getUserLang() {
  const navigatorLang = window.navigator.language.substring(0, 2) as AppLangsT;

  return availableLangs.includes(navigatorLang) ? (
    navigatorLang
  ) : (
    mainLang
  );
};

const getDictionaries = () => [TRANSLATIONS, WORDS] as const;

export { getUserLang, getDictionaries, updateDictionaries };
