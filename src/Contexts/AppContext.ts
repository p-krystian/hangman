import { createContext } from 'react';
import { AppLangsT } from '@/Types/AppLangs';
import { VolumeT } from '@/Types/Volume';
import { mainLang } from '@/conf';

type AppContextT = {
  volume: VolumeT;
  setVolume: (newVolume: VolumeT) => void;

  appLang: AppLangsT,
  setLang: (newLang: AppLangsT) => void;
};

const AppContext = createContext<AppContextT>({
  volume: 0,
  setVolume: () => { },

  appLang: mainLang,
  setLang: () => { }
});

export { type AppContextT };
export default AppContext;
