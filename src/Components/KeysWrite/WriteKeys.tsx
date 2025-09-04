import BackspaceSymbol from '@/Assets/Symbols/backspace.svg?react';
import SpaceSymbol from '@/Assets/Symbols/space.svg?react';
import Key from '@/Components/Key/Key';
import useLanguage from '@/Hooks/useLang';
import styles from './WriteKeys.module.css';

type WriteKeysProps = {
  onKeyClick: (char: string, e?: React.MouseEvent) => unknown;
  setKeyRef: (char: string) => (key: HTMLButtonElement) => void;
}

function WriteKeys({ onKeyClick, setKeyRef }: WriteKeysProps) {
  const { l } = useLanguage();

  return (
    <div className={styles.keys}>
      <Key
        onClick={(_, e) => onKeyClick('^32', e)}
        char={'^32'}
        ref={setKeyRef('^32')}
        wide
      >
        <SpaceSymbol
          title={l('spaceWord')}
          name={l('spaceWord')}
          aria-label={l('spaceWord')}
        />
      </Key>
      <Key
        onClick={(_, e) => onKeyClick('^8', e)}
        char={'^8'}
        ref={setKeyRef('^8')}
        wide
      >
        <BackspaceSymbol
          title={l('backspaceWord')}
          name={l('backspaceWord')}
          aria-label={l('backspaceWord')}
        />
      </Key>
    </div>
  );
}
export default WriteKeys;
