package org.wakanda.wastudio.common;

public class KeyCodeResult {
	public int keycode;
	public int modifiers;
	public boolean isNumberKey;

	public KeyCodeResult() {
		this.modifiers = 0;
		this.keycode = 0;
	}
}
