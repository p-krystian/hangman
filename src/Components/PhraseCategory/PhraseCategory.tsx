import { memo, useCallback, useEffect, useState } from 'react';
import useLanguage from '@/Hooks/useLang';
import styles from './PhraseCategory.module.css';

const cache = { phrase: '123', category: '' };
const categoryFallback = '\t';

type PhraseCategoryProps = {
  phrase: string;
  short?: boolean;
  animate?: boolean;
};

function PhraseCategory({ phrase, short = false, animate = false }: PhraseCategoryProps) {
  const { l, getWordCategory } = useLanguage();
  const [category, setCategory] = useState(
    phrase === cache.phrase ? cache.category : categoryFallback
  );
  const keyboardSize = Math.ceil(l('alphabet').length / 7);

  const updateCategory = useCallback(async () => {
    const found = getWordCategory(phrase) || l('categoryUnknown');
    cache.phrase = phrase;
    cache.category = found;
    setCategory(found);
  }, [phrase, getWordCategory, l]);

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>;
    if (category === categoryFallback) {
      timeoutID = setTimeout(updateCategory, 100);
    }
    return () => clearTimeout(timeoutID);
  }, [category, updateCategory]);

  return (
    <div
      className={`${styles.category} ${short ? styles.short : ''}`}
      style={{ '--_kbd-s': keyboardSize } as React.CSSProperties}
    >
      <span className={styles.prefix}>{`${l('phraseCategory')}:${short ? '' : ' '}`}</span>
      <p className={styles.name} aria-label={category}>
        {category.split('').map((ch, i) => (
          <span
            key={`${i}-${ch}`}
            style={{ '--_d': animate ? i + 1 : 0 } as React.CSSProperties}
            aria-hidden
          >
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}
export default memo(PhraseCategory);
