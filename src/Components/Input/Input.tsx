import WithCaret from '@/Components/WithCaret/WithCaret';
import usePlayer from '@/Hooks/usePlayer';
import shortcutListener from '@/Utils/shortcutListener';
import { binds } from '@/conf';
import { memo, useEffect, useRef } from 'react';
import styles from './Input.module.css';
import KeyIndicator from '@/Components/KeyIndicator/KeyIndicator';

type InputProps = {
  value: string;
  size: number;
  placeholder: string;
  active?: boolean;
  onFocus?: () => unknown;
  shortcut?: keyof typeof binds;
}

function Input({ value, active, size, placeholder, onFocus, shortcut }: InputProps) {
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

  useEffect(() => {
    if (shortcut && onFocus) {
      shortcutListener(shortcut, onFocus);
    }
  }, [shortcut, onFocus]);

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
      {!!shortcut && <KeyIndicator shortcut={shortcut} />}
    </div>
  );
}
export default memo(Input);
