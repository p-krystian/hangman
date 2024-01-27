import styles from './OnlineGames.module.css'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'

function Games({ onCreate }){
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.games }>
        <span className={ styles.info }>
          Brak dostępnych gier
        </span>
      </div>
      <ButtonWrap>
        <Button link='/'>Menu</Button>
        <Button onClick={ onCreate }>Utwórz</Button>
      </ButtonWrap>
    </div>
  )
}
export default Games
