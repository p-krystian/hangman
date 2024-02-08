import styles from './Key.module.css'
import './Key.css'
import { forwardRef } from 'react'

function Key({ onClick, children, wide }, ref){
  return (
    <button
      className={ `${styles.key} ${wide ? styles.wide : ''}` }
      onClick={ () => onClick(children) }
      ref={ ref }
    >
      { children }
    </button>
  )
}
export default forwardRef(Key)
