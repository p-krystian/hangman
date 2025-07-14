import styles from './Game.module.css';
import Entry from '@/Components/Entry/Entry';
import Board from '@/Components/Board/Board';
import Keyboard from '@/Components/Keyboard/Keyboard';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import GameContext from '@/Contexts/GameContext';
import Confirm from '@/Components/Confirm/Confirm';
import Category from '@/Components/Category/Category';
import useFullScreen from '@/Hooks/useFullScreen';
import { useState, useContext, useEffect, useLayoutEffect, useCallback } from 'react';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import usePlaySound from '@/Hooks/usePlaySound';
import useLanguage from '@/Hooks/useLanguage';

interface GameProps {
  exit?: () => void;
  onLose: () => void;
  onWin: () => void;
}

function Game({ exit, onLose, onWin }: GameProps){
  const [l] = useLanguage();
  const fullScreenManager = useFullScreen();
  const playSound = usePlaySound();
  const keyboardControl = useKeyboardControl();
  const gameContext = useContext(GameContext);
  const entry = gameContext.entry || '?';
  const [guessed, setGuessed] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [showExit, setShowExit] = useState(false);

  useLayoutEffect(() => fullScreenManager(), [fullScreenManager]);
  useEffect(() => keyboardControl(
    () => exit && setShowExit(current => !current)
  ), [keyboardControl, exit]);

  const clickKey = useCallback((char: string, key: Element) => {
    if (guessed.includes(char))
      return;

    if (entry.includes(char)){
      key.classList.add('correct');
      setGuessed(g => g.includes(char) ? g : g.concat(char));
      playSound('good');
    }
    else{
      key.classList.add('mistake');
      if (mistakes >= 9)
        return onLose();
      setMistakes(m => m + 1);
      playSound('bad');
    }
  }, [guessed, mistakes, playSound, entry, onLose]);

  return (
    <div className={ styles.container }>
      <div className={ styles.game }>
        <Board progress={ mistakes } />
        <Category entry={ entry } animation />
        <Entry
          hide={ true }
          guessed={ guessed }
          winCallback={ onWin }
        >
          { entry }
        </Entry>
        <Keyboard keyEvent={ clickKey } />
      </div>
      <ButtonWrap>
        {!!exit && <Button onClick={ () => setShowExit(true) }>
          { l('cancel') }
        </Button>}
      </ButtonWrap>
      {!!showExit && (
        <Confirm confirm={ () => exit && exit() } reject={ () => setShowExit(false) }>
          { l('endGame') }
        </Confirm>
      )}
    </div>
  );
}
export default Game;
