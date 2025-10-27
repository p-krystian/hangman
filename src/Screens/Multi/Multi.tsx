import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocation } from 'wouter';
import Alert from '@/Components/Confirm/Confirm';
import GameContext, { MultiGameContext } from '@/Contexts/GameContext';
import { appVersion, env, limits, sioInEvents as sIn, sioOutEvents as sOut } from '@/conf';
import useLanguage from '@/Hooks/useLang';
import type { InEventsT, OnlineGameT, OutEventsT } from '@/Parsers/MultiData';
import { parseGameData, parseOnlineGame, parsePhrase } from '@/Parsers/MultiData';

import Connecting from '@/Views/Connecting/Connecting';
import Create from '@/Views/CreateGame/CreateGame';
import EndGame from '@/Views/EndGame/EndGame';
import Game from '@/Views/Game/Game';
import Games from '@/Views/OnlineGames/OnlineGames';
import Waiting from '@/Views/Waiting/Waiting';
import WritePhrase from '@/Views/WritePhrase/WritePhrase';

type MultiStage = 'connecting' | 'lobby' | 'create' | 'phrase' | 'game' | 'result' | 'waiting';
type AlertT = Pick<Parameters<typeof Alert>[0], 'children' | 'confirm'>;

const initialData: Omit<MultiGameContext, 'nicks'> = {
  phrase: '?',
  points: [0, 0],
  prevPoints: [0, 0],
  rounds: [0, 0],
  prevRounds: [0, 0],
  win: false
};

function Multi() {
  const { l, currentLang } = useLanguage();
  const [, navigate] = useLocation();
  const socket: Socket<InEventsT, OutEventsT> = useMemo(
    () =>
      io(env.SOCKET_URL, {
        autoConnect: false,
        path: env.SOCKET_PATH,
        query: {
          version: appVersion,
          language: currentLang
        }
      }),
    [currentLang]
  );

  const [stage, setStage] = useState<MultiStage>('connecting');
  const [gameList, setGameList] = useState<OnlineGameT[]>([]);
  const [alert, setAlert] = useState<AlertT | null>(null);
  const opponentExited = useRef(false);
  const [gameData, setGameData] = useState<MultiGameContext>({
    ...initialData,
    nicks: [l('you'), l('opponent')]
  });

  const setExitAlert = useCallback(
    (content: string) =>
      setAlert({
        children: content,
        confirm: () => navigate('/')
      }),
    [navigate]
  );
  const onCreateGame = useCallback(
    (name: string) => {
      if (gameList.length >= limits.ONLINE_GAMES) {
        setAlert({
          children: l('maxGames'),
          confirm: () => setAlert(null)
        });
        return;
      }
      socket.emit(sOut.CREATE_GAME, name);
    },
    [socket, gameList, l]
  );
  const nextRound = opponentExited.current
    ? () => socket.emit(sOut.JOIN_LOBBY)
    : gameData.rounds[0] !== gameData.rounds[1]
      ? null
      : () => socket.emit(sOut.NEXT_ROUND);

  useEffect(() => {
    function onConnect() {
      setTimeout(() => socket.emit(sOut.JOIN_LOBBY), 400);
      setAlert(current =>
        current?.children === l('serverDisconnect')
          ? { children: l('serverReconnected'), confirm: () => setAlert(null) }
          : current
      );
    }
    async function onStartGame(phrase: unknown) {
      const res = await parsePhrase(phrase);
      if (!res.success) {
        return setExitAlert(l('serverDataInvalid'));
      }
      setGameData(cGD => ({ ...cGD, phrase: res.data }));
      setStage('game');
    }
    async function onGameData(data: unknown) {
      const res = await parseGameData(data);
      if (!res.success) {
        return setExitAlert(l('serverDataInvalid'));
      }
      setGameData(cGD => ({
        ...cGD,
        win: cGD.rounds[0] === res.data.rounds ? cGD.win : res.data.wins > cGD.points[0],
        points: [res.data.wins, res.data.oWins],
        prevPoints: cGD.points,
        rounds: [res.data.rounds, res.data.oRounds],
        prevRounds: cGD.rounds
      }));
      setStage('result');
    }

    socket.on(sIn.UNSUPPORTED_LANG, () => setExitAlert(l('unsupportedLang')));
    socket.on(sIn.OLD_VERSION, () => setExitAlert(l('oldVersion')));
    socket.on(sIn.WAIT_START, () => setStage('waiting'));
    socket.on(sIn.GIVE_PHRASE, () => setStage('phrase'));
    socket.on(sIn.START_GAME, onStartGame);
    socket.on(sIn.GAME_DATA, onGameData);
    socket.on('connect', onConnect);
    socket.on('disconnect', () => setExitAlert(l('serverDisconnect')));
    socket.on('connect_error', () => {
      console.clear();
      console.warn('Online server connection error');
    });

    socket.connect();

    return () => {
      socket.off(sIn.UNSUPPORTED_LANG);
      socket.off(sIn.OLD_VERSION);
      socket.off(sIn.WAIT_START);
      socket.off(sIn.GIVE_PHRASE);
      socket.off(sIn.START_GAME);
      socket.off(sIn.GAME_DATA);
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');

      socket.disconnect();
    };
  }, [socket, l, setExitAlert]);

  useEffect(() => {
    async function getGameList(games: unknown) {
      const gameList: OnlineGameT[] = [];
      if (!Array.isArray(games)) {
        return gameList;
      }
      for (const game of games) {
        const res = await parseOnlineGame(game);
        if (res.success) {
          gameList.push(res.data);
        }
      }
      return gameList;
    }
    async function onGameList(games: unknown) {
      setGameList(await getGameList(games));
      if (stage !== 'create') {
        opponentExited.current = false;
        setGameData(cGD => ({ ...cGD, ...initialData }));
        setStage('lobby');
      }
    }
    function onOpponentExit() {
      opponentExited.current = true;
      setAlert({
        children: l('opponentExit'),
        confirm: () => {
          setAlert(null);
          if (stage !== 'result') {
            socket.emit(sOut.JOIN_LOBBY);
          }
        }
      });
    }

    socket.on(sIn.GAME_LIST, onGameList);
    socket.on(sIn.OPPONENT_EXIT, onOpponentExit);

    return () => {
      socket.off(sIn.GAME_LIST);
      socket.off(sIn.OPPONENT_EXIT);
    };
  }, [socket, stage, l]);

  return (
    <GameContext value={gameData}>
      {stage === 'connecting' ? (
        <Connecting />
      ) : stage === 'lobby' ? (
        <Games
          gameList={gameList}
          onJoin={id => socket.emit(sOut.JOIN_GAME, id)}
          onCreate={() => setStage('create')}
        />
      ) : stage === 'create' ? (
        <Create goBack={() => setStage('lobby')} goNext={onCreateGame} />
      ) : stage === 'phrase' ? (
        <WritePhrase nick={l('opponents')} goNext={p => socket.emit(sOut.WRITE_PHRASE, p)} />
      ) : stage === 'game' ? (
        <Game
          onWin={() => socket.emit(sOut.END_ROUND, gameData.phrase)}
          onLose={() => socket.emit(sOut.END_ROUND, '')}
        />
      ) : stage === 'result' ? (
        <EndGame goNext={nextRound} />
      ) : (
        <Waiting goCancel={() => socket.emit(sOut.JOIN_LOBBY)} />
      )}
      {!!alert && <Alert {...alert} />}
    </GameContext>
  );
}

export default Multi;
