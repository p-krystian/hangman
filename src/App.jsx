import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StartMenu from './Screens/Start/Start'
import SingleMenu from './Screens/Single/Single'
import LocalMenu from './Screens/Local/Local'
import MultiMenu from './Screens/Multi/Multi'

function App(){
  return (
    <Router>
      <Routes>
        <Route path='/single' element={ <SingleMenu /> } />
        <Route path='/local' element={ <LocalMenu /> } />
        <Route path='/multi' element={ <MultiMenu /> } />
        <Route path='*' element={ <StartMenu /> } />
      </Routes>
    </Router>
  )
}

export default App
