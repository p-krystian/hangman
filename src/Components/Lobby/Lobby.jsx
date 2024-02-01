import styles from './Lobby.module.css'
import Button from '../Button/Button'

function Lobby({ name, submit }){
  return (
    <div className={ styles.lobby }>
      <span>{name}</span>
      <Button small={ true } onClick={ submit }>
        Dołącz
      </Button>
    </div>
  )
}
export default Lobby
