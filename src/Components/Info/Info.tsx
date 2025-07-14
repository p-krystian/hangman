import { env, appVersion } from '@/conf';
import useLanguage from '../../Hooks/useLanguage';
import styles from './Info.module.css';

function Info() {
  const [l] = useLanguage();

  return (
    <div className={ styles.info }>
      {l('info')}
      <br /><br />
      <p>
        { `v${appVersion} - ` }
        <a href={ env.AUTHOR_URL } target="_blank" rel="noreferrer">
          { l('signature') }
        </a>
      </p>
    </div>
  );
}
export default Info;
