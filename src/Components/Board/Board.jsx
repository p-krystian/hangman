import styles from './Board.module.css'
import svgs from '../../Assets/Animation'

function Board({ progress, small }){
  const imagesName = svgs.slice(0, progress)

  return (
    <div className={ `${styles.board} ${small ? styles.small : ''}` }>
      { imagesName.map((src, index) => (
        <img
          key={ `img-${index}` }
          className={ styles.image }
          src={ src }
        />
      )) }
    </div>
  )
}
export default Board
