import styles from './Input.module.css';
import WithCaret from '../WithCaret/WithCaret';
import { useEffect, useRef } from 'react';
import usePlaySound from '../../Hooks/usePlaySound';

interface InputProps{
  value: string;
  focus?: boolean;
  size: number;
  placeholder: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Input(props: InputProps){
  const prevValue = useRef('');
  const playSound = usePlaySound();
  const { value, focus, size, placeholder, onClick } = props;

  useEffect(() => {
    if (value === prevValue.current)
      return;

    playSound('click');
    prevValue.current = value;
  }, [value, playSound]);

  return (
    <div
      className={ styles.input }
      onClick={ onClick }
      style={ {'--size': `${size+1}ch`} as React.CSSProperties }
      data-focus={ focus?.toString() }
    >{
      value.trimStart().length > 0 ? (
        <WithCaret size={ size } show={ focus }>
          { value.trimStart() }
        </WithCaret>
      ) : (
        <span className={ styles.placeholder }>
          { placeholder }
        </span>
      )
    }</div>
  );
}
export default Input;
