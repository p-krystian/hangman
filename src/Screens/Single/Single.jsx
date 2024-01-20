import Game from '../../Views/Game/Game'
import EndGame from '../../Views/EndGame/EndGame'
import GameContext from '../../Contexts/GameContext'
import words from '../../Assets/words.json'
import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function SingleGame(){
  const navigate = useNavigate()
  const randomWord = () => words.at(Math.floor(Math.random()*words.length))
  const [stage, setStage] = useState('game')
  const gameData = useRef({
    entry: randomWord(),
    nicks: ['Wynik'],
    points: [0],
    rounds: [0],
    win: false
  })

  const gameEnd = useCallback(result => {
    const pointsAdd = +(result === 'win')
    gameData.current = {
      ...gameData.current,
      points: [gameData.current.points[0]+pointsAdd],
      rounds: [gameData.current.rounds[0]+1],
      win: Boolean(result === 'win')
    }
    setStage('endGame')
  }, [])

  const newGame = useCallback(() => {
    gameData.current = {
      ...gameData.current,
      entry: randomWord()
    }
    setStage('game')
  }, [])

  return (
    <GameContext.Provider value={ gameData.current }>{
      stage === 'endGame' ? (
        <EndGame
          next={ () => newGame() }
        />
      ) : (
        <Game
          exit={ () => navigate('/') }
          onLose={ () => gameEnd('lose') }
          onWin={ () => gameEnd('win') }
        />
      )
    }</GameContext.Provider>
  )
}
export default SingleGame
