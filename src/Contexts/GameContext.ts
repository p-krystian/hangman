import { createContext } from 'react'

interface GameContextProps{
  entry: string
  nicks: [string, string?]
  points: [number, number?]
  prevPoints: [number, number?]
  rounds: [number, number?]
  prevRounds: [number, number?]
  win: boolean
}

const GameContext = createContext<GameContextProps>({
  entry: '',
  nicks: [''],
  points: [0],
  prevPoints: [0],
  rounds: [0],
  prevRounds: [0],
  win: false
})

export default GameContext
