import GameContext, { SingleGameContext } from '@/Contexts/GameContext';
import useLanguage from '@/Hooks/useLang';
import EndGame from '@/Views/EndGame/EndGame';
import Game from '@/Views/Game/Game';
import { useCallback, useRef, useState } from 'react';
import { useLocation } from 'wouter';


function SingleGame() {
  const [, navigate] = useLocation();
  const { l, getRandomWord } = useLanguage();
  const [stage, setStage] = useState('game');
  const gameData = useRef<SingleGameContext>({
    entry: getRandomWord(),
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
      points: [gameData.current.points[0] + pointsAdd],
      prevRounds: [...gameData.current.rounds],
      rounds: [gameData.current.rounds[0] + 1],
      win: Boolean(result === 'win')
    };
    setStage('endGame');
  }, []);

  const newGame = useCallback(() => {
    gameData.current = {
      ...gameData.current,
      entry: getRandomWord()
    };
    setStage('game');
  }, [getRandomWord]);

  return (
    <GameContext value={gameData.current}>
      {stage === 'endGame' ? (
        <EndGame
          next={() => newGame()}
        />
      ) : (
        <Game
          exit={() => navigate('/')}
          onLose={() => gameEnd('lose')}
          onWin={() => gameEnd('win')}
        />
      )}
    </GameContext>
  );
}
export default SingleGame;
