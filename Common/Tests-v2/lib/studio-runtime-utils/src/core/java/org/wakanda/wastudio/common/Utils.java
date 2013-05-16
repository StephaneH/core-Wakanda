package org.wakanda.wastudio.common;

import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import javax.imageio.ImageIO;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.log4j.Logger;
import org.sikuli.script.App;
import org.sikuli.script.Env;
import org.sikuli.script.OS;

import com.sun.jna.platform.win32.User32;

public class Utils {

	protected static Logger utilsLogger = Logger.getLogger(Utils.class);
	
	public static final String cFirefox = "firefox";
	public static final String cIE = "iexplore";
	public static final String cChrome = "chrome";
	public static App appStudio = null;
	public static App appServer = null;
	public static App currentBrowser = null;
	public static String tempFolder=System.getProperty("user.dir");

	public static void openStudio() {
		if (appStudio != null) {
			appStudio.open();
			Utils.restoreAndMaximize("Wakanda Studio");
			utilsLogger.info("Open Wakanda Studio");
		}
	}

	public static void closeStudio() {
		if (appStudio != null) {
			appStudio.close();
			utilsLogger.info("Close Wakanda Studio");
		}
	}

	public static void killStudio() {
		while (isStudioRunning())
			killApplication("Wakanda Studio", "Wakanda Studio", "Wakanda");
		utilsLogger.info("Kill Wakanda Studio");
	}

	public static void openServer() {
		if (appServer != null) {
			appServer.open();
			utilsLogger.info("Open Wakanda Server");
		}
	}

	public static void closeServer() {
		if (appServer != null) {
			appServer.close();
			utilsLogger.info("Close Wakanda Server");
		}
	}

	public static void killServer() {
		// while(isServerRunning())
		killApplication("Wakanda Server", "Wakanda Server", "Wakanda");
		utilsLogger.info("Kill Wakanda Server");
	}
	public static void killChromeDriver() {
		// while(isServerRunning())
		killApplication("chromedriver", "chromedriver", "Wakanda");
		
		utilsLogger.info("Kill Chrome Driver");
	}
	public static void openBrowser(String path) throws InterruptedException {
		closeBrowser();
		if (path != null)
			currentBrowser = new App(path);
		else
			currentBrowser = new App(Paths.firefoxPath);
		currentBrowser.open();
		utilsLogger.info("Open browser");
	}

	public static void closeBrowser() {
		if (currentBrowser != null) {
			currentBrowser.close();
			utilsLogger.info("Close browser");
		}
	}

	public static void killBrowser(String browser) {
		killBrowserViaCommandLine(browser);
		utilsLogger.info("Kill browser");
	}

	public static String getLocation(String chemin) {
		return Utils.class.getResource(chemin).getPath().substring(1);
	}

	public static String getOS() {
		OS s = Env.getOS();
		if (s == OS.MAC)
			return "mac";
		else if (s == OS.WINDOWS)
			return "win";
		else if (s == OS.LINUX)
			return "Linux";
		return null;
	}

	public static void takePictureOfError(String Name) throws IOException,
			AWTException {
		new File("Errors").mkdir();
		Toolkit toolkit = Toolkit.getDefaultToolkit();
		Dimension screenSize = toolkit.getScreenSize();
		Rectangle screenRect = new Rectangle(screenSize);
		Robot robot = new Robot();
		BufferedImage image = robot.createScreenCapture(screenRect);
		utilsLogger.info(ImageIO.write(image, "png", new File("Errors" + "//"
				+ Name)));
	}

	public static void suppr(File r) {
		File[] fileList = r.listFiles();
		for (int i = 0; i < fileList.length; i++) {
			if (fileList[i].isDirectory()) {
				suppr(fileList[i]);
				utilsLogger.info(fileList[i].delete());
			} else {
				utilsLogger.info(fileList[i].delete());
			}
		}
	}

	// Yann : ne permet pas de lancer plusieurs serveurs en même temps.
	// private static Process serverProcess = null;

