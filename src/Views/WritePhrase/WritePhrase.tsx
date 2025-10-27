import { useEffect, useState } from 'react';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Confirm from '@/Components/Confirm/Confirm';
import Keyboard from '@/Components/Keyboard/Keyboard';
import Phrase from '@/Components/Phrase/Phrase';
import { limits } from '@/conf';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLang';
import usePlayer from '@/Hooks/usePlayer';
import styles from './WritePhrase.module.css';

type WritePhraseProps = {
  goNext: (phrase: string) => void;
  nick: string;
  goBack?: () => void;
  goExit?: () => void;
};

function WritePhrase({ goNext, nick, goBack, goExit }: WritePhraseProps) {
  const { l, getRandomWord } = useLanguage();
  const playSound = usePlayer();
  const [phrase, setPhrase] = useState('');
  const [askExit, setAskExit] = useState(false);
  const keyboardWrite = useKeyboardWrite(setPhrase, limits.PHRASE_MAX);

  useFullScreen();
  useEffect(() => {
    if (phrase === '') return;
    playSound('click');
  }, [phrase, playSound]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.text}>{`${l('phraseFor')} ${nick}:`}</span>
        <Phrase write>{phrase}</Phrase>
        <Keyboard keyEvent={keyboardWrite} write />
      </div>
      <ButtonWrap>
        <Button
          onClick={() => goNext(phrase)}
          disabled={phrase.length < limits.PHRASE_MIN}
          shortcut="ACCEPT"
        >
          {l('next')}
        </Button>
        {(!!goBack || !!goExit) && (
          <Button onClick={goExit ? () => setAskExit(true) : goBack} shortcut="CANCEL">
            {goExit ? l('cancel') : l('back')}
          </Button>
        )}
        <Button onClick={() => setPhrase(getRandomWord())} shortcut="RANDOMIZE">
          {l('randomize')}
        </Button>
      </ButtonWrap>
      {askExit && goExit && (
        <Confirm confirm={goExit} reject={() => setAskExit(false)}>
          {l('endGame')}
        </Confirm>
      )}
    </div>
  );
}
export default WritePhrase;
