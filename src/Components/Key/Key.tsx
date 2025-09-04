import { useState } from 'react';
import styles from './Key.module.css';

type KeyStateT = 'correct' | 'mistake' | null;

type KeyProps = {
  onClick: (setKeyState: (state: KeyStateT) => void, e?: React.MouseEvent) => unknown;
  children: React.ReactNode;
  char: string;
  wide?: boolean;
}

function Key({ onClick, children, char, wide }: KeyProps) {
  const [keyState, setKeyState] = useState<KeyStateT>(null);

  const classNames = [
    styles.key,
    wide ? styles.wide : '',
    keyState === 'correct' ? styles.correct : '',
    keyState === 'mistake' ? styles.mistake : ''
  ].join(' ');

  return (
    <button
      className={classNames}
      onClick={e => onClick(setKeyState, e)}
      data-char={char}
      tabIndex={keyState ? -1 : 0}
    >
      {children}
    </button>
  );
}
export { type KeyStateT };
export default Key;
