package org.wakanda.common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Enumeration;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;


/**
 * Common utilities class.
 * 
 * @author Aleph
 *
 */
public class Common 
{	
	// Specific logger for common behaviors
	public static Logger logger = Logger.getLogger("[Common LOGGER]");

	// Wakanda Process Builders
	public static Process serverProcess = null;
	public static Process studioProcess = null;
	
	/*
	 * Please take note:
	 * 
	 * studioProcess and serverProcess are both static members of the Common utility class.
	 * These are default processes given to the Tester to use in a static manner and are instantiated when 
	 * a call to either startServer() and startStudio() is delivered.
	 * Depending on the Tester's need, he is free to either:
	 * 
	 * - use them in a static manner for singular instances,
	 * - or can instantiate as much processes as he needs on his own TestTemplate class (e.g. two or more Server instances, etc.)
	 * 
	 * Those new processes (on TestTemplate classes) can be assigned an already existing static Process from the
	 * Common utility class.
	 */
	
	/**
	 * FileSelector permits to take a specific position among the resources folder.<br/>
	 * Removing this implies moving ALL resources of EVERYTHING to the same folder.
	 */
	public enum FileSelector 
	{
		root, 
		image, 
		imageSystem, 
		initalState,
		imageCurrentBrowser, 
		solution, 
		solutionCurrentBrowser, 
		globalSolution,
		seleniumSolution, 
		drivers;
	};
	
	/**
	 * 
	 * @author Aleph
	 * @param selector
	 * @return
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	public static String getFolderFromRessources(Class<?> kls, FileSelector selector) throws IOException, URISyntaxException 
	{
		String result = null;
		URL url = null;
		File fic = null;

	
		switch (selector) 
		{
			/*
			 *  Tester's Project-side Resources: "solutions" folder
			 *  It should contains solutions used by the test cases separated in different sub-folders.
			 */
			case solution:
				url = kls.getResource("solutions");
		
				break;
			/*
			 *  Tester's Project-side Resources: "testcaptures" folder
			 *  It should contain screenshots depending on which platform the tests are running.
			 */
			case image:
				url = kls.getResource("testcaptures" + "/" + getOS());
				break;
				
			/*
			 *  Architecture-side Resources: "envcaptures" folder
			 *  It should contain screenshots related to the environment (Wakanda, Browsers, ..) depending on which platform the tests are running.
			 */
			case initalState:
				url = new URL("file:/" + Paths.tempTargetPath + "envcaptures" + "/" + getOS());
				break;

			/*
			 *  Architecture-side Resources: "syscaptures" folder
			 *  It should contains screenshots related to the operating system on which the tests are running.
			 */
			case imageSystem:
			{		
				String os_name = System.getProperty("os.name").replace(" ", "_");
				url = new URL("file:/" + Paths.tempTargetPath + "syscaptures" + "/" + getOS() + "/" + os_name);
				break;
			}

