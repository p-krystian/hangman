function useFullScreen(){
  const root = document.getElementById('root')

  const setFull = () => {
    // TODO: Try to find better solution
    if (root.offsetHeight > window.innerHeight)
      root.classList.add('full')
    else
      root.classList.remove('full')
  }
  setFull()
  window.addEventListener('resize', setFull)

  return () => {
    window.removeEventListener('resize', setFull)
    root.classList.remove('full')
  }
}
export default useFullScreen
