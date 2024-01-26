import Button from '../../Components/Button/Button.jsx'
import styles from './Start.module.css'

function MenuStart(){
  return (
    <div className = {styles.buttons}>
      <Button link='/single'>Solo</Button>
      <Button link='/local'>Lokalnie</Button>
      <Button link='/multi'>Online</Button>
      <Button>Wyjdź</Button>
    </div>
  )
}
export default MenuStart
