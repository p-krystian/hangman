import Button from '../../Components/Button/Button'
import useLanguage from '../../Hooks/useLanguage'
import Volume from '../../Components/Volume/Volume'
import Confirm from '../../Components/Confirm/Confirm'
import Center from '../../Components/Center/Center'
import InfoSymbol from '../../Components/InfoSymbol/InfoSymbol'
import styles from './Start.module.css'
import { useRef, useState } from 'react'

function MenuStart(){
  const volumeRef = useRef()
  const [showInfo, setShowInfo] = useState(false)
  const [l, _, setLanguage] = useLanguage()

  function exit(){
    window.close()
    location.href = import.meta.env.VITE_EXIT_URL
  }

  return (
    <div className={ styles.buttons }>
      <div className={ styles.small }>
        <Button onClick={ () => volumeRef.current.click() } small>
          <Volume ref={ volumeRef } />
        </Button>
        <Button onClick={ () => setShowInfo(true) } small>
          <InfoSymbol />
        </Button>
        <Button onClick={ () => setLanguage(l('lang') === 'PL' ? 'en' : 'pl') } small>
          { l('lang') }
        </Button>
      </div>
      <Button link='/single'>{ l('single') }</Button>
      <Button link='/local'>{ l('local') }</Button>
      <Button link='/multi'>{ l('online') }</Button>
      <Button onClick={ exit }>{ l('exit') }</Button>

      { showInfo && <Confirm confirm={ () => setShowInfo(false) } long>
        { l('info') }
        <br/><br/>
        <Center>{ l('signature') }</Center>
      </Confirm> }
    </div>
  )
}
export default MenuStart
