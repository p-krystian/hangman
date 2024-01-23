import Input from '../../Components/Input/Input'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import GameContext from '../../Contexts/GameContext'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap'
import styles from './WriteNicks.module.css'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import { useState, useContext } from 'react'

function WriteNicks({ back, next }){
  const [nick0, setNicks0] = useState('')
  const [nick1, setNicks1] = useState('')
  const [focused, setFocused] = useState(0)
  const gameContext = useContext(GameContext)
  const maxNickLength = 12
  const pass = (nick0.length > 2 && nick1.length > 2) && (nick0 !== nick1)

  const keyboardWrite = useKeyboardWrite(
    focused ? setNicks1 : setNicks0,
    maxNickLength
  )

  function submit(){
    if (!pass) return
    gameContext.nicks = [nick0, nick1]
    next()
  }

  return (
    <HeaderWrap>
      <div className={ styles.wrapper }>
        <div className={ styles.container }>
          <Input
            width={ 300 }
            value={ nick0 }
            focus={ focused === 0 }
            placeholder={ 'Nick gracza 1' }
            click={ () => setFocused(0) }
            maxLength={ maxNickLength }
          />
          <Input
            width={ 300 }
            value={ nick1 }
            focus={ focused === 1 }
            placeholder={ 'Nick gracza 2' }
            click={ () => setFocused(1) }
            maxLength={ maxNickLength }
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
    </HeaderWrap>
  )
}

export default WriteNicks
