import Entry from '../../Components/Entry/Entry'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import WithCaret from '../../Components/WithCaret/WithCaret'
import GameContext from '../../Contexts/GameContext'
import styles from './WriteEntry.module.css'
import words from '../../Assets/words.json'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import { useState, useContext, useCallback } from 'react'

function WriteEntry({ back, backText, next, nick }){
  const [entry, setEntry] = useState('')
  const gameContext = useContext(GameContext)
  const keyboardWrite = useKeyboardWrite(setEntry, 20)

  const updateContext = useCallback(() => {
    if (entry.length < 3) return
    gameContext.entry = entry.trim()
    next()
  }, [entry, next])

  const writeRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random()*words.length)
    const randomWord = words.at(randomIndex)
    setEntry(randomWord.toUpperCase())
  }, [])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <span className={ styles.text }>
          Hasło dla { nick || '' }:
        </span>
        <Entry>
          <WithCaret size={ 20 }>{ entry }</WithCaret>
        </Entry>
        <Keyboard keyEvent={ keyboardWrite } write={ true } />
      </div>
      <ButtonWrap>
        <Button onClick={ back }>{ backText || 'Wstecz' }</Button>
        <Button onClick={ updateContext } disabled={ entry.length < 3 }>
          Dalej
        </Button>
        <Button onClick={ writeRandom }>Losuj</Button>
      </ButtonWrap>
    </div>
  )
}
export default WriteEntry
