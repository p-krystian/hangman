import Games from '../../Views/OnlineGames/OnlineGames'
import Create from '../../Views/CreateGame/CreateGame'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import Game from '../../Views/Game/Game'
import EndGame from '../../Views/EndGame/EndGame'
import Connecting from '../../Views/Connecting/Connecting'
import Waiting from '../../Views/Waiting/Waiting'
import Alert from '../../Components/Confirm/Confirm'
import GameContext from '../../Contexts/GameContext'
import { io } from "socket.io-client"
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  path: import.meta.env.VITE_SOCKET_PATH || '/socket.io/'
})

function MultiPlayer(){
  const navigate = useNavigate()
  const [stage, setStage] = useState('connecting')
  const [gameList, setGameList] = useState([])
  const [resultKey, setResultKey] = useState('r-1-1')
  const [alert, setAlert] = useState(null)
  const opponentExit = useRef(false)
  const gameData = useRef({
    entry: '',
    nicks: ['Ty', 'Przeciwnik'],
    points: [0, 0],
    rounds: [0, 0],
    win: false
  })

  const createNewGame = useCallback(name => {
    if (gameList.length >= 6){
      setAlert({
        children: 'Już utworzono maksymalną liczbę gier',
        confirm: () => setAlert(null)
      })
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

  const nextRound = useMemo(() => {
    if (opponentExit.current)
      return () => socket.emit('join-lobby')

    if (gameData.current.rounds[0] !== gameData.current.rounds[1])
      return null

    return () => socket.emit('continue-game')
  }, [resultKey])

  const onOpponentExit = useCallback(() => {
    opponentExit.current = true
    setResultKey('r-0-0')
    setAlert({
      children: 'Przeciwnik stchórzył',
      confirm: () => {
        setAlert(null)
        if (stage !== 'result')
          socket.emit('join-lobby')
      }
    })
  }, [stage])

  useEffect(() => {
    socket.on('opponent-exit', onOpponentExit)
    return () => socket.off('opponent-exit')
  }, [onOpponentExit])

  useEffect(() => {
    socket.on('game-list', games => {
      setGameList(games)
      if (stage !== 'create'){
        setResultKey('r-1-1')
        opponentExit.current = false
        setStage('lobby')
      }
    })

    return () => socket.off('game-list')
  }, [stage])

  useEffect(() => {
    socket.on('connect', () => {
      setTimeout(() => socket.emit('join-lobby'), 300)
      setAlert(current => (
        current?.children === 'Rozłączono z serwerem' ? {
          children: 'Połączono ponownie',
          confirm: () => setAlert(null)
        } : current
      ))
    })
    socket.on('disconnect', () => {
      setAlert({
        children: 'Rozłączono z serwerem',
        confirm: () => {
          setAlert(null)
          navigate('/')
        }
      })
    })
    socket.on('connect_error', () => {
      console.clear()
      console.warn('Online server connection error')
    })
    socket.connect()

    socket.on('wait-start', () => setStage('waiting'))
    socket.on('give-phrase', () => setStage('phrase'))
    socket.on('start-game', phrase => {
      gameData.current.entry = phrase
      setStage('game')
    })
    socket.on('game-data', data => {
      gameData.current.points = [data.wins, data.oWins]
      gameData.current.rounds = [data.rounds, data.oRounds]
      setResultKey(`r-${data.rounds+1}-${data.oRounds+1}`)
      setStage('result')
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('connect_error')
      socket.off('wait-start')
      socket.off('give-phrase')
      socket.off('start-game')
      socket.off('game-data')
      socket.disconnect()
    }
  }, [])

  return (
    <GameContext.Provider value={ gameData.current }>{
      stage === 'connecting' ? (
        <Connecting />
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
          key={ resultKey }
          next={ nextRound }
        />
      ) : (
        <Waiting
          abort={ () => socket.emit('join-lobby') }
        />
      )
    }
    {!!alert && <Alert {...alert} />}
    </GameContext.Provider>
  )
}

export default MultiPlayer
