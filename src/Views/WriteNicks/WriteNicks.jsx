import Input from '../../Components/Input/Input'
import Keyboard from '../../Components/Keyboard/Keyboard'
import Button from '../../Components/Button/Button'
import GameContext from '../../Contexts/GameContext'
import HeaderWrap from '../../Components/HeaderWrap/HeaderWrap'
import styles from './WriteNicks.module.css'
import clickSound from '../../Assets/Sounds/click1.mp3'
import { useState, useCallback, useRef, useContext, useEffect } from 'react'


function WriteNicks({ back, next, single }){
  const [nicks, setNicks] = useState(single ? [''] : ['', ''])
  const [focused, setFocused] = useState(0)
  const lastChar = useRef(['', ''])
  const gameContext = useContext(GameContext)
  const maxNickLength = 12

  const pass = single ? (
    nicks[0].length > 2
  ) : (
    (nicks[0].length > 2 && nicks[1].length > 2) && nicks[0] !== nicks[1]
  )

  const write = useCallback((char, focus) => {
    new Audio(clickSound).play().catch(() => {})
    if (char === '⎵'){
      char = ' '
      if (lastChar.current[focus] === ' ')
        return
    }
    setNicks(currentNicks => {
      const newNicks = [...currentNicks]
      if (char === '←')
        newNicks[focus] = newNicks[focus].substring(
          0,
          newNicks[focus].length-1
        )
      else
        newNicks[focus] += char
      newNicks[focus] = newNicks[focus].substring(0, maxNickLength)
      return newNicks
    })
    lastChar.current[focus] = char
  }, [])
  const submit = useCallback(() => {
    gameContext.change(current => ({...current, nicks: nicks}))
    next()
  }, [nicks, next, gameContext])
  const keyboardActions = useCallback(e => {
    e.preventDefault()
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp')
      setFocused(current => +!current)
    else if (e.keyCode === 13 && pass)
      submit()
  }, [pass, submit])

  useEffect(() => {
    window.addEventListener('keydown', keyboardActions)
    return () => window.removeEventListener('keydown', keyboardActions)
  }, [keyboardActions])

  return (
    <HeaderWrap>
      <div className={ styles.wrapper }>
        <div className={ styles.container }>
          {
            nicks.map((nick, index) => (
              <Input
                key={ `nick-${index}` }
                width={ 300 }
                maxLength={ maxNickLength }
                value={ nick }
                focus={ index === focused }
                placeholder={ `Nick gracza ${index+1}` }
                click={ () => setFocused(index) }
              />
            ))
          }
          <Keyboard
            write={ true }
            keyEvent={ char => write(char, focused) }
          />
        </div>
        <div className={ styles.buttons }>
          <Button onClick={ back }>Anuluj</Button>
          {
            pass ? (
              <Button onClick={ submit }>Dalej</Button>
            ) : (
              <Button disabled={ true }>Dalej</Button>
            )
          }
        </div>
      </div>
    </HeaderWrap>
  )
}

export default WriteNicks
