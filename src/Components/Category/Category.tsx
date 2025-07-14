import useLanguage from '@/Hooks/useLanguage';
import { useState, useEffect } from 'react';
import styles from './Category.module.css';

const previous = { entry: '123', category: '' };

const findCategory = (word: string, dict: Record<string, string[]>) => {
  for (const cat of Object.keys(dict)) {
    if (dict[cat].find((e) => e.toUpperCase() === word.toUpperCase())) {
      return cat;
    }
  }
  return null;
};
const showPartString = (str: string, i: number) => (
  `${str.substring(0, i)}${' '.repeat(str.length - i)}`
);

interface CategoryProps {
  entry: string;
  short?: boolean;
  animation?: boolean;
}

function Category({ entry, short, animation }: CategoryProps) {
  const [category, setCategory] = useState('\t');
  const [l, extraLang] = useLanguage();
  const keyboardSize = Math.ceil(l('alphabet').length / 7);
  const words = extraLang().words;

  useEffect(() => {
    if (!animation && previous.entry === entry) {
      setCategory(previous.category);
      return;
    }
    const category = findCategory(entry, words) || l('categoryUnknown');
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
  }, [entry, words, l, animation]);

  return (
    <div
      className={ `${styles.category} ${short ? styles.short : ''}` }
      style={ { '--_s': keyboardSize } as React.CSSProperties }
    >
      <span className={ styles.prefix }>
        { `${l('phraseCategory')}:${short ? '\n' : '  '}` }
      </span>
      <span className={ styles.name }>
        { category }
      </span>
    </div>
  );
}
export default Category;
