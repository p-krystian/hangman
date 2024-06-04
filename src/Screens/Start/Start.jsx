import Button from '../../Components/Button/Button'
import Volume from '../../Components/Volume/Volume'
import Confirm from '../../Components/Confirm/Confirm'
import Center from '../../Components/Center/Center'
import InfoSymbol from '../../Components/InfoSymbol/InfoSymbol'
import styles from './Start.module.css'
import { useRef, useState } from 'react'

function MenuStart(){
  const volumeRef = useRef()
  const [showInfo, setShowInfo] = useState(false)

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
      </div>
      <Button link='/single'>Solo</Button>
      <Button link='/local'>Lokalnie</Button>
      <Button link='/multi'>Online</Button>
      <Button onClick={ exit }>Wyjdź</Button>

      { showInfo && <Confirm confirm={ () => setShowInfo(false) } long>
        Gra w Wisielca napisana z użyciem React-a oraz Vite.<br/>
        Umożliwia grę samemu lub w dwie osoby, na jednym urządzeniu lub online.<br/>
        Autorem wszystkich użytych grafik jest autor gry.<br/>
        <br/>
        <Center>by Krystian Piątek</Center>
      </Confirm> }
    </div>
  )
}
export default MenuStart
