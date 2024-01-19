import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useState } from 'react'
import GameContext from './Contexts/GameContext'
import StartMenu from './Screens/Start/Start'
import SingleMenu from './Screens/Single/Single'
import LocalMenu from './Screens/Local/Local'
import MultiMenu from './Screens/Multi/Multi'

function App(){
  const [gameData, setGameData] = useState({})
  const gameContext = {
    ...gameData,
    change: setGameData,
    reset: () => setGameData({
      entry: '',
      nicks: ['', ''],
      points: [0, 0],
      rounds: [0, 0]
    })
  }

  return (
    <GameContext.Provider value={ gameContext }>
      <Router>
        <Routes>
          <Route path='/single' element={ <SingleMenu /> } />
          <Route path='/local' element={ <LocalMenu /> } />
          <Route path='/multi' element={ <MultiMenu /> } />
          <Route path='*' element={ <StartMenu /> } />
        </Routes>
      </Router>
    </GameContext.Provider>
  )
}

export default App
