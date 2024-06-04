const localStorageData = JSON.parse(localStorage.getItem('hmSettings'))
const defaultSettings = Object.freeze({
  soundVolume: 2,
  language: 'pl'
})
const settings = localStorageData || {...defaultSettings}

const get = () => settings

const set = (key, value) => {
  settings[key] = value
  localStorage.setItem('hmSettings', JSON.stringify(settings))
  return get()
}

export default () => [get, set]
