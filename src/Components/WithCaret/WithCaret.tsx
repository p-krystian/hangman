import styles from './WithCaret.module.css'

interface WithCaretProps {
  size: number;
  show?: boolean | null;
  children: string;
}

function WithCaret({size, show, children}: WithCaretProps) {
  return(
    <>
      { children }
      {(children.length < size && (show === undefined || show === null ? true : show)) && (
        <span className={ styles.caret }>_</span>
      )}
    </>
  )
}
export default WithCaret
