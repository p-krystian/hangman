import styles from './Points.module.css';
import GameContext from '@/Contexts/GameContext';
import NumberSlider from '@/Components/NumberSlider/NumberSlider';
import { useContext } from 'react';

function Points(){
  const gameContext = useContext(GameContext);

  return (
    <div className={ styles.points }>{
      gameContext.nicks.filter(n => n).map((nick, i) => (
        <div className={ styles.point }  key={ `player-${i}` }>
          <span>{ nick }:</span>
          &#160;
          <NumberSlider
            current={ gameContext.points[i] || 0 }
            old={ gameContext.prevPoints[i] || 0 }
          />
          &#47;
          <NumberSlider
            current={ gameContext.rounds[i] || 0 }
            old={ gameContext.prevRounds[i] || 0 }
          />
        </div>
      ))
    }</div>
  );
}
export default Points;
