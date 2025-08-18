let TRANSLATIONS = {} as Record<string, string>;
let WORDS = {} as Record<string, Record<string, string>>;

function setDictionaries(translations: typeof TRANSLATIONS, words: typeof WORDS) {
  TRANSLATIONS = translations;
  WORDS = words;
}

const getDictionaries = () => [TRANSLATIONS, WORDS] as const;

export { getDictionaries, setDictionaries };
