import files from '../Assets/Sounds'
import useSettings from './useSettings'

for (const file of Object.values(files)){
  const audio = new Audio(file)
  audio.load()
  audio.volume = 10 ** -6
  audio.autoplay = true
  audio.play().catch(() => `Don't throw error`)
}

function usePlaySound(name){
  const [getSettings] = useSettings()

  if (!files[name] || getSettings().soundVolume < 1){
    return
  }
  const audio = new Audio(files[name])
  audio.load()
  audio.volume = getSettings().soundVolume * 0.2
  audio.play().catch(() => `Don't throw error`)
}
export default () => usePlaySound
