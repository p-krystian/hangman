import Button from '@/Components/Button/Button';
import useLanguage from '@/Hooks/useLang';
import styles from './Lobby.module.css';

type LobbyProps = {
  name: string;
  onSubmit: () => unknown;
}

function Lobby({ name, onSubmit }: LobbyProps) {
  const { l } = useLanguage();

  return (
    <div className={styles.lobby}>
      <p>{name}</p>
      <Button onClick={onSubmit} small>
        {l('join')}
      </Button>
    </div>
  );
}
export default Lobby;
