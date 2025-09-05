import * as files from '@/Assets/Sounds';
import { useContext, useCallback } from 'react';
import AppContext from '@/Contexts/AppContext';
import preload from '@/Utils/preload';

for (const fileSrc of Object.values(files)) {
  preload(fileSrc, 'audio');
}

function usePlayer() {
  const { volume } = useContext(AppContext);

  const play = useCallback((name: keyof typeof files) => {
    if (volume < 1) {
      return;
    }

    const src = files[name];
    const audio = new Audio(src);
    audio.load();
    audio.volume = volume * 0.2;
    audio.play().catch(() => 'Silent pass');
  }, [volume]);

  return play;
}
export default usePlayer;
