import { useEffect, useMemo } from 'react';

function useKeyboardControl(
  back?: () => unknown,
  enter?: () => unknown,
  prev?: () => unknown,
  next?: () => unknown
) {
  const actions = useMemo(() => ({
    'escape': back,
    'enter': enter,
    'arrowup': prev,
    'arrowleft': prev,
    'arrowright': next,
    'arrowdown': next
  } as const), [back, enter, prev, next]);

  useEffect(() => {
    const listen = (e: KeyboardEvent) => {
      const code = e.key.toLowerCase();

      if (!Object.keys(actions).includes(code)) {
        return;
      }
      e.preventDefault();

      const key = code as keyof typeof actions;
      const action = actions[key];
      if (typeof action === 'function') {
        action();
      }
    };
    window.addEventListener('keyup', listen);

    return () => window.removeEventListener('keyup', listen);
  }, [actions]);
}
export default useKeyboardControl;
