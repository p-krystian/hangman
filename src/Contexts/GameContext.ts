import { createContext } from 'react';

type BaseGameContext = {
  phrase: string;
  win: boolean;
};

type MultiGameContext = BaseGameContext & {
  nicks: [string, string];
  points: [number, number];
  prevPoints: [number, number];
  rounds: [number, number];
  prevRounds: [number, number];
};

type SingleGameContext = BaseGameContext & {
  nicks: [string];
  points: [number];
  prevPoints: [number];
  rounds: [number];
  prevRounds: [number];
};

const GameContext = createContext<SingleGameContext | MultiGameContext>({
  phrase: '',
  nicks: [''],
  points: [0],
  prevPoints: [0],
  rounds: [0],
  prevRounds: [0],
  win: false
});

export { type MultiGameContext, type SingleGameContext };
export default GameContext;
