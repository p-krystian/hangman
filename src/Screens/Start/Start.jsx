import Button from '../../Components/Button/Button'
import Volume from '../../Components/Volume/Volume'
import styles from './Start.module.css'
import { useRef } from 'react'

function MenuStart(){
  const volumeRef = useRef()

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
      </div>
      <Button link='/single'>Solo</Button>
      <Button link='/local'>Lokalnie</Button>
      <Button link='/multi'>Online</Button>
      <Button onClick={ exit }>Wyjdź</Button>
    </div>
  )
}
export default MenuStart
