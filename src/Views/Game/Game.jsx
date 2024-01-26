import styles from './Game.module.css'
import Entry from '../../Components/Entry/Entry'
import Board from '../../Components/Board/Board'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import GameContext from '../../Contexts/GameContext'
import useFullScreen from '../../Hooks/useFullScreen'
import { useState, useContext, useEffect } from 'react'
import useConfirm from '../../Hooks/useConfirm'
import useKeyboardControl from '../../Hooks/useKeyboardControl'

function Game({ exit, onLose, onWin }){
  const gameContext = useContext(GameContext)
  const entry = gameContext.entry || '?'
  const [guessed, setGuessed] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const confirmExit = useConfirm('Zakończyć grę?', exit)

  useEffect(() => useFullScreen(), [])
  useEffect(() => useKeyboardControl(confirmExit), [])

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
      <div className={ styles.buttons }>
        <Button onClick={ confirmExit }>Anuluj</Button>
      </div>
    </div>
  )
}
export default Game
