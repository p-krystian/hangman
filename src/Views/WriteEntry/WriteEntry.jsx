import Entry from '../../Components/Entry/Entry'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap'
import GameContext from '../../Contexts/GameContext'
import styles from './WriteEntry.module.css'
import clickSound from '../../Assets/Sounds/click0.mp3'
import { useState, useContext, useEffect, useCallback } from 'react'

function WriteEntry({ back, next, text }){
  const [entry, setEntry] = useState('')
  const gameContext = useContext(GameContext)
  const prompt = <span className={ styles.prompt }>_</span>

  const updateContext = useCallback(() => {
    gameContext.change(current => (
      {...current, entry: entry.trim()}
    ))
    next()
  }, [gameContext, entry, next])
  function modifyText(char){
    new Audio(clickSound).play().catch(() => {})
    switch (char){
      case '←':
        setEntry(e => e.substring(0, e.length - 1))
        return
      case '⎵':
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

  return (
    <HeaderWrap>
      <div className={ styles.wrapper }>
        <div className={ styles.container }>
          { text && <span className={ styles.text }>{ text }</span> }
          <Entry>{ entry }{ entry.length < 20 && prompt }</Entry>
          <Keyboard keyEvent={ modifyText } write={ true } />
        </div>
        <div className={ styles.buttons } >
          <Button onClick={ back }>Wstecz</Button>
          {
            entry.length >= 3 ? (
              <Button onClick={ updateContext }>Dalej</Button>
            ) : (
              <Button disabled>Dalej</Button>
            )
          }
        </div>
      </div>
    </HeaderWrap>
  )
}
export default WriteEntry
