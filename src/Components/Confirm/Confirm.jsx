import styles from './Confirm.module.css'
import Button from '../Button/Button'
import useLanguage from '../../Hooks/useLanguage'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

function Confirm({ confirm, reject, long, children }){
  const [l] = useLanguage()
  const popupContainer = document.getElementById('popup')
  const confirmText = reject ? l('yes') : l('ok')

  useEffect(() => {
    popupContainer.classList.add('active')
    return () => popupContainer.classList.remove('active')
  }, [])

  return createPortal(
    <div className={ `${styles.confirm} ${long ? styles.long : ''}` }>
      <span>{ children }</span>
      <div className={ styles.buttons }>
        { reject && <Button small={true} onClick={ reject }>{ l('no') }</Button> }
        <Button small={true} onClick={ confirm }>{ confirmText }</Button>
      </div>
    </div>,
    popupContainer
  )
}
export default Confirm
