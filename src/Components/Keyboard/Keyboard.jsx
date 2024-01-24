import styles from './Keyboard.module.css'
import Key from '../Key/Key'
import WriteKeys from './WriteKeys'
import { useEffect, useRef, useMemo, useCallback } from 'react'

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
  const allRefers = useMemo(() => (
    write ? {...refs, ...wRefs} : refs
  ), [write])

  const clickEvent = useCallback(char => (
    keyEvent(char, allRefers[char].current)
  ), [allRefers, keyEvent])

  useEffect(() => {
    function translate(e){
      e.preventDefault()

      let k = e.key.toUpperCase()

      if ([32, 8].includes(e.keyCode))
        k = `^${e.keyCode}`

      if (Object.keys(allRefers).includes(k))
        keyEvent(k, allRefers[k].current)
    }
    window.addEventListener('keydown', translate)
    return () => window.removeEventListener('keydown', translate)
  }, [keyEvent, write])

  return (
    <div className={ styles.keyboard }>
      <div className={ styles.keys }>
        { alphabet.map(char => (
          <Key key={ `k-${char}` } onClick={ clickEvent } refer={ refs[char] }>
            { char }
          </Key>
        )) }
      </div>
      { write && <WriteKeys keyEvent={ clickEvent } refs={ wRefs } /> }
    </div>
  )
}
export default Keyboard
