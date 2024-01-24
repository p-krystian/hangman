import styles from './Key.module.css'

function Key({ onClick, children, wide, refer }){
  return (
    <div
      className={ `${styles.key} ${wide ? styles.wide : ''}` }
      onClick={ () => onClick(children) }
      ref={ refer }
    >
      { children }
    </div>
  )
}
export default Key
