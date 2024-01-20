import WriteNicks from '../../Views/WriteNicks/WriteNicks'
import Game from '../../Views/Game/Game'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import EndGame from '../../Views/EndGame/EndGame'
import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import GameContext from '../../Contexts/GameContext'

function Local(){
  const navigate = useNavigate()
  const [stage, setStage] = useState('writeNicks')
  const currentPlayer = useRef(0)
  const gameData = useRef({
    entry: '',
    nicks: [],
    points: [0, 0],
    rounds: [0, 0],
    win: false
  })

  const gameEnd = useCallback(resoult => {
    if (resoult === 'win'){
      gameData.current.points[currentPlayer.current]++
    }
    gameData.current.rounds[currentPlayer.current]++
    gameData.current.win = Boolean(resoult === 'win')
    currentPlayer.current = +!currentPlayer.current
    setStage('endGame')
  }, [])

  const entryBack = useCallback(() => {
    if (gameData.current.rounds.some(n => n)){
      return navigate('/')
    }
    setStage('writeNicks')
  }, [])

  return (
    <GameContext.Provider value={ gameData.current }>{
      stage === 'writeEntry' ? (
        <WriteEntry
          back={ () => entryBack() }
          next={ () => setStage('game') }
          nick={ gameData.current.nicks[currentPlayer.current] }
        />
      ) : stage === 'game' ? (
        <Game
          back={ () => navigate('/') }
          onLose={ () => gameEnd('lose') }
          onWin={ () => gameEnd('win') }
        />
      ) : stage === 'endGame' ? (
        <EndGame
          next={ () => setStage('writeEntry') }
        />
      ) : (
        <WriteNicks
          back={ () => navigate('/') }
          next={ () => setStage('writeEntry') }
        />
      )
    }</GameContext.Provider>
  )
}

export default Local
