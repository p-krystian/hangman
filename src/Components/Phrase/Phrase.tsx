import { useMemo } from 'react';
import WithCaret from '@/Components/WithCaret/WithCaret';
import { limits } from '@/conf';
import styles from './Phrase.module.css';

type PhraseProps = {
  children: string;
  hideChars?: Set<string>;
  write?: boolean;
};

function Phrase({ children, hideChars, write = false }: PhraseProps) {
  const content = useMemo(
    () =>
      hideChars
        ? children
            .split('')
            .map(ch => (hideChars.has(ch) ? '-' : ch))
            .join('')
        : children,
    [children, hideChars]
  );

  return (
    <p className={styles.phrase}>
      <WithCaret size={limits.PHRASE_MAX} show={write}>
        {content}
      </WithCaret>
    </p>
  );
}
export default Phrase;
