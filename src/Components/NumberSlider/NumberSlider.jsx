import styles from './NumberSlider.module.css'

function NumberSlider({ current, old }){
  const nStr = n => n < 0 ? '00' : n < 10 ? `0${n}` : `${n}`
  const slide = current !== old ? styles.slide : ''

  return (
    <ul className={ `${styles.counter} ${slide}` }>
      <li>{ nStr(old) }</li>
      <li>{ nStr(current) }</li>
    </ul>
  )
}
export default NumberSlider
