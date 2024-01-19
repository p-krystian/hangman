import WriteNicks from '../../Views/WriteNicks/WriteNicks'
import Game from '../../Views/Game/Game'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import EndGame from '../../Views/EndGame/EndGame'
import Button from '../../Components/Button/Button'
import { useState, useRef, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import GameContext from '../../Contexts/GameContext'

function Local(){
  const navigate = useNavigate()
  const gameContext = useContext(GameContext)
  const [stage, setStage] = useState('writeNicks')
  const currentPlayer = useRef(0)

  const gameEnd = useCallback(resoult => {
    if (resoult === 'win'){
      const points = gameContext.points
      points[currentPlayer.current]++
      gameContext.change(current => ({...current, points}))
    }
    const rounds = gameContext.rounds
    rounds[currentPlayer.current]++
    gameContext.change(current => ({...current, rounds}))
    currentPlayer.current = +!currentPlayer.current
    setStage('endGame')
  }, [currentPlayer, gameContext])

  const entryBack = useCallback(() => {
    if (gameContext.rounds.some(n => n)){
      return navigate('/')
    }
    setStage('writeNicks')
  }, [gameContext])

  return (
   stage === 'writeEntry' ? (
      <WriteEntry
        back={ () => entryBack() }
        next={ () => setStage('game') }
        text={ `Hasło dla ${gameContext.nicks[currentPlayer.current]}:` }
      />
    ) : stage === 'game' ? (
      <Game
        back={ () => navigate('/') }
        onLose={ () => gameEnd('lose') }
        onWin={ () => gameEnd('win') }
      />
    ) : stage === 'endGame' ? (
      <EndGame enter={ () => setStage('writeEntry') }>
        <Button onClick={ () => setStage('writeEntry') }>
          Dalej
        </Button>
      </EndGame>
    ) : (
      <WriteNicks
        back={ () => navigate('/') }
        next={ () => setStage('writeEntry') }
      />
    )
  )
}

export default Local
