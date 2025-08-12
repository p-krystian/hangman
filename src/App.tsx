import Header from '@/Components/Header/Header';
import useLanguage from '@/Hooks/useLanguage';
import { useEffect } from 'react';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import './App.css';

import LocalMenu from '@/Screens/Local/Local';
import MultiMenu from '@/Screens/Multi/Multi';
import SingleMenu from '@/Screens/Single/Single';
import StartMenu from '@/Screens/Start/Start';

function App() {
  const [, extraLang, setLang] = useLanguage();

  useEffect(() => {
    setLang(extraLang().code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
}

export default App;
