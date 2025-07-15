interface Settings {
  soundVolume: number;
  language: string;
}
type SettingKey = keyof Settings
type SettingValue = Settings[SettingKey]
type SettingsHook = [
  () => Settings,
  (key: SettingKey, value: SettingValue) => Settings
]

const defaultSettings = JSON.stringify({
  soundVolume: 2,
  language: 'pl'
});

const get = () => (
  JSON.parse(localStorage.getItem('hmSettings') || defaultSettings) as Settings
);

const set = (key: SettingKey, value: SettingValue) => {
  const newSettings = {
    ...get(),
    [key]: value
  };
  localStorage.setItem('hmSettings', JSON.stringify(newSettings));
  return get();
};

export default (): SettingsHook => [get, set];
