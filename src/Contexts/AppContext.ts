import { createContext } from 'react';
import { AppLangs } from '@/Assets/Langs';
import { mainLang } from '@/conf';

type VolumeValues = 0 | 1 | 2 | 3;

type AppContextType = {
  volume: VolumeValues;
  setVolume: (newVolume: VolumeValues) => void;

  lang: AppLangs,
  setLang: (newLang: AppLangs) => void;
};

const AppContext = createContext<AppContextType>({
  volume: 0,
  setVolume: () => { },

  lang: mainLang,
  setLang: () => { }
});

export { type AppContextType };
export default AppContext;
