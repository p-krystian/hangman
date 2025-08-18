import { loadTranslations, loadWords } from '@/Assets/Langs';
import Header from '@/Components/Header/Header';
import { mainLang } from '@/conf';
import AppContext from '@/Contexts/AppContext';
import useLanguage from '@/Hooks/useLanguage';
import { AppLangsT } from '@/Types/AppLangs';
import { VolumeT } from '@/Types/Volume';
import { setDictionaries } from '@/Utils/international';
import { useCallback, useEffect, useState } from 'react';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import './App.css';

import LocalMenu from '@/Screens/Local/Local';
import MultiMenu from '@/Screens/Multi/Multi';
import SingleMenu from '@/Screens/Single/Single';
import StartMenu from '@/Screens/Start/Start';

const updateDictionaries = async (newLang: AppLangsT) => (
  setDictionaries(await loadTranslations(newLang), await loadWords(newLang))
);

function App() {
  const [, extraLang, setLanguage] = useLanguage();
  const [volume, setVolume] = useState<VolumeT>(0);
  const [appLang, setAppLang] = useState<AppLangsT>(mainLang);
  const [isLoading, setLoading] = useState(true);

  const setLang = useCallback(async (newLang: AppLangsT) => {
    setLoading(true);
    await updateDictionaries(newLang);
    setAppLang(newLang);
    setLoading(false);
  }, []);

  useEffect(() => {
    updateDictionaries(appLang).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLanguage(extraLang().code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return isLoading ? (
    <div>LOADING</div>
  ) : (
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
