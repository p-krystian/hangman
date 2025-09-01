import deadImg from '@/Assets/Animation/dead.svg';
import liveImg from '@/Assets/Animation/live.svg';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Category from '@/Components/Category/Category';
import Points from '@/Components/Points/Points';
import GameContext from '@/Contexts/GameContext';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useLanguage from '@/Hooks/useLang';
import usePlayer from '@/Hooks/usePlayer';
import { useContext, useEffect } from 'react';
import { useLocation } from 'wouter';
import styles from './EndGame.module.css';

type EndGameProps = {
  next: () => void;
  pointsID?: string;
}

function EndGame({ next, pointsID }: EndGameProps) {
  const { l } = useLanguage();
  const playSound = usePlayer();
  const gameContext = useContext(GameContext);
  const [, navigate] = useLocation();
  const result = {
    img: gameContext.win ? liveImg : deadImg,
    class: gameContext.win ? styles.win : styles.lose,
    audio: gameContext.win ? 'alive' : 'dead',
    phrase: gameContext.phrase || '?',
    name: gameContext.win ? l('win') : l('lose'),
  };

  useKeyboardControl(
    () => navigate('/'),
    next
  );
  useEffect(() => {
    // TODO: Add sound for alive
    if (result.audio === 'dead') {
      playSound(result.audio);
    }
  }, [playSound, result.audio]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.result}>
          <img src={result.img} alt={result.name} />
        </div>
        <Category entry={result.phrase} short />
        <span className={`${styles.phrase} ${result.class}`}>
          {result.phrase}
        </span>
        <Points key={pointsID || 'r-1-1'} />
      </div>
      <ButtonWrap>
        <Button onClick={next} disabled={!next}>{l('next')}</Button>
        <Button link="/">{l('menu')}</Button>
      </ButtonWrap>
    </div>
  );
}

export default EndGame;
