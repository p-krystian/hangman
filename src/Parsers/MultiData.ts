import * as z from 'zod/mini';
import { sioInEvents as sIn, sioOutEvents as sOut } from '@/conf';

const PhraseSchema = z.string();
type PhraseT = z.infer<typeof PhraseSchema>;
const parsePhrase = PhraseSchema.parse;

const OnlineGameSchema = z.object({
  id: z.string(),
  name: z.string()
});
const OnlineGamesSchema = z.array(OnlineGameSchema);
type OnlineGameT = z.infer<typeof OnlineGameSchema>;
const parseOnlineGame = OnlineGameSchema.parse;
const parseOnlineGames = OnlineGamesSchema.parse;

const GameData = z.object({
  wins: z.number().check(z.gte(0)),
  rounds: z.number().check(z.gte(0)),
  oWins: z.number().check(z.gte(0)),
  oRounds: z.number().check(z.gte(0))
});
type GameDataT = z.infer<typeof GameData>;
const parseGameData = GameData.parse;

type OutEventsT = {
  [sOut.JOIN_LOBBY]: () => void;
  [sOut.CREATE_GAME]: (name: string) => void;
  [sOut.JOIN_GAME]: (id: string) => void;
  [sOut.WRITE_PHRASE]: (phrase: string) => void;
  [sOut.END_ROUND]: (phrase: string) => void;
  [sOut.NEXT_ROUND]: () => void;
};

type InEventsT = {
  [sIn.GAME_LIST]: (games: OnlineGameT[] /*| unknown*/) => void;
  [sIn.WAIT_START]: () => void;
  [sIn.GIVE_PHRASE]: () => void;
  [sIn.START_GAME]: (phrase: PhraseT /*| unknown*/) => void;
  [sIn.GAME_DATA]: (data: GameDataT /*| unknown*/) => void;
  [sIn.OPPONENT_EXIT]: () => void;
  [sIn.OLD_VERSION]: () => void;
  [sIn.UNSUPPORTED_LANG]: () => void;
  [sIn.INVALID_DATA]: () => void;
};

export {
  parsePhrase, type PhraseT,
  parseOnlineGame, parseOnlineGames, type OnlineGameT,
  parseGameData, type GameDataT,
  type OutEventsT, type InEventsT
};
