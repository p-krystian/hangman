import Confirm from '@/Components/Confirm/Confirm';
import GameContext, { MultiGameContext } from '@/Contexts/GameContext';
import useLanguage from '@/Hooks/useLang';
import EndGame from '@/Views/EndGame/EndGame';
import Game from '@/Views/Game/Game';
import WriteEntry from '@/Views/WriteEntry/WriteEntry';
import WriteNicks from '@/Views/WriteNicks/WriteNicks';
import { useCallback, useRef, useState } from 'react';
import { useLocation } from 'wouter';

function Local() {
  const { l } = useLanguage();
  const [, navigate] = useLocation();
  const [stage, setStage] = useState('writeNicks');
  const [askExit, setAskExit] = useState(false);
  const currentPlayer = useRef(0);
  const gameData = useRef<MultiGameContext>({
    entry: '',
    nicks: ['1', '2'],
    points: [0, 0],
    prevPoints: [0, 0],
    rounds: [0, 0],
    prevRounds: [0, 0],
    win: false,
  });
  const entryOpts = {
    back: gameData.current.entry
      ? () => setAskExit((current) => !current)
      : () => setStage('writeNicks'),
    backText: gameData.current.entry ? l('cancel') : l('back'),
    next: () => setStage('game'),
    nick: gameData.current.nicks[currentPlayer.current],
  };

  const gameEnd = useCallback((resoult: string) => {
    gameData.current.prevPoints = [...gameData.current.points];
    gameData.current.prevRounds = [...gameData.current.rounds];
    if (resoult === 'win') {
      gameData.current.points[currentPlayer.current]++;
    }
    gameData.current.rounds[currentPlayer.current]++;
    gameData.current.win = Boolean(resoult === 'win');
    currentPlayer.current = +!currentPlayer.current;
    setStage('endGame');
  }, []);

  return (
    <GameContext value={gameData.current}>
      {stage === 'writeEntry' ? (
        <>
          <WriteEntry {...entryOpts} />
          {askExit && (
            <Confirm confirm={() => navigate('/')} reject={() => setAskExit(false)}>
              {l('exitToMenu')}
            </Confirm>
          )}
        </>
      ) : stage === 'game' ? (
        <Game
          exit={() => navigate('/')}
          onLose={() => gameEnd('lose')}
          onWin={() => gameEnd('win')}
        />
      ) : stage === 'endGame' ? (
        <EndGame next={() => setStage('writeEntry')} />
      ) : (
        <WriteNicks back={() => navigate('/')} next={() => setStage('writeEntry')} />
      )}
    </GameContext>
  );
}

export default Local;
