import GameContext from '../../Contexts/GameContext'
import Button from '../../Components/Button/Button'
import styles from './Resoult.module.css'
import { useContext, useEffect } from 'react'

function Resoult({ children, enter }){
  const gameContext = useContext(GameContext)
  const max = gameContext.points.indexOf(Math.max(...gameContext.points))
  const winner = (gameContext.points[0] === gameContext.points[1]) ? -1 : max
  const pointStyles = (
    winner === 1 ? (
      [`${styles.lose}`, `${styles.win}`]
    ) : winner === 0 ? (
      [`${styles.win}`, `${styles.lose}`]
    ) : (
      [`${styles.neutral}`, `${styles.neutral}`]
    )
  )

  useEffect(() => {
    function onEnter(e){
      if (e.keyCode === 13)
        enter && enter()
    }
    window.addEventListener('keyup', onEnter)
    return () => window.removeEventListener('keyup', onEnter)
  }, [enter])

  return  (
    <>
      <div className={ styles.container }>
        { winner === -1 ? (
          <div>Remis!</div>
        ) : (
          <div className={ styles.winner }>
            { gameContext.nicks?.at(winner) }
          </div>
        ) }
        <div className={ styles.points }>
          <span>{ gameContext.nicks[0] }&#58;</span>
          <span className={ `${pointStyles[0]}` }>
            { gameContext.points[0] }
          </span>

          <span>{ gameContext.nicks[1] }&#58;</span>
          <span className={ `${pointStyles[1]}` }>
            { gameContext.points[1] }
          </span>
        </div>
      </div>
      <div className={ styles.buttons } >
        <Button link='/'>Menu</Button>
        { children }
      </div>
    </>
  )
}
export default Resoult
