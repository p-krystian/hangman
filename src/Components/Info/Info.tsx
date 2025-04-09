import useLanguage from '../../Hooks/useLanguage';
import styles from './Info.module.css';

function Info(){
  const [l] = useLanguage();
  const version = import.meta.env.VITE_APP_VERSION;
  const authorURL = import.meta.env.VITE_AUTHOR_URL;

  return(
    <div className={ styles.info }>
      { l('info') }
      <br/><br/>
      <p>
        { `v${version} - ` }
        <a href={ authorURL } target="_blank" rel="noreferrer">
          { l('signature') }
        </a>
      </p>
    </div>
  );
}
export default Info;
