/**
 * WARNING: This file adds elements to the DOM imperatively,
 * outside of React's control.
 * The '#preload' container is NOT part of the React component tree.
 */

const container = document.getElementById('preload')!;
const preloaded = new Set<string>();

function preload(url: string, type: 'audio') {
  if (preloaded.has(url)) {
    return;
  }
  if (type === 'audio') {
    const audioElement = document.createElement('audio');
    audioElement.src = url;
    audioElement.preload = 'auto';
    audioElement.controls = true;
    container.appendChild(audioElement);
    audioElement.load();
  }
  preloaded.add(url);
}
export default preload;
