import languages from '../Assets/Lang'
import useSettings from './useSettings'
import { useState } from 'react'

const [getSettings, setSettings] = useSettings()

function useLanguage(){
  const [current, setCurrent] = useState(getSettings().language)

  const setLanguage = wanted => {
    if (languages.availables.includes(wanted)){
      setCurrent(wanted)
      setSettings('language', wanted)
      document.title = languages[wanted].language.title
    }
  }
  const lang = key => languages[current].language[key]
  const extra = type => languages[current][type]

  return [lang, extra, setLanguage]
}
export default useLanguage
