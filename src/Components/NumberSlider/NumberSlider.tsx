import styles from './NumberSlider.module.css';

interface NumberSliderProps{
  current: number;
  old: number;
}

function NumberSlider({ current, old }: NumberSliderProps){
  const nStr = (n: number) => n < 0 ? '00' : n < 10 ? `0${n}` : `${n}`;
  const slide = current !== old ? styles.slide : '';

  return (
    <ul className={ `${styles.counter} ${slide}` }>
      <li>{ nStr(old) }</li>
      <li>{ nStr(current) }</li>
    </ul>
  );
}
export default NumberSlider;
