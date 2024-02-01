import Games from '../../Views/OnlineGames/OnlineGames'
import Create from '../../Views/CreateGame/CreateGame'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import Game from '../../Views/Game/Game'
import EndGame from '../../Views/EndGame/EndGame'
import GameContext from '../../Contexts/GameContext'
import { io } from "socket.io-client"
import { useState, useEffect, useRef } from 'react'

const socket = io('http://127.0.0.1:8090');

function MultiPlayer(){
  const [stage, setStage] = useState('loading')
  const [gameList, setGameList] = useState([])
  const gameData = useRef({
    entry: '',
    nicks: ['Ty', 'Przeciwnik'],
    points: [0, 0],
    rounds: [0, 0],
    win: false
  })

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => socket.emit('join-lobby'))

    socket.on('game-list', games => {
      setGameList(games)
      setStage('lobby')
    })
    socket.on('wait-start', () => {
      setStage('waiting')
    })
    socket.on('give-phrase', () => {
      setStage('phrase')
    });
    socket.on('opponent-exit', () => {
      console.log('opponent - exit')
      setStage('loading')
    });
    socket.on('start-game', phrase => {
      gameData.current.entry = phrase
      setStage('game')
    });
    socket.on('game-data', data => {
      gameData.current.points[0] = data.wins
      gameData.current.points[1] = data.oWins
      gameData.current.rounds[0] = data.rounds
      gameData.current.rounds[1] = data.oRounds
      setStage('result')
    })

    return () => socket.disconnect()
  }, [])

  return (
    <GameContext.Provider value={ gameData.current }>{
      stage === 'loading' ? (
        <h2>Ładowanie</h2>
      ) : stage === 'lobby' ? (
        <Games
          gameList={ gameList }
          onJoin={ id => socket.emit('join-game', id) }
          onCreate={ () => setStage('create') }
        />
      ) : stage === 'create' ? (
        <Create
          back={ () => setStage('games') }
          submit={ name => socket.emit('create-game', name) }
        />
      ) : stage === 'phrase' ? (
        <WriteEntry
          nick={ 'PRZECIWNIKA' }
          next={ () => socket.emit('write-phrase', gameData.current.entry) }
        />
      ) : stage === 'game' ? (
        <Game
          onWin={ () => socket.emit('end-game', gameData.current.entry) }
          onLose={ () => socket.emit('end-game', false) }
        />
    ) : stage === 'result' ? (
        <EndGame
          next={ () => socket.emit('join-lobby') }
        />
      ) : (
        <h2>Czekanie na przeciwnika</h2>
      )
    }</GameContext.Provider>
  )
}

export default MultiPlayer
