import Button from '../../Components/Button/Button.jsx'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap.jsx'
import GameContext from '../../Contexts/GameContext'
import { useContext, useEffect } from 'react'
import styles from './Start.module.css'

function MenuStart(){
  const gameContext = useContext(GameContext)

  useEffect(() => {
    gameContext.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HeaderWrap>
      <div className = {styles.buttons}>
        <Button link='/single'>Solo</Button>
        <Button link='/local'>Lokalnie</Button>
        <Button link='/multi'>Online</Button>
        <Button>Wyjdź</Button>
      </div>
    </HeaderWrap>
  )
}
export default MenuStart
