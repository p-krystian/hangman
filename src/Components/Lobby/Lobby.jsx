import styles from './Lobby.module.css'
import Button from '../Button/Button'
import useLanguage from '../../Hooks/useLanguage'

function Lobby({ name, submit }){
  const [l] = useLanguage()

  return (
    <div className={ styles.lobby }>
      <span>{name}</span>
      <Button small={ true } onClick={ submit }>
        { l('join') }
      </Button>
    </div>
  )
}
export default Lobby
