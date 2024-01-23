import styles from './Keyboard.module.css'
import Key from '../Key/Key'
import { useEffect, useRef } from 'react'

function Keyboard({ keyEvent, write }){
  const alphabet = [
    'A','Ą','B','C','Ć','D','E',
    'Ę','F','G','H','I','J','K',
    'L','Ł','M','N','Ń','O','Ó',
    'P','Q','R','S','Ś','T','U',
    'V','W','X','Y','Z','Ź','Ż'
  ]

  const refs = alphabet.reduce((accumulator, value) => {
    return {...accumulator, [value]: useRef()}
  }, {})

  const wRefs = {
    '^32': useRef(),
    '^8': useRef()
  }

  const writeKeys = (
    <div className={ styles.write }>
      <Key onClick={ keyEvent } wide={ true } refer={ wRefs['^32'] }>^32</Key>
      <Key onClick={ keyEvent } wide={ true } refer={ wRefs['^8'] }>^8</Key>
    </div>
  )

  useEffect(() => {
    function translate(e){
      e.preventDefault()

      const refers = write ? {...refs, ...wRefs} : refs
      let k = e.key.toUpperCase()

      if ([32, 8].includes(e.keyCode))
        k = `^${e.keyCode}`

      if (Object.keys(refers).includes(k))
        keyEvent(k, refers[k].current)
    }
    window.addEventListener('keydown', translate)
    return () => window.removeEventListener('keydown', translate)
  }, [keyEvent, write])

  return (
    <div className={ styles.keyboard }>
      <div className={ styles.keys }>
        { alphabet.map(char => (
          <Key key={ `k-${char}` } onClick={ keyEvent } refer={ refs[char] }>
            { char }
          </Key>
        )) }
      </div>
      { write && writeKeys }
    </div>
  )
}
export default Keyboard
