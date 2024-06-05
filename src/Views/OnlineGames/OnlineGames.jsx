import styles from './OnlineGames.module.css'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import Lobby from '../../Components/Lobby/Lobby'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useKeyboardControl from '../../Hooks/useKeyboardControl'
import useLanguage from '../../Hooks/useLanguage'

function Games({ gameList, onCreate, onJoin }){
  const navigate = useNavigate()
  const [l] = useLanguage()

  useEffect(() => useKeyboardControl(
    () => navigate('/'),
    () => gameList.length < 6 && onCreate()
  ), [])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.games }>{
        gameList.length < 1 ? (
          <span className={ styles.info }>
            { l('noGames') }
          </span>
        ) : (
          gameList.slice(0, 6).map(g => (
            <Lobby
              key={ g.id }
              name={ g.name }
              submit={ () => onJoin(g.id) }
            />
          ))
        )
      }</div>
      <ButtonWrap>
        <Button onClick={ onCreate } disabled={ gameList.length >= 6 }>
          { l('create') }
        </Button>
        <Button link='/'>{ l('menu') }</Button>
      </ButtonWrap>
    </div>
  )
}
export default Games
