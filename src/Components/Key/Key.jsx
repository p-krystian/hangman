import styles from './Key.module.css'
import './Key.css'

function Key({ onClick, children, char, wide }){
  return (
    <button
      className={ `${styles.key} ${wide ? styles.wide : ''}` }
      onClick={ onClick }
      data-char={ char }
    >
      { children }
    </button>
  )
}
export default Key
