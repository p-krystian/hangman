import plFlag from './pl/flag.svg';
import plLogo from './pl/logo-beta.webp';

import enFlag from './en/flag.svg';
import enLogo from './en/logo-beta.webp';

const langs = {
  pl: {
    name: 'Polski',
    short: 'PL',
    code: 'pl-PL',
    flag: plFlag,
    logo: plLogo
  },
  en: {
    name: 'English',
    short: 'EN',
    code: 'en-US',
    flag: enFlag,
    logo: enLogo
  }
} as const;

const loadTranslations = (lang: keyof typeof langs) => import(`./${lang}/translations.json`);
const loadWords = (lang: keyof typeof langs) => import(`./${lang}/words.json`);

export { loadTranslations, loadWords };
export default langs;
