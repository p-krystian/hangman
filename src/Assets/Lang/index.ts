import pl from './pl.json';
import plWords from './words-pl.json';
import plLogo from '../Images/logo-beta-pl.webp';
import plSymbol from '../Images/symbol-pl.svg';

import en from './en.json';
import enWords from './words-en.json';
import enLogo from '../Images/logo-beta-en.webp';
import enSymbol from '../Images/symbol-en.svg';

export interface AvailableLang{
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
