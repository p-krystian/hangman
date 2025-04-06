import { Link } from 'react-router'
import styles from './Button.module.css'

function Button(props){
  const {
    link,
    onClick,
    value,
    children,
    disabled,
    small
  } = props

  return(
    link ? (
      <Link
        to={ disabled ? '' : link }
        disabled={ disabled }
        value={ value }
        onClick={ disabled ? () => 'disabled' : onClick }
        className={ `${styles.button} ${small ? styles.small : ''}` }
      >
        { children }
      </Link>
    ) : (
      <button
        disabled={ disabled }
        value={ value }
        onClick={ disabled ? () => 'disabled' : onClick }
        className={ `${styles.button} ${small ? styles.small : ''}` }
      >
        { children }
      </button>
    )
  )
}
export default Button
