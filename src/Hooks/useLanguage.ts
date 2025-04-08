import languages, { AvailableLang } from '../Assets/Lang'
import useSettings from './useSettings'
import { useState } from 'react'

const availables = [...Object.keys(languages)] as const
let currentLang = Object.values(languages)[0]

type LangCode = keyof typeof languages
interface ExtraLang extends AvailableLang {
  availables: typeof availables,
  code: LangCode,
}

type LanguageHook = [
  (word: string) => string,
  () => ExtraLang,
  (wanted: LangCode) => void
]

const get = (word: string) => currentLang.language[word] || ''

function useLanguage():LanguageHook{
  const [getSettings, setSettings] = useSettings()
  const [current, setCurrent] = useState<LangCode>(getSettings().language as LangCode)
  currentLang = languages[current]

  const setLanguage = (wanted: LangCode) => {
    if (availables.includes(wanted)){
      setCurrent(wanted)
      setSettings('language', wanted)
      currentLang = languages[wanted]
      document.title = languages[wanted].language.title
    }
  }
  const extra = ():ExtraLang => ({
    ...currentLang,
    availables: availables,
    code: current
  })

  return [get, extra, setLanguage]
}
export default useLanguage
