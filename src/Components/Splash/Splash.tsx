import { useEffect } from 'react';

const splashElement = document.getElementById('splash')!;

function Splash() {
  useEffect(() => {
    splashElement.classList.remove('hide');
    return () => {
      splashElement.classList.add('hide');
    };
  }, []);

  return null;
}

export default Splash;
