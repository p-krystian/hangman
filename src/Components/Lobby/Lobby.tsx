import Button from '@/Components/Button/Button';
import useLanguage from '@/Hooks/useLang';
import styles from './Lobby.module.css';

type LobbyProps = {
  name: string;
  onSubmit: () => unknown;
  shortcut?: Parameters<typeof Button>[0]['shortcut'];
};

function Lobby({ name, onSubmit, shortcut }: LobbyProps) {
  const { l } = useLanguage();

  return (
    <div className={styles.lobby}>
      <p>{name}</p>
      <Button onClick={onSubmit} shortcut={shortcut} small>
        {l('join')}
      </Button>
    </div>
  );
}
export default Lobby;
