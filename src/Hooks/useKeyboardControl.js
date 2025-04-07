function useKeyboardControl(back, enter, up, down){
  const actions = {
    27: back,
    13: enter,
    37: up,
    38: up,
    39: down,
    40: down
  }
  const listen = e => {
    const code = `${e.keyCode}`

    if (!Object.keys(actions).includes(code))
      return

    if (actions[code])
      actions[code]()
  }
  window.addEventListener('keyup', listen)

  return () => window.removeEventListener('keyup', listen)
}
export default () => useKeyboardControl
