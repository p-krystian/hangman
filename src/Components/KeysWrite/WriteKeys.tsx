import Key from '../Key/Key'
import useLanguage from '../../Hooks/useLanguage'
import styles from './WriteKeys.module.css'

interface WriteKeysProps{
  keyEvent: (e:React.MouseEvent, char:string) => void
}

function WriteKeys({ keyEvent }:WriteKeysProps){
  const [l] = useLanguage()

  return(
    <div className={ styles.keys }>
      <Key onClick={ e => keyEvent(e, '^32') } wide={ true } char={ '^32' }>
        <svg viewBox="0 0 64 32">
          <title>{ l('spaceWord') }</title>
          <path
            fill="currentColor"
            d="M 2,8 V 20.568359 C 2,22.432294 3.4693589,24 5.2167969,24 H 58.783203 C 60.530641,24 62,22.432295 62,20.568359 V 8 H 58 V 19.732422 H 6 V 8 Z"
          />
        </svg>
      </Key>
      <Key onClick={ e => keyEvent(e, '^8') } wide={ true } char={ '^8' }>
        <svg viewBox="0 0 64 32">
          <title>{ l('backspaceWord') }</title>
          <path
            fill="currentColor"
            d="M 17.03125 1 C 16.23749 0.99999996 15.44419 1.2953474 14.853516 1.8847656 L 2.8867188 13.826172 C 1.7053699 15.005008 1.7053699 16.994992 2.8867188 18.173828 L 14.853516 30.115234 C 16.034863 31.29407 18.029589 31.29407 19.210938 30.115234 L 20 29.328125 L 17.03125 26.365234 L 8.6484375 18 L 62 18 L 62 14 L 8.6484375 14 L 17.03125 5.6347656 L 20 2.671875 L 19.210938 1.8847656 C 18.620263 1.2953477 17.82501 1 17.03125 1 z "
          />
        </svg>
      </Key>
    </div>
  )
}
export default WriteKeys
