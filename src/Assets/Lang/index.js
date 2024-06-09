import polish from './pl.json'
import polishWords from './words-pl.json'
import polishLogo from '../Images/logo-beta-pl.webp'
import english from './en.json'
import englishLogo from '../Images/logo-beta-en.webp'

export default {
  availables: ['pl', 'en'],
  pl: {
    language: polish,
    words: polishWords,
    logo: polishLogo,
    symbol: '🇵🇱'
  },
  en: {
    language: english,
    words: {},
    logo: englishLogo,
    symbol: '🇺🇸'
  }
}
