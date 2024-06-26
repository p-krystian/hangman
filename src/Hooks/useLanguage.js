import languages from '../Assets/Lang'
import useSettings from './useSettings'
import { useState } from 'react'

const [getSettings, setSettings] = useSettings()
document.title = languages[getSettings().language].language.title

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
  const extra = () => ({
    availables: languages.availables,
    code: current,
    ...languages[current]
  })

  return [lang, extra, setLanguage]
}
export default useLanguage
