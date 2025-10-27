import { useContext, useState } from 'react';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Input from '@/Components/Input/Input';
import Keyboard from '@/Components/Keyboard/Keyboard';
import GameContext from '@/Contexts/GameContext';
import { limits as lt } from '@/conf';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLang';
import styles from './WriteNicks.module.css';

type WriteNicksProps = {
  goBack: () => void;
  goNext: (nicks: [string, string]) => void;
};

function WriteNicks({ goBack, goNext }: WriteNicksProps) {
  const { l } = useLanguage();
  const gameContext = useContext(GameContext);
  const [nick0, setNick0] = useState(gameContext.nicks[0]);
  const [nick1, setNick1] = useState(gameContext.nicks[1] || '');
  const [focused, setFocused] = useState<0 | 1>(0);
  const pass = nick0 !== nick1 && nick0.length >= lt.NICK_MIN && nick1.length >= lt.NICK_MIN;

  const keyboardWrite = useKeyboardWrite(focused ? setNick1 : setNick0, lt.NICK_MAX);

  useFullScreen();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <Input
            active={focused === 0}
            value={nick0}
            placeholder={`${l('nick')} 1`}
            size={lt.NICK_MAX}
            onFocus={() => setFocused(0)}
            shortcut="PREV"
          />
          <Input
            active={focused === 1}
            value={nick1}
            placeholder={`${l('nick')} 2`}
            size={lt.NICK_MAX}
            onFocus={() => setFocused(1)}
            shortcut="NEXT"
          />
        </div>
        <Keyboard keyEvent={keyboardWrite} write />
      </div>
      <ButtonWrap>
        <Button onClick={() => goNext([nick0, nick1])} disabled={!pass} shortcut="ACCEPT">
          {l('next')}
        </Button>
        <Button onClick={goBack} shortcut="CANCEL">
          {l('cancel')}
        </Button>
      </ButtonWrap>
    </div>
  );
}

export default WriteNicks;