			/*
			 * Architecture-side Resources: "drivers" folder
			 * It should contain drivers for both platforms (../drivers/mac/ and ../drivers/win/).
			 */
			case drivers:
				url = Common.class.getResource("drivers");
				break;			
		}

		fic = new File(url.toURI()); 
		result = fic.getCanonicalPath();
		
		return result;
	}
	
	/**
	 * Retrives path to a specific resource file dynamically.
	 * 
	 * @author Aleph
	 * @param kls current class passed statically to make the resources' full absolute path
	 * @param file relative path
	 * @return full path to the resource
	 * @throws URISyntaxException
	 * @throws IOException
	 */
	public static String getResourcePath(Class<?> kls, String file) throws URISyntaxException, IOException
	{
			if (file != null) 
			{
				// Remove the "/" if it's the first character
				file = file.replaceAll("^/(.*)", "$1"); 
				File fic = new File(kls.getResource(file).toURI());
				return fic.getCanonicalPath();
			}
			else
			{
				logger.warning("Resource folder was not found !\n");			
				return null;
			}
	}
	
	/**
	 * Gets a specific file from resources depending on a FileSelector enumeration.
	 * 
	 *@author Aleph
	 * @param file
	 * @param selector
	 * @return String
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	public static String getFileFromRessources(Class<?> kls, String file, FileSelector selector) throws IOException, URISyntaxException 
	{
		String parentFolder = getFolderFromRessources(kls, selector);
		String result = null;
		if (parentFolder != null) 
		{
			if (selector.equals(FileSelector.solution))
				result = new File(parentFolder, file).getCanonicalPath();
			else
				result = parentFolder + File.separator + file;
		}
		
		return result;
	}
	
	/**
	 * Runs Wakanda Server with a specific solution loaded.
	 * 
	 * @author Aleph
	 *
	 * @param solutionPath full path to a wakanda solution.
	 * @return Process
	 */
	public static Process startServer(String solutionPath) 
	{
		String cmdLine = "";
		String os = getOS();
		
		solutionPath = solutionPath == null ? "" : solutionPath; 
				
		// Craft commandline depending on current OS
		if (os.contains("mac"))
		{
			cmdLine = System.getenv("SHELL") + " -c \"" + Paths.serverPath + "\" \"" + solutionPath + "\" > /dev/null 2>&1 &";
		}
		else if (os.contains("Linux"))
		{
			cmdLine = System.getenv("SHELL") + " -c \"" + Paths.serverPath + "\" \"" + solutionPath + "\" > /dev/null 2>&1 &";
		}
		else if (os.contains("win"))
		{
			cmdLine = "CMD /C START /B CALL \"" + Paths.serverPath + "\" \"" + solutionPath + "\" > NUL 2>&1";
		}
		
		logger.info(cmdLine);

		// Execute command line
		try 
		{
			serverProcess = Runtime.getRuntime().exec(cmdLine);
		} 
		catch (Exception e) 
		{
			logger.warning("Wakanda Server exception !\n" + e);
		}

		// Wait 10 seconds for Wakanda Server to load
		isServerRunning(10); 

		return serverProcess;
	}

	/**
	 * Halts the ongoing Wakanda Server's process using a ProcessBuilder parameter
	 * 
	 * @author Aleph
	 * @param server ongoing executed Wakanda Server process.
	 * @return boolean
	 */
	public static boolean stopServer(Process server) 
	{		
		logger.info("Quiting Wakanda Server.");
		try 
		{
			if(server != null)
				server.destroy();
			
			return true;
		} catch (Exception e) {
			logger.warning("Cannot quit Wakanda Server. Such process does not exist !");
			return false;
		}
	}
	
	/**
	 * Halts the ongoing Wakanda Server's process using a CommandLine<br/><br/>
	 * 
	 * <b>Suggestion made by Jean @ 05/01/2013:</b><br/>
	 * Wakanda Server should not be killed but quit normally.<br/>
	 * TBT: It is important to find a way to halt Wakanda Server's<br/>
	 * process without abruptly killing it. (CLI?)
	 *  
	 * @author Aleph
	 * @param server ongoing executed Wakanda Server process.
	 * @return boolean
	 */
	public static boolean killServerCommand() 
	{
		logger.info("Quiting Wakanda Server.");
		
		String cmdLine = "";
		String os = getOS();

		// Get command line from OS type
		if (os.contains("mac"))
			cmdLine = System.getenv("SHELL") + " -c killall -9 'Wakanda Server'";
		else if (os.contains("Linux"))
			cmdLine = System.getenv("SHELL") + " -c killall -9 'Wakanda Server'";
		else if (os.contains("win"))
			cmdLine = "CMD /C taskkill /im \"Wakanda Server*\" /f /t ";

		// Execute command line
		try {
			Process p = Runtime.getRuntime().exec(cmdLine);
			p.waitFor();
			return true;
		} catch (Exception e) {
			logger.warning("Cannot kill Wakanda Server process !\n" + e);
			return false;
		}
	}
	
	/**
	 * Runs Wakanda Studio.
	 * 
	 * @author Aleph
	 * @return Process
	 */
	public static Process startStudio() 
	{
		String cmdLine = "";
		String os = getOS();
		
		// Craft commandline depending on current OS
		if (os.contains("mac"))
			cmdLine = System.getenv("SHELL") + " -c \"" + Paths.studioPath + " > /dev/null 2>&1 &";
		else if (os.contains("win"))
			cmdLine = "CMD /C START /B CALL \"" + Paths.studioPath;
		logger.info(cmdLine);

		// Execute command line
		try {
			studioProcess = Runtime.getRuntime().exec(cmdLine);
		} catch (Exception e) {
			logger.warning("Wakanda Studio exception !\n" + e);
		}

		return studioProcess;
	}

	/**
	 * Halts the ongoing Wakanda Studio's process using a ProcessBuilder parameter
	 * 
	 * @author Aleph
	 * @param studio ongoing executed Wakanda Studio process.
	 * @return boolean
	 */
	public static boolean stopStudio(Process studio) 
	{	
		logger.info("Quiting Wakanda Studio.");
		try {
			studio.destroy();
			return true;
		} catch (Exception e) {
			logger.warning("Cannot quit Wakanda Studio !\n" + e);
			return false;
		}
	}
	
	/**
	 * Halts the ongoing Wakanda Server's process using a CommandLine
	 * 
	 * @author Aleph
	 * @param server ongoing executed Wakanda Server process.
	 * @return boolean
	 */
	public static boolean killStudioCommand() 
	{
		logger.info("Quiting Wakanda Studio.");
		
		String cmdLine = "";
		String os = getOS();

		// Get command line from OS type
		if (os.contains("mac"))
			cmdLine = System.getenv("SHELL") + " -c killall -9 'Wakanda Studio'";
		else if (os.contains("Linux"))
			cmdLine = System.getenv("SHELL") + " -c killall -9 'Wakanda Studio'";
		else if (os.contains("win"))
			cmdLine = "CMD /C taskkill /im \"Wakanda Studio*\" /f /t ";

		// Execute command line
		try {
			Process p = Runtime.getRuntime().exec(cmdLine);
			p.waitFor();
			return true;
		} catch (Exception e) {
			logger.warning("Cannot kill Wakanda Studio process !\n" + e);
			return false;
		}
	}

	/**
	 * Halts all ongoing Wakanda processes using CommandLine
	 * 
	 * @author Aleph
	 * @return boolean
	 */
	public static boolean killWakandaProcesses() 
	{
		String cmdLine = "";
		String os = getOS();

		// Get command line from OS type
		if (os.contains("mac"))
			cmdLine = System.getenv("SHELL") + " -c killall -9 'Wakanda'";
		else if (os.contains("Linux"))
			cmdLine = System.getenv("SHELL") + " -c killall -9 'Wakanda'";
		else if (os.contains("win"))
			cmdLine = "CMD /C taskkill /im \"Wakanda*\" /f /t ";

		// Execute command line
		try {
			Process p = Runtime.getRuntime().exec(cmdLine);
			p.waitFor();
			return true;
		} catch (Exception e) {
			logger.warning("Cannot kill all Wakanda process !\n" + e);
			return false;
		}
	}
	
	/**
	 * Executes a shell command passed as an argument depending on platform.
	 * 
	 *@author Aleph
	 * @param command
	 */
	public static void executeCommand(String command)
	{
		// String command;
		String[] shellCommand;
		String os = getOS();
		String shell;
		
		if (os.contains("mac")) 
		{
			// Mac
			shell = System.getenv("SHELL");
			shellCommand = new String[] { shell, "-c", command };
		} 
		else if (os.contains("Linux")) 
		{
			// Linux
			shell = System.getenv("SHELL");
			shellCommand = new String[] { shell, "-c", command };
		} else 
		{
			// Win
			shell = "CMD";
			shellCommand = new String[] { "CMD", "/C", command };
		}
			
		
		try {
			Process p = Runtime.getRuntime().exec(shellCommand);
			p.waitFor();
		} catch (IOException e) 
		{
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	
	}

	/**
	 * Removes Wakanda Studio's preferences
	 * 
	 *@author Aleph
	 * @throws InterruptedException 
	 * @throws IOException 
	 */
	public static void removeStudioPreferences()
	{
		if (getOS().equals("mac")) 
		{
			String cmd = "rm -R ~/Library/Application\\ Support/Wakanda*";
			executeCommand(cmd);
			
			cmd = "rm -f ~/Library/Preferences/com.4d.waStudio.plist";
			executeCommand(cmd);		
		}
		else if (getOS().equals("win")) 
		{
			String cmd = "rmdir /S /Q \""+System.getProperty("user.home") + "\\AppData\\Roaming\\Wakanda Studio\"";
			executeCommand(cmd);
			
			cmd = "rmdir /S /Q \""+System.getProperty("user.home") + "\\AppData\\Roaming\\Wakanda Server\"";
			executeCommand(cmd);
			
			cmd = "rmdir /S /Q \"" + System.getProperty("user.home") + "\\Library\\Preferences\"";
			executeCommand(cmd);
		}
	}

	/**
	 * Retrieves current OS.
	 * (Can be replaced by an enumeration.)
	 * 
	 * @author Aleph
	 * @return String
	 */
	public static String getOS() {
		
		String os = System.getProperty("os.name").toLowerCase();
		if (os.indexOf("windows") > -1)
			return "win";
		else if (os.indexOf("linux") > -1)
			return "lin";
		else if (os.indexOf("mac") > -1)
			return "mac";
		return null;
	}
	
	/**
	 * Deletes a file object.
	 * 
	 * @deprecated Can be done better or replaced from apache.common-io's library.
	 * @param r File or Folder to delete.
	 */
	public static void suppr(File r) 
	{
		File[] fileList = r.listFiles();
		for (int i = 0; i < fileList.length; i++) 
		{
			if (fileList[i].isDirectory()) {
				suppr(fileList[i]);
				if(fileList[i].delete())
					logger.info(fileList[i].getName() + "has been removed.");
			} else {
				if(fileList[i].delete())
					logger.info(fileList[i].getName() + "has been removed.");
			}
		}
	}

	/**
	 * Waits for Wakanda Server to be up.
	 * 
	 * @author Aleph
	 * @param timeOut time to wait.
	 * @return
	 */
	public static boolean isServerRunning(Integer timeOut) 
	{
		HttpClient httpclient = new DefaultHttpClient();
		HttpHost host = new HttpHost("127.0.0.1", 8080);
		boolean bool200Ok = false;
		boolean boolWakanda = false;

		// Check if server is responding http://127.0.0.1:8080/index.html
		for (int i = 0; i < timeOut; i++) 
		{
			try 
			{
				Thread.sleep(1000);
				HttpResponse response = httpclient.execute(host, new HttpGet("/index.html"));
				bool200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
				boolWakanda = response.getFirstHeader(HttpHeaders.SERVER).getValue().contains("Wakanda");
			} catch (Exception e) {}

			if (true == (bool200Ok && boolWakanda))
				return true;
		}
		
		logger.warning("Wakanda Server time out !");
		return false;
	}

	/**
	 * Extracts a ZIP File to a specific Folder.
	 * 
	 *@author Aleph
	 * @param zipFile
	 * @throws ZipException
	 * @throws IOException
	 */
	static public void extractFolder(String zipFile) throws ZipException, IOException 
	{
		int BUFFER = 2048;
		File file = new File(zipFile);

		ZipFile zip = new ZipFile(file);
		String newPath = zipFile.substring(0, zipFile.length() - 4);

		new File(newPath).mkdir();
		Enumeration<?> zipFileEntries = zip.entries();

		// Process each entry
		while (zipFileEntries.hasMoreElements())
		{
			// grab a zip file entry
			ZipEntry entry = (ZipEntry) zipFileEntries.nextElement();
			String currentEntry = entry.getName();
			File destFile = new File(newPath, currentEntry);
			//destFile = new File(newPath, destFile.getName());
			File destinationParent = destFile.getParentFile();

			// create the parent directory structure if needed
			destinationParent.mkdirs();

			if (!entry.isDirectory())
			{
				BufferedInputStream is = new BufferedInputStream(zip
						.getInputStream(entry));
				int currentByte;
				// establish buffer for writing file
				byte data[] = new byte[BUFFER];

				// write the current file to disk
				FileOutputStream fos = new FileOutputStream(destFile);
				BufferedOutputStream dest = new BufferedOutputStream(fos, BUFFER);

				// read and write until last byte is encountered
				while ((currentByte = is.read(data, 0, BUFFER)) != -1) {
					dest.write(data, 0, currentByte);
				}
				dest.flush();
				dest.close();
				is.close();
			}

			if (currentEntry.endsWith(".zip"))
			{
				// found a zip file, try to open
				extractFolder(destFile.getAbsolutePath());
			}
		}
	}
	
	/**
	 * Copy an InputStream to a specific destination File.
	 * 
	 *@author Aleph
	 * @param inputStream
	 * @param destFile
	 * @throws IOException
	 */
	public static void copyFile(InputStream inputStream, File destFile) throws IOException 
	{
		OutputStream out = new FileOutputStream(destFile);

		int read = 0;
		byte[] bytes = new byte[1024];

		while ((read = inputStream.read(bytes)) != -1) {
			out.write(bytes, 0, read);
		}

		inputStream.close();
		out.flush();
		out.close();
	}
	/**
	 * Copies a Folder from an already complied JAR archive's resources based on a recursive JarConnection algorithm.
	 * 
	 * @author Aleph
	 * @throws IOException 
	 * @throws URISyntaxException 
	 */
	public static void copyFolder(String folderName) throws IOException, URISyntaxException
	{
			// initializes destination folder
			File destDir = new File(Paths.tempTargetPath);  
			destDir.mkdirs();		
			
			// Gets the resource from the current class's resource folder.
			URL srcDir = new URL(Common.class.getResource(folderName).toString()); 
			// <-- AVOIDING EXCEPTION: URI is not hiearchical-->
			
			// Uses common-ios API to perform copy. 
			//FileUtils.copyDirectory(srcDir, destDir);
			FileUtils.copyResourcesRecursively(srcDir, destDir);

		}
	

	
	/**
	 * Prepares the temporary resources folders from Paths.
	 * 
	 *@author Aleph
	 */
	public static void copyPrepareResFolders()
	{
		// Retrieves temporary folder from a system property. Can be set explicitly from Paths class instead, if needed.
		Paths.tempTargetPath = System.getProperty("user.dir") + File.separator + "target" + File.separator + "temp" + File.separator;
		
		// Makes sure to clean any existing temporary files to avoid unnecessary conflicts.
		 if(!new File(Paths.tempTargetPath).delete());
		 {
			 logger.warning("Failed to clean temporary folders.");
			 if(!new File(Paths.tempTargetPath).mkdirs())
			 {
				 logger.warning("Failed to create temporary folders.");
			 }
		 }
		 // TODO: Perfect this algorithm using final modifier arguments. (see apache's common-io)
	}
	
	/**
	 * ## Required for: Wakanda Server.
	 * 
	 * Copies and extracts the WebEditorsors static "Global Solution" to temporary folder.<br/>
	 * 
	 * <b>Suggestion made by Yann @ 19/12/2012:</b><br/>
	 * Changing the global solution's name to "WebEditorsors" from "UndoRedo" a more coherent name.<br/><br/>
	 * 
	 * <b>Suggestion studied @ 21/12/2012:</b><br/>
	 * Point made. The default solution name has been changed to "WebEditorsors".<br/>
	 * The name is not relevant. The waSettings file is up to date.<br/><br/>
	 * 
	 * A GlobalSolution is not when using Apache HTTP Server.
	 * 
	 * @author Aleph
	 * @throws IOException 
	 * @throws ZipException 
	 */
	public static void copyAndExtractGlobalSolution() throws ZipException, IOException
	{
		copyFile(Common.class.getResourceAsStream("globalsolutions/WebEditors.zip"), 
				new File(Paths.tempTargetPath + "WebEditors.zip"));
		
		extractFolder(Paths.tempTargetPath + "WebEditors.zip");
	}
	
	public static void copyDrivers() throws IOException
	{
		if(getOS().equals("win"))	
		{
			 copyFile(Common.class.getResourceAsStream("drivers/win/chromedriver.exe"), 
					 new File(Paths.tempTargetPath + "chromedriver.exe"));
		}
		 else
		 {
		  copyFile(Common.class.getResourceAsStream("/mac/chromedriver"),
					  new File(Paths.tempTargetPath + "chromedriver"));
		}
	}
	
	/**
	 * Copies designer-test.js to the static resources folder.
	 * 
	 *@author Aleph
	 * @throws IOException
	 */
	public static void copyDesigner() throws IOException
	{
        copyFile(Common.class.getResourceAsStream("globalsolutions/designer-test.js"), 
        		new File(Paths.tempTargetPath + "designer-test.js"));
	}
	
	/**
	 * 
	 * 
	 * @author Aleph
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	public static void copyScreenshots() throws IOException, URISyntaxException
	{				
		
		copyFolder("envcaptures/");  
		copyFolder("syscaptures/");
	}
	
	
	/**
	 * Copies all kind of static resources (both Sikuli and Selenium resources).<br/><br/>
	 * 
	 * <b>! CAUTION:</b><br/>
	 * Resources are retrieved either from:<br/>
	 * - the runtime calling class's resources,<br/>
	 * - or the common "architecture" project resources within a JAR archive (hence the file streaming).<br/><br/>
	 * 
	 * <b>Suggestion made by Yann @ 20/12/2012: </b><br/>
	 * Retrieve some or all of the resources from Perforce's source control repository 
	 * instead of a static copying.<br/><br/>
	 * 
	 * <b>Suggestion studied @ 21/12/2012:</b><br/>
	 * Resources cannot be retrieved from Perforce's repository in a synchronous way.<br/>
	 * Synchronization with the repository, either forced or to_head, cannot be done in a 
	 * runtime environment using P4 commandlines.<br/>
	 * This would also imply that a P4 installation is mandatory for the code to work.<br/>
	 * TBT: If that's so, how should we proceed in debug / dev mode?<br/><br/>
	 *
	 * 
	 *@author Aleph
	 * @throws IOException
	 */
	 public static void copyStaticRessources() 
	 {
		 try
		 {		 
			 // Prepares the temporary resources folders from Paths.
			 copyPrepareResFolders();
		 
			 // Copies current Chrome Drivers to the static resources folder.
			 copyDrivers();
		      
			 /*
			  * ## Required for: Wakanda Server.
			  *  Copies and extracts the static "Global Solution" to temporary folder.
			  */
			 copyAndExtractGlobalSolution();
		
			 
			 // Copies system screencaptures and initial states to the static resources folder.
			 copyScreenshots();
			 
			 // Copies designer-test.js to the static resources folder.
			 copyDesigner();
		 }
		 catch(Exception e)
		 {
			 logger.warning("Could not copy a static resource to temporary folder: " + e + "\nResource was most likely already copied.");
		 }
	 }
	
	/* Selenium -  BUG #XXXXXX :
	 * 
	 * URL:
	 * to be reported to Selenium HQ.
	 * 
	 * IDEA ABORTED:
	 * ChromeDriver's constructor won't allow launching a Runnable
	 * from a JAR archive eventhough a java.io.File object is streamed
	 * outward the JAR archive via an openConnection while taking note of specific protocols.
	 *
	private static URL convertURLtoString(URL url)
	{
		URL targetURL = null;
		String proto = url.getProtocol();
		
		try 
		{	
			if(proto.equals("jar"))
			{
				targetURL = new URL(url.getPath());
				proto = targetURL.getProtocol();
				if(proto.equals("file"))
				{
					String tmp = targetURL.toString();
					String[] tmps = tmp.split("!");
					tmp = "";
					for (String t : tmps)
					{
						tmp=tmp.concat(t);
					}
					targetURL = new URL(tmp);
					return targetURL;
				}
			}
			else
				return url;			
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return null;
	}*/
}
