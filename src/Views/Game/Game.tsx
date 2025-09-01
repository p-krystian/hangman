import Board from '@/Components/Board/Board';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Confirm from '@/Components/Confirm/Confirm';
import Entry from '@/Components/Entry/Entry';
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
  exit?: () => void;
  onLose: () => void;
  onWin: () => void;
}

function Game({ exit, onLose, onWin }: GameProps) {
  const { l } = useLanguage();
  const playSound = usePlayer();
  const gameContext = useContext(GameContext);
  const phrase = gameContext.phrase || '?';
  const [guessed, setGuessed] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [showExit, setShowExit] = useState(false);

  useFullScreen();
  useKeyboardControl(
    () => exit && setShowExit(current => !current)
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
        <Entry
          hide={true}
          guessed={guessed}
          winCallback={onWin}
        >
          {phrase}
        </Entry>
        <Keyboard keyEvent={clickKey} />
      </div>
      <ButtonWrap>
        {!!exit && <Button onClick={() => setShowExit(true)}>
          {l('cancel')}
        </Button>}
      </ButtonWrap>
      {!!showExit && (
        <Confirm confirm={() => exit && exit()} reject={() => setShowExit(false)}>
          {l('endGame')}
        </Confirm>
      )}
    </div>
  );
}
export default Game;
