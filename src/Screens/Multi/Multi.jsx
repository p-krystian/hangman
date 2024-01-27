import Games from '../../Views/OnlineGames/OnlineGames'
import Create from '../../Views/CreateGame/CreateGame'
import { useState } from 'react'

function MultiPlayer(){
  const [stage, setStage] = useState('games')

  return (
    stage === 'games' ? (
      <Games onCreate={ () => setStage('create') } />
    ) : (
      <Create back={ () => setStage('games') } />
    )
  )
}

export default MultiPlayer
