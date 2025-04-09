import styles from './Key.module.css'
import './Key.css'

interface KeyProps {
  onClick: () => void
  children: React.ReactNode
  char: string
  wide?: boolean
}

function Key({ onClick, children, char, wide }: KeyProps){
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
