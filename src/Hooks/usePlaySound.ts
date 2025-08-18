import files from '@/Assets/Sounds';
import { useContext } from 'react';
import AppContext from '@/Contexts/AppContext';

for (const file of Object.values(files)) {
  const audio = new Audio(file);
  audio.load();
  audio.volume = 10 ** -6;
  audio.autoplay = true;
  audio.play().catch(() => 'Don\'t throw error');
}

function usePlaySound(name: string) {
  const { volume } = useContext(AppContext);

  if (!Object.keys(files).includes(name) || volume < 1) {
    return;
  }
  const src = files[name as keyof typeof files];
  const audio = new Audio(src);
  audio.load();
  audio.volume = volume * 0.2;
  audio.play().catch(() => 'Don\'t throw error');
}
export default () => usePlaySound;
