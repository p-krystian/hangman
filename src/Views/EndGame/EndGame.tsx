import deadImg from '@/Assets/Animation/dead.svg';
import liveImg from '@/Assets/Animation/live.svg';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import PhraseCategory from '@/Components/PhraseCategory/PhraseCategory';
import Points from '@/Components/Points/Points';
import GameContext from '@/Contexts/GameContext';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useLanguage from '@/Hooks/useLang';
import usePlayer from '@/Hooks/usePlayer';
import { useContext, useEffect } from 'react';
import { useLocation } from 'wouter';
import styles from './EndGame.module.css';

type EndGameProps = {
  goNext: () => void;
}

function EndGame({ goNext }: EndGameProps) {
  const { l } = useLanguage();
  const playSound = usePlayer();
  const gameContext = useContext(GameContext);
  const [, navigate] = useLocation();
  const result = {
    img: gameContext.win ? liveImg : deadImg,
    class: gameContext.win ? styles.win : styles.lose,
    audio: gameContext.win ? 'good' : 'dead',
    phrase: gameContext.phrase || '?',
    name: gameContext.win ? l('win') : l('lose'),
  } as const;

  useKeyboardControl(
    () => navigate('/'),
    goNext
  );
  useEffect(() => {
    playSound(result.audio);
  }, [playSound, result.audio]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.result}>
          <img src={result.img} alt={result.name} />
        </div>
        <PhraseCategory phrase={result.phrase} short />
        <span className={`${styles.phrase} ${result.class}`}>
          {result.phrase}
        </span>
        <Points />
      </div>
      <ButtonWrap>
        <Button onClick={goNext} disabled={!goNext}>{l('next')}</Button>
        <Button link="/">{l('menu')}</Button>
      </ButtonWrap>
    </div>
  );
}

export default EndGame;
