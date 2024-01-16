import Entry from '../../Components/Entry/Entry'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import { useState } from 'react'


function NewGame(){
  const [gameName, setGameName] = useState('')
  const prompt = <span className={ "styles.prompt" }>_</span>

  function modifyText(char){
    switch (char){
      case '←':
        setGameName(n => n.substring(0, n.length - 1))
        return
      case '⎵':
        char = ' '
        /* falls through */
      default:
        setGameName(
          n => {
            if (n[n.length -1] === ' ' && char === ' ') return n
            return n.concat(char.toUpperCase()).substring(0, 20)
          }
        )
    }
  }

  return (
    <div>
      <Entry>{ gameName }{ gameName.length < 20 && prompt }</Entry>
      <Keyboard keyEvent={ modifyText } write={ true } />
      <div>
        <Button link='/'>Wróć</Button>
        {
          gameName.length >= 3 ? (
            <Button link='/game'>Dalej</Button>
          ) : (
            <Button disabled link='/game'>Dalej</Button>
          )
        }
      </div>
    </div>
  )
}
export default NewGame
