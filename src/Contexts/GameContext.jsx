import { createContext } from 'react'

const GameContext = createContext({
  entry: null,
  nicks: [],
  points: [],
  change: () => {}
})

export default GameContext
