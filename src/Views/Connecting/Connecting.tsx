import styles from './Connecting.module.css'
import Board from '../../Components/Board/Board'
import Entry from '../../Components/Entry/Entry'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import useLanguage from '../../Hooks/useLanguage'
import { useEffect, useState } from 'react'

function Connecting(){
  const [progress, setProgress] = useState(10)
  const [l] = useLanguage()

  useEffect(() => {
    let addend = -1
    const interval = setInterval(() => {
      setProgress(current => {
        if (current <= 0)
          addend = 1
        if (current >= 10)
          addend = -1
        return current + addend
      })
    }, 350)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <Board progress={ progress } small={ true } />
        <Entry>{ `${l('connecting')}...` }</Entry>
      </div>
      <ButtonWrap>
        <Button link='/'>Anuluj</Button>
      </ButtonWrap>
    </div>
  )
}
export default Connecting
