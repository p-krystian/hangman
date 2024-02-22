import styles from './Points.module.css'
import GameContext from '../../Contexts/GameContext'
import NumberSlider from '../NumberSlider/NumberSlider'
import { useContext } from 'react'

function Points(){
  const gameContext = useContext(GameContext)

  return (
    <div className={ styles.points }>{
      gameContext.nicks.filter(n => n).map((nick, i) => (
        <div className={ styles.point }  key={ `player-${i}` }>
          <span>{ nick }:</span>
          &#160;
          <NumberSlider current={ gameContext.points[i] } old={ 0 } />
          &#47;
          <NumberSlider current={ gameContext.rounds[i] } old={ 0 } />
        </div>
      ))
    }</div>
  )
}

export default Points
