import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap'
import Points from '../../Components/Points/Points'
import { useContext, useEffect } from 'react'
import GameContext from '../../Contexts/GameContext'
import styles from './EndGame.module.css'
import deadImg from '../../Assets/Animation/dead.svg'
import liveImg from '../../Assets/Animation/live.svg'

function EndGame({ children, enter }){
  const gameContext = useContext(GameContext)
  const resoult = {
    img: gameContext.win ? liveImg : deadImg,
    class: gameContext.win ? styles.win : styles.lose,
    entry: gameContext.entry || '?'
  }

  useEffect(() => {
    function onEnter(e){
      if (e.keyCode === 13)
        enter && enter()
    }
    window.addEventListener('keyup', onEnter)
    return () => window.removeEventListener('keyup', onEnter)
  }, [enter])

  return (
    <HeaderWrap>
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
          { children }
        </ButtonWrap>
      </div>
    </HeaderWrap>
  )
}



export default EndGame
