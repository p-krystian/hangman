import styles from './Keyboard.module.css'
import Key from '../Key/Key'
import { useEffect } from 'react'

function Keyboard({ keyEvent, write }){
  const alphabet = [
    'A','Ą','B','C','Ć','D','E',
    'Ę','F','G','H','I','J','K',
    'L','Ł','M','N','Ń','O','Ó',
    'P','Q','R','S','Ś','T','U',
    'V','W','X','Y','Z','Ź','Ż'
  ]
  const writeKeys = (
    <div className={ styles.write }>
      <Key id="k-space" onClick={ keyEvent } wide={ true }>⎵</Key>
      <Key id="k-backspace" onClick={ keyEvent } wide={ true }>←</Key>
    </div>
  )

  function onKeyPress(e){
    let char = e.key.toUpperCase()
    let key = ''
    switch (char){
      case ' ':
        key = document.querySelector('#k-space')
        keyEvent('⎵', key)
        break
      case 'BACKSPACE':
        key = document.querySelector('#k-backspace')
        keyEvent('←', key)
        break
      default:
        if (alphabet.indexOf(char) === -1)
          return
        key = document.querySelector(`#k-${char}`)
        keyEvent(char, key)
    }
    key.style.color = 'var(--darker)'
    key.style.borderColor = 'var(--darker)'
    setTimeout(() => {
      key.style.color = ''
      key.style.borderColor = ''
    }, 150)
  }
  
  useEffect(() => {
    window.addEventListener('keydown', onKeyPress)
    return () => window.removeEventListener('keydown', onKeyPress)
  }, [keyEvent])

  return (
    <div className={ styles.keyboard }>
      <div className={ styles.keys }>
        { alphabet.map(char => (
          <Key key={ `k-${char}` } id={ `k-${char}` } onClick={ keyEvent }>
            { char }
          </Key>
        )) }
      </div>
      { write ? writeKeys : '' }
    </div>
  )
}
export default Keyboard
