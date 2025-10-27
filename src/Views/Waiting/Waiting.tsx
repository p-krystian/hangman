import head from '@/Assets/Animation/head.svg';
import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import useLanguage from '@/Hooks/useLang';
import styles from './Waiting.module.css';

type WaitingProps = {
  goCancel?: () => unknown;
};

function Waiting({ goCancel }: WaitingProps) {
  const { l } = useLanguage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span>{l('waitingOpponent')}</span>
        <img src={head} alt="" className={styles.animation} aria-hidden />
      </div>
      {!!goCancel && (
        <ButtonWrap>
          <Button onClick={goCancel} shortcut="CANCEL">
            {l('cancel')}
          </Button>
        </ButtonWrap>
      )}
    </div>
  );
}
export default Waiting;
