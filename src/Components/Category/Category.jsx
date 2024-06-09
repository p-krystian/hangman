import useLanguage from '../../Hooks/useLanguage'
import { useState, useEffect } from 'react'
import styles from './Category.module.css'

function Category({ entry, short }){
  const [category, setCategory] = useState('...')
  const [l, extra] = useLanguage()
  const words = extra().words

  useEffect(() => {
    setTimeout(
      () => setCategory(l('categoryUnknown')),
      500
    )
  }, [entry, words])

  return (
    <div className={ styles.category }>
      { !short && `${l('phraseCategory')}:  ` }
      <span>{ category }</span>
    </div>
  )
}
export default Category
