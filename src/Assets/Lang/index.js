import polish from './pl.json'
import polishWords from './words-PL.json'
import polishLogo from '../Images/logo-alpha.svg'
import english from './en.json'
import englishLogo from '../Images/logo.svg'

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
