const appVersion = __APP_VERSION__ || 'VER';
const mainLang = 'pl';
const startVol = 2;

const env = {
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
  SOCKET_PATH: import.meta.env.VITE_SOCKET_PATH,
  EXIT_URL: import.meta.env.VITE_EXIT_URL,
  AUTHOR_URL: import.meta.env.VITE_AUTHOR_URL,
  STORAGE_PREFIX: import.meta.env.VITE_STORAGE_PREFIX
} as const;

const limits = {
  PHRASE_MIN: 3,
  PHRASE_MAX: 20,
  NICK_MIN: 3,
  NICK_MAX: 12,
  ONLINE_GAMES: 6
} as const;

enum keysLS {
  VOLUME = 'volume',
  LANG = 'language'
};

enum sioOutEvents {
  JOIN_LOBBY = 'join-lobby',
  CREATE_GAME = 'create-game',
  JOIN_GAME = 'join-game',
  WRITE_PHRASE = 'write-phrase',
  END_ROUND = 'end-round',
  NEXT_ROUND = 'next-round',
};

enum sioInEvents {
  GAME_LIST = 'game-list',
  WAIT_START = 'wait-start',
  GIVE_PHRASE = 'give-phrase',
  START_GAME = 'start-game',
  GAME_DATA = 'game-data',
  OPPONENT_EXIT = 'opponent-exit',
  OLD_VERSION = 'old-version',
  UNSUPPORTED_LANG = 'unsupported-lang',
  INVALID_DATA = 'invalid-data',
};

export { appVersion, mainLang, startVol, env, limits, keysLS, sioOutEvents, sioInEvents };
