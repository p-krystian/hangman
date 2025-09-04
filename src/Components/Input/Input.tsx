import WithCaret from '@/Components/WithCaret/WithCaret';
import usePlayer from '@/Hooks/usePlayer';
import { useEffect, useRef } from 'react';
import styles from './Input.module.css';

type InputProps = {
  value: string;
  size: number;
  placeholder: string;
  active?: boolean;
  onFocus?: () => unknown;
}

function Input({ value, active, size, placeholder, onFocus }: InputProps) {
  const prevValue = useRef(value);
  const playSound = usePlayer();
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value === prevValue.current) {
      return;
    }

    playSound('click');
    prevValue.current = value;
  }, [value, playSound]);

  useEffect(() => {
    if (active) {
      inputRef.current?.focus({ preventScroll: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      tabIndex={0}
      className={styles.input}
      onClick={onFocus}
      onFocus={onFocus}
      style={{ '--size': `${size + 1}ch` } as React.CSSProperties}
      data-focus={active?.toString()}
      aria-label={placeholder}
      ref={inputRef}
    >
      <WithCaret size={size} show={!!active}>
        {value}
      </WithCaret>
      {value.length === 0 && (
        <span className={styles.placeholder} aria-hidden>
          {placeholder}
        </span>
      )}
    </div>
  );
}
export default Input;
