import { createContext } from 'react';
import langs, { AvailableLang } from '@/Assets/Lang';

type AppContextType = {
  volume: number;
  setVolume: (newVolume: number) => void;

  language: AvailableLang,
  setLanguage: (newLanguage: keyof typeof langs) => void;
};

const AppContext = createContext<AppContextType>({
  volume: 0,
  setVolume: () => { },

  language: {
    language: {},
    words: {},
    logo: '',
    symbol: ''
  },
  setLanguage: () => { }
});

export { type AppContextType };
export default AppContext;
