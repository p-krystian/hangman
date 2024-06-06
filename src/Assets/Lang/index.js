import polish from './pl.json'
import polishWords from './words-PL.json'
import polishLogo from '../Images/logo-alpha.svg'
import polishFlag from '../Images/flag-pl.svg'
import english from './en.json'
import englishFlag from '../Images/flag-en.svg'

export default {
  availables: ['pl', 'en'],
  pl: {
    language: polish,
    words: polishWords,
    logo: polishLogo,
    flag: polishFlag
  },
  en: {
    language: english,
    words: {},
    logo: polishLogo,
    flag: englishFlag
  }
}
