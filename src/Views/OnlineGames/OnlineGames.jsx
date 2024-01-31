import styles from './OnlineGames.module.css'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import Lobby from '../../Components/Lobby/Lobby'

function Games({ gameList, onCreate, onJoin }){
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.games }>{
        gameList.length < 1 ? (
          <span className={ styles.info }>
            Brak dostępnych gier
          </span>
        ) : (
          gameList.map(g => (
            <Lobby
              key={ g.id }
              name={ g.name }
              submit={ () => onJoin(g.id) }
            />
          ))
        )
      }</div>
      <ButtonWrap>
        <Button link='/'>Menu</Button>
        <Button onClick={ onCreate }>Utwórz</Button>
      </ButtonWrap>
    </div>
  )
}
export default Games
