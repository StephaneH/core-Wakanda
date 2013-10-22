//package com.wakanda.wastudio.utils;
//
//import java.io.File;
//import java.io.IOException;
//import java.net.URISyntaxException;
//import java.util.logging.Logger;
//
//import org.openqa.selenium.Point;
//import org.sikuli.script.Button;
//import org.sikuli.script.FindFailed;
//import org.sikuli.script.Pattern;
//import org.sikuli.script.Screen;
//
//public class SikuliUtil {
//	
//	public static Screen screen = new Screen();
//
//	private static Logger logger = Logger
//			.getLogger("com.wakanda.qa.wastudio.selenium.BeetleTest");
//
//	/**
//	 * wait for an image for a while
//	 * 
//	 * @author Anas Bihi
//	 * @param imagePath
//	 *            image file name
//	 * @param timeout
//	 *            time to wait in seconds
//	 * @throws FindFailed
//	 */
//	public static void screenWait(String imagePath, double timeout)
//			throws FindFailed {
//		try {
//			logger.info("Waiting for" + imagePath + " before " + timeout
//					+ " seconds");
//			screen.wait(getImageFilePath(imagePath), timeout);
//			logger.info(imagePath + "found");
//		} catch (NullPointerException e) {
//			logger.info(imagePath + " is not found");
//		}
//	}
//
//	/**
//	 * wait for an image
//	 * 
//	 * @param imagePath
//	 *            image file name
//	 * @throws FindFailed
//	 */
//	public static void screenWait(String imagePath) throws FindFailed {
//		try {
//			logger.info("Waiting for" + imagePath + " before default timeout");
//			screen.wait(getImageFilePath(imagePath));
//			logger.info(imagePath + " found");
//		} catch (NullPointerException e) {
//			logger.info(imagePath + " is not found");
//		}
//	}
//
//	/**
//	 * wait for a while
//	 * 
//	 * @param timeout
//	 *            time in seconds
//	 */
//	public static void screenWait(double timeout) {
//		logger.info("Waiting for " + timeout + " seconds");
//		screen.wait(timeout);
//	}
//
//	/**
//	 * 
//	 * @param filePath
//	 *            image file name
//	 * @return full path of the given image
//	 */
//	public static String getImageFilePath(String filePath) {
//		File file;
//		String fullpath = null;
//		try {
//			file = new File(SikuliUtil.class.getResource(filePath).toURI());
//			fullpath = file.getCanonicalPath();
//		} catch (URISyntaxException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return fullpath;
//	}
//
//	/**
//	 * mouse move to a specific location
//	 * 
//	 * @param image
//	 *            target where mouse have to move
//	 * @throws FindFailed
//	 */
//	public static void screenMoveTo(String image) throws FindFailed {
//		String str = getImageFilePath(image);
//		logger.info("Moving to " + image + " location");
//		screen.mouseMove(str);
//	}
//
//	/**
//	 * mouse drag and drop from a location to another
//	 * 
//	 * @param source
//	 *            where the drag will be performed
//	 * @param destination
//	 *            where the drop will performed
//	 * @throws FindFailed
//	 */
//	public static void screenDragAndDrop(String source, String destination)
//			throws FindFailed {
//		logger.info("Drag " + source + " and drop on "+ destination+" location");
//		screen.dragDrop(new Pattern(source), new Pattern(destination));
//	}
//
//	/**
//	 * mouse drag and drop from a location to another
//	 * 
//	 * @param source
//	 *            where the drag will be performed
//	 * @param x
//	 *            horizontal offset where the drop will performed
//	 * @param y
//	 *            vertical offset where the drop will performed
//	 * @throws FindFailed
//	 */
//	public static void screenDragAndDrop(String source, int x, int y)
//			throws FindFailed {
//		Pattern psource = new Pattern(source);
//		
//		logger.info("Drag " + source + " and drop it on an offset location by ("+x+","+y+")");
//		screen.dragDrop(psource, psource.targetOffset(x, y));
//	}
//
//	/**
//	 * @author Anas Bihi
//	 * @param text
//	 *            text to be written
//	 * @throws FindFailed
//	 */
//	public static void screenType(String text) throws FindFailed {
//		screen.type(text);
//	}
//
//	/**
//	 * @author Anas Bihi
//	 * @param text
//	 *            text to be paste
//	 * @throws FindFailed
//	 */
//	public static void screenPaste(String text) throws FindFailed {
//		screen.paste(text);
//	}
//
//	/**
//	 * @author Anas Bihi
//	 * @param image
//	 *            target where mouse have to perform a click
//	 * @throws FindFailed
//	 */
//	public static void screenClick(String image) throws FindFailed {
//		String str = getImageFilePath(image);
//		logger.info("Click on "+image);
//		screen.click(str);
//	}
//	
//	public static void screenClick(Point p) throws FindFailed{
//		screen.click(p);
//	}
//	/**
//	 * @author Anas Bihi
//	 * @param image
//	 *            target where mouse have to perform a click
//	 * @throws FindFailed
//	 */
//	public static void screenRightClick(String image) throws FindFailed {
//		String str = getImageFilePath(image);
//		screen.rightClick(str);
//	}
//
//	/**
//	 * simulate a click on an image
//	 * 
//	 * @author Anas Bihi
//	 * @param image
//	 *            target where mouse have to perform a click
//	 * @param x
//	 *            horizontal offset
//	 * @param y
//	 *            vertical offset
//	 * @throws FindFailed
//	 */
//	public static void screenClick(String image, int x, int y)
//			throws FindFailed {
//		String str = getImageFilePath(image);
//		screen.click(new Pattern(str).targetOffset(x, y));
//	}
//
//	public static void clickDownUp(String image, int x, int y) throws FindFailed,
//			IOException, URISyntaxException {
//		String str = getImageFilePath(image);
//		screen.mouseMove(str);
//		screen.mouseDown(Button.LEFT);
//		screen.mouseMove(new Pattern(str).targetOffset(x, y));
//		screen.mouseUp(Button.LEFT);
//	}
//
//	/**
//	 * simulate a double click on an image
//	 * 
//	 * @author Anas Bihi
//	 * @param image
//	 *            target where mouse have to perform a double click
//	 * @throws FindFailed
//	 */
//	public static void doubleClick(String image) throws URISyntaxException,
//			IOException, FindFailed {
//		String str = getImageFilePath(image);
//		screen.doubleClick(str);
//	}
//
//	/**
//	 * Simulate a double click on an image
//	 * 
//	 * @author Anas Bihi
//	 * @param image
//	 *            target where mouse have to perform a double click
//	 * @param x
//	 *            horizontal offset
//	 * @param y
//	 *            vertical offset
//	 * @throws FindFailed
//	 */
//	public static void doubleClick(String image, int x, int y)
//			throws URISyntaxException, IOException, FindFailed {
//		String str = getImageFilePath(image);
//		screen.doubleClick(new Pattern(str).targetOffset(x, y));
//	}
//
//	/**
//	 * wait for an image for a given time
//	 * 
//	 * @author Anas Bihi
//	 * @param imageName
//	 *            path of the target image
//	 * @param timeout
//	 *            timeout in seconds
//	 * @param precision
//	 *            similarity level between 0.00f and 1.00f
//	 * @throws FindFailed
//	 */
//	public static void screenWait(String imageName, double timeout,
//			double precision) throws FindFailed {
//		try {
//			String str = getImageFilePath(imageName);
//			logger.info("Waiting for " + imageName + " similar at"
//					+ (precision * 100) + "%");
//			screen.wait(new Pattern(str).similar((float) precision), timeout);
//		} catch (NullPointerException e) {
//			logger.info(imageName + " is not found");
//		}
//	}
//
//	/**
//	 * wait until the target image disappears from the screen
//	 * 
//	 * @author Anas Bihi
//	 * @param imageName
//	 */
//	public static void screenWaitUntilDone(String imageName) {
//		String str = getImageFilePath(imageName);
//		screen.waitVanish(str);
//	}
//
//	/**
//	 * Simulate a pressed key
//	 * 
//	 * @author Anas Bihi
//	 * @param key
//	 *            char key code given by Key enumeration
//	 */
//	public static void screenKeyDown(String key) {
//		screen.keyDown(key.toString());
//	}
//
//	/**
//	 * Simulate a released key
//	 * 
//	 * @author Anas Bihi
//	 * @param key
//	 */
//	public static void screenKeyUp(String key) {
//		screen.keyUp(key.toString());
//	}
//
//	/**
//	 * Simulate a wheel movement down
//	 * 
//	 * @author Anas Bihi
//	 * @param image
//	 * @param x
//	 *            an integer indicating the amoung of wheeling.
//	 * @throws FindFailed
//	 */
//	public static void screenWheelDown(String image, int x) throws FindFailed {
//		String str = getImageFilePath(image);
//		screen.wheel(str, Button.WHEEL_DOWN, x);
//	}
//
//	/**
//	 * Simulate a wheel movement up
//	 * 
//	 * @author Anas Bihi
//	 * @param image
//	 * @param x
//	 *            an integer indicating the amoung of wheeling.
//	 * @throws FindFailed
//	 */
//	public static void screenWheelUp(String image, int x) throws FindFailed {
//		String str = getImageFilePath(image);
//		screen.wheel(str, Button.WHEEL_UP, x);
//	}
//}
