import Key from '@/Components/Key/Key';
import useLanguage from '@/Hooks/useLang';
import styles from './WriteKeys.module.css';
import SpaceSymbol from '@/Assets/Symbols/space.svg?react';
import BackspaceSymbol from '@/Assets/Symbols/backspace.svg?react';

type WriteKeysProps = {
  keyEvent: (e: React.MouseEvent, char: string) => void;
}

function WriteKeys({ keyEvent }: WriteKeysProps) {
  const { l } = useLanguage();

  return (
    <div className={styles.keys}>
      <Key onClick={e => keyEvent(e, '^32')} wide={true} char={'^32'}>
        <SpaceSymbol
          title={l('spaceWord')}
          name={l('spaceWord')}
          aria-label={l('spaceWord')}
        />
      </Key>
      <Key onClick={e => keyEvent(e, '^8')} wide={true} char={'^8'}>
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
