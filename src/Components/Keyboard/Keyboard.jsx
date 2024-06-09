import styles from './Keyboard.module.css'
import Key from '../Key/Key'
import WriteKeys from './WriteKeys'
import useLanguage from '../../Hooks/useLanguage'
import { useEffect, useRef, useMemo, useCallback } from 'react'

function Keyboard({ keyEvent, write }){
  const [l] = useLanguage()
  const alphabet = l('alphabet').split('')

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
          <Key key={ `k-${char}` } onClick={ clickEvent } ref={ refs[char] }>
            { char }
          </Key>
        )) }
      </div>
      { write && <WriteKeys keyEvent={ clickEvent } refs={ wRefs } /> }
    </div>
  )
}
export default Keyboard
