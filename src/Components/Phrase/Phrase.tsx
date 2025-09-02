import WithCaret from '@/Components/WithCaret/WithCaret';
import { limits } from '@/conf';
import { useMemo } from 'react';
import styles from './Phrase.module.css';

type PhraseProps = {
  children: string;
  onlyGuessed?: string[];
  onGuessed?: (phrase?: string) => unknown
  write?: boolean
}

function Phrase({ children, onlyGuessed, onGuessed, write = false }: PhraseProps) {
  const content = useMemo(() => {
    const cnt = onlyGuessed ? (
      children
        .split('')
        .map(ch => (onlyGuessed.includes(ch) || ch === ' ') ? ch : '-')
        .join('')
    ) : (
      children
    );

    if (onlyGuessed && onGuessed && cnt === children) {
      onGuessed(cnt);
    }
    return cnt;
  }, [children, onlyGuessed, onGuessed]);

  return (
    <p className={styles.phrase}>
      <WithCaret size={limits.PHRASE_MAX} show={write}>
        {content}
      </WithCaret>
    </p>
  );
}
export default Phrase;
