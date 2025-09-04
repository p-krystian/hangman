import Key, { KeyStateT } from '@/Components/Key/Key';
import WriteKeys from '@/Components/KeysWrite/WriteKeys';
import useLanguage from '@/Hooks/useLang';
import { useEffect, useMemo, useRef } from 'react';
import styles from './Keyboard.module.css';

type KeyboardProps = {
  keyEvent: (char: string) => void;
  write: true;
} | {
  keyEvent: (char: string, setKeyState: (state: KeyStateT) => void) => void;
  write?: false;
};

function Keyboard({ keyEvent, write }: KeyboardProps) {
  const { l } = useLanguage();
  const keyboardRef = useRef<HTMLDivElement>(null);

  const alphabet = useMemo(() => l('alphabet').split(''), [l]);

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
        (keyboardRef.current.querySelector(`[data-char="${k}"]`) as HTMLButtonElement)?.click();
      }
    }
    window.addEventListener('keydown', translate);
    return () => window.removeEventListener('keydown', translate);
  }, [keyEvent, alphabet]);

  return (
    <div className={styles.keyboard} ref={keyboardRef}>
      <div className={styles.keys}>
        {alphabet.map((ch, i) => (
          <Key key={`k-${ch}-${i}`} onClick={(sKS) => keyEvent(ch, sKS)} char={ch}>
            {ch}
          </Key>
        ))}
      </div>
      {write && <WriteKeys onKeyClick={(ch) => keyEvent(ch)} />}
    </div>
  );
}
export default Keyboard;
