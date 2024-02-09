import styles from './Game.module.css'
import Entry from '../../Components/Entry/Entry'
import Board from '../../Components/Board/Board'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import GameContext from '../../Contexts/GameContext'
import Confirm from '../../Components/Confirm/Confirm'
import useFullScreen from '../../Hooks/useFullScreen'
import { useState, useContext, useEffect, useLayoutEffect, useCallback } from 'react'
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

  const clickKey = useCallback((char, key) => {
    if (guessed.includes(char))
      return

    if (entry.includes(char)){
      key.classList.add('correct')
      setGuessed(g => g.includes(char) ? g : g.concat(char))
    }
    else{
      key.classList.add('mistake')
      if (mistakes >= 9)
        return onLose()
      setMistakes(m => m + 1)
    }
  }, [guessed, mistakes])

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
