import styles from './Center.module.css'

function Center({ children }){
  return (
    <div className={ styles.center }>
      { children }
    </div>
  )
}
export default Center
