import Game from '../../Views/Game/Game'
import EndGame from '../../Views/EndGame/EndGame'
import Button from '../../Components/Button/Button'
import GameContext from '../../Contexts/GameContext'
import words from '../../Assets/words.json'
import { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function SingleGame(){
  const navigate = useNavigate()
  const gameContext = useContext(GameContext)
  const [stage, setStage] = useState('game')

  const gameEnd = useCallback(result => {
    const pointsAdd = +(result === 'win')
    gameContext.change(current => ({
      ...current,
      points: [current.points[0]+pointsAdd, 0],
      rounds: [current.rounds[0]+1, 0]
    }))
    setStage('endGame')
  }, [])

  const newGame = useCallback(() => {
    const randomIndex = Math.floor(Math.random()*words.length)
    const randomWord = words.at(randomIndex)

    gameContext.change(current => ({
      ...current,
      entry: randomWord
    }))
    setStage('game')
  }, [])

  useEffect(() => {
    gameContext.reset()
    gameContext.change(current => ({
      ...current,
      nicks: ['Wynik', '']
    }))
    newGame()
  }, [])

  return (
    stage === 'endGame' ? (
      <EndGame enter={ () => newGame() }>
        <Button onClick={ () => newGame() }>
          Dalej
        </Button>
      </EndGame>
    ) : (
      <Game
        back={ () => navigate('/') }
        onLose={ () => gameEnd('lose') }
        onWin={ () => gameEnd('win') }
      />
    )
  )
}
export default SingleGame
