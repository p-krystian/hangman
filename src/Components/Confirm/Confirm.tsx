import Button from '@/Components/Button/Button';
import useAnimaionEnd from '@/Hooks/useAnimationEnd';
import useLanguage from '@/Hooks/useLang';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Confirm.module.css';


type ConfirmProps = {
  confirm: () => void;
  reject?: () => void;
  long?: boolean;
  children: React.ReactNode;
}
const popupContainer = document.getElementById('popup')!;

function afterAnimation() {
  const focusElement = popupContainer.querySelector('button');

  if (focusElement) {
    (focusElement as HTMLButtonElement).focus({ preventScroll: true });
  }
  else {
    popupContainer.focus({ preventScroll: true });
  }
}

function Confirm({ confirm, reject, long, children }: ConfirmProps) {
  const { l } = useLanguage();
  const confirmText = reject ? l('yes') : l('ok');
  const [onAnimateEnd, cleanAnimateEnd] = useAnimaionEnd(popupContainer, afterAnimation);

  useEffect(() => {
    const previousFocused = document.querySelector('*:focus') as HTMLElement | null;
    popupContainer.classList.add('active');
    onAnimateEnd();

    return () => {
      cleanAnimateEnd();
      popupContainer.classList.remove('active');
      previousFocused?.focus();
    };
  }, [cleanAnimateEnd, onAnimateEnd]);

  return createPortal(
    <div className={`${styles.confirm} ${long ? styles.long : ''}`}>
      <span>{children}</span>
      <div className={styles.buttons}>
        {reject && <Button small={true} onClick={reject}>
          {l('no')}
        </Button>}
        <Button small={true} onClick={confirm}>
          {confirmText}
        </Button>
      </div>
    </div>,
    popupContainer
  );
}
export default Confirm;
