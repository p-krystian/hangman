import { useCallback, useMemo } from 'react';

function useAnimaionEnd(target: HTMLElement, action: () => unknown, once = true) {
  let controller = new AbortController();

  const cleanUp = useCallback(() => {
    controller.abort();
  }, [controller]);

  const onAction = useCallback(() => {
    action();
    if (once) {
      cleanUp();
    }
  }, [action, once, cleanUp]);

  const assignAction = useCallback(() => {
    controller.abort();
    controller = new AbortController();
    if (!target.getAnimations()?.length) {
      action();
      return;
    }
    target.addEventListener('animationend', onAction, { once, signal: controller.signal });
    target.addEventListener('animationcancel', onAction, { once, signal: controller.signal });
    target.addEventListener('transitionend', onAction, { once, signal: controller.signal });
    target.addEventListener('transitioncancel', onAction, { once, signal: controller.signal });
  }, [target, action, once, onAction, controller]);

  return useMemo(() => [assignAction, cleanUp] as const, [assignAction, cleanUp]);
}

export default useAnimaionEnd;
