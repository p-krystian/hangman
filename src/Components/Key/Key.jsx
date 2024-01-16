import styles from './Key.module.css'

function Key(props){
  const { onClick, children, wide, id } = props

  return (
    <div
      className={ `${styles.key} ${wide ? styles.wide : ''}` }
      onClick={ e => onClick(children, e.target) }
      id={ id ? id : '' }
    >
      { children }
    </div>
  )
}
export default Key
