import styles from './Multi.module.css'
import Button from '../../Components/Button/Button'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap'

function MultiPlayer(){
  return (
    <HeaderWrap>
      <div className={ styles.wrapper }>
        <div className={ styles.games }>
          <span className={ styles.info }>
            Brak dostępnych gier
          </span>
        </div>
        <div className={ styles.buttons }>
          <Button link='/'>Anuluj</Button>
          <Button link='/new-game'>Utwórz</Button>
        </div>
      </div>
    </HeaderWrap>
  )
}

export default MultiPlayer
