import Games from '@/Views/OnlineGames/OnlineGames';
import Create from '@/Views/CreateGame/CreateGame';
import WriteEntry from '@/Views/WriteEntry/WriteEntry';
import Game from '@/Views/Game/Game';
import EndGame from '@/Views/EndGame/EndGame';
import Connecting from '@/Views/Connecting/Connecting';
import Waiting from '@/Views/Waiting/Waiting';
import Alert from '@/Components/Confirm/Confirm';
import GameContext, { GameContextType } from '@/Contexts/GameContext';
import GameType from '@/Types/OnlineGame';
import useLanguage, { getCurrentCode } from '@/Hooks/useLanguage';
import { io } from 'socket.io-client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { appVersion, env, sioInEvents as sIn, sioOutEvents as sOut } from '@/conf';

const socket = io(env.SOCKET_URL, {
  autoConnect: false,
  path: env.SOCKET_PATH,
  query: {
    version: appVersion,
    language: getCurrentCode()
  }
});

interface AlertType{
  children: React.ReactNode;
  confirm: () => void;
}

function MultiPlayer(){
  const [l] = useLanguage();
  const navigate = useNavigate();
  const [stage, setStage] = useState('connecting');
  const [gameList, setGameList] = useState<GameType[]>([]);
  const [resultKey, setResultKey] = useState('r-1-1');
  const [alert, setAlert] = useState<AlertType | null>(null);
  const opponentExit = useRef(false);
  const initialData = useMemo<GameContextType>(() => ({
    entry: '',
    nicks: [l('you'), l('opponent')],
    points: [0, 0],
    prevPoints: [0, 0],
    rounds: [0, 0],
    prevRounds: [0, 0],
    win: false
  }), [l]);
  const gameData = useRef<GameContextType>({...initialData});

  const backupData = useCallback(() => {
    gameData.current.prevPoints = [...gameData.current.points];
    gameData.current.prevRounds = [...gameData.current.rounds];
  }, []);

  const createNewGame = useCallback((name: string) => {
    if (gameList.length >= 6){
      setAlert({
        children: l('maxGames'),
        confirm: () => setAlert(null)
      });
      return;
    }
    socket.emit(sOut.CREATE_GAME, name);
  }, [gameList, l]);

  const winCallback = useCallback(() => {
    gameData.current.win = true;
    socket.emit(sOut.END_ROUND, gameData.current.entry);
  }, []);
  const loseCallback = useCallback(() => {
    gameData.current.win = false;
    socket.emit(sOut.END_ROUND, false);
  }, []);

  const nextRound = useMemo(() => {
    if (opponentExit.current){
      return () => socket.emit(sOut.JOIN_LOBBY);
    }
    if (gameData.current.rounds[0] !== gameData.current.rounds[1]){
      return () => {};
    }

    return () => socket.emit(sOut.NEXT_ROUND);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultKey, l]);

  const onOpponentExit = useCallback(() => {
    backupData();
    opponentExit.current = true;
    setResultKey('r-0-0');
    setAlert({
      children: l('opponentExit'),
      confirm: () => {
        setAlert(null);
        if (stage !== 'result'){
          socket.emit(sOut.JOIN_LOBBY);
        }
      }
    });
  }, [stage, l, backupData]);

  const exitAlert = useCallback((content: string) => {
    setAlert({
      children: content,
      confirm: () => {
        setAlert(null);
        navigate('/');
      }
    });
  }, [navigate]);

  useEffect(() => {
    const cleanup = () => {
      socket.off(sIn.OPPONENT_EXIT, onOpponentExit);
    };

    socket.on(sIn.OPPONENT_EXIT, onOpponentExit);
    return cleanup;
  }, [onOpponentExit]);

  useEffect(() => {
    const cleanup = () => {
      socket.off('game-list');
    };

    socket.on('game-list', games => {
      setGameList(games);
      if (stage !== 'create'){
        setResultKey('r-1-1');
        opponentExit.current = false;
        setStage('lobby');
        gameData.current = {...initialData};
      }
    });
    return cleanup;
  }, [stage, initialData]);

  useEffect(() => {
    socket.on('connect', () => {
      setTimeout(() => {
        socket.emit(sOut.JOIN_LOBBY);
      }, 300);
      setAlert(current => (
        current?.children === l('serverDisconnect') ? {
          children: l('serverReconnected'),
          confirm: () => setAlert(null)
        } : current
      ));
    });
    socket.on('disconnect', () => exitAlert(l('serverDisconnect')));
    socket.on(sIn.UNSUPPORTED_LANG, () => exitAlert(l('unsupportedLang')));
    socket.on(sIn.OLD_VERSION, () => exitAlert(l('oldVersion')));
    socket.on('connect_error', () => {
      console.clear();
      console.warn('Online server connection error');
    });
    socket.connect();

    socket.on(sIn.WAIT_START, () => setStage('waiting'));
    socket.on(sIn.GIVE_PHRASE, () => setStage('phrase'));
    socket.on(sIn.START_GAME, phrase => {
      gameData.current.entry = phrase;
      setStage('game');
    });
    socket.on(sIn.GAME_DATA, data => {
      backupData();
      gameData.current.points = [data.wins, data.oWins];
      gameData.current.rounds = [data.rounds, data.oRounds];
      setResultKey(`r-${data.rounds+1}-${data.oRounds+1}`);
      setStage('result');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(sIn.UNSUPPORTED_LANG);
      socket.off(sIn.OLD_VERSION);
      socket.off('connect_error');
      socket.off(sIn.WAIT_START);
      socket.off(sIn.GIVE_PHRASE);
      socket.off(sIn.START_GAME);
      socket.off(sIn.GAME_DATA);
      socket.disconnect();
    };
  }, [backupData, exitAlert, l]);

  return (
    <GameContext.Provider value={ gameData.current }>{
      stage === 'connecting' ? (
        <Connecting />
      ) : stage === 'lobby' ? (
        <Games
          gameList={ gameList }
          onJoin={ id => socket.emit(sOut.JOIN_GAME, id) }
          onCreate={ () => setStage('create') }
        />
      ) : stage === 'create' ? (
        <Create
          back={ () => setStage('lobby') }
          submit={ createNewGame }
        />
      ) : stage === 'phrase' ? (
        <WriteEntry
          nick={ l('opponents') }
          next={ () => socket.emit(sOut.WRITE_PHRASE, gameData.current.entry) }
        />
      ) : stage === 'game' ? (
        <Game
          onWin={ winCallback }
          onLose={ loseCallback }
        />
      ) : stage === 'result' ? (
        <EndGame
          pointsID={ resultKey }
          next={ nextRound }
        />
      ) : (
        <Waiting abort={
          () => socket.emit(sOut.JOIN_LOBBY)
        }/>
      )
    }
    {!!alert && <Alert { ...alert } />}
    </GameContext.Provider>
  );
}

export default MultiPlayer;
