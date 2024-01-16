import styles from './Input.module.css'

function Input(props){
  const {
    value,
    maxLength,
    ref,
    placeholder,
    width,
    focus,
    click
  } = props
  const prompt = <span className={ styles.prompt }>_</span>
  return (
    <div
      className={ `${styles.input} ${focus ? styles.focus : ''}` }
      style={ {minWidth: `${width}px`} }
      ref={ ref }
      onClick={ click }
    >
      <div className={ styles.value }>
        { value?.substring(0, (maxLength || 99)) }
        { (value?.length || 0) < (maxLength || 99) && prompt }
      </div>
      {
        (value?.length || 0) <= 0 && (
          <div className={ styles.placeholder }>
            { placeholder }
          </div>
        )
      }
    </div>
  )
}
export default Input
