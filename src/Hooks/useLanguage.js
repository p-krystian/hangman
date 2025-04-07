import languages from '../Assets/Lang'
import useSettings from './useSettings'
import { useState } from 'react'

(() => {
  const [getSettings] = useSettings()
  document.title = languages[getSettings().language].language.title
})()

function useLanguage(){
  const [getSettings, setSettings] = useSettings()
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
