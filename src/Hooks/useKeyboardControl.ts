function useKeyboardControl(
  back?: () => void,
  enter?: () => void,
  up?: () => void,
  down?: () => void
){
  const actions = {
    'escape': back,
    'enter': enter,
    'arrowup': up,
    'arrowleft': up,
    'arrowright': down,
    'arrowdown': down
  } as const;

  const listen = (e: KeyboardEvent) => {
    const code = e.key.toLowerCase();

    if (!Object.keys(actions).includes(code)){
      return;
    }

    const key = code as keyof typeof actions;
    const action = actions[key];
    if (typeof action === 'function'){
      action();
    }

  };
  window.addEventListener('keyup', listen);

  return () => window.removeEventListener('keyup', listen);
}
export default () => useKeyboardControl;
