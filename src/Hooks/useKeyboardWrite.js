function useKeyboardWrite(setText, maxLength){
  function write(current, char){
    char = char.replace('^32', ' ')
    if (char === '^8')
      return current.slice(0, -1)

    if (char == ' ' && (current.at(-1) == ' ' || current.length+1 == maxLength))
      return current

    let newText = current.trimLeft().toUpperCase()
    newText += char

    return newText.substring(0, maxLength)
  }
  return char => setText(current => write(current, char))
}
export default useKeyboardWrite
