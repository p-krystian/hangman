import LeftSymbol from '@/Assets/Symbols/left.svg?react';
import RightSymbol from '@/Assets/Symbols/right.svg?react';
import EnterSymbol from '@/Assets/Symbols/enter.svg?react';
import CancelSymbol from '@/Assets/Symbols/cancel.svg?react';

import { binds } from '@/conf';
import styles from './KeyIndicator.module.css';

type KeyIndicatorProps = {
  shortcut: keyof typeof binds;
};

const overwrites: Readonly<Partial<Record<keyof typeof binds, ComponentSVGR>>> = {
  PREV: LeftSymbol,
  NEXT: RightSymbol,
  ACCEPT: EnterSymbol,
  CANCEL: CancelSymbol
} as const;

function KeyIndicator({ shortcut }: KeyIndicatorProps) {
  const Symbol = overwrites[shortcut];

  return (
    <div className={styles.indicator}>
      {Symbol ? (
        <Symbol name={binds[shortcut]} title={binds[shortcut]} />
      ) : (
        binds[shortcut]
      )}
    </div>
  );
}
export default KeyIndicator;
