import { useCallback, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import GameContext, { SingleGameContext } from '@/Contexts/GameContext';
import useLanguage from '@/Hooks/useLang';
import EndGame from '@/Views/EndGame/EndGame';
import Game from '@/Views/Game/Game';

type SingleStage = 'game' | 'endGame';

function SingleGame() {
  const [, navigate] = useLocation();
  const { l, getRandomWord } = useLanguage();
  const [stage, setStage] = useState<SingleStage>('game');
  const gameData = useRef<SingleGameContext>({
    phrase: getRandomWord(),
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
    gameData.current.phrase = getRandomWord();
    setStage('game');
  }, [getRandomWord]);

  return (
    <GameContext value={gameData.current}>
      {stage === 'endGame' ? (
        <EndGame goNext={() => newGame()} />
      ) : (
        <Game
          goExit={() => navigate('/')}
          onLose={() => gameEnd('lose')}
          onWin={() => gameEnd('win')}
        />
      )}
    </GameContext>
  );
}
export default SingleGame;
