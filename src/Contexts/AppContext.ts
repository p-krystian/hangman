import { createContext } from 'react';
import { AppLangsT } from '@/Parsers/AppLangs';
import { VolumeT } from '@/Parsers/Volume';
import { mainLang } from '@/conf';

type AppContextT = {
  volume: VolumeT;
  setVolume: (newVolume: VolumeT | ((currVolume: VolumeT) => VolumeT)) => void;

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
