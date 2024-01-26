import styles from './WithCaret.module.css'

function WithCaret({size, show, children}) {
  return(
    <>
      { children }
      {(children.length < size && (show ?? true)) && (
        <span className={ styles.caret }>_</span>
      )}
    </>
  )
}
export default WithCaret
