import './Header.css'
import logo from '../../Assets/Images/logo.svg'

function Header(){
  return(
    <header className='header'>
      <img alt='Wisielec' src={ logo } />
    </header>
  )
}
export default Header
