import files from '../Assets/Sounds'

function usePlaySound(name){
  if (!files[name])
    return

  const audio = new Audio(files[name])
  audio.preload = true
  audio.volume = 0.5
  audio.play()
}
export default usePlaySound
