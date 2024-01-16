import WriteNicks from '../../Views/WriteNicks/WriteNicks'
import Game from '../../Views/Game/Game'
import WriteEntry from '../../Views/WriteEntry/WriteEntry'
import EndGame from '../../Views/EndGame/EndGame'
import Resoult from '../../Views/Resoult/Resoult'
import Button from '../../Components/Button/Button'
import { useState, useRef, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import GameContext from '../../Contexts/GameContext'

function Local(){
  const navigate = useNavigate()
  const gameContext = useContext(GameContext)
  const [stage, setStage] = useState('writeNicks')
  const currentPlayer = useRef(0)
  const round = useRef(0)

  const endGameClick = () => (
    setStage((round.current < 6) ? 'writeEntry' : 'resoult')
  )
  function clean(){
    currentPlayer.current = 0
    round.current = 0
    gameContext.change({entry: '', nicks: ['', ''], points: [0, 0]})
    setStage('writeNicks')
  }

  const gameEnd = useCallback(resoult => {
    if (resoult === 'win'){
      const points = gameContext.points
      points[currentPlayer.current]++
      gameContext.change(current => ({...current, points: points}))
    }
    round.current++
    currentPlayer.current = +!currentPlayer.current
    setStage('endGame')
  }, [round, currentPlayer, gameContext])

  return (
   stage === 'writeEntry' ? (
      <WriteEntry
        back={ () => setStage('writeNicks') }
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
      <EndGame enter={ endGameClick }>
        <Button onClick={ endGameClick }>
          Dalej
        </Button>
      </EndGame>
    ) : stage === 'resoult' ? (
      <Resoult enter={ clean } >
        <Button onClick={ clean }>
          Jeszcze raz
        </Button>
      </Resoult>
    ) : (
      <WriteNicks
        back={ () => navigate('/') }
        next={ () => setStage('writeEntry') }
      />
    )
  )
}

export default Local
