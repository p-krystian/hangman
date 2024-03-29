import files from '../Assets/Sounds'
import settings from './useSettings'

function usePlaySound(name){
  if (!files[name] || settings.soundVolume < 1)
    return

  const audio = new Audio(files[name])
  audio.preload = true
  audio.volume = settings.soundVolume * 0.33

  const playing = audio.play()
  playing?.then(() => audio.pause()).catch(() => 'none')
}
export default usePlaySound
