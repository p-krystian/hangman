function useFullScreen(){
  const root = document.getElementById('root')
  console.log('used Full')
  root.classList.add('full')
  return () => root.classList.remove('full')
}
export default useFullScreen
