import styles from './WithCaret.module.css';

type WithCaretProps = {
  size: number;
  show?: boolean;
  children: string;
};

function WithCaret({ size, show = true, children }: WithCaretProps) {
  return (
    <>
      {children}
      {show && children.length < size && <span className={styles.caret}>_</span>}
    </>
  );
}
export default WithCaret;
