import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Entry from '@/Components/Entry/Entry';
import Keyboard from '@/Components/Keyboard/Keyboard';
import WithCaret from '@/Components/WithCaret/WithCaret';
import GameContext from '@/Contexts/GameContext';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLang';
import usePlayer from '@/Hooks/usePlayer';
import { useCallback, useContext, useEffect, useState } from 'react';
import styles from './WriteEntry.module.css';

type WriteEntryProps = {
  back?: () => void;
  backText?: string;
  next: () => void;
  nick?: string;
}

function WriteEntry({ back, backText, next, nick }: WriteEntryProps) {
  const { l, getRandomWord } = useLanguage();
  const playSound = usePlayer();
  const [entry, setEntry] = useState('');
  const gameContext = useContext(GameContext);
  const keyboardWrite = useKeyboardWrite(setEntry, 20);

  const updateContext = useCallback(() => {
    if (entry.length < 3) return;
    gameContext.entry = entry.trim();
    next();
  }, [entry, next, gameContext]);

  useFullScreen();
  useKeyboardControl(back, updateContext);

  useEffect(() => {
    if (entry === '')
      return;
    playSound('click');
  }, [entry, playSound]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.text}>
          {l('phraseFor')}{nick || ''}:
        </span>
        <Entry>
          <WithCaret size={20}>{entry}</WithCaret>
        </Entry>
        <Keyboard keyEvent={keyboardWrite} write={true} />
      </div>
      <ButtonWrap>
        <Button onClick={updateContext} disabled={entry.length < 3}>
          {l('next')}
        </Button>
        {!!back && <Button onClick={back}>{backText || l('back')}</Button>}
        <Button onClick={() => setEntry(getRandomWord())}>
          {l('randomize')}
        </Button>
      </ButtonWrap>
    </div>
  );
}
export default WriteEntry;
