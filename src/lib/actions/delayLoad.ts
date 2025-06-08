import type { Action } from 'svelte/action';

export function delayLoad(node: HTMLElement, delay = 100): ReturnType<Action> {
  const timeout = setTimeout(() => {
    node.dispatchEvent(new CustomEvent('delayload'));
  }, delay);

  return {
    destroy() {
      clearTimeout(timeout);
    }
  };
}
