import styles from './Entry.module.css'
import { useEffect, useCallback } from 'react'

function Entry(props){
  const {
    children,
    hide,
    winCallback,
    guessed
  } = props

  const hideText = useCallback((text, guessed) => {
    let newText = '';
    for (const char of text){
      newText += char === ' ' ? ' ' : (
        guessed.includes(char) ? char : '-'
      )
    }
    return newText
  }, [])

  const hiddenText = hide ? hideText(children, guessed) : ''

  useEffect(() => {
    if (!hiddenText.includes('-') && winCallback)
      winCallback()
  }, [guessed])

  return (
    <span className={ styles.entry }>
      { hiddenText || children }
    </span>
  )
}
export default Entry
