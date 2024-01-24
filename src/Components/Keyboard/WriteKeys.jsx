import Key from '../Key/Key'
import styles from './WriteKeys.module.css'

function WriteKeys({ keyEvent, refs }){
  return(
    <div className={ styles.keys }>
      <Key onClick={ keyEvent } wide={ true } refer={ refs['^32'] }>^32</Key>
      <Key onClick={ keyEvent } wide={ true } refer={ refs['^8'] }>^8</Key>
    </div>
  )
}
export default WriteKeys
