import { useContext } from 'react';
import AppContext from '@/Contexts/AppContext';
import { VolumeT } from '@/Parsers/Volume';

const nextVolume = (currentVol: VolumeT) => (currentVol > 2 ? 0 : currentVol + 1) as VolumeT;

function useVolumeControl() {
  const { setVolume } = useContext(AppContext);

  return {
    nextVolume: () => setVolume(nextVolume)
  };
}

export default useVolumeControl;
