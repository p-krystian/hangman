import { useEffect } from 'react';

const root = document.getElementById('root')!;

const onKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey) {
    root.classList.add('control');
  }
};
const onKeyUp = (e: KeyboardEvent) => {
  if (e.key.toLowerCase() === 'control') {
    root.classList.remove('control');
  }
};

const useControlKey = () =>
  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener('keydown', onKeyDown, { signal: controller.signal });
    window.addEventListener('keyup', onKeyUp, { signal: controller.signal });

    return () => {
      controller.abort();
      root.classList.remove('control');
    };
  }, []);

export default useControlKey;
