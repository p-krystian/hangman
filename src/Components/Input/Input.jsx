import styles from './Input.module.css'
import WithCaret from '../WithCaret/WithCaret'
import { useEffect, useRef } from 'react'
import usePlaySound from '../../Hooks/usePlaySound'

function Input(props){
  const prevValue = useRef("")
  const playSound = usePlaySound()
  const { value, focus, size, placeholder, onClick } = props

  useEffect(() => {
    if (value === prevValue.current)
      return

    playSound('click')
    prevValue.current = value
  }, [value, playSound])

  return (
    <div
      className={ styles.input }
      onClick={ onClick }
      style={ {'--size': `${size+1}ch`} }
      focus={ focus?.toString() }
    >{
      value.trimLeft().length > 0 ? (
        <WithCaret size={ size } show={ focus }>
          { value.trimLeft() }
        </WithCaret>
      ) : (
        <span className={ styles.placeholder }>
          { placeholder }
        </span>
      )
    }</div>
  )
}
export default Input
