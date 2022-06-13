import keycode, { codes } from "keycode";

export type KeyType = keyof typeof codes;
export type Listener = (event: KeyboardEvent) => void;
type CallbackType = () => void;

export default class Keyboard {
	static isKey(event: KeyboardEvent, key: KeyType, callback: CallbackType) {
		if (keycode(event) === key) {
			callback();
		}
	}

	static on(key: KeyType, callback: CallbackType) {
		const listener = (event: KeyboardEvent) => this.isKey(event, key, callback);

		window.addEventListener("keyup", listener);

		return listener;
	}

	static off(listener?: Listener) {
		if (listener) window.removeEventListener("keyup", listener);
	}
}
