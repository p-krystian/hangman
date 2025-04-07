import styles from './CreateGame.module.css'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import Input from '../../Components/Input/Input'
import Keyboard from '../../Components/Keyboard/Keyboard'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import useKeyboardControl from '../../Hooks/useKeyboardControl'
import useFullScreen from '../../Hooks/useFullScreen'
import useLanguage from '../../Hooks/useLanguage'
import { useState, useEffect, useLayoutEffect, useCallback } from 'react'

function Create({ back, submit }){
  const [name, setName] = useState('')
  const [l] = useLanguage()
  const fullScreenManager = useFullScreen()
  const keyboardControl = useKeyboardControl()
  const maxNameLength = 12
  const keyboardWrite = useKeyboardWrite(setName, maxNameLength)

  useLayoutEffect(() => fullScreenManager(), [fullScreenManager])

  const create = useCallback(() => {
    if (name.length < 3)
      return

    submit(name.substring(0, maxNameLength))
  }, [name, submit, maxNameLength]);

  useEffect(() => keyboardControl(
    back,
    create
  ), [create, keyboardControl, back])

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <Input
          focus={ true }
          value={ name }
          placeholder={ l('enterName') }
          size={ maxNameLength }
        />
        <Keyboard
          write={ true }
          keyEvent={ keyboardWrite }
        />
      </div>
      <ButtonWrap>
        <Button onClick={ create } disabled={ name.length < 3 }>
          { l('start') }
        </Button>
        <Button onClick={ back }>
          { l('cancel') }
        </Button>
      </ButtonWrap>
    </div>
  )
}
export default Create
