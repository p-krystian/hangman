import useLanguage from '@/Hooks/useLang';
import './Header.css';

function Header() {
  const { l, langData } = useLanguage();
  return (
    <header className="header">
      <title>{l('title')}</title>
      <img alt={l('hangman')} src={langData.logo} />
    </header>
  );
}
export default Header;
