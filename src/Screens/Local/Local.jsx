import WriteNicks from '../../Views/WriteNicks/WriteNicks'
import Game from '../../Views/Game/Game'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import EndGame from '../../Views/EndGame/EndGame'
import Confirm from '../../Components/Confirm/Confirm'
import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import GameContext from '../../Contexts/GameContext'

function Local(){
  const navigate = useNavigate()
  const [stage, setStage] = useState('writeNicks')
  const [askExit, setAskExit] = useState(false)
  const currentPlayer = useRef(0)
  const gameData = useRef({
    entry: '',
    nicks: [],
    points: [0, 0],
    rounds: [0, 0],
    win: false
  })
  const entryOpts = {
    back: gameData.current.entry ? (
      () => setAskExit(current => !current)
    ) : (
      () => setStage('writeNicks')
    ),
    backText: gameData.current.entry ? 'Anuluj' : 'Wstecz',
    next: () => setStage('game'),
    nick: gameData.current.nicks[currentPlayer.current]
  }

  const gameEnd = useCallback(resoult => {
    if (resoult === 'win'){
      gameData.current.points[currentPlayer.current]++
    }
    gameData.current.rounds[currentPlayer.current]++
    gameData.current.win = Boolean(resoult === 'win')
    currentPlayer.current = +!currentPlayer.current
    setStage('endGame')
  }, [])

  return (
    <GameContext.Provider value={ gameData.current }>{
      stage === 'writeEntry' ? (
        <>
          <WriteEntry
            { ...entryOpts }
          />
          {askExit && (
            <Confirm
              confirm={ () => navigate('/') }
              reject={ () => setAskExit(false) }
            >
              Wyjść do Menu?
            </Confirm>
          )}
        </>
      ) : stage === 'game' ? (
        <Game
          exit={ () => navigate('/') }
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
