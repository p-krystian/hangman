import useLanguage from '../../Hooks/useLanguage'
import { useState, useEffect } from 'react'
import styles from './Category.module.css'

const cache = {word: 'null', category: 'undefined'}
const findCategory = (word:string, dict:Record<string, string[]>, unknown:string) => {
  for (const cat of Object.keys(dict)){
    if (dict[cat].find(e => e.toUpperCase() === word.toUpperCase())){
      return cat
    }
  }
  return unknown
}

interface CategoryProps {
  entry: string;
  short?: boolean;
}

function Category({ entry, short }: CategoryProps){
  const [category, setCategory] = useState('\t')
  const [l, extraLang] = useLanguage()
  const keyboardSize = Math.ceil(l('alphabet').length / 7)
  const words = extraLang().words

  useEffect(() => {
    if (entry === cache.word){
      setCategory(cache.category)
      return
    }
    cache.word = entry
    cache.category = findCategory(entry, words, l('categoryUnknown'))
    for (let i = 0; i <= cache.category.length; i++){
      setTimeout(
        () => setCategory(cache.category.substring(0, i)),
        i * 150 + 500
      )
    }
  }, [entry, words, l])

  return (
    <div
      className={ `${styles.category} ${short ? styles.short : ''}` }
      style={ {'--_s': keyboardSize} as React.CSSProperties }
    >
      <span className={ styles.prefix }>
        { `${l('phraseCategory')}:${short ? '\n' : '  '}` }
      </span>
      <span className={ styles.name }>
        { category }
      </span>
    </div>
  )
}
export default Category
