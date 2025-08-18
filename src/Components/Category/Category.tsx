import useLanguage from '@/Hooks/useLang';
import { useEffect, useState } from 'react';
import styles from './Category.module.css';

const previous = { entry: '123', category: '' };

const showPartString = (str: string, i: number) => (
  `${str.substring(0, i)}${' '.repeat(str.length - i)}`
);

type CategoryProps = {
  entry: string;
  short?: boolean;
  animation?: boolean;
}

function Category({ entry, short, animation }: CategoryProps) {
  const [category, setCategory] = useState('\t');
  const { l, getWordCategory } = useLanguage();
  const keyboardSize = Math.ceil(l('alphabet').length / 7);

  useEffect(() => {
    if (!animation && previous.entry === entry) {
      setCategory(previous.category);
      return;
    }
    const category = getWordCategory(entry) || l('categoryUnknown');
    previous.entry = entry;
    previous.category = category;

    if (!animation) {
      setCategory(category);
      return;
    }

    for (let i = 0; i <= category.length; i++) {
      setTimeout(
        () => setCategory(showPartString(category, i)),
        i * 150 + 500
      );
    }
  }, [entry, l, animation, getWordCategory]);

  return (
    <div
      className={`${styles.category} ${short ? styles.short : ''}`}
      style={{ '--_s': keyboardSize } as React.CSSProperties}
    >
      <span className={styles.prefix}>
        {`${l('phraseCategory')}:${short ? '\n' : '  '}`}
      </span>
      <span className={styles.name}>
        {category}
      </span>
    </div>
  );
}
export default Category;
