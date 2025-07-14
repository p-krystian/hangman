import Game from '@/Views/Game/Game';
import EndGame from '@/Views/EndGame/EndGame';
import GameContext, { GameContextType } from '@/Contexts/GameContext';
import useLanguage from '@/Hooks/useLanguage';
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import random from 'random';

const randomizer = (fallback: string, words: Record<string, string[]>) => {
  const randomWord = random.choice(Object.values(words).flat());
  return randomWord || fallback;
};

function SingleGame(){
  const navigate = useNavigate();
  const [l, extraLang] = useLanguage();
  const randomWord = randomizer(l('randomize'), extraLang().words);
  const [stage, setStage] = useState('game');
  const gameData = useRef<GameContextType>({
    entry: randomWord.toUpperCase(),
    nicks: [l('result')],
    points: [0],
    prevPoints: [0],
    rounds: [0],
    prevRounds: [0],
    win: false
  });

  const gameEnd = useCallback((result: string) => {
    const pointsAdd = +(result === 'win');
    gameData.current = {
      ...gameData.current,
      prevPoints: [...gameData.current.points],
      points: [gameData.current.points[0]+pointsAdd],
      prevRounds: [...gameData.current.rounds],
      rounds: [gameData.current.rounds[0]+1],
      win: Boolean(result === 'win')
    };
    setStage('endGame');
  }, []);

  const newGame = useCallback(() => {
    gameData.current = {
      ...gameData.current,
      entry: randomWord.toUpperCase()
    };
    setStage('game');
  }, [randomWord]);

  return (
    <GameContext.Provider value={ gameData.current }>{
      stage === 'endGame' ? (
        <EndGame
          next={ () => newGame() }
        />
      ) : (
        <Game
          exit={ () => navigate('/') }
          onLose={ () => gameEnd('lose') }
          onWin={ () => gameEnd('win') }
        />
      )
    }</GameContext.Provider>
  );
}
export default SingleGame;
