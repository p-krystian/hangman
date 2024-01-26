import styles from './Multi.module.css'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'

function MultiPlayer(){
  return (
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
  )
}

export default MultiPlayer
