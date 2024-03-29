const get = () => ({
  soundVolume: JSON.parse(localStorage.getItem('hmSoundVolume')) || 2
})

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return get()
}

export default {...get(), set}
