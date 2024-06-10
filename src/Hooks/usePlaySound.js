import files from '../Assets/Sounds'
import useSettings from './useSettings'

for (const file of Object.values(files)){
  const audio = new Audio(file)
  audio.volume = 10 ** -5
  audio.autoplay = true
  try{ audio.play() }
  catch{}
}

function usePlaySound(name){
  const [getSettings] = useSettings()

  if (!files[name] || getSettings().soundVolume < 1)
    return

  const audio = new Audio(files[name])
  audio.preload = true
  audio.volume = getSettings().soundVolume * 0.2

  try{ audio.play() }
  catch{}
}
export default usePlaySound
