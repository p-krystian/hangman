import { appVersion, env } from '@/conf';
import useLanguage from '@/Hooks/useLang';
import styles from './Info.module.css';

function Info() {
  const { l } = useLanguage();

  return (
    <div className={styles.info}>
      {l('info')}
      <br />
      <br />
      <p>
        {`v${appVersion} - `}
        <a href={env.AUTHOR_URL} target="_blank" rel="noreferrer">
          {'by Krystian Piątek'}
        </a>
      </p>
    </div>
  );
}
export default Info;
