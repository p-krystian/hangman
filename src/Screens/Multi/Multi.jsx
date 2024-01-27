import Games from '../../Views/OnlineGames/OnlineGames'
import { useState } from 'react'

function MultiPlayer(){
  const [stage, setStage] = useState('games')

  return (
    stage === 'games' ? (
      <Games />
    ) : (
      "Nothing"
    )
  )
}

export default MultiPlayer
