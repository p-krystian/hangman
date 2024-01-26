import styles from './Confirm.module.css'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

function Confirm({ onConfirm, onReject, children }){
  const popupContainer = document.getElementById('popup')

  useEffect(() => {
    popupContainer.classList.add('active')
    return () => popupContainer.classList.remove('active')
  }, [])

  return createPortal(
    <div className={ styles.confirm }>
      <span>{ children }</span>
      <div className={ styles.buttons }>
        <button onClick={ onReject }>Nie</button>
        <button onClick={ onConfirm }>Tak</button>
      </div>
    </div>,
    popupContainer
  )
}
export default Confirm
