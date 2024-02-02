import styles from './Waiting.module.css'
import head from '../../Assets/Animation/head.svg'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'

function Waiting({ abort }){

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <span>Oczekiwanie na przeciwnika</span>
        <img src={ head } alt='X' className={ styles.animation } />
      </div>
      <ButtonWrap>
        {abort && <Button onClick={ abort }>Anuluj</Button>}
      </ButtonWrap>
    </div>
  )
}
export default Waiting
