import { loadTranslations, loadWords } from '@/Assets/Langs';
import Header from '@/Components/Header/Header';
import { mainLang } from '@/conf';
import AppContext, { AppContextType } from '@/Contexts/AppContext';
import useLanguage from '@/Hooks/useLanguage';
import { setDictionaries } from '@/Utils/international';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import './App.css';

import LocalMenu from '@/Screens/Local/Local';
import MultiMenu from '@/Screens/Multi/Multi';
import SingleMenu from '@/Screens/Single/Single';
import StartMenu from '@/Screens/Start/Start';

function App() {
  const [, extraLang, setLanguage] = useLanguage();
  const [volume, setVolume] = useState<AppContextType['volume']>(0);
  const [lang, setLang] = useState<AppContextType['lang']>(mainLang);
  const [isLoading, setLoading] = useState(true);

  const updateDictionaries = useCallback(async (newLang: AppContextType['lang']) => {
    setLoading(true);

    const translations = await loadTranslations(newLang);
    const words = await loadWords(newLang);
    setDictionaries(translations, words);

    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    updateDictionaries(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLanguage(extraLang().code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return isLoading ? (
    <div>LOADING</div>
  ) : (
    <AppContext value={{ volume, setVolume, lang, setLang }}>
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
