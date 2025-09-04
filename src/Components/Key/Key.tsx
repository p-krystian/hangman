import { memo, useMemo, useState } from 'react';
import styles from './Key.module.css';

type KeyStateT = 'correct' | 'mistake' | null;

type KeyProps = {
  onClick: (setKeyState: (state: KeyStateT) => void, e?: React.MouseEvent) => unknown;
  children: React.ReactNode;
  char: string;
  wide?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

function Key({ onClick, children, char, wide, ref }: KeyProps) {
  const [keyState, setKeyState] = useState<KeyStateT>(null);

  const classNames = useMemo(() => [
    styles.key,
    wide ? styles.wide : '',
    keyState === 'correct' ? styles.correct : '',
    keyState === 'mistake' ? styles.mistake : ''
  ].join(' '), [wide, keyState]);

  return (
    <button
      className={classNames}
      onClick={e => onClick(setKeyState, e)}
      data-char={char}
      tabIndex={keyState ? -1 : 0}
      ref={ref}
    >
      {children}
    </button>
  );
}
export { type KeyStateT };
export default memo(Key);
