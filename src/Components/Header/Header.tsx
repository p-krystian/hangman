import './Header.css'
import useLanguage from '../../Hooks/useLanguage'

function Header(){
  const [l, extraLang] = useLanguage()
  return(
    <header className='header'>
      <img alt={ l('hangman') } src={ extraLang().logo } />
    </header>
  )
}
export default Header
