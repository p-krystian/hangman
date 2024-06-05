import languages from '../Assets/Lang'
import useSettings from './useSettings'
import { useState } from 'react'

const [getSettings, setSettings] = useSettings()
const saved = getSettings().language

function useLanguage(){
  const [current, setCurrent] = useState(saved)

  const setLanguage = wanted => {
    if (languages.availables.includes(wanted)){
      setCurrent(wanted)
      setSettings('language', wanted)
    }
  }
  const lang = key => languages[current].language[key]
  const extra = (type, key) => languages[type][key]

  return [lang, extra, setLanguage]
}
export default useLanguage
