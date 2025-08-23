import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Confirm from '@/Components/Confirm/Confirm';
import Entry from '@/Components/Entry/Entry';
import Keyboard from '@/Components/Keyboard/Keyboard';
import WithCaret from '@/Components/WithCaret/WithCaret';
import { limits } from '@/conf';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLang';
import usePlayer from '@/Hooks/usePlayer';
import { useEffect, useMemo, useState } from 'react';
import styles from './WritePhrase.module.css';

type WritePhraseProps = {
  goNext: (phrase: string) => void;
  nick: string;
  goBack?: () => void;
  goExit?: () => void;
}

function WritePhrase({ goNext, nick, goBack, goExit }: WritePhraseProps) {
  const { l, getRandomWord } = useLanguage();
  const playSound = usePlayer();
  const [phrase, setPhrase] = useState('');
  const [askExit, setAskExit] = useState(false);
  const keyboardWrite = useKeyboardWrite(setPhrase, limits.PHRASE_MAX);

  const onNext = useMemo(() => (
    phrase.length >= limits.PHRASE_MIN
      ? () => goNext(phrase)
      : () => null
  ), [phrase, goNext]);

  useFullScreen();
  useKeyboardControl(goExit ? (() => setAskExit(c => !c)) : goBack, onNext);

  useEffect(() => {
    if (phrase === '')
      return;
    playSound('click');
  }, [phrase, playSound]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.text}>
          {`${l('phraseFor')} ${nick}:`}
        </span>
        <Entry>
          <WithCaret size={20}>{phrase}</WithCaret>
        </Entry>
        <Keyboard keyEvent={keyboardWrite} write={true} />
      </div>
      <ButtonWrap>
        <Button onClick={onNext} disabled={phrase.length < limits.PHRASE_MIN}>
          {l('next')}
        </Button>
        {(!!goBack || !!goExit) && (
          <Button onClick={goExit ? (() => setAskExit(true)) : goBack}>
            {goExit ? l('cancel') : l('back')}
          </Button>
        )}
        <Button onClick={() => setPhrase(getRandomWord())}>
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
