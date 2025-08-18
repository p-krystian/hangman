import Button from '@/Components/Button/Button';
import useLanguage from '@/Hooks/useLang';
import styles from './Lobby.module.css';

type LobbyProps = {
  name: string;
  submit: () => void;
}

function Lobby({ name, submit }: LobbyProps) {
  const { l } = useLanguage();

  return (
    <div className={styles.lobby}>
      <span>{name}</span>
      <Button small={true} onClick={submit}>
        {l('join')}
      </Button>
    </div>
  );
}
export default Lobby;
