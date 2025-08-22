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
  back: () => void;
  submit: (name: string) => void;
}

function Create({ back, submit }: CreateGameProps) {
  const [name, setName] = useState('');
  const { l } = useLanguage();
  const keyboardWrite = useKeyboardWrite(setName, limits.NICK_MAX);

  const create = useCallback(() => {
    if (name.length < limits.NICK_MIN)
      return;

    submit(name.substring(0, limits.NICK_MAX));
  }, [name, submit]);

  useFullScreen();
  useKeyboardControl(back, create);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Input
          focus={true}
          value={name}
          placeholder={l('enterName')}
          size={limits.NICK_MAX}
        />
        <Keyboard
          write={true}
          keyEvent={keyboardWrite}
        />
      </div>
      <ButtonWrap>
        <Button onClick={create} disabled={name.length < limits.NICK_MIN}>
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
