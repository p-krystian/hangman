import { loadTranslations, loadWords } from '@/Assets/Langs';
import { AppLangsT } from '@/Parsers/AppLangs';

let TRANSLATIONS = {} as LangDictTranslations;
let WORDS = {} as LangDictWords;

async function updateDictionaries(language: AppLangsT) {
  const [t, w] = await Promise.all([loadTranslations(language), loadWords(language)]);

  TRANSLATIONS = t;
  WORDS = w;
}

const getDictionaries = () => [TRANSLATIONS, WORDS] as const;

export { getDictionaries, updateDictionaries };
