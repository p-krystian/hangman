import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import styles from './Button.module.css';

const shortcutKeys = {
  cancel: new Set(['escape']),
  accept: new Set(['enter']),
  prev: new Set(['arrowup', 'arrowleft']),
  next: new Set(['arrowdown', 'arrowright'])
} as const;

type ButtonProps = {
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => unknown;
  value?: string;
  children: React.ReactNode;
  disabled?: boolean;
  small?: boolean;
  shortcut?: keyof typeof shortcutKeys;
}

function Button({ link, onClick, value, children, disabled, small, shortcut }: ButtonProps) {
  const btnRef = useRef<HTMLElement>(null);
  const classNames = `${styles.button} ${small ? styles.small : ""}`;

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      const code = e.key.toLowerCase();
      if (!shortcut || !e.ctrlKey || !shortcutKeys[shortcut].has(code)){
        return;
      }
      e.preventDefault();
      btnRef.current?.click();
    }

    if (shortcut){
      window.addEventListener('keyup', listener);
    }
    return () => window.removeEventListener('keyup', listener);
  }, [shortcut]);

  return link ? (
    <Link
      className={classNames}
      onClick={disabled ? () => null : onClick}
      to={disabled ? '' : link}
      aria-disabled={disabled}
      ref={btnRef as React.RefObject<HTMLAnchorElement>}
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
      ref={btnRef as React.RefObject<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
export default Button;
