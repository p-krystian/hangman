import WithCaret from '@/Components/WithCaret/WithCaret';
import { limits } from '@/conf';
import { useMemo } from 'react';
import styles from './Phrase.module.css';

type PhraseProps = {
  children: string;
  onlyGuessed?: Set<string>;
  write?: boolean;
}

function Phrase({ children, onlyGuessed, write = false }: PhraseProps) {
  const content = useMemo(() => (
    onlyGuessed ? (
      children
        .split('')
        .map(ch => (onlyGuessed.has(ch) || ch === ' ') ? ch : '-')
        .join('')
    ) : (
      children
    )
  ), [children, onlyGuessed]);

  return (
    <p className={styles.phrase}>
      <WithCaret size={limits.PHRASE_MAX} show={write}>
        {content}
      </WithCaret>
    </p>
  );
}
export default Phrase;
