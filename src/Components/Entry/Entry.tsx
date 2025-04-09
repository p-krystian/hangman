import styles from './Entry.module.css'
import { useEffect, useCallback } from 'react'

interface EntryProps{
  children: React.ReactNode;
  hide?: boolean;
  winCallback?: () => void;
  guessed?: string[];
}

function Entry({children, hide, winCallback=() => {}, guessed=[]}:EntryProps){
  const hideText = useCallback((text:string, guessed:string[]) => {
    let newText = '';
    for (const char of text){
      newText += char === ' ' ? ' ' : (
        guessed.includes(char) ? char : '-'
      )
    }
    return newText
  }, [])

  const hiddenText = hide && typeof children === 'string' ? hideText(children, guessed) : ''

  useEffect(() => {
    if (!hiddenText.includes('-') && winCallback)
      winCallback()
  }, [guessed, hiddenText, winCallback])

  return (
    <span className={ styles.entry }>
      { hiddenText || children }
    </span>
  )
}
export default Entry
