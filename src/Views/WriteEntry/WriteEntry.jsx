import Entry from '../../Components/Entry/Entry'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap'
import GameContext from '../../Contexts/GameContext'
import styles from './WriteEntry.module.css'
import words from '../../Assets/words.json'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import { useState, useContext, useCallback } from 'react'

function WriteEntry({ back, next, nick }){
  const [entry, setEntry] = useState('')
  const gameContext = useContext(GameContext)
  const prompt = <span className={ styles.prompt }>_</span>
  const keyboardWrite = useKeyboardWrite(setEntry, 20)

  const updateContext = useCallback(() => {
    if (entry.length < 3) return
    gameContext.entry = entry.trim()
    next()
  }, [entry, next])

  const writeRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random()*words.length)
    const randomWord = words.at(randomIndex)
    setEntry(randomWord)
  }, [])

<<<<<<< HEAD
=======
  function modifyText(char){
    new Audio(clickSound).play().catch(() => {})
    switch (char){
      case '^8':
        setEntry(e => e.substring(0, e.length - 1))
        return
      case '^32':
        char = ' '
        /* falls through */
      default:
        setEntry(
          e => {
            if (e[e.length -1] === ' ' && char === ' ') return e
            return e.concat(char.toUpperCase()).substring(0, 20)
          }
        )
    }
  }

  useEffect(() => {
    function onEnter(e){
      if (entry.length < 3 || e.keyCode !== 13) return
      updateContext()
    }
    window.addEventListener('keyup', onEnter)
    return () => window.removeEventListener('keyup', onEnter)
  }, [entry, updateContext, next])

>>>>>>> 6ee92d1df80db8cf5eda62625b9f62e7bec37008
  return (
    <HeaderWrap>
      <div className={ styles.wrapper }>
        <div className={ styles.container }>
          <span className={ styles.text }>
            Hasło dla { nick || '' }:
          </span>
          <Entry>{ entry }{ entry.length < 20 && prompt }</Entry>
          <Keyboard keyEvent={ keyboardWrite } write={ true } />
        </div>
        <ButtonWrap>
          <Button onClick={ back }>Wstecz</Button>
          <Button onClick={ updateContext } disabled={ entry.length < 3 }>
            Dalej
          </Button>
          <Button onClick={ writeRandom }>Losuj</Button>
        </ButtonWrap>
      </div>
    </HeaderWrap>
  )
}
export default WriteEntry
