import Games from '../../Views/OnlineGames/OnlineGames'
import Create from '../../Views/CreateGame/CreateGame'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import { io } from "socket.io-client"
import { useState, useEffect } from 'react'

const socket = io('http://127.0.0.1:8090');

function MultiPlayer(){
  const [stage, setStage] = useState('loading')
  const [gameList, setGameList] = useState([])

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => socket.emit('join-lobby'))

    socket.on('game-list', games => {
      setGameList(games)
      setStage('games')
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
      setStage('game')
    });
    socket.on('game-data', data => {
      console.log(data)
      setStage('result')
    })

    return () => socket.disconnect()
  }, [])

  return (
    stage === 'loading' ? (
      <h2>Ładowanie</h2>
    ) : stage === 'games' ? (
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
        nick={ 'Przeciwnika' }
      />
    ) : (
      <h2>Czekanie na przeciwnika</h2>
    )
  )
}

export default MultiPlayer
