import Button from '../../Components/Button/Button.jsx'
import styles from './Start.module.css'

function MenuStart(){
  function exit(){
    window.close()
    location.href = import.meta.env.VITE_EXIT_URL
  }
  return (
    <div className = {styles.buttons}>
      <Button link='/single'>Solo</Button>
      <Button link='/local'>Lokalnie</Button>
      <Button link='/multi'>Online</Button>
      <Button onClick={ exit }>Wyjdź</Button>
    </div>
  )
}
export default MenuStart
