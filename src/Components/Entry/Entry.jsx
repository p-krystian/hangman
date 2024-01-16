import styles from './Entry.module.css'
import { useEffect } from 'react'

function Entry(props){
  const {
      children,
      hide,
      winCallback,
      guessed
  } = props
  let hideText = ''

  for (const char of children){
    if (!hide) break
    hideText += (
      char === ' ' ? ' ' :
      guessed.includes(char.toUpperCase()) ? char : '-'
    )
  }
  useEffect(() => {
    if (!hideText.includes('-') && winCallback)
      winCallback()
  }, [guessed])

  return (
    <span className={ styles.entry }>
      { hideText || children }
    </span>
  )
}
export default Entry
