import styles from './CreateGame.module.css'
import Button from '../../Components/Button/Button'
import ButtonWrap from '../../Components/ButtonWrap/ButtonWrap'
import Input from '../../Components/Input/Input'
import Keyboard from '../../Components/Keyboard/Keyboard'
import useKeyboardWrite from '../../Hooks/useKeyboardWrite'
import useKeyboardControl from '../../Hooks/useKeyboardControl'
import { useState, useEffect } from 'react'

function Create({ back, submit }){
  const [name, setName] = useState('')
  const maxNameLength = 12
  const keyboardWrite = useKeyboardWrite(setName, maxNameLength)

  useEffect(() => useKeyboardControl(
    back,
    create
  ), [create])

  function create(){
    if (name.length < 3)
      return

    submit(name.substring(0, maxNameLength))
  }

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <Input
          focus={ true }
          value={ name }
          placeholder={ 'Podaj nazwę' }
          size={ maxNameLength }
        />
        <Keyboard
          write={ true }
          keyEvent={ keyboardWrite }
        />
      </div>
      <ButtonWrap>
        <Button onClick={ back }>
          Anuluj
        </Button>
        <Button onClick={ create } disabled={ name.length < 3 }>
          Start
        </Button>
      </ButtonWrap>
    </div>
  )
}
export default Create
