import styles from './Confirm.module.css'
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
        { reject && <button onClick={ reject }>Nie</button> }
        <button onClick={ confirm }>{ confirmText }</button>
      </div>
    </div>,
    popupContainer
  )
}
export default Confirm
