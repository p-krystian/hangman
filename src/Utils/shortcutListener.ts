const shortcuts = {
  cancel: 'escape',
  accept: 'accept',
  prev: 'arrowleft',
  next: 'arrowright',
  random: 'r'
} as const;

type ShortcutT = keyof typeof shortcuts;

function shortcutListener(shortcut: ShortcutT, action: () => unknown) {
  const controller = new AbortController();

  window.addEventListener('keydown', (e) => {
    const code = e.key.toLowerCase();
    if (!e.ctrlKey || !(shortcuts[shortcut] === code)) {
      return;
    }
    e.preventDefault();
    action();
  }, { signal: controller.signal });

  return () => {
    console.log('shortcutListener unmounted');
    controller.abort();
  };
}

export { type ShortcutT };
export default shortcutListener;
