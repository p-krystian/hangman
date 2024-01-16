import { Link } from 'react-router-dom'
import styles from './Button.module.css'

function Button(props){
  const {
    link,
    onClick,
    children,
    disabled
  } = props

  return(
    link ? (
      <Link
        to={ disabled ? '' : link }
        onClick={ onClick }
        className={ styles.button }
      >
        { children }
      </Link>
    ) : (
      <button onClick={ onClick } className={ styles.button }>
        { children }
      </button>
    )
  )
}
export default Button
