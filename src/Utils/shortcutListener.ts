import { binds } from '@/conf';

function shortcutListener(bind: keyof typeof binds, action: () => unknown) {
  const controller = new AbortController();

  window.addEventListener(
    'keydown',
    e => {
      const code = e.key.toLowerCase();
      if (!e.ctrlKey || e.repeat || !(binds[bind] === code)) {
        return;
      }
      e.preventDefault();
      action();
    },
    { signal: controller.signal }
  );

  return () => {
    controller.abort();
  };
}

export default shortcutListener;
