import styles from './Game.module.css'
import Entry from '../../Components/Entry/Entry'
import Board from '../../Components/Board/Board'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import GameContext from '../../Contexts/GameContext'
import Confirm from '../../Components/Confirm/Confirm'
import useFullScreen from '../../Hooks/useFullScreen'
import { useState, useContext, useEffect, useLayoutEffect } from 'react'
import useKeyboardControl from '../../Hooks/useKeyboardControl'

function Game({ exit, onLose, onWin }){
  const gameContext = useContext(GameContext)
  const entry = gameContext.entry || '?'
  const [guessed, setGuessed] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [showExit, setShowExit] = useState(false)

  useLayoutEffect(() => useFullScreen(), [])
  useEffect(() => useKeyboardControl(
    () => exit && setShowExit(current => !current)
  ), [])

  function clickKey(char, key){
    setGuessed(g => [...new Set(g.concat(char))])
    if ([...key.classList].some(e => /(correct|mistake)/.test(e)))
      return
    if (entry.toUpperCase().includes(char)){
      key.classList.add('correct')
    }
    else{
      if (mistakes >= 9){
        onLose()
        return
      }
      setMistakes(m => m + 1)
      key.classList.add('mistake')
    }
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.game }>
        <Board progress={ mistakes } />
        <Entry
          hide={ true }
          guessed={ guessed }
          winCallback={ onWin }
        >
          { entry }
        </Entry>
        <Keyboard keyEvent={ clickKey } />
      </div>
      <ButtonWrap>
        {!!exit && <Button onClick={ () => setShowExit(true) }>Anuluj</Button>}
      </ButtonWrap>
      {!!showExit && (
        <Confirm confirm={ exit } reject={ () => setShowExit(false) }>
          Zakończyć grę?
        </Confirm>
      )}
    </div>
  )
}
export default Game
