import { loadTranslations, loadWords } from '@/Assets/Langs';
import { AppLangsT } from '@/Types/AppLangs';

let TRANSLATIONS = {} as Record<string, string>;
let WORDS = {} as Record<string, Record<string, string>>;

async function updateDictionaries(language: AppLangsT) {
  const [t, w] = await Promise.all([loadTranslations(language), loadWords(language)]);

  TRANSLATIONS = t;
  WORDS = w;
}

const getDictionaries = () => [TRANSLATIONS, WORDS] as const;

export { getDictionaries, updateDictionaries };
