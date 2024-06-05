import languages from '../Assets/Lang'
import useSettings from './useSettings'
// import { useState } from 'react'

const [getSettings, setSettings] = useSettings()
let current = getSettings().language
// const [language, setLanguage] = useState(current)

function changeLanguage(wanted){
  if (languages.availables.includes(wanted)){
    // setLanguage(wanted)
    current = wanted
    setSettings('language', wanted)
  }
}
const useLanguage = () => languages[current].language
const useWords = () => languages[current].words

export default useLanguage
export { useWords, changeLanguage }
