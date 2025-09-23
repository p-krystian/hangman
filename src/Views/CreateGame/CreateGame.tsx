import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Input from '@/Components/Input/Input';
import Keyboard from '@/Components/Keyboard/Keyboard';
import { limits } from '@/conf';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLang';
import { useState } from 'react';
import styles from './CreateGame.module.css';

type CreateGameProps = {
  goBack: () => void;
  goNext: (name: string) => void;
}

function Create({ goBack, goNext }: CreateGameProps) {
  const { l } = useLanguage();
  const [name, setName] = useState('');
  const keyboardWrite = useKeyboardWrite(setName, limits.NICK_MAX);

  useFullScreen();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Input
          value={name}
          placeholder={l('enterName')}
          size={limits.NICK_MAX}
          active
        />
        <Keyboard
          keyEvent={keyboardWrite}
          write
        />
      </div>
      <ButtonWrap>
        <Button
          onClick={() => goNext(name)}
          disabled={name.length < limits.NICK_MIN}
          shortcut="ACCEPT"
        >
          {l('start')}
        </Button>
        <Button onClick={goBack} shortcut="CANCEL">
          {l('cancel')}
        </Button>
      </ButtonWrap>
    </div>
  );
}
export default Create;
