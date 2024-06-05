import './Header.css'
import useLanguage from '../../Hooks/useLanguage'

function Header(){
  const [l, extra] = useLanguage()
  return(
    <header className='header'>
      <img alt={ l('hangman') } src={ extra('logo') } />
    </header>
  )
}
export default Header
