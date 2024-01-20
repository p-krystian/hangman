import Button from '../../Components/Button/Button.jsx'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap.jsx'
import styles from './Start.module.css'

function MenuStart(){
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
