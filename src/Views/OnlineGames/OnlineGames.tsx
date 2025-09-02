import Button from '@/Components/Button/Button';
import ButtonWrap from '@/Components/ButtonWrap/ButtonWrap';
import Lobby from '@/Components/Lobby/Lobby';
import { limits } from '@/conf';
import useKeyboardControl from '@/Hooks/useKeyboardControl';
import useLanguage from '@/Hooks/useLang';
import { OnlineGameT } from '@/Parsers/MultiData';
import styles from '@/Views/OnlineGames/OnlineGames.module.css';
import { useLocation } from 'wouter';

type GamesProps = {
  gameList: OnlineGameT[];
  onCreate: () => void;
  onJoin: (id: OnlineGameT['id']) => void;
}

function Games({ gameList, onCreate, onJoin }: GamesProps) {
  const [, navigate] = useLocation();
  const { l } = useLanguage();

  useKeyboardControl(
    () => navigate('/'),
    () => gameList.length < limits.ONLINE_GAMES && onCreate()
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.games}>{
        gameList.length < 1 ? (
          <span className={styles.info}>
            {l('noGames')}
          </span>
        ) : (
          gameList.slice(0, limits.ONLINE_GAMES).map(g => (
            <Lobby
              key={g.id}
              name={g.name}
              onSubmit={() => onJoin(g.id)}
            />
          ))
        )
      }</div>
      <ButtonWrap>
        <Button onClick={onCreate} disabled={gameList.length >= limits.ONLINE_GAMES}>
          {l('create')}
        </Button>
        <Button link='/'>{l('menu')}</Button>
      </ButtonWrap>
    </div>
  );
}
export default Games;
