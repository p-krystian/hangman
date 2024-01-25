import styles from './Input.module.css'

const WithCaret = ({size, show, children}) => (
  <>
    { children }
    {(children.length < size && show) && (
      <span className={ styles.caret }>_</span>
    )}
  </>
)

function Input(props){
  const { value, focus, size, placeholder, onClick } = props

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
