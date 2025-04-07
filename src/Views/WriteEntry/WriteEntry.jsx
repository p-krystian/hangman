import Entry from '../../Components/Entry/Entry'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import WithCaret from '../../Components/WithCaret/WithCaret'
import GameContext from '../../Contexts/GameContext'
import styles from './WriteEntry.module.css'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import useKeyboardControl from '../../Hooks/useKeyboardControl'
import useFullScreen from '../../Hooks/useFullScreen'
import usePlaySound from '../../Hooks/usePlaySound'
import useLanguage from '../../Hooks/useLanguage'
import random from 'random'
import { useState, useContext, useCallback, useEffect, useLayoutEffect } from 'react'

function WriteEntry({ back, backText, next, nick }){
  const [l, extraLang] = useLanguage()
  const fullScreenManager = useFullScreen()
  const [entry, setEntry] = useState('')
  const gameContext = useContext(GameContext)
  const keyboardWrite = useKeyboardWrite(setEntry, 20)

  const updateContext = useCallback(() => {
    if (entry.length < 3) return
    gameContext.entry = entry.trim()
    next()
  }, [entry, next])

  const writeRandom = useCallback(() => {
    const words = extraLang().words
    const randomCat = random.choice(Object.keys(words))
    const randomWord = random.choice(words[randomCat] || [l('randomize')])
    setEntry(randomWord.toUpperCase())
  }, [])

  useLayoutEffect(() => fullScreenManager(), [fullScreenManager])
  useEffect(() => useKeyboardControl(
    back,
    updateContext
  ), [back, updateContext])

  useEffect(() => {
    if (entry === '')
      return
    usePlaySound('click')
  }, [entry])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <span className={ styles.text }>
          { l('phraseFor') }{ nick || '' }:
        </span>
        <Entry>
          <WithCaret size={ 20 }>{ entry }</WithCaret>
        </Entry>
        <Keyboard keyEvent={ keyboardWrite } write={ true } />
      </div>
      <ButtonWrap>
        <Button onClick={ updateContext } disabled={ entry.length < 3 }>
          { l('next') }
        </Button>
        {!!back && <Button onClick={ back }>{ backText || l('back') }</Button>}
        <Button onClick={ writeRandom }>{ l('randomize') }</Button>
      </ButtonWrap>
    </div>
  )
}
export default WriteEntry
