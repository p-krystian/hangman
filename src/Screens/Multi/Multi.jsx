import Games from '../../Views/OnlineGames/OnlineGames'
import Create from '../../Views/CreateGame/CreateGame'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import Game from '../../Views/Game/Game'
import EndGame from '../../Views/EndGame/EndGame'
import GameContext from '../../Contexts/GameContext'
import { io } from "socket.io-client"
import { useState, useEffect, useRef, useCallback } from 'react'

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

  const createNewGame = useCallback(name => {
    if (gameList.length >= 6){
      setStage('lobby')
      return
    }
    socket.emit('create-game', name)
  }, [gameList])

  const winCallback = useCallback(() => {
    gameData.current.win = true
    socket.emit('end-game', gameData.current.entry)
  }, [])
  const loseCallback = useCallback(() => {
    gameData.current.win = false
    socket.emit('end-game', false)
  }, [])

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
      // setStage('loading')
    });
    socket.on('start-game', phrase => {
      gameData.current.entry = phrase
      setStage('game')
    });
    socket.on('game-data', data => {
      gameData.current.points = [data.wins, data.oWins]
      gameData.current.rounds = [data.rounds, data.oRounds]
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
          back={ () => setStage('lobby') }
          submit={ createNewGame }
        />
      ) : stage === 'phrase' ? (
        <WriteEntry
          nick={ 'przeciwnika' }
          next={ () => socket.emit('write-phrase', gameData.current.entry) }
        />
      ) : stage === 'game' ? (
        <Game
          onWin={ winCallback }
          onLose={ loseCallback }
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
