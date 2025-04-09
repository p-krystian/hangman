import styles from './Keyboard.module.css'
import Key from '../Key/Key'
import WriteKeys from '../KeysWrite/WriteKeys'
import useLanguage from '../../Hooks/useLanguage'
import { useEffect, useRef, useCallback, useMemo } from 'react'

function Keyboard({ keyEvent, write }){
  const [l] = useLanguage()
  const keyboardRef = useRef(null)

  const alphabet = useMemo(
    () => l('alphabet').split(''),
    [l]
  )

  const clickEvent = useCallback((e, char) => (
    keyEvent(char, e.target)
  ), [keyEvent])

  useEffect(() => {
    function translate(e){
      e.preventDefault()

      let k = e.key.toUpperCase()

      if ([32, 8].includes(e.keyCode))
        k = `^${e.keyCode}`

      if (['^8', '^32', ...alphabet].includes(k))
        keyEvent(k, keyboardRef.current.querySelector(`[data-char="${k}"]`))
    }
    window.addEventListener('keydown', translate)
    return () => window.removeEventListener('keydown', translate)
  }, [keyEvent, alphabet])

  return (
    <div className={ styles.keyboard } ref={ keyboardRef }>
      <div className={ styles.keys }>
        { alphabet.map(char => (
          <Key key={ `k-${char}` } onClick={ e => clickEvent(e, char) } char={ char }>
            { char }
          </Key>
        )) }
      </div>
      { write && <WriteKeys keyEvent={ clickEvent } /> }
    </div>
  )
}
export default Keyboard
