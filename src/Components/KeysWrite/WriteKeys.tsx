import BackspaceSymbol from '@/Assets/Symbols/backspace.svg?react';
import SpaceSymbol from '@/Assets/Symbols/space.svg?react';
import Key from '@/Components/Key/Key';
import useLanguage from '@/Hooks/useLang';
import styles from './WriteKeys.module.css';

type WriteKeysProps = {
  onKeyClick: (char: string, e?: React.MouseEvent) => unknown;
}

function WriteKeys({ onKeyClick }: WriteKeysProps) {
  const { l } = useLanguage();

  return (
    <div className={styles.keys}>
      <Key onClick={(_, e) => onKeyClick('^32', e)} wide={true} char={'^32'}>
        <SpaceSymbol
          title={l('spaceWord')}
          name={l('spaceWord')}
          aria-label={l('spaceWord')}
        />
      </Key>
      <Key onClick={(_, e) => onKeyClick('^8', e)} wide={true} char={'^8'}>
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
