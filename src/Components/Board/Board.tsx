import { memo } from 'react';
import svgs from '@/Assets/Animation';
import bg from '@/Assets/Images/board-bg.svg';
import fg from '@/Assets/Images/board-fg.svg';
import useLanguage from '@/Hooks/useLang';
import styles from './Board.module.css';

type BoardProps = {
  progress: number;
  small?: boolean;
};

function Board({ progress, small }: BoardProps) {
  const imagesName = svgs.slice(0, progress);
  const { l } = useLanguage();
  const keyboardSize = Math.ceil(l('alphabet').length / 7);

  return (
    <div
      className={`${styles.board} ${small ? styles.small : ''}`}
      style={{ '--_s': keyboardSize } as React.CSSProperties}
    >
      <img className={styles.bg} src={bg} alt="" />
      {/* biome-ignore-start lint/suspicious/noArrayIndexKey: Order is always same */}
      {imagesName.map((src, index) => (
        <img key={`img-${index}`} className={styles.image} src={src} alt={`${progress}`} />
      ))}
      {/* biome-ignore-end lint/suspicious/noArrayIndexKey: Order is always same */}
      <img className={styles.fg} src={fg} alt="" />
    </div>
  );
}
export default memo(Board);
