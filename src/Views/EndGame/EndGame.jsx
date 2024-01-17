import Button from '../../Components/Button/Button'
import Points from '../../Components/Points/Points'
import { useContext, useEffect } from 'react'
import GameContext from '../../Contexts/GameContext'
import styles from './EndGame.module.css'
import deadImg from '../../Assets/Animation/dead.svg'
import liveImg from '../../Assets/Animation/live.svg'
import deadSound from '../../Assets/Sounds/dead1.mp3'

function EndGame({ children, enter }){
  const gameContext = useContext(GameContext)
  const resoult = {
    win: gameContext.entry?.includes('win'),
    img: gameContext.entry?.includes('win') ? liveImg : deadImg,
    class: gameContext.entry?.includes('win') ? styles.win : styles.lose,
    entry: gameContext.entry?.replace('win', '').replace('lose', '') || '?'
  }

  useEffect(() => {
    function onEnter(e){
      if (e.keyCode === 13)
        enter && enter()
    }
    if (!resoult.win)
      new Audio(deadSound).play().catch(() => {})
    window.addEventListener('keyup', onEnter)
    return () => window.removeEventListener('keyup', onEnter)
  }, [enter])

  return (
    <>
      <Points />
      <div className={ styles.container }>
        <div className={ styles.resoult }>
          <img src={ resoult.img } />
        </div>
        <span className={ `${styles.entry} ${resoult.class}` }>
          { resoult.entry }
        </span>
      </div>
      <div className={ styles.buttons }>
        <Button link="/">Menu</Button>
        { children }
      </div>
    </>
  )
}



export default EndGame
