import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import Points from '../../Components/Points/Points'
import Category from '../../Components/Category/Category'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import GameContext from '../../Contexts/GameContext'
import styles from './EndGame.module.css'
import deadImg from '../../Assets/Animation/dead.svg'
import liveImg from '../../Assets/Animation/live.svg'
import useLanguage from '../../Hooks/useLanguage'
import useKeyboardControl from '../../Hooks/useKeyboardControl'
import usePlaySound from '../../Hooks/usePlaySound'

function EndGame({ next, pointsID }){
  const [l] = useLanguage()
  const playSound = usePlaySound()
  const gameContext = useContext(GameContext)
  const navigate = useNavigate()
  const result = {
    img: gameContext.win ? liveImg : deadImg,
    class: gameContext.win ? styles.win : styles.lose,
    audio: gameContext.win ? 'alive' : 'dead',
    entry: gameContext.entry || '?',
    name:  gameContext.win ? l('win') : l('lose'),
  }

  useEffect(() => useKeyboardControl(
    () => navigate('/'),
    next
  ), [next])

  useEffect(() => playSound(
    result.audio
  ), [playSound, result.audio])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <div className={ styles.result }>
          <img src={ result.img } alt={ result.name } />
        </div>
        <Category entry={ result.entry } short />
        <span className={ `${styles.entry} ${result.class}` }>
          { result.entry }
        </span>
        <Points key={ pointsID || 'r-1-1' } />
      </div>
      <ButtonWrap>
        <Button onClick={ next } disabled={ !next }>{ l('next') }</Button>
        <Button link="/">{ l('menu') }</Button>
      </ButtonWrap>
    </div>
  )
}



export default EndGame
