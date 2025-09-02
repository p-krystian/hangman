import Board from '@/Components/Board/Board';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Phrase from '@/Components/Phrase/Phrase';
import useLanguage from '@/Hooks/useLang';
import { useEffect, useState } from 'react';
import styles from './Connecting.module.css';

function Connecting() {
  const [progress, setProgress] = useState(10);
  const { l } = useLanguage();

  useEffect(() => {
    let addend = -1;
    const interval = setInterval(() => {
      setProgress(current => {
        if (current <= 0)
          addend = 1;
        if (current >= 10)
          addend = -1;
        return current + addend;
      });
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Board progress={progress} small={true} />
        <Phrase>{`${l('connecting')}...`}</Phrase>
      </div>
      <ButtonWrap>
        <Button link='/'>{l('cancel')}</Button>
      </ButtonWrap>
    </div>
  );
}
export default Connecting;
