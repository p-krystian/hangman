import styles from './Key.module.css'
import { forwardRef } from 'react'

function Key({ onClick, children, wide }, ref){
  return (
    <div
      className={ `${styles.key} ${wide ? styles.wide : ''}` }
      onClick={ () => onClick(children) }
      ref={ ref }
    >
      { children }
    </div>
  )
}
export default forwardRef(Key)
