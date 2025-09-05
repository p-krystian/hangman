import { availableLangs } from '@/Assets/Langs';
import InfoSymbol from '@/Assets/Symbols/info.svg?react';
import Button from '@/Components/Button/Button';
import Confirm from '@/Components/Confirm/Confirm';
import Info from '@/Components/Info/Info';
import VolumeIcon from '@/Components/VolumeIcon/VolumeIcon';
import { env } from '@/conf';
import useLanguage from '@/Hooks/useLang';
import useVolumeControl from '@/Hooks/useVolumeControl';
import { memo, useEffect, useState } from 'react';
import styles from './Start.module.css';

let timeoutID: ReturnType<typeof setTimeout>;

function MenuStart() {
  const { nextVolume } = useVolumeControl();
  const [showInfo, setShowInfo] = useState(false);
  const [changingLang, setChangingLang] = useState(false);
  const { l, langData, currentLang, setLang } = useLanguage();

  function nextLanguage() {
    const allLangs = availableLangs;
    const currentIndex = allLangs.indexOf(currentLang);
    const nextLang = allLangs[currentIndex + 1] || allLangs[0];
    timeoutID = setTimeout(() => setChangingLang(true), 50);
    setLang(nextLang);
  }

  function exit() {
    window.close();
    location.href = env.EXIT_URL;
  }

  useEffect(() => {
    clearTimeout(timeoutID);
    setChangingLang(false);

    return () => clearTimeout(timeoutID);
  }, [currentLang]);

  return (
    <div className={styles.buttons}>
      <div className={styles.small}>
        <Button
          onClick={nextVolume}
          value={l('volumeWord')}
          small
        >
          <VolumeIcon />
        </Button>
        <Button
          onClick={() => setShowInfo(true)}
          value={l('infoWord')}
          small
        >
          <InfoSymbol
            title={l('infoWord')}
            name={l('infoWord')}
            aria-label={l('infoWord')}
          />
        </Button>
        <Button
          onClick={() => nextLanguage()}
          value={l('languageWord')}
          disabled={changingLang}
          small
        >
          <img src={langData.flag} alt={langData.short} />
        </Button>
      </div>
      <Button link='/single'>{l('single')}</Button>
      <Button link='/local'>{l('local')}</Button>
      <Button link='/multi'>{l('online')}</Button>
      <Button onClick={exit}>{l('exit')}</Button>

      {showInfo && (
        <Confirm confirm={() => setShowInfo(false)} long>
          <Info />
        </Confirm>
      )}
    </div>
  );
}
export default memo(MenuStart);
