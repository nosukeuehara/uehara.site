export function createObserver(
  callback: (entry: IntersectionObserverEntry, node: HTMLElement) => void
): (node: HTMLElement) => { destroy(): void } {
  return (node) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => callback(entry, node));
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  };
}
