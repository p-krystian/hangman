import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Lobby from '@/Components/Lobby/Lobby';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useLanguage from '@/Hooks/useLang';
import GameType from '@/Types/OnlineGame';
import styles from '@/Views/OnlineGames/OnlineGames.module.css';
import { useLocation } from 'wouter';

interface GamesProps {
  gameList: GameType[];
  onCreate: () => void;
  onJoin: (id: string) => void;
}

function Games({ gameList, onCreate, onJoin }: GamesProps) {
  const [, navigate] = useLocation();
  const { l } = useLanguage();

  useKeyboardControl(
    () => navigate('/'),
    () => gameList.length < 6 && onCreate()
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.games}>{
        gameList.length < 1 ? (
          <span className={styles.info}>
            {l('noGames')}
          </span>
        ) : (
          gameList.slice(0, 6).map(g => (
            <Lobby
              key={g.id}
              name={g.name}
              submit={() => onJoin(g.id)}
            />
          ))
        )
      }</div>
      <ButtonWrap>
        <Button onClick={onCreate} disabled={gameList.length >= 6}>
          {l('create')}
        </Button>
        <Button link='/'>{l('menu')}</Button>
      </ButtonWrap>
    </div>
  );
}
export default Games;
