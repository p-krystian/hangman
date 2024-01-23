import styles from './Key.module.css'

function Key({ onClick, children, wide, refer }){
  return (
    <div
      className={ `${styles.key} ${wide ? styles.wide : ''}` }
      onClick={ e => onClick(children, e.target) }
      ref={ refer }
    >
      { children }
    </div>
  )
}
export default Key
