import styles from './Game.module.css'
import Entry from '../../Components/Entry/Entry'
import Board from '../../Components/Board/Board'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import GameContext from '../../Contexts/GameContext'
import { useState, useContext } from 'react'

function Game({ back, onLose, onWin }){
  const gameContext = useContext(GameContext)
  const entry = gameContext.entry || '?'
  const [guessed, setGuessed] = useState([])
  const [mistakes, setMistakes] = useState(0)

  function clickKey(char, key){
    setGuessed(g => [...new Set(g.concat(char))])
    if ([...key.classList].some(e => /(correct|mistake)/.test(e)))
      return
    if (entry.toUpperCase().includes(char)){
      key.classList.add('correct')
    }
    else{
      if (mistakes >= 9){
        gameContext.change(current => ({...current, entry: `lose${entry}`}))
        onLose()
        return
      }
      setMistakes(m => m + 1)
      key.classList.add('mistake')
    }
  }
  function winEnd(){
    gameContext.change(current => ({...current, entry: `win${entry}`}))
    onWin()
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.game }>
        <Board progress={ mistakes } />
        <Entry
          hide={ true }
          guessed={ guessed }
          winCallback={ winEnd }
        >
          { entry }
        </Entry>

        <Keyboard keyEvent={ clickKey } />
      </div>
      <div className={ styles.buttons }>
        <Button onClick={ back }>Anuluj</Button>
      </div>
    </div>
  )
}
export default Game
