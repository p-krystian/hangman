import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Input from '@/Components/Input/Input';
import Keyboard from '@/Components/Keyboard/Keyboard';
import useFullScreen from '@/Hooks/useFullScreen';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useKeyboardWrite from '@/Hooks/useKeyboardWrite';
import useLanguage from '@/Hooks/useLanguage';
import { useCallback, useState } from 'react';
import styles from './CreateGame.module.css';

interface CreateGameProps {
  back: () => void;
  submit: (name: string) => void;
}

function Create({ back, submit }: CreateGameProps) {
  const [name, setName] = useState('');
  const [l] = useLanguage();
  const maxNameLength = 12;
  const keyboardWrite = useKeyboardWrite(setName, maxNameLength);

  const create = useCallback(() => {
    if (name.length < 3)
      return;

    submit(name.substring(0, maxNameLength));
  }, [name, submit, maxNameLength]);

  useFullScreen();
  useKeyboardControl(back, create);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Input
          focus={true}
          value={name}
          placeholder={l('enterName')}
          size={maxNameLength}
        />
        <Keyboard
          write={true}
          keyEvent={keyboardWrite}
        />
      </div>
      <ButtonWrap>
        <Button onClick={create} disabled={name.length < 3}>
          {l('start')}
        </Button>
        <Button onClick={back}>
          {l('cancel')}
        </Button>
      </ButtonWrap>
    </div>
  );
}
export default Create;
