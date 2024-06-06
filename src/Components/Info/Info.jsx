import useLanguage from '../../Hooks/useLanguage'
import styles from './Info.module.css'

function Info(){
  const [l] = useLanguage()
  const authorURL = import.meta.env.VITE_AUTHOR_URL

  return(
    <div className={ styles.info }>
      { l('info') }
      <br/><br/>
      <p>
        <a href={ authorURL } target="_blank">
          { l('signature') }
        </a>
      </p>
    </div>
  )
}
export default Info
