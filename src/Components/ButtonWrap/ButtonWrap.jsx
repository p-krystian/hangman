import styles from './ButtonWrap.module.css'

function ButtonWrap({ children }){
  return (
    <div className={ styles.buttons }>
      { children }
    </div>
  )
}
export default ButtonWrap
