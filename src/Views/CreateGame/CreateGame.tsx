import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Input from '@/Components/Input/Input';
import Keyboard from '@/Components/Keyboard/Keyboard';
import { limits } from '@/conf';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLang';
import { useCallback, useState } from 'react';
import styles from './CreateGame.module.css';

type CreateGameProps = {
  goBack: () => void;
  goNext: (name: string) => void;
}

function Create({ goBack, goNext }: CreateGameProps) {
  const { l } = useLanguage();
  const [name, setName] = useState('');
  const keyboardWrite = useKeyboardWrite(setName, limits.NICK_MAX);

  const create = useCallback(() => {
    if (name.length < limits.NICK_MIN)
      return;

    goNext(name);
  }, [name, goNext]);

  useFullScreen();
  useKeyboardControl(goBack, create);

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
        <Button onClick={create} disabled={name.length < limits.NICK_MIN}>
          {l('start')}
        </Button>
        <Button onClick={goBack}>
          {l('cancel')}
        </Button>
      </ButtonWrap>
    </div>
  );
}
export default Create;
