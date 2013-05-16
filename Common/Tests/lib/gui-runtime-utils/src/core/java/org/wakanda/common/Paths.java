package org.wakanda.common;

import java.io.File;

/**
 * Class conainting static fields of full absolute paths to browsers, Wakanda, ...
 *  
 * @author Aleph
 */
public class Paths 
{
	// defines a full path to Wakanda 
	public static String studioPath;
	public static String studioFolder;
	public static String serverPath;
	
	// define a full path to the root of the project
	public static String rootPath;
	
	// defines a default browser
	public static String defaultBrowser = "chrome"; 
				// ---> NOW CAN BE DEFINED AS AN EnvVar "BROWSER_NAME"
				// FROM WITHIN JENKINS TOO. 
				// (this value is then overwritten.)

	// defines full paths to browsers
	public static String firefoxPath;
	public static String iePath;
	public static String chromePath;
	
	// defines relative path to temporary folder (for static resources.
	public static String tempTargetPath;
	
	// Relative Path to where screenshots of errors shall be captured
	public static String errFolder = "target" + File.separator + "temp" + File.separator + "Errors";
	
	// solution to load
	public static String solutionRelativePath;
}