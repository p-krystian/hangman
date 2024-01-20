import { createContext } from 'react'

const GameContext = createContext({
  entry: null,
  nicks: [],
  points: [],
  rounds: [],
  win: false
})

export default GameContext
