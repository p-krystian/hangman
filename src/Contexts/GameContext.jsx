import { createContext } from 'react'

const GameContext = createContext({
  entry: null,
  nicks: [],
  points: [],
  prevPoints: [],
  rounds: [],
  prevRounds: [],
  win: false
})

export default GameContext
