import polish from './pl.json'
import polishWords from './words-pl.json'
import polishLogo from '../Images/logo-beta-pl.webp'
import english from './en.json'
import englishWords from './words-en.json'
import englishLogo from '../Images/logo-beta-en.webp'

export interface AvailableLang{
  language: Record<string, string>,
  words: Record<string, string[]>,
  logo: string,
  symbol: string
}

export default {
  pl: {
    language: polish,
    words: polishWords,
    logo: polishLogo,
    symbol: '🇵🇱'
  } as AvailableLang,
  en: {
    language: english,
    words: englishWords,
    logo: englishLogo,
    symbol: '🇺🇸'
  } as AvailableLang
} satisfies Record<string, AvailableLang>
