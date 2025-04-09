import { Link } from 'react-router';
import styles from './Button.module.css';

interface ButtonProps {
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => unknown;
  value?: string;
  children: React.ReactNode;
  disabled?: boolean;
  small?: boolean;
}

function Button(props: ButtonProps){
  const {
    link,
    onClick,
    value,
    children,
    disabled = false,
    small = false
  } = props;

  return(
    link ? (
      <Link
        to={ disabled ? '' : link }
        data-disabled={ disabled }
        onClick={ disabled ? () => 'disabled' : onClick }
        className={ `${styles.button} ${small ? styles.small : ''}` }
      >
        { children }
      </Link>
    ) : (
      <button
        disabled={ disabled }
        value={ value }
        onClick={ disabled ? () => 'disabled' : onClick }
        className={ `${styles.button} ${small ? styles.small : ''}` }
      >
        { children }
      </button>
    )
  );
}
export default Button;
