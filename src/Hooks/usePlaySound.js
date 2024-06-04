import files from '../Assets/Sounds'
import useSettings from './useSettings'

function usePlaySound(name){
  const [getSettings, _] = useSettings()

  if (!files[name] || getSettings().soundVolume < 1)
    return

  const audio = new Audio(files[name])
  audio.preload = true
  audio.volume = getSettings().soundVolume * 0.33

  const playing = audio.play()
  if (playing){
    playing.then(() => 'none').catch(() => 'none')
  }
}
export default usePlaySound
