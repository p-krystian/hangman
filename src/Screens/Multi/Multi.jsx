import styles from './Multi.module.css'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
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
        <ButtonWrap>
          <Button link='/'>Anuluj</Button>
          <Button link='/new-game'>Utwórz</Button>
        </ButtonWrap>
      </div>
    </HeaderWrap>
  )
}

export default MultiPlayer
