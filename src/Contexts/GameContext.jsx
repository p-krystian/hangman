import { createContext } from 'react'

const GameContext = createContext({
  entry: null,
  nicks: [],
  points: [],
  rounds: [],
  change: () => {}
})

export default GameContext
