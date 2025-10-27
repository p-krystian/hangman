import { useContext } from 'react';
import NumberSlider from '@/Components/NumberSlider/NumberSlider';
import GameContext from '@/Contexts/GameContext';
import styles from './Points.module.css';

function Points() {
  const gameContext = useContext(GameContext);

  return (
    <div className={styles.points}>
      {gameContext.nicks
        .filter(n => n)
        .map((nick, i) => (
          <div className={styles.point} key={`player-${i}-${nick}`}>
            <span>{`${nick}:`}</span>
            &nbsp;
            <NumberSlider
              current={gameContext.points[i] || 0}
              prev={gameContext.prevPoints[i] || 0}
            />
            {'/'}
            <NumberSlider
              current={gameContext.rounds[i] || 0}
              prev={gameContext.prevRounds[i] || 0}
            />
          </div>
        ))}
    </div>
  );
}
export default Points;
