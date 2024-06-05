import styles from './Waiting.module.css'
import head from '../../Assets/Animation/head.svg'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import useLanguage from '../../Hooks/useLanguage'

function Waiting({ abort }){
  const [l] = useLanguage()

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <span>{ l('waitingOpponent') }</span>
        <img src={ head } alt='X' className={ styles.animation } />
      </div>
      <ButtonWrap>
        {!!abort && <Button onClick={ abort }>{ l('cancel') }</Button>}
      </ButtonWrap>
    </div>
  )
}
export default Waiting
