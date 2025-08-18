import AppContext from '@/Contexts/AppContext';
import useLanguage from '@/Hooks/useLang';
import { useContext, useImperativeHandle } from 'react';
import styles from './Volume.module.css';

function Volume({ ref }: { ref: React.ForwardedRef<{ click: () => void }> }) {
  const { volume, setVolume } = useContext(AppContext);
  const { l } = useLanguage();

  const levels = [
    <path d="m 13,2 c 0,0 5,6 0,12" fill="none" stroke="currentColor" strokeWidth="1.2" key="v1" />,
    <path d="m 11.5,3.5 c 0,0 3,4 0,9" fill="none" stroke="currentColor" strokeWidth="1.2" key="v2" />,
    <path d="m 9.5,5 c 0,0 2,3 0,6" fill="none" stroke="currentColor" strokeWidth="1.2" key="v3" />
  ];

  useImperativeHandle(ref, () => ({
    click: () => setVolume((volume > 2 ? 0 : volume + 1) as typeof volume),
  }), [volume, setVolume]);

  return (
    <svg viewBox="0 0 16 16" className={styles.icon}>
      <title>{l('volumeWord')}</title>
      <path fill="currentColor" d="M 7.7,0 C 7.5,0 7.3,0 7.1,0.2 L 3.3,4.4 H 0.5 C 0.2,4.4 2.8e-5,4.6 0,4.9 v 6.9 c 2.8e-5,0.3 0.2,0.5 0.5,0.5 h 2.8 l 3.9,3.6 C 7.5,16.2 8,15.9 8,15.5 V 0.5 C 8,0.3 7.9,0.1 7.7,0 Z" />
      {volume === 0 ? (
        <>
          <line x1="11" y1="6" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <line x1="15" y1="6" x2="11" y2="10" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : (
        levels.splice(volume * (-1))
      )}
    </svg>
  );
}
export default Volume;