	private static void killApplication(String appWin, String appMac,
			String appLinux) {
		String command;
		String[] shellCommand;
		String os = getOS();
		String shell;
		if (os.contains("mac")) {
			// Mac
			shell = System.getenv("SHELL");
			command = "killall -9 '" + appMac + "'";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			command = "killall -9 " + appLinux;
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			command = "taskkill /im \"" + appWin + "*\" /f /t && exit";
			shellCommand = new String[] { "CMD", "/C", command };
		}
		try {
			Process p = Runtime.getRuntime().exec(shellCommand);
			p.waitFor();
		} catch (Exception e) {
		}
	}

	public static void executeCommand(String command) {
		// String command;
		String[] shellCommand;
		String os = getOS();
		String shell;
		if (os.contains("mac")) {
			// Mac
			shell = System.getenv("SHELL");
			// command = "rm -R '"+folder+"'";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			// command = "killall -9 " + folder;
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			// command = "taskkill /im \"" + folder;
			shellCommand = new String[] { "CMD", "/C", command };
		}
		try {
			Process p = Runtime.getRuntime().exec(shellCommand);
			p.waitFor();
		} catch (Exception e) {
		}
	}

	public static void deleteStudioPreferences() {
		if (Utils.getOS().equals("mac")) {
			String cmd = "rm -R ~/Library/Application\\ Support/Wakanda*";
			Utils.executeCommand(cmd);
			cmd = "rm -f ~/Library/Preferences/com.4d.waStudio.plist";
			Utils.executeCommand(cmd);		
		}
		else if (Utils.getOS().equals("win")) {
			String cmd = "rmdir /S /Q \""+System.getProperty("user.home")
			+ "\\AppData\\Roaming\\Wakanda Studio\"";
			Utils.executeCommand(cmd);
			cmd = "rmdir /S /Q \""+System.getProperty("user.home")
			+ "\\AppData\\Roaming\\Wakanda Server\"";
			Utils.executeCommand(cmd);
			cmd = "rmdir /S /Q \"" + System.getProperty("user.home")
					+ "\\Library\\Preferences\"";
			Utils.executeCommand(cmd);
		}
	}

