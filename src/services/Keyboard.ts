import keycode from 'keycode';

export default class Keyboard {
  static isKey(event: KeyboardEvent, key: string, callback: () => void): void {
    if (keycode(event) === key) {
      callback();
    }
  }

  static on(key: string, callback: () => void): ((e: KeyboardEvent) => void) | null {
    if (typeof window === 'undefined') return null;

    const listener = (event: KeyboardEvent) => this.isKey(event, key, callback);
    window.addEventListener('keyup', listener);
    return listener;
  }

  static off(listener: ((e: KeyboardEvent) => void) | null): void {
    if (typeof window === 'undefined' || !listener) return;
    window.removeEventListener('keyup', listener);
  }
}
