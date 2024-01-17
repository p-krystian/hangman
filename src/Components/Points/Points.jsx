import styles from './Points.module.css'
import GameContext from '../../Contexts/GameContext'
import { useContext } from 'react'

function Points(){
  const gameContext = useContext(GameContext)

  return (
    <div className={ styles.points }>{
      gameContext.nicks.filter(n => n).map((nick, i) => (
        <div key={ `player-${i}` }>
          {nick}: {gameContext.points[i]}/{gameContext.rounds[i]}
        </div>
      ))
    }</div>
  )
}

export default Points
