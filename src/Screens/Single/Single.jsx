import Game from '../../Views/Game/Game'
import EndGame from '../../Views/EndGame/EndGame'
import GameContext from '../../Contexts/GameContext'
import useLanguage from '../../Hooks/useLanguage'
import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const randomizer = (l, words) => {
  const categories = Object.keys(words)
  const dictionary = words[categories.at(
    Math.floor(Math.random() * categories.length)
  )] || [l('randomize')]
  const index = Math.floor(Math.random() * dictionary.length)
  return dictionary.at(index)
}

function SingleGame(){
  const navigate = useNavigate()
  const [l, extraLang] = useLanguage()
  const randomWord = randomizer(l, extraLang().words)
  const [stage, setStage] = useState('game')
  const gameData = useRef({
    entry: randomWord.toUpperCase(),
    nicks: [l('result')],
    points: [0],
    prevPoints: [0],
    rounds: [0],
    prevRounds: [0],
    win: false
  })

  const gameEnd = useCallback(result => {
    const pointsAdd = +(result === 'win')
    gameData.current = {
      ...gameData.current,
      prevPoints: [...gameData.current.points],
      points: [gameData.current.points[0]+pointsAdd],
      prevRounds: [...gameData.current.rounds],
      rounds: [gameData.current.rounds[0]+1],
      win: Boolean(result === 'win')
    }
    setStage('endGame')
  }, [])

  const newGame = useCallback(() => {
    gameData.current = {
      ...gameData.current,
      entry: randomWord.toUpperCase()
    }
    setStage('game')
  }, [randomWord])

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
