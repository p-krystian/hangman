import GameContext, { MultiGameContext } from '@/Contexts/GameContext';
import EndGame from '@/Views/EndGame/EndGame';
import Game from '@/Views/Game/Game';
import WriteNicks from '@/Views/WriteNicks/WriteNicks';
import WritePhrase from '@/Views/WritePhrase/WritePhrase';
import { useCallback, useRef, useState } from 'react';
import { useLocation } from 'wouter';

type LocalStage = 'writeNicks' | 'writeEntry' | 'game' | 'endGame';

function Local() {
  const [, navigate] = useLocation();
  const [stage, setStage] = useState<LocalStage>('writeNicks');
  const currentPlayer = useRef<0 | 1>(0);
  const gameData = useRef<MultiGameContext>({
    phrase: '',
    nicks: ['', ''],
    points: [0, 0],
    prevPoints: [0, 0],
    rounds: [0, 0],
    prevRounds: [0, 0],
    win: false,
  });

  const gameEnd = useCallback((resoult: string) => {
    gameData.current.prevPoints = [...gameData.current.points];
    gameData.current.prevRounds = [...gameData.current.rounds];
    if (resoult === 'win') {
      gameData.current.points[currentPlayer.current]++;
    }
    gameData.current.rounds[currentPlayer.current]++;
    gameData.current.win = (resoult === 'win');
    currentPlayer.current = (+!currentPlayer.current) as 0 | 1;
    setStage('endGame');
  }, []);

  return (
    <GameContext value={gameData.current}>
      {stage === 'writeEntry' ? (
        <WritePhrase
          goNext={(p) => { gameData.current.phrase = p; setStage('game'); }}
          nick={gameData.current.nicks[currentPlayer.current]}
          goBack={!gameData.current.phrase ? () => setStage('writeNicks') : undefined}
          goExit={gameData.current.phrase ? () => navigate('/') : undefined}
        />
      ) : stage === 'game' ? (
        <Game
          goExit={() => navigate('/')}
          onLose={() => gameEnd('lose')}
          onWin={() => gameEnd('win')}
        />
      ) : stage === 'endGame' ? (
        <EndGame goNext={() => setStage('writeEntry')} />
      ) : (
        <WriteNicks
          goBack={() => navigate('/')}
          goNext={(ns) => { gameData.current.nicks = ns; setStage('writeEntry'); }}
        />
      )}
    </GameContext>
  );
}

export default Local;
