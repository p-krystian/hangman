import random from 'random';
import { memo } from 'react';
import styles from './NumberSlider.module.css';

type NumberSliderProps = {
  current: number;
  prev: number;
}

const nStr = (n: number) => n < 0 ? '00' : n < 10 ? `0${n}` : `${n}`;

function NumberSlider({ current, prev }: NumberSliderProps) {
  const slide = current !== prev ? styles.slide : '';

  return (
    <ul
      className={`${styles.counter} ${slide}`}
      style={{ '--_d': random.int(0, 350) } as React.CSSProperties}
      tabIndex={-1}
    >
      <li aria-hidden>{nStr(prev)}</li>
      <li>{nStr(current)}</li>
    </ul>
  );
}
export default memo(NumberSlider);
