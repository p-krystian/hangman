import styles from './WithCaret.module.css'

function WithCaret({size, show, children}) {
  return(
    <>
      { children }
      {(children.length < size && ([undefined, null].includes(show) ? true : show)) && (
        <span className={ styles.caret }>_</span>
      )}
    </>
  )
}
export default WithCaret
