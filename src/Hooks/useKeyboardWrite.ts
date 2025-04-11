function useKeyboardWrite(
  setText: React.Dispatch<React.SetStateAction<string>>,
  maxLength: number
){
  function write(current: string, char: string){
    char = char.replace('^32', ' ');
    if (char === '^8'){
      return current.slice(0, -1);
    }
    if (
      current.length === 0 && char === ' '
      || char === ' ' && (current[current.length - 1] == ' '
      || current.length + 1 >= maxLength)
    ){
      return current;
    }

    let newText = current.trimStart().toUpperCase();
    newText += char;

    return newText.substring(0, maxLength);
  }
  return (char: string) => setText(current => write(current, char));
}
export default useKeyboardWrite;
