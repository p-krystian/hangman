import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import Points from '../../Components/Points/Points'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GameContext from '../../Contexts/GameContext'
import styles from './EndGame.module.css'
import deadImg from '../../Assets/Animation/dead.svg'
import liveImg from '../../Assets/Animation/live.svg'
import useKeyboardControl from '../../Hooks/useKeyboardControl'

function EndGame({ next }){
  const gameContext = useContext(GameContext)
  const navigate = useNavigate()
  const resoult = {
    img: gameContext.win ? liveImg : deadImg,
    class: gameContext.win ? styles.win : styles.lose,
    entry: gameContext.entry || '?'
  }

  useEffect(() => useKeyboardControl(
    () => navigate('/'),
    next
  ), [next])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <div className={ styles.resoult }>
          <img src={ resoult.img } />
        </div>
        <span className={ `${styles.entry} ${resoult.class}` }>
          { resoult.entry }
        </span>
        <Points />
      </div>

      <ButtonWrap>
        <Button link="/">Menu</Button>
        <Button onClick={ next }>Dalej</Button>
      </ButtonWrap>
    </div>
  )
}



export default EndGame
