import { useCallback, useContext, useState } from 'react';
import Board from '@/Components/Board/Board';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Confirm from '@/Components/Confirm/Confirm';
import { KeyStateT } from '@/Components/Key/Key';
import Keyboard from '@/Components/Keyboard/Keyboard';
import Phrase from '@/Components/Phrase/Phrase';
import PhraseCategory from '@/Components/PhraseCategory/PhraseCategory';
import GameContext from '@/Contexts/GameContext';
import useFullScreen from '@/Hooks/useFullScreen';
import useLanguage from '@/Hooks/useLang';
import usePlayer from '@/Hooks/usePlayer';
import styles from './Game.module.css';

type GameProps = {
  goExit?: () => unknown;
  onLose: () => unknown;
  onWin: () => unknown;
};

function Game({ goExit, onLose, onWin }: GameProps) {
  const { l } = useLanguage();
  const playSound = usePlayer();
  const gameContext = useContext(GameContext);
  const phrase = gameContext.phrase || '?';
  const [toGuess, setToGuess] = useState(new Set(phrase.replace(/ /g, '')));
  const [mistakes, setMistakes] = useState(new Set<string>());
  const [showExit, setShowExit] = useState(false);

  useFullScreen();

  const clickKey = useCallback(
    (char: string, setKeyState: (s: KeyStateT) => unknown) => {
      if (mistakes.has(char) || (!toGuess.has(char) && phrase.includes(char))) {
        return;
      }

      if (toGuess.has(char)) {
        const newToGess = new Set(toGuess);
        newToGess.delete(char);
        if (newToGess.size < 1) {
          return onWin();
        }
        setKeyState('correct');
        playSound('good');
        setToGuess(newToGess);
      } else {
        const newMistakes = new Set(mistakes);
        newMistakes.add(char);
        if (newMistakes.size > 9) {
          return onLose();
        }
        setKeyState('mistake');
        playSound('bad');
        setMistakes(newMistakes);
      }
    },
    [toGuess, mistakes, playSound, phrase, onLose, onWin]
  );

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <Board progress={mistakes.size} />
        <PhraseCategory phrase={phrase} animate />
        <Phrase hideChars={toGuess}>{phrase}</Phrase>
        <Keyboard keyEvent={clickKey} />
      </div>
      <ButtonWrap>
        {!!goExit && (
          <Button onClick={() => setShowExit(true)} shortcut="CANCEL">
            {l('cancel')}
          </Button>
        )}
      </ButtonWrap>
      {!!showExit && (
        <Confirm confirm={() => goExit && goExit()} reject={() => setShowExit(false)}>
          {l('endGame')}
        </Confirm>
      )}
    </div>
  );
}
export default Game;
