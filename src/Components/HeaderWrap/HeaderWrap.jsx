import Header from '../Header/Header'
import styles from './HeaderWrap.module.css'

function HeaderWrap({ children }){
  return (
    <div className={ styles.wrapper }>
      <Header />
      <section className={ styles.content }>
        { children }
      </section>
    </div>
  )
}

export default HeaderWrap
