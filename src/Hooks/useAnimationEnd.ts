import { useMemo } from 'react';

function useAnimaionEnd(target: HTMLElement, action: () => unknown, once = true) {
  let controller = new AbortController();

  function onAction() {
    action();
    if (once) {
      cleanUp();
    }
  }

  function assignAction() {
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
  };

  function cleanUp() {
    controller.abort();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => [assignAction, cleanUp] as const, [target, action, once]);
}

export default useAnimaionEnd;