	public static boolean killBrowserViaCommandLine(String browser) {
		String appWin = null;
		String appMac = null;
		String appLinux = null;

		if (browser == cFirefox) {
			appWin = "firefox";
			appMac = "firefox";
			appLinux = "firefox";
		} else if (browser == cIE) {
			appWin = "iexplore";
			appMac = "iexplore";
			appLinux = "iexplore";
		}

		try {
			killApplication(appWin, appMac, appLinux);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public static boolean isApplicationRunning(String appWin, String appMac,
			String appLinux) {
		boolean isServerRunning = false;
		String os = getOS();
		String shell;
		String command;
		String[] shellCommand;
		if (os.contains("mac")) {
			// Mac
			shell = System.getenv("SHELL");
			command = "ps -ef | grep -v grep | grep \"" + appMac
					+ "\" && (exit 0) || (exit 1)";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			// command =
			// "ps -aux | grep -v grep | grep Wakanda\\ Server/Wakanda && (exit 0) || (exit 1)";
			command = "ps -aux | grep -v grep | grep " + appLinux
					+ " && (exit 0) || (exit 1)";
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			command = "tasklist /NH /FI \"imagename eq " + appWin
					+ "\" | find /i \"" + appWin + "\" && (exit 0) || (exit 1)";
			shellCommand = new String[] { shell, "/C", command };
		}
		try {

			Process p = Runtime.getRuntime().exec(shellCommand);
			// logger.debug(IOUtils.toString(p.getInputStream()));
			isServerRunning = p.waitFor() == 0;
		} catch (Exception e) {

		}
		return isServerRunning;

	}

	public static boolean isServerRunning() {
		return isApplicationRunning("Wakanda Server.exe", "Wakanda Server",
				"Wakanda");
	}

	public static boolean isStudioRunning() {
		return isApplicationRunning("Wakanda Studio.exe", "Wakanda Studio",
				"Wakanda");
	}

	public static boolean isBrowserRunning(String browser) {
		String appWin = null;
		String appMac = null;
		String appLinux = null;

		if (browser == cFirefox) {
			appWin = "firefox.exe";
			appMac = "firefox";
			appLinux = "firefox";
		} else if (browser == cIE) {
			appWin = "iexplore.exe";
			appMac = "iexplore";
			appLinux = "iexplore";
		}
		return isApplicationRunning(appWin, appMac, appLinux);
	}

//	private static String[] getCommandThatLaunchesServer() {
//		return getCommandThatLaunchesServer(null);
//	}

	private static String[] getCommandThatLaunchesServer(String solutionPath) {
		String command;
		String[] shellCommand;
		String serverPath = Paths.appServer;
		String os = getOS();
		String shell;
		solutionPath = solutionPath == null ? ""
				: (" \"" + solutionPath + "\"");

		if (os.contains("mac")) {
			// Mac
			shell = System.getenv("SHELL");
			command = serverPath + solutionPath + " > /dev/null 2>&1 &";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			command = serverPath + solutionPath + " > /dev/null 2>&1 &";
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			command = "START /B CALL \"" + serverPath + "\"" + solutionPath
					+ " > NUL 2>&1";
			shellCommand = new String[] { "CMD", "/C", command };
		}
		utilsLogger.info(command);
		return shellCommand;
	}

	public static Process runTheServer() {
		return runTheServer(null);
	}

	// Check if server is responding by checking the administration page on
	// http://127.0.0.1:8080/index.html
	public static boolean isServerResponding() {
		boolean isServerResponding = false;
		try {
			HttpClient httpclient = new DefaultHttpClient();
			HttpHost host = new HttpHost("127.0.0.1", 8080);
			HttpResponse response = httpclient.execute(host, new HttpGet(
					"/index.html"));
			boolean is200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
			boolean isWakanda = response.getFirstHeader(HttpHeaders.SERVER)
					.getValue().contains("Wakanda");
			isServerResponding = is200Ok && isWakanda;
		} catch (Exception e) {
			isServerResponding = false;
		}
		return isServerResponding;
	}

	// Start server with solution
	public static Process runTheServer(String solutionPath) {
		Process serverProcess = null;
		long timeOut = 10; // secondes
		String[] command = getCommandThatLaunchesServer(solutionPath);
		try {
			serverProcess = Runtime.getRuntime().exec(command);

			for (int i = 0; i < timeOut; i++) {
				Boolean response = isServerResponding();
				if (true == response) {
					utilsLogger.info("Server is running");
					return serverProcess;
				}
				Thread.sleep(1000);
				utilsLogger.info("Waiting for Server : " + i + " seconds");
			}

			utilsLogger.info("Server is not responding. Time Out.");
		} catch (Exception e) {
			utilsLogger.info("Server stack !!! \n" + e);
		}
		return null;
	}

	public static void copyFolder(File src, File dest) throws IOException {

		if (src.isDirectory()) {
			File foderDest = new File(dest, src.getName());
			if (!foderDest.exists())
				foderDest.mkdir();
			copyFolderImpl(src, foderDest);
		}
	}

	public static void copyFolderImpl(File src, File dest) throws IOException {

		if (src.isDirectory()) {

			// if directory not exists, create it
			if (!dest.exists()) {
				dest.mkdir();
			}

			// list all the directory contents
			String files[] = src.list();

			for (String file : files) {
				// construct the src and dest file structure
				File srcFile = new File(src, file);
				File destFile = new File(dest, file);
				// recursive copy
				copyFolderImpl(srcFile, destFile);
			}

		} else {
			// if file, then copy it
			// Use bytes stream to support all file types
			InputStream in = new FileInputStream(src);
			OutputStream out = new FileOutputStream(dest);

			byte[] buffer = new byte[1024];

			int length;
			// copy the file content in bytes
			while ((length = in.read(buffer)) > 0) {
				out.write(buffer, 0, length);
			}

			in.close();
			out.close();
		}
	}

	public static boolean focusWindow(String title) {
		boolean focused = false;
		if (Utils.getOS().equals("win")) {
			User32 user32 = User32.INSTANCE;
			focused = User32.INSTANCE.SetForegroundWindow(user32.FindWindow(
					null, title));
		}
		return focused;

	}
	 
	 private static void restoreAppForMac(String title) throws ScriptException {
	        String script = "tell application \""+title+"\"\n" +
	        		"activate\n" +
	        		"reopen\n"+
	        		"end tell";
	       new ScriptEngineManager().getEngineByName("AppleScript").eval(script);
	        
	        
		
		
		}
	public static void restoreWindow(String title) {
		if (Utils.getOS().equals("win")) {
			User32 user32 = User32.INSTANCE;
			User32.INSTANCE.ShowWindow(user32.FindWindow(null, title), 9);
		}
			else
			{
				try {
					restoreAppForMac(title);
				} catch (ScriptException e) {
					// TODO Auto-generated catch block
					System.out.println("Impossible de mettre l'application:"+title+" en premier plan!!!");
				}
			}
		
	}

	public static void maximizeWindow(String title) {
		if (Utils.getOS().equals("win")) {
			User32 user32 = User32.INSTANCE;
			User32.INSTANCE.ShowWindow(user32.FindWindow(null, title), 3);
		}
	}

	public static void restoreAndMaximize(String title) {
		if (Utils.getOS().equals("win")) {
			restoreWindow(title);
			maximizeWindow(title);
		}
	}
    public static boolean writeFile(File filename, String data) 
    {
            try {
                // Create file
                FileWriter fstream = new FileWriter(filename);
                BufferedWriter out = new BufferedWriter(fstream);

                out.write(data);

                // Close the output stream
                out.close();

                return true;
            } catch (Exception e) {
                // Catch exception if any
                System.err.println("Error: " + e.getMessage());
                return false;
            }
        }
    public static String readFileToString(String filename) throws IOException {
        try {
            BufferedReader reader = new BufferedReader(new FileReader(filename));
            StringBuilder builder = new StringBuilder();
            String line;

            // For every line in the file, append it to the string builder
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }

            return builder.toString();
        } catch (IOException e) {
            return "";
        }
    }
    public static String getAbsPathFromClassLocation(String relative) {
		try {
			URL url = Utils.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
    public static void copyFile(InputStream inputStream, File destFile) throws IOException {
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
	 static public void extractFolder(String zipFile) throws ZipException, IOException 
	    {
	        System.out.println(zipFile);
	        int BUFFER = 2048;
	        File file = new File(zipFile);

	        ZipFile zip = new ZipFile(file);
	        String newPath = zipFile.substring(0, zipFile.length() - 4);

	        new File(newPath).mkdir();
	        Enumeration zipFileEntries = zip.entries();

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
	                BufferedOutputStream dest = new BufferedOutputStream(fos,
	                BUFFER);

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
	 public static void copyStaticRessources() throws IOException 
	 {
		 new File(Utils.tempFolder+"/target/temp").delete();
		 new File(Utils.tempFolder+"/target/temp").mkdirs();		 
		
			Utils.copyFile(TemplateTestClass.class.getResourceAsStream("globalsolutions/undoRedo.zip"), new File(Utils.tempFolder+"/target/temp/undoRedo.zip"));
		
		 
		 Utils.extractFolder(Utils.tempFolder+"/target/temp/undoRedo.zip");
			  
		      if(Utils.getOS().equals("win"))			  
				 Utils.copyFile(TemplateTestClass.class.getResourceAsStream("captures/win/chromedriver.exe"),
						 new File(Utils.tempFolder+"/target/temp/chromedriver.exe"));
			  else
				 {
				  Utils.copyFile(TemplateTestClass.class.getResourceAsStream("captures/mac/chromedriver"),new File(Utils.tempFolder+"/target/temp/chromedriver"));
				  System.setProperty("webdriver.chrome.driver", Utils.tempFolder+"/target/temp/chromedriver");
				 }
			 
		        Utils.copyFile(TemplateTestClass.class.getResourceAsStream("globalsolutions/designer-test.js"), new File(System.getProperty("user.dir")+"/target/temp/designer-test.js"));
		 
	 }
}
