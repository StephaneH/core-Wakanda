package org.wakanda.wastudio.common;

import java.awt.AWTException;
import java.awt.Point;
import java.awt.Robot;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

import org.junit.BeforeClass;
import org.sikuli.script.Key;
import org.sikuli.script.Pattern;
import org.sikuli.script.Screen;

public abstract class SikuliUtils {

	private static Screen screen = null;

	protected final Point cPixel = new Point(0, 0);
	protected final float cSimilar = 0.7f;
	protected final long cTimeout = 3;

	// ///////////////////////////////////////ClickAndWait\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	@BeforeClass
	public static void initScreen() {
		if (screen == null)
			screen = new Screen();
	}

	public void clickAndWait(String inImagePath, String outImagePath)
			throws Exception {

		clickAndWait(inImagePath, cSimilar, cPixel, outImagePath, cSimilar,
				cTimeout);

	}

	public void clickAndWait(String inImagePath, String outImagePath,
			long timeOut) throws Exception {

		clickAndWait(inImagePath, cSimilar, cPixel, outImagePath, cSimilar,
				timeOut);

	}

	public void clickAndWait(String inImagePath, float inSimilar,
			String outImagePath, float outSimilar, long timeOut)
			throws Exception {

		clickAndWait(inImagePath, inSimilar, cPixel, outImagePath, outSimilar,
				timeOut);

	}

	public void clickAndWait(String inImagePath, float inSimilar,
			String outImagePath, long timeOut) throws Exception {

		clickAndWait(inImagePath, inSimilar, cPixel, outImagePath, cSimilar,
				timeOut);

	}

	public void clickAndWait(String inImagePath, Point pixel,
			String outImagePath, long timeOut) throws Exception {

		clickAndWait(inImagePath, cSimilar, pixel, outImagePath, cSimilar,
				timeOut);

	}

	public void clickAndWait(String inImagePath, float inSimilar, Point pixel,
			String outImagePath, long timeOut) throws Exception {

		clickAndWait(inImagePath, inSimilar, pixel, outImagePath, cSimilar,
				timeOut);

	}

	public void clickAndWait(String inImagePath, float inSimilar, Point pixel,
			String outImagePath, float outSimilar, long timeOut)
			throws Exception {

		click(inImagePath, inSimilar, pixel, timeOut);
		wait(outImagePath, outSimilar, timeOut);

	}

