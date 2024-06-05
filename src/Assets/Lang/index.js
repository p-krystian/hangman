import polish from './pl.json'
import polishWords from './words-PL.json'
import polishLogo from '../Images/logo-alpha.svg'
import english from './en.json'

export default {
  availables: ['pl', 'en'],
  pl: {
    language: polish,
    words: polishWords,
    logo: polishLogo
  },
  en: {
    language: english,
    words: {},
    logo: polishLogo
  }
}
