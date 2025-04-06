import './App.css'
import { Routes, Route, HashRouter as Router } from 'react-router'
import Header from './Components/Header/Header'
import StartMenu from './Screens/Start/Start'
import SingleMenu from './Screens/Single/Single'
import LocalMenu from './Screens/Local/Local'
import MultiMenu from './Screens/Multi/Multi'

function App(){
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/single' element={ <SingleMenu /> } />
          <Route path='/local' element={ <LocalMenu /> } />
          <Route path='/multi' element={ <MultiMenu /> } />
          <Route path='*' element={ <StartMenu /> } />
        </Routes>
      </main>
    </Router>
  )
}

export default App
