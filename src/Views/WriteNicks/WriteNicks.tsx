import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Input from '@/Components/Input/Input';
import Keyboard from '@/Components/Keyboard/Keyboard';
import { limits as lt } from '@/conf';
import GameContext from '@/Contexts/GameContext';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLang';
import { useCallback, useContext, useState } from 'react';
import styles from './WriteNicks.module.css';

type WriteNicksProps = {
  back: () => void;
  next: () => void;
}

function WriteNicks({ back, next }: WriteNicksProps) {
  const { l } = useLanguage();
  const [nick0, setNick0] = useState('');
  const [nick1, setNick1] = useState('');
  const [focused, setFocused] = useState(0);
  const gameContext = useContext(GameContext);
  const pass = (nick0.length >= lt.NICK_MIN && nick1.length > lt.NICK_MIN) && (nick0 !== nick1);

  const keyboardWrite = useKeyboardWrite(
    focused ? setNick1 : setNick0,
    lt.NICK_MIN
  );

  const submit = useCallback(() => {
    if (!pass) return;
    gameContext.nicks = [nick0, nick1];
    next();
  }, [nick0, nick1, pass, next, gameContext]);

  useFullScreen();
  useKeyboardControl(
    back,
    submit,
    () => setFocused(0),
    () => setFocused(1)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <Input
            focus={focused === 0}
            value={nick0}
            placeholder={`${l('nick')} 1`}
            size={lt.NICK_MAX}
            onClick={() => setFocused(0)}
          />
          <Input
            focus={focused === 1}
            value={nick1}
            placeholder={`${l('nick')} 2`}
            size={lt.NICK_MAX}
            onClick={() => setFocused(1)}
          />
        </div>
        <Keyboard
          write={true}
          keyEvent={keyboardWrite}
        />
      </div>
      <ButtonWrap>
        <Button onClick={submit} disabled={!pass}>{l('next')}</Button>
        <Button onClick={back}>{l('cancel')}</Button>
      </ButtonWrap>
    </div>
  );
}

export default WriteNicks;
