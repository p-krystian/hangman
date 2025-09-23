import shortcutListener, { type ShortcutT } from '@/Utils/shortcutListener';
import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import styles from './Button.module.css';

type ButtonProps = {
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => unknown;
  value?: string;
  children: React.ReactNode;
  disabled?: boolean;
  small?: boolean;
  shortcut?: ShortcutT;
}

function Button({ link, onClick, value, children, disabled, small, shortcut }: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const classNames = `${styles.button} ${small ? styles.small : ""}`;

  const setRef = useCallback((element: HTMLButtonElement | HTMLAnchorElement | null) => {
    btnRef.current = element;
    return () => { btnRef.current = null; };
  }, []);

  useEffect(() => {
    if (shortcut) {
      return shortcutListener(shortcut, () => btnRef.current?.click());
    }
  }, [shortcut]);

  return link ? (
    <Link
      className={classNames}
      onClick={disabled ? () => null : onClick}
      to={disabled ? '' : link}
      aria-disabled={disabled}
      ref={setRef}
    >
      {children}
    </Link>
  ) : (
    <button
      className={classNames}
      onClick={disabled ? () => null : onClick}
      value={value}
      disabled={disabled}
      aria-disabled={disabled}
      ref={setRef}
    >
      {children}
    </button>
  );
}
export default Button;
