import Input from '../../Components/Input/Input'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import GameContext from '../../Contexts/GameContext'
import styles from './WriteNicks.module.css'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import useKeyboardControl from '../../Hooks/useKeyboardControl'
import useFullScreen from '../../Hooks/useFullScreen'
import useLanguage from '../../Hooks/useLanguage'
import { useState, useContext, useEffect, useCallback, useLayoutEffect } from 'react'

function WriteNicks({ back, next }){
  const [l] = useLanguage()
  const fullScreenManager = useFullScreen()
  const keyboardControl = useKeyboardControl()
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

  const submit = useCallback(() => {
    if (!pass) return
    gameContext.nicks = [nick0, nick1]
    next()
  }, [nick0, nick1])

  useLayoutEffect(() => fullScreenManager(), [fullScreenManager])
  useEffect(() => keyboardControl(
    back,
    submit,
    () => setFocused(0),
    () => setFocused(1)
  ), [back, submit, keyboardControl])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <div className={ styles.inputs }>
          <Input
            focus={ focused === 0 }
            value={ nick0 }
            placeholder={ `${l('nick')} 1` }
            size={ maxNickLength }
            onClick={ () => setFocused(0) }
          />
          <Input
            focus={ focused === 1 }
            value={ nick1 }
            placeholder={ `${l('nick')} 2` }
            size={ maxNickLength }
            onClick={ () => setFocused(1) }
          />
        </div>
        <Keyboard
          write={ true }
          keyEvent={ keyboardWrite }
        />
      </div>
      <ButtonWrap>
        <Button onClick={ submit } disabled={ !pass }>{ l('next') }</Button>
        <Button onClick={ back }>{ l('cancel') }</Button>
      </ButtonWrap>
    </div>
  )
}

export default WriteNicks
