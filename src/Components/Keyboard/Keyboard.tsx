import Key, { KeyStateT } from '@/Components/Key/Key';
import WriteKeys from '@/Components/KeysWrite/WriteKeys';
import useLanguage from '@/Hooks/useLang';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './Keyboard.module.css';

type KeyboardProps = {
  keyEvent: (char: string) => void;
  write: true;
} | {
  keyEvent: (char: string, setKeyState: (state: KeyStateT) => void) => void;
  write: false | undefined;
};

function Keyboard({ keyEvent, write }: KeyboardProps) {
  const { l } = useLanguage();
  const alphabet = useMemo(() => l('alphabet').split(''), [l]);
  const keyRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setKeyRef = useCallback((char: string) => (key: HTMLButtonElement) => {
    if (key) {
      keyRefs.current.set(char, key);
    }
    else {
      keyRefs.current.delete(char);
    }
  }, []);

  useEffect(() => {
    function translate(e: KeyboardEvent) {
      let k = e.key.toUpperCase();

      if (k === ' ') {
        k = '^32';
      }
      else if (k === 'BACKSPACE') {
        k = '^8';
      }

      if (keyRefs.current.has(k)) {
        e.preventDefault();
        keyRefs.current.get(k)!.click();
      }
    }
    window.addEventListener('keydown', translate);
    return () => window.removeEventListener('keydown', translate);
  }, []);

  return (
    <div className={styles.keyboard}>
      <div className={styles.keys}>
        {alphabet.map((ch, i) => (
          <Key
            key={`k-${ch}-${i}`}
            onClick={(sKS) => keyEvent(ch, sKS)}
            char={ch}
            ref={setKeyRef(ch)}
          >
            {ch}
          </Key>
        ))}
      </div>
      {write && (<WriteKeys onKeyClick={(ch) => keyEvent(ch)} setKeyRef={setKeyRef} />)}
    </div>
  );
}
export default Keyboard;
