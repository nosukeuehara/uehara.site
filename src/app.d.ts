declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:delayload'?: (event: CustomEvent<void>) => void;
  }
}