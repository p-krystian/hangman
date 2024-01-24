import styles from './Confirm.module.css'

function Button({ onConfirm, onReject, children }){
  return(
    <div className={ styles.confirm } >
      <span>{ children }</span>
      <div className={ styles.buttons }>
        <button onClick={ onReject }>Nie</button>
        <button onClick={ onConfirm }>Tak</button>
      </div>
    </div>
  )
}
export default Button
