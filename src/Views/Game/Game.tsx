import Board from '@/Components/Board/Board';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Confirm from '@/Components/Confirm/Confirm';
import Phrase from '@/Components/Phrase/Phrase';
import Keyboard from '@/Components/Keyboard/Keyboard';
import PhraseCategory from '@/Components/PhraseCategory/PhraseCategory';
import GameContext from '@/Contexts/GameContext';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useLanguage from '@/Hooks/useLang';
import usePlayer from '@/Hooks/usePlayer';
import { useCallback, useContext, useState } from 'react';
import styles from './Game.module.css';

type GameProps = {
  goExit?: () => unknown;
  onLose: () => unknown;
  onWin: (phrase?: string) => unknown;
}

function Game({ goExit, onLose, onWin }: GameProps) {
  const { l } = useLanguage();
  const playSound = usePlayer();
  const gameContext = useContext(GameContext);
  const phrase = gameContext.phrase || '?';
  const [guessed, setGuessed] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [showExit, setShowExit] = useState(false);

  useFullScreen();
  useKeyboardControl(
    () => goExit && setShowExit(current => !current)
  );

  const clickKey = useCallback((char: string, key: Element) => {
    if (guessed.includes(char))
      return;

    if (phrase.includes(char)) {
      key.classList.add('correct');
      setGuessed(g => g.includes(char) ? g : g.concat(char));
      playSound('good');
    }
    else {
      key.classList.add('mistake');
      if (mistakes >= 9)
        return onLose();
      setMistakes(m => m + 1);
      playSound('bad');
    }
  }, [guessed, mistakes, playSound, phrase, onLose]);

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <Board progress={mistakes} />
        <PhraseCategory phrase={phrase} animate />
        <Phrase
          onlyGuessed={guessed}
          onGuessed={onWin}
        >
          {phrase}
        </Phrase>
        <Keyboard keyEvent={clickKey} />
      </div>
      <ButtonWrap>
        {!!goExit && <Button onClick={() => setShowExit(true)}>
          {l('cancel')}
        </Button>}
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
