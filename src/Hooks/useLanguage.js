import languages from '../Assets/Lang'
import useSettings from './useSettings'
import { useState } from 'react'

let currentLang = {language: {}}
const getWord = word => currentLang.language[word]

function useLanguage(){
  const [getSettings, setSettings] = useSettings()
  const [current, setCurrent] = useState(getSettings().language)
  currentLang = languages[current]

  const setLanguage = wanted => {
    if (languages.availables.includes(wanted)){
      setCurrent(wanted)
      setSettings('language', wanted)
      currentLang = languages[wanted]
      document.title = languages[wanted].language.title
    }
  }
  const extra = () => ({
    availables: languages.availables,
    code: current,
    ...languages[current]
  })

  return [getWord, extra, setLanguage]
}
export default useLanguage
