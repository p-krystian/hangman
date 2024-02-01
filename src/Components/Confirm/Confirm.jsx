import styles from './Confirm.module.css'
import Button from '../Button/Button'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

function Confirm({ confirm, reject, children }){
  const popupContainer = document.getElementById('popup')
  const confirmText = reject ? 'Tak' : 'Ok'

  useEffect(() => {
    popupContainer.classList.add('active')
    return () => popupContainer.classList.remove('active')
  }, [])

  return createPortal(
    <div className={ styles.confirm }>
      <span>{ children }</span>
      <div className={ styles.buttons }>
        { reject && <Button small={true} onClick={ reject }>Nie</Button> }
        <Button small={true} onClick={ confirm }>{ confirmText }</Button>
      </div>
    </div>,
    popupContainer
  )
}
export default Confirm
