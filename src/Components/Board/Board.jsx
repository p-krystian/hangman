import styles from './Board.module.css'
import svgs from '../../Assets/Animation'
import bg from '../../Assets/Images/board-bg.svg'
import fg from '../../Assets/Images/board-fg.svg'
import useLanguage from '../../Hooks/useLanguage'

function Board({ progress, small }){
  const imagesName = svgs.slice(0, progress)
  const [l] = useLanguage()
  const keyboardSize = Math.ceil(l('alphabet').length / 7)

  return (
    <div
      className={ `${styles.board} ${small ? styles.small : ''}` }
      style={ {'--_s': keyboardSize} }
    >
      <img className={ styles.bg } src={ bg } alt="" />
      { imagesName.map((src, index) => (
        <img
          key={ `img-${index}` }
          className={ styles.image }
          src={ src }
          alt={ progress }
        />
      )) }
      <img className={ styles.fg } src={ fg } alt="" />
    </div>
  )
}
export default Board
