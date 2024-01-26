function useFullScreen(){
  const root = document.getElementById('root')

  root.classList.add('full')

  return () => root.classList.remove('full')
}
export default useFullScreen
