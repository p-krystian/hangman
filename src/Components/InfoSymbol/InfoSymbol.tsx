import useLanguage from '@/Hooks/useLanguage';

function InfoSymbol(){
  const [l] = useLanguage();

  return (
    <svg viewBox="0 0 64 64" style={ {height: '100%'} }>
      <title>{ l('infoWord') }</title>
      <circle r="28" cx="32" cy="32" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle r="5" cx="32" cy="20" fill="currentColor" />
      <line x1="32" y1="30" x2="32" y2="50" stroke="currentColor" strokeWidth="6" />
    </svg>
  );
}
export default InfoSymbol;
