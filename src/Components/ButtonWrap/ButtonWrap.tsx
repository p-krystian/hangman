import styles from './ButtonWrap.module.css';

interface ButtonWrapProps{
  children: React.ReactNode;
}

function ButtonWrap({ children }: ButtonWrapProps){
  return (
    <div className={ styles.buttons }>
      { children }
    </div>
  );
}
export default ButtonWrap;