	// ///////////////////////////////////////Click\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void click(String inImagePath) throws Exception {
		click(inImagePath, cSimilar, cPixel, cTimeout);
	}

	public void click(String inImagePath, float similar) throws Exception {
		click(inImagePath, similar, cPixel, cTimeout);
	}

	public void click(String inImagePath, Point pixel) throws Exception {
		click(inImagePath, cSimilar, pixel, cTimeout);
	}

	public void click(String inImagePath, long timeOut) throws Exception {
		click(inImagePath, cSimilar, cPixel, timeOut);
	}

	public void click(String inImagePath, float similar, long timeOut)
			throws Exception {
		click(inImagePath, similar, cPixel, timeOut);
	}

	public void click(String inImagePath, float similar, Point pixel)
			throws Exception {
		click(inImagePath, similar, pixel, cTimeout);
	}

	public void click(String inImagePath, Point pixel, long timeOut)
			throws Exception {
		click(inImagePath, cSimilar, pixel, timeOut);
	}

	public void click(String inImagePath, float similar, Point pixel,
			long timeOut) throws Exception {
		screen.wait(new Pattern(inImagePath).similar(similar), timeOut);
		screen.click(new Pattern(inImagePath).similar(similar).targetOffset(
				pixel.x, pixel.y));
		// screen.click(new Patt)
		// screen.wait(new Pattern(inImagePath).similar(similar), timeOut);

	}

	// ///////////////////////////////////////Double
	// Click\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void doubleClick(String inImagePath) throws Exception {
		doubleClick(inImagePath, cSimilar, cPixel, cTimeout);
	}

	public void doubleClick(String inImagePath, float similar) throws Exception {
		doubleClick(inImagePath, similar, cPixel, cTimeout);
	}

	public void doubleClick(String inImagePath, Point pixel) throws Exception {
		doubleClick(inImagePath, cSimilar, pixel, cTimeout);
	}

	public void doubleClick(String inImagePath, long timeOut) throws Exception {
		doubleClick(inImagePath, cSimilar, cPixel, timeOut);
	}

	public void doubleClick(String inImagePath, float similar, long timeOut)
			throws Exception {
		doubleClick(inImagePath, similar, cPixel, timeOut);
	}

	public void doubleClick(String inImagePath, float similar, Point pixel)
			throws Exception {
		doubleClick(inImagePath, similar, pixel, cTimeout);
	}

	public void doubleClick(String inImagePath, Point pixel, long timeOut)
			throws Exception {
		doubleClick(inImagePath, cSimilar, pixel, timeOut);
	}

	public void doubleClick(String inImagePath, float similar, Point pixel,
			long timeOut) throws Exception {
		screen.wait(new Pattern(inImagePath).similar(similar), timeOut);
		screen.doubleClick(new Pattern(inImagePath).similar(similar)
				.targetOffset(pixel.x, pixel.y));
	}

	// ///////////////////////////////////////double Click And
	// Wait\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void doubleClickAndWait(String inImagePath, String outImagePath)
			throws Exception {

		doubleClickAndWait(inImagePath, cSimilar, cPixel, outImagePath,
				cSimilar, cTimeout);

	}

	public void doubleClickAndWait(String inImagePath, String outImagePath,
			long timeOut) throws Exception {

		doubleClickAndWait(inImagePath, cSimilar, cPixel, outImagePath,
				cSimilar, timeOut);

	}

	public void doubleClickAndWait(String inImagePath, float inSimilar,
			String outImagePath, float outSimilar, long timeOut)
			throws Exception {

		doubleClickAndWait(inImagePath, inSimilar, cPixel, outImagePath,
				outSimilar, timeOut);

	}

	public void doubleClickAndWait(String inImagePath, float inSimilar,
			String outImagePath, long timeOut) throws Exception {

		doubleClickAndWait(inImagePath, inSimilar, cPixel, outImagePath,
				cSimilar, timeOut);

	}

	public void doubleClickAndWait(String inImagePath, Point pixel,
			String outImagePath, long timeOut) throws Exception {

		doubleClickAndWait(inImagePath, cSimilar, pixel, outImagePath,
				cSimilar, timeOut);

	}

	public void doubleClickAndWait(String inImagePath, float inSimilar,
			Point pixel, String outImagePath, long timeOut) throws Exception {

		doubleClickAndWait(inImagePath, inSimilar, pixel, outImagePath,
				cSimilar, timeOut);

	}

	public void doubleClickAndWait(String inImagePath, float inSimilar,
			Point pixel, String outImagePath, float outSimilar, long timeOut)
			throws Exception {

		doubleClick(inImagePath, inSimilar, pixel, timeOut);
		wait(outImagePath, outSimilar, timeOut);

	}

	//
	// public void clickAndWait(String inImagePath,String outImagePath, float
	// similar) throws Exception {
	// clickAndWait(inImagePath, outImagePath, similar, new Point(0,0),
	// cTimeout);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, Point
	// pixel) throws Exception {
	// clickAndWait(inImagePath, outImagePath, cSimilar, pixel, cTimeout);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, long
	// timeOut) throws Exception {
	// clickAndWait(inImagePath, outImagePath, cSimilar, new Point(0,0),
	// timeOut);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, float
	// similar, long timeOut) throws Exception {
	// clickAndWait(inImagePath, outImagePath, similar, new Point(0,0),timeOut);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, float
	// similar, Point pixel) throws Exception {
	// clickAndWait(inImagePath, outImagePath, similar, pixel, cTimeout);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, Point
	// pixel, long timeOut) throws Exception {
	// clickAndWait(inImagePath, outImagePath, cSimilar,pixel, timeOut);
	// }
	//
	// public void dragAndDrop(String inImagePath,String outImagePath, float
	// similar, Point pixel, long timeOut)
	// throws Exception {
	// screen.wait(new Pattern(inImagePath).similar(similar),timeOut);
	// screen.click(new
	// Pattern(inImagePath).similar(similar).targetOffset(pixel.x,pixel.y));
	// screen.wait(new Pattern(outImagePath),timeOut);
	//

	// ///////////////////////////////////////right
	// Click\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void rightClick(String inImagePath) throws Exception {
		rightClick(inImagePath, cSimilar, cPixel, cTimeout);
	}

	public void rightClick(String inImagePath, float similar) throws Exception {
		rightClick(inImagePath, similar, cPixel, cTimeout);
	}

	public void rightClick(String inImagePath, Point pixel) throws Exception {
		rightClick(inImagePath, cSimilar, pixel, cTimeout);
	}

	public void rightClick(String inImagePath, long timeOut) throws Exception {
		rightClick(inImagePath, cSimilar, cPixel, timeOut);
	}

	public void rightClick(String inImagePath, float similar, long timeOut)
			throws Exception {
		rightClick(inImagePath, similar, cPixel, timeOut);
	}

	public void rightClick(String inImagePath, float similar, Point pixel)
			throws Exception {
		rightClick(inImagePath, similar, pixel, cTimeout);
	}

	public void rightClick(String inImagePath, Point pixel, long timeOut)
			throws Exception {
		rightClick(inImagePath, cSimilar, pixel, timeOut);
	}

	public void rightClick(String inImagePath, float similar, Point pixel,
			long timeOut) throws Exception {
		screen.wait(new Pattern(inImagePath).similar(similar), timeOut);
		screen.rightClick(new Pattern(inImagePath).similar(similar)
				.targetOffset(pixel.x, pixel.y));

	}

	// ///////////////////////////////////////right Click And
	// Wait\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void rightClickAndWait(String inImagePath, String outImagePath)
			throws Exception {
		rightClickAndWait(inImagePath, outImagePath, cSimilar, cPixel, cTimeout);
	}

	public void rightClickAndWait(String inImagePath, String outImagePath,
			float similar) throws Exception {
		rightClickAndWait(inImagePath, outImagePath, similar, cPixel, cTimeout);
	}

	public void rightClickAndWait(String inImagePath, String outImagePath,
			Point pixel) throws Exception {
		rightClickAndWait(inImagePath, outImagePath, cSimilar, pixel, cTimeout);
	}

	public void rightClickAndWait(String inImagePath, String outImagePath,
			long timeOut) throws Exception {
		rightClickAndWait(inImagePath, outImagePath, cSimilar, cPixel, timeOut);
	}

	public void rightClickAndWait(String inImagePath, String outImagePath,
			float similar, long timeOut) throws Exception {
		rightClickAndWait(inImagePath, outImagePath, similar, cPixel, timeOut);
	}

	public void rightClickAndWait(String inImagePath, String outImagePath,
			float similar, Point pixel) throws Exception {
		rightClickAndWait(inImagePath, outImagePath, similar, pixel, cTimeout);
	}

	public void rightClickAndWait(String inImagePath, String outImagePath,
			Point pixel, long timeOut) throws Exception {
		rightClickAndWait(inImagePath, outImagePath, cSimilar, pixel, timeOut);
	}

	public void rightClickAndWait(String inImagePath, String outImagePath,
			float similar, Point pixel, long timeOut) throws Exception {
		screen.wait(new Pattern(inImagePath).similar(similar), timeOut);
		screen.rightClick(new Pattern(inImagePath).similar(similar)
				.targetOffset(pixel.x, pixel.y));
		screen.wait(new Pattern(outImagePath), timeOut);
		// screen.dr

	}

	//
	// public void clickAndWait(String inImagePath,String outImagePath, float
	// similar) throws Exception {
	// clickAndWait(inImagePath, outImagePath, similar, new Point(0,0),
	// cTimeout);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, Point
	// pixel) throws Exception {
	// clickAndWait(inImagePath, outImagePath, cSimilar, pixel, cTimeout);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, long
	// timeOut) throws Exception {
	// clickAndWait(inImagePath, outImagePath, cSimilar, new Point(0,0),
	// timeOut);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, float
	// similar, long timeOut) throws Exception {
	// clickAndWait(inImagePath, outImagePath, similar, new Point(0,0),timeOut);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, float
	// similar, Point pixel) throws Exception {
	// clickAndWait(inImagePath, outImagePath, similar, pixel, cTimeout);
	// }
	//
	// public void clickAndWait(String inImagePath,String outImagePath, Point
	// pixel, long timeOut) throws Exception {
	// clickAndWait(inImagePath, outImagePath, cSimilar,pixel, timeOut);
	// }
	//
	// public void dragAndDrop(String inImagePath,String outImagePath, float
	// similar, Point pixel, long timeOut)
	// throws Exception {
	// screen.wait(new Pattern(inImagePath).similar(similar),timeOut);
	// screen.click(new
	// Pattern(inImagePath).similar(similar).targetOffset(pixel.x,pixel.y));
	// screen.wait(new Pattern(outImagePath),timeOut);
	//
	// /////////////////////////////////////Wait\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void wait(String inImagePath) throws Exception {
		wait(inImagePath, cSimilar, cPixel, cTimeout);
	}

	public void wait(String inImagePath, float similar) throws Exception {
		wait(inImagePath, similar, cPixel, cTimeout);
	}

	public void wait(String inImagePath, Point pixel) throws Exception {
		wait(inImagePath, cSimilar, pixel, cTimeout);
	}

	public void wait(String inImagePath, long timeOut) throws Exception {
		wait(inImagePath, cSimilar, cPixel, timeOut);
	}

	public void wait(String inImagePath, float similar, long timeOut)
			throws Exception {
		wait(inImagePath, similar, cPixel, timeOut);
	}

	public void wait(String inImagePath, float similar, Point pixel)
			throws Exception {
		wait(inImagePath, similar, pixel, cTimeout);
	}

	public void wait(String inImagePath, Point pixel, long timeOut)
			throws Exception {
		wait(inImagePath, cSimilar, pixel, timeOut);
	}

	public void wait(String inImagePath, float similar, Point pixel,
			long timeOut) throws Exception {
		screen.wait(
				new Pattern(inImagePath).similar(similar).targetOffset(pixel.x,
						pixel.y), timeOut);

	}

	// ///////////////////////////////////////Drag and
	// Drop\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void dragAndDrop(String srcImagePath, String destImagePath)
			throws Exception {
		dragAndDrop(srcImagePath, cSimilar, cPixel, destImagePath, cSimilar,
				cPixel, cTimeout);
	}

	public void dragAndDrop(String srcImagePath, Point pixel,
			String destImagePath) throws Exception {
		dragAndDrop(srcImagePath, cSimilar, pixel, destImagePath, cSimilar,
				cPixel, cTimeout);
	}

	public void dragAndDrop(String srcImagePath, String destImagePath,
			long timeOut) throws Exception {
		dragAndDrop(srcImagePath, cSimilar, cPixel, destImagePath, cSimilar,
				cPixel, timeOut);
	}

	public void dragAndDrop(String srcImagePath, String destImagePath,
			float destSimilar, Point destPixel, long timeOut) throws Exception {
		dragAndDrop(srcImagePath, cSimilar, cPixel, destImagePath, destSimilar,
				destPixel, timeOut);
	}

	public void dragAndDrop(String srcImagePath, float srcSimilar,
			Point srcPixel, String destImagePath, long timeOut)
			throws Exception {
		dragAndDrop(srcImagePath, srcSimilar, srcPixel, destImagePath,
				cSimilar, cPixel, timeOut);
	}

	public void dragAndDrop(String srcImagePath, float srcSimilar,
			Point srcPixel, String destImagePath, float destSimilar,
			Point destPixel, long timeOut) throws Exception {
		screen.wait(new Pattern(srcImagePath), timeOut);
		screen.wait(new Pattern(destImagePath), timeOut);
		screen.dragDrop(
				new Pattern(srcImagePath).similar(srcSimilar).targetOffset(
						srcPixel.x, srcPixel.y),
				new Pattern(destImagePath).similar(destSimilar).targetOffset(
						destPixel.x, destPixel.y));
	}

	public void dragAndDrop(String source, Point point) throws Exception {
		screen.dragDrop(new Pattern(source).similar(cSimilar), new Pattern(
				source).similar(cSimilar).targetOffset(point.x, point.y));
	}

	// ///////////////////////////////////////Drag and Drop and
	// wait\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	public void dragAndDropAndWait(String srcImagePath, String destImagePath,
			String ImageOut, long timeOut) throws Exception {
		dragAndDrop(srcImagePath, cSimilar, cPixel, destImagePath, cSimilar,
				cPixel, cTimeout);
		wait(ImageOut, timeOut);
	}

	// ///////////////////////////////////////Type\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	// public void type(String text )
	// {
	// for(int i=0;i<text.length();i++)
	// {
	// screen.keyDown(text.charAt(i));
	// screen.keyUp(text.charAt(i));
	// }
	// �
	// }

	// public void type(String text)
	// {
	// type(text, 0);
	// }
	public void paste(String text) throws Exception {

		screen.paste(text);

	}

	public void pressString(String str) throws AWTException {
		Robot myRobot = new Robot();
		KeyCodeResult key = new KeyCodeResult();

		for (int i = 0; i < str.length(); i++) {

			key = charCodeToKeyCode(str.charAt(i), key);

			if (key.modifiers != 0)
				myRobot.keyPress(key.modifiers);

			myRobot.keyPress(key.keycode);
			myRobot.keyRelease(key.keycode);

			if (key.modifiers != 0)
				myRobot.keyRelease(key.modifiers);

		}
	}

	public static KeyCodeResult typeWin(char s, KeyCodeResult keycodeclass) {

		keycodeclass.modifiers = 0;
		keycodeclass.keycode = s;
		keycodeclass.isNumberKey = false;

		switch (s) {
		case '0':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD0;
			keycodeclass.isNumberKey = true;
			break;
		case '1':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD1;
			keycodeclass.isNumberKey = true;
			break;
		case '2':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD2;
			keycodeclass.isNumberKey = true;
			break;

		case '3':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD3;
			keycodeclass.isNumberKey = true;
			break;
		case '4':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD4;
			keycodeclass.isNumberKey = true;
			break;
		case '5':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD5;
			keycodeclass.isNumberKey = true;
			break;
		case '6':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD6;
			keycodeclass.isNumberKey = true;
			break;
		case '7':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD7;
			keycodeclass.isNumberKey = true;
			break;
		case '8':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD8;
			keycodeclass.isNumberKey = true;
			break;
		case '9':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD9;
			keycodeclass.isNumberKey = true;
			break;
		case ')':
			keycodeclass.keycode = KeyEvent.VK_RIGHT_PARENTHESIS;
			keycodeclass.isNumberKey = true;
			break;
		case '=':
			keycodeclass.keycode = KeyEvent.VK_EQUALS;
			keycodeclass.isNumberKey = true;
			break;
		}
		return keycodeclass;
	}

	public void type(String text) throws Exception {

		if (Utils.getOS().equals("win")) {
			KeyCodeResult key = new KeyCodeResult();
			for (int i = 0; i < text.length(); i++) {
				key = typeWin(text.charAt(i), key);
				if (key.isNumberKey == true)
					typeChar(key);
				else {
					String charToString = String.valueOf(text.charAt(i));
					screen.type(charToString);
				}
			}
		}

		else if (Utils.getOS().equals("mac")) {
			KeyCodeResult key = new KeyCodeResult();

			for (int i = 0; i < text.length(); i++) {
				key = charCodeToKeyCode(text.charAt(i), key);
				if (key.keycode != 57350)
					typeChar(key);
				else
					screen.type(Key.DELETE);
			}

		}
	}

	public void keyDown(String key) {
		screen.keyDown(key);
	}

	public void keyUp() {
		screen.keyUp();
	}

	public void keyUp(String key) {
		screen.keyUp(key);
	}

	public void mouseMove(String dest) throws Exception {
		screen.mouseMove(new Pattern(dest));
	}

	public void mouseMove(String dest, Point pixel) throws Exception {
		screen.mouseMove(new Pattern(dest).targetOffset(pixel.x, pixel.y));

	}

	public void mouseDown(int dest) throws Exception {
		screen.mouseDown(dest);
	}

	public void mouseUp(int dest) throws Exception {
		screen.mouseUp(dest);
	}

	public void waitVanish(String src) {
		screen.waitVanish(new Pattern(src));
	}

	public void wheel(String str, int button, int x) throws Exception {
		screen.wheel(str, button, x);

	}

	public static void typeChar(KeyCodeResult key) throws AWTException {

		boolean isAltPressed = (key.modifiers & InputEvent.ALT_MASK) != 0;
		boolean isShiftPressed = (key.modifiers & InputEvent.SHIFT_MASK) != 0;
		boolean isPomPressed = (key.modifiers & InputEvent.META_MASK) != 0;
		Robot myRobot = new Robot();
		if (isAltPressed)
			myRobot.keyPress(KeyEvent.VK_ALT);
		if (isShiftPressed)
			myRobot.keyPress(KeyEvent.VK_SHIFT);
		if (isPomPressed)
			myRobot.keyPress(KeyEvent.VK_META);

		myRobot.keyPress(key.keycode);
		myRobot.keyRelease(key.keycode);

		if (isAltPressed)
			myRobot.keyRelease(KeyEvent.VK_ALT);
		if (isShiftPressed)
			myRobot.keyRelease(KeyEvent.VK_SHIFT);
		if (isPomPressed)
			myRobot.keyRelease(KeyEvent.VK_META);

	}

	public void enter() throws Exception {
		type(Key.ENTER);
	}

	public void selectAll() throws Exception {
		if (Utils.getOS().equals("win")) {
			keyDown(Key.CTRL);
			type("a");
			keyDown(Key.CTRL);
		} else {

			keyDown(Key.META);
			type("a");// �a depend si le clavier englais ou francais( a voir
						// dans la machine prod
			keyUp(Key.META);
		}
	}

	public void selectAllAndDelete() throws Exception {
		if (Utils.getOS().equals("win")) {
			keyDown(Key.CTRL);
			type("a");
			keyUp(Key.CTRL);
			type(Key.DELETE);
		} else {
			keyDown(Key.META);
			type("a");// �a depend si le clavier englais ou francais( a voir
						// dans la machine prod
			keyUp(Key.META);
			keyDown(Key.DELETE);
			keyUp(Key.DELETE);
		}
	}

	public void closeWindow() throws Exception {
		if (Utils.getOS().equals("win"))

		{
			keyDown(Key.ALT);
			keyDown(Key.F4);
			keyUp();
		} else {
			keyDown(Key.META);
			type("w");// �a depend si le clavier englais ou francais( a voir
						// dans la machine prod
			keyUp();
		}
	}

	public void closeApp() throws Exception {
		if (Utils.getOS().equals("win"))

		{
			keyDown(Key.ALT);
			keyDown(Key.F4);
			keyUp();
		} else {
			keyDown(Key.META);
			type("q");// �a depend si le clavier englais ou francais( a voir
						// dans la machine prod
			keyUp();
		}
	}

	public void selectBrowserHeaderAndDelete() throws Exception {
		if (Utils.getOS().equals("win"))

		{
			keyDown(Key.CTRL);
			keyDown(Key.F5);
			keyUp();
			keyDown(Key.ALT);
			type("d");
			keyUp(Key.ALT);
			type(Key.DELETE);
		} else {
			keyDown(Key.META);
			type("l");
			keyUp(Key.META);
			keyDown(Key.DELETE);
			keyUp(Key.DELETE);
		}
	}

	public static KeyCodeResult charCodeToKeyCode(char s,
			KeyCodeResult keycodeclass) {
		keycodeclass.modifiers = 0;
		keycodeclass.keycode = s;

		switch (s) {
		case 'A':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'a':
			keycodeclass.keycode = KeyEvent.VK_Q;
			break;

		case 'Q':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'q':
			keycodeclass.keycode = KeyEvent.VK_A;
			break;
		case 'M':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'm':
			keycodeclass.keycode = KeyEvent.VK_SEMICOLON;
			break;
		case 'W':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'w':
			keycodeclass.keycode = KeyEvent.VK_Z;
			break;
		case '<':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case '>':
			keycodeclass.keycode = KeyEvent.VK_BACK_QUOTE;
			break;
		case 'Z':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'z':
			keycodeclass.keycode = KeyEvent.VK_W;
			break;
		case ',':
			keycodeclass.keycode = KeyEvent.VK_M;
			break;

		case '?':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
			keycodeclass.keycode = KeyEvent.VK_M;
			break;

		case '.':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
			keycodeclass.keycode = KeyEvent.VK_COMMA;
			break;

		case ':':
			keycodeclass.keycode = KeyEvent.VK_PERIOD;
			break;

		case ';':
			keycodeclass.keycode = KeyEvent.VK_COMMA;
			break;

		case '/':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
			keycodeclass.keycode = KeyEvent.VK_PERIOD;
			break;

		case '!':
			// keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
			keycodeclass.keycode = KeyEvent.VK_8;
			break;

		case '\\':

			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
			keycodeclass.modifiers |= KeyEvent.VK_META;
			keycodeclass.modifiers |= KeyEvent.VK_ALT;
			keycodeclass.keycode = KeyEvent.VK_PERIOD;
			break;

		case '|':
			keycodeclass.modifiers |= KeyEvent.VK_CONTROL;
			keycodeclass.keycode = KeyEvent.VK_6;
			break;
		case '*':
			keycodeclass.modifiers |= KeyEvent.VK_MULTIPLY;
			break;
		/*
		 * case 'é': keycodeclass.keycode |= KeyEvent.VK_2;//clavier fran�ais
		 * sur mac // keycodeclass.keycode = KeyEvent.VK_E break; case 'è':
		 * keycodeclass.keycode |= KeyEvent.VK_7; break; case 'à':
		 * keycodeclass.keycode = KeyEvent.VK_0; break;
		 */
		case 'E':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;

		case 'e':
			keycodeclass.keycode = KeyEvent.VK_E;
			break;
		case 'R':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
			break;
		case 'r':
			keycodeclass.keycode = KeyEvent.VK_R;
			break;
		case 'T':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;

		case 't':
			keycodeclass.keycode = KeyEvent.VK_T;
			break;
		case 'Y':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;

		case 'y':
			keycodeclass.keycode = KeyEvent.VK_Y;
			break;
		case 'U':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;

		case 'u':
			keycodeclass.keycode = KeyEvent.VK_U;
			break;
		case 'I':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'i':
			keycodeclass.keycode = KeyEvent.VK_I;
			break;
		case 'O':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'o':
			keycodeclass.keycode = KeyEvent.VK_O;
			break;
		case 'P':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'p':
			keycodeclass.keycode = KeyEvent.VK_P;
			break;
		case 'S':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 's':
			keycodeclass.keycode = KeyEvent.VK_S;
			break;
		case 'D':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'd':
			keycodeclass.keycode = KeyEvent.VK_D;
			break;
		case 'F':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'f':
			keycodeclass.keycode = KeyEvent.VK_F;
			break;
		case 'G':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'g':
			keycodeclass.keycode = KeyEvent.VK_G;
			break;
		case 'H':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'h':
			keycodeclass.keycode = KeyEvent.VK_H;
			break;
		case 'J':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'j':
			keycodeclass.keycode = KeyEvent.VK_J;
			break;
		case 'K':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'k':
			keycodeclass.keycode = KeyEvent.VK_K;
			break;
		case 'L':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'l':
			keycodeclass.keycode = KeyEvent.VK_L;
			break;
		case 'X':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'x':
			keycodeclass.keycode = KeyEvent.VK_X;
			break;
		case 'C':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'c':
			keycodeclass.keycode = KeyEvent.VK_C;
			break;
		case 'V':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'v':
			keycodeclass.keycode = KeyEvent.VK_V;
			break;
		case 'B':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'b':
			keycodeclass.keycode = KeyEvent.VK_B;
			break;
		case 'N':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
		case 'n':
			keycodeclass.keycode = KeyEvent.VK_N;
			break;

		case '0':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD0;
			break;
		case '1':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD1;
			break;
		case '2':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD2;
			break;
		case '3':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD3;
			break;
		case '4':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD4;
			break;
		case '5':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD5;
			break;
		case '6':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD6;
			break;
		case '7':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD7;
			break;
		case '8':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD8;
			break;
		case '9':
			keycodeclass.keycode = KeyEvent.VK_NUMPAD9;
			break;
		case '=':
			keycodeclass.keycode = KeyEvent.VK_SLASH;
			break;
		case '+':
			keycodeclass.keycode = KeyEvent.VK_ADD;
			break;
		case '-':
			keycodeclass.keycode = KeyEvent.VK_SUBTRACT;

			break;
		case '_':
			keycodeclass.modifiers |= KeyEvent.SHIFT_MASK;
			keycodeclass.keycode = KeyEvent.VK_EQUALS;
			break;
		case '(':

			keycodeclass.keycode = KeyEvent.VK_5;
			break;
		case ')':
			keycodeclass.keycode = KeyEvent.VK_MINUS;

			break;

		}
		return keycodeclass;

	}

	public void refresh() throws Exception {
		if (Utils.getOS().equals("win"))

		{
			// keyDown(Key.CTRL);
			keyDown(Key.F5);
			// keyUp(Key.CTRL);
			keyUp(Key.F5);
		} else {
			keyDown(Key.META);
			type("r");
			keyDown(Key.META);
			type("r");

		}
	}

	public void tab() throws Exception {
		type(Key.TAB);
	}

	public void save() throws Exception {
		if (Utils.getOS().equals("win")) {
			keyDown(Key.CTRL);
		} else {
			keyDown(Key.META);
		}
		type("s");
		keyUp();
	}

	public void unDo() throws Exception {
		if (Utils.getOS().equals("win")) {
			keyDown(Key.CTRL);
		} else {
			keyDown(Key.META);
		}
		type("z");
		keyUp();
	}

	public void reDo() throws Exception {
		if (Utils.getOS().equals("win")) {
			keyDown(Key.CTRL);
			type("y");
		} else {
			keyDown(Key.META + Key.SHIFT);
			type("z");
		}
		keyUp();
	}
}
