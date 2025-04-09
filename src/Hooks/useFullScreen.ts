function useFullScreen(){
  const root = document.getElementById('root')!;
  let lastWindowH = 0;

  const setFull = () => {
    if (root.classList.contains('full') && window.innerHeight < lastWindowH)
      return;

    if (root.offsetHeight > window.innerHeight){
      lastWindowH = window.innerHeight + 25;
      root.classList.add('full');
    }
    else
      root.classList.remove('full');
  };
  setFull();
  window.addEventListener('resize', setFull);

  return () => {
    window.removeEventListener('resize', setFull);
    root.classList.remove('full');
  };
}

export default () => useFullScreen;
