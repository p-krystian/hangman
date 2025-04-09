import { createContext } from 'react';

export interface GameContextType{
  entry: string;
  nicks: string[];
  points: number[];
  prevPoints: number[];
  rounds: number[];
  prevRounds: number[];
  win: boolean;
}

const GameContext = createContext<GameContextType>({
  entry: '',
  nicks: [''],
  points: [0],
  prevPoints: [0],
  rounds: [0],
  prevRounds: [0],
  win: false
});

export default GameContext;
