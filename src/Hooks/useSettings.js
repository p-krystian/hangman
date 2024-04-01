const get = () => ({
  soundVolume: +JSON.parse(localStorage.getItem('soundVolume'))
})

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return get()
}

export default () => ({...get(), set})
