import Input from '../../Components/Input/Input'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import GameContext from '../../Contexts/GameContext'
import styles from './WriteNicks.module.css'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import { useState, useContext } from 'react'

function WriteNicks({ back, next }){
  const [nick0, setNick0] = useState('')
  const [nick1, setNick1] = useState('')
  const [focused, setFocused] = useState(0)
  const gameContext = useContext(GameContext)
  const maxNickLength = 12
  const pass = (nick0.length > 2 && nick1.length > 2) && (nick0 !== nick1)

  const keyboardWrite = useKeyboardWrite(
    focused ? setNick1 : setNick0,
    maxNickLength
  )

  function submit(){
    if (!pass) return
    gameContext.nicks = [nick0, nick1]
    next()
  }

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <Input
          focus={ focused === 0 }
          value={ nick0 }
          placeholder={ 'Nick gracza 1' }
          size={ maxNickLength }
          onClick={ () => setFocused(0) }
        />
        <Input
          focus={ focused === 1 }
          value={ nick1 }
          placeholder={ 'Nick gracza 2' }
          size={ maxNickLength }
          onClick={ () => setFocused(1) }
        />
        <Keyboard
          write={ true }
          keyEvent={ keyboardWrite }
        />
      </div>
      <ButtonWrap>
        <Button onClick={ back }>Anuluj</Button>
        <Button onClick={ submit } disabled={ !pass }>Dalej</Button>
      </ButtonWrap>
    </div>
  )
}

export default WriteNicks
