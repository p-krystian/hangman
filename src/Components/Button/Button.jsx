import { Link } from 'react-router-dom'
import styles from './Button.module.css'

function Button(props){
  const {
    link,
    onClick,
    children,
    disabled,
    small
  } = props

  return(
    link ? (
      <Link
        to={ disabled ? '' : link }
        disabled={ disabled }
        onClick={ disabled ? () => 'disabled' : onClick }
        className={ `${styles.button} ${small ? styles.small : ''}` }
      >
        { children }
      </Link>
    ) : (
      <button
        disabled={ disabled }
        onClick={ disabled ? () => 'disabled' : onClick }
        className={ `${styles.button} ${small ? styles.small : ''}` }
      >
        { children }
      </button>
    )
  )
}
export default Button
