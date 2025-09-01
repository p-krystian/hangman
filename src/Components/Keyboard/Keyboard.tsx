import Key from '@/Components/Key/Key';
import WriteKeys from '@/Components/KeysWrite/WriteKeys';
import useLanguage from '@/Hooks/useLang';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './Keyboard.module.css';

type KeyboardProps = {
  keyEvent: (char: string, key: Element) => void;
  write?: boolean;
}

function Keyboard({ keyEvent, write }: KeyboardProps) {
  const { l } = useLanguage();
  const keyboardRef = useRef<HTMLDivElement>(null);

  const alphabet = useMemo(
    () => l('alphabet').split(''),
    [l]
  );

  const clickEvent = useCallback((e: React.MouseEvent, char: string) => (
    keyEvent(char, e.target as Element)
  ), [keyEvent]);

  useEffect(() => {
    function translate(e: KeyboardEvent) {
      let k = e.key.toUpperCase();

      if (k === ' ') {
        k = '^32';
      }
      else if (k === 'BACKSPACE') {
        k = '^8';
      }

      if (['^8', '^32', ...alphabet].includes(k) && keyboardRef.current) {
        e.preventDefault();
        keyEvent(k, keyboardRef.current.querySelector(`[data-char="${k}"]`)!);
      }
    }
    window.addEventListener('keydown', translate);
    return () => window.removeEventListener('keydown', translate);
  }, [keyEvent, alphabet]);

  return (
    <div className={styles.keyboard} ref={keyboardRef}>
      <div className={styles.keys}>
        {alphabet.map((ch, i) => (
          <Key key={`k-${ch}-${i}`} onClick={(e) => clickEvent(e, ch)} char={ch}>
            {ch}
          </Key>
        ))}
      </div>
      {write && <WriteKeys keyEvent={clickEvent} />}
    </div>
  );
}
export default Keyboard;
