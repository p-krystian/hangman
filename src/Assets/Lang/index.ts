import pl from './pl/translations.json';
import plWords from './pl/words.json';
import plLogo from './pl/logo-beta.webp';
import plSymbol from './pl/symbol.svg';

import en from './en/translations.json';
import enWords from './en/words.json';
import enLogo from './en/logo-beta.webp';
import enSymbol from './en/symbol.svg';

export interface AvailableLang {
  language: Record<string, string>;
  words: Record<string, string[]>;
  logo: string;
  symbol: string;
}

export default {
  pl: {
    language: pl,
    words: plWords,
    logo: plLogo,
    symbol: plSymbol
  } as AvailableLang,
  en: {
    language: en,
    words: enWords,
    logo: enLogo,
    symbol: enSymbol
  } as AvailableLang
} satisfies Record<string, AvailableLang>;
