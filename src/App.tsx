import { useCallback, useEffect, useState } from 'react';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import Header from '@/Components/Header/Header';
import Splash from '@/Components/Splash/Splash';
import AppContext from '@/Contexts/AppContext';
import { keysLS, startVol } from '@/conf';
import useControlKey from '@/Hooks/useControlKey';
import useLocalStorage from '@/Hooks/useLocalStorage';
import { AppLangsT, parseAppLangs } from '@/Parsers/AppLangs';
import { parseVolume, VolumeT } from '@/Parsers/Volume';
import { getUserLang, updateDictionaries } from '@/Utils/lang';
import './App.css';

import Local from '@/Screens/Local/Local';
import Multi from '@/Screens/Multi/Multi';
import Single from '@/Screens/Single/Single';
import Start from '@/Screens/Start/Start';

const userLang = getUserLang();

function App() {
  const [volume, setVolume] = useLocalStorage<VolumeT>(startVol, keysLS.VOLUME, parseVolume);
  const [appLang, setAppLang] = useLocalStorage<AppLangsT>(userLang, keysLS.LANG, parseAppLangs);
  const [isLoading, setLoading] = useState(true);

  const setLang = useCallback(
    async (newLang: AppLangsT) => {
      // setLoading(true);
      await updateDictionaries(newLang);
      window.document.documentElement.lang = newLang;
      setAppLang(newLang);
      // setLoading(false);
    },
    [setAppLang]
  );

  // biome-ignore lint: Run once, only on mount
  useEffect(() => {
    window.document.documentElement.lang = appLang;
    updateDictionaries(appLang).then(() => setLoading(false));
  }, []);

  useControlKey();

  return isLoading ? (
    <Splash />
  ) : (
    <AppContext value={{ volume, setVolume, appLang, setLang }}>
      <Router hook={useHashLocation}>
        <Header />
        <main>
          <Switch>
            <Route path="/single" component={Single} />
            <Route path="/local" component={Local} />
            <Route path="/multi" component={Multi} />
            <Route path="*" component={Start} />
          </Switch>
        </main>
      </Router>
    </AppContext>
  );
}

export default App;
