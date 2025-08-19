import Header from '@/Components/Header/Header';
import Splash from '@/Components/Splash/Splash';
import { keysLS, startVol } from '@/conf';
import AppContext from '@/Contexts/AppContext';
import useLocalStorage from '@/Hooks/useLocalStorage';
import { AppLangsT, parseAppLangs } from '@/Parsers/AppLangs';
import { parseVolume, VolumeT } from '@/Parsers/Volume';
import { getUserLang, updateDictionaries } from '@/Utils/lang';
import { useCallback, useEffect, useState } from 'react';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import './App.css';

import LocalMenu from '@/Screens/Local/Local';
import MultiMenu from '@/Screens/Multi/Multi';
import SingleMenu from '@/Screens/Single/Single';
import StartMenu from '@/Screens/Start/Start';

const userLang = getUserLang();

function App() {
  const [volume, setVolume] = useLocalStorage<VolumeT>(startVol, keysLS.VOLUME, parseVolume);
  const [appLang, setAppLang] = useLocalStorage<AppLangsT>(userLang, keysLS.LANG, parseAppLangs);
  const [isLoading, setLoading] = useState(true);

  const setLang = useCallback(async (newLang: AppLangsT) => {
    // setLoading(true);
    await updateDictionaries(newLang);
    window.document.documentElement.lang = newLang;
    setAppLang(newLang);
    // setLoading(false);
  }, [setAppLang]);

  useEffect(() => {
    window.document.documentElement.lang = appLang;
    updateDictionaries(appLang).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (<Splash />) : (
    <AppContext value={{ volume, setVolume, appLang, setLang }}>
      <Router hook={useHashLocation}>
        <Header />
        <main>
          <Switch>
            <Route path='/single' component={SingleMenu} />
            <Route path='/local' component={LocalMenu} />
            <Route path='/multi' component={MultiMenu} />
            <Route path='*' component={StartMenu} />
          </Switch>
        </main>
      </Router>
    </AppContext>
  );
}

export default App;
