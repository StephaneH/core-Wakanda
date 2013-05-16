package org.wakanda.selenium;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;

import java.util.List;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.XMLOutputter;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.wakanda.common.Common.*;

import org.wakanda.common.FileUtils;
import org.wakanda.common.Paths;

public class SeleniumActions 
{
	// Singleton's instance
	private static SeleniumActions instance = null;
	
	// Generic WebDriver and javascript Console
	private WebDriver driver;
	private JavascriptExecutor jsConsole;

	/**
	 * Prevents instantiation from other classes
	 * 
	 * @author Aleph
	 */
	protected SeleniumActions()
	{}

	/**
	 * The instance is not constructed until the class is used.
	 *  
	 * @author Aleph
	 */
	public static SeleniumActions getSeleniumInstance()
	{
		if(instance == null)
		{
			instance = new SeleniumActions();
		}
		
		return instance;
	}

	public WebDriver getDriver() {
		return driver;
	}

	/**
	 * Accessors and mutators for the WebDriver
	 * 
	 *@author Aleph
	 */
	public void setDriver(WebDriver driver) 
	{
		setJsConsole((JavascriptExecutor) getDriver());
		this.driver = driver;
	}

	public JavascriptExecutor getJsConsole() 
	{
		return jsConsole;
	}

	/**
	 * Accessors and mutators for Javascript Console
	 * 
	 *@author Aleph
	 */
	public void setJsConsole(JavascriptExecutor jsConsole) 
	{
		this.jsConsole = jsConsole;
	}

	/**
	 * Loads the default driver depending on a default browser.
	 * 
	 * @author Aleph
	 * @throws IOException 
	 * @throws URISyntaxException 
	 */
	public void createDefaultDriver() throws URISyntaxException, IOException {

		if (Paths.defaultBrowser.contains("firefox"))
			createFireFoxDriver();
		else if (Paths.defaultBrowser.contains("ie"))
			createIExplorerDriver();
		else
			createChromeDriver();

	}

	/**
	 * Loads Google Chrome's driver.
	 * 
	 * @author Aleph
	 *
	 * @throws IOException 
	 * @throws URISyntaxException 
	 */
	public void createChromeDriver() throws URISyntaxException, IOException 
	{	
		String myOS = getOS();
		
		// Constructs the temporary target folder where ChromeDriver was already copied.
		String tempChromeDriver = Paths.tempTargetPath + "chromedriver";
		
			ChromeOptions options = new ChromeOptions();
			
			// Disables ChromeDriver's extensions. 
			options.addArguments("bwsi");
			options.addArguments("disable-translate");
			options.addArguments("disable-extensions");
			
			/*
			 * This option enables Application Cache allowing tests to run FASTER!!
			 * applicationCacheEnabled is always set to false, thus we are bound to add this
			 * argument manually to redirect Cache to a specific Chrome Profile.
			 * see.: http://code.google.com/p/chromedriver/issues/detail?id=47 (ChromeDriver BUG)
			 * 
			 * PS: Saving cache has no impact on the relevancy of UnitTests as initial states
			 * are loaded later on the code from SeleniumSolutions/my_method_name.gui files.
			 */
			options.addArguments("user-data-dir=" + Paths.tempTargetPath + "chromeCache");			
			
			if (myOS.equals("win"))
			{
				// Concatenates EXEcutable extension if Windows, otherwise ..
				tempChromeDriver += ".exe";
			}
			
			// Sets the webDriver's system property.
			System.setProperty("webdriver.chrome.driver", tempChromeDriver);
			
			setDriver(new ChromeDriver(options));
			
			setJsConsole((JavascriptExecutor) getDriver());

			logger.info("Google Chrome driver successfully created !");
	}

	/**
	 * Loads Mozilla Firefox's driver.
	 * 
	 * @author Aleph
	 */
	public void createFireFoxDriver() 
	{
			FirefoxProfile profile = new FirefoxProfile();
			profile.setEnableNativeEvents(true);
			
			setDriver(new FirefoxDriver(profile));
			setJsConsole((JavascriptExecutor) getDriver());
			
			logger.info("Mozilla Firefox driver successfully created !\n");
	}

	/**
	 * Loads Internet Explorer's driver.
	 * 
	 * @author Aleph
	 */
	public void createIExplorerDriver() 
	{
			DesiredCapabilities ieCapabilities = DesiredCapabilities.internetExplorer();
			ieCapabilities.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS, true);
			ieCapabilities.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
			
			setDriver(new InternetExplorerDriver(ieCapabilities));
			setJsConsole((JavascriptExecutor) getDriver());

			logger.info("IExplorer driver successfully created !\n");

	}

	/**
	 * Loads iPAD's driver.
	 * 
	 * @author Aleph
	 * @throws MalformedURLException 
	 */
	public void createIPadDriver() throws MalformedURLException 
	{
			setDriver(new RemoteWebDriver(new URL("http://localhost:3001/wd/hub"), DesiredCapabilities.ipad()));
			setJsConsole((JavascriptExecutor) getDriver());
			
			logger.info("iPad driver successfully created !\n");
	}

	/**
	 * Unloads the WebDriver disregard which one, of which browser, was loaded.
	 * 
	 * @author Aleph
	 */
	public void deleteDriver() {

		setJsConsole(null);
		getDriver().quit();
	}
	
	/**
	 * Waits for a WebElement to be displayed on page before timeout.
	 */
	public void waitWebElement(WebElement e, long time)
	{
		long end = System.currentTimeMillis() + time;
		while (System.currentTimeMillis() < end) 
		{
			if (e.isDisplayed()) 
			{
				logger.warning("WebElement "+ e.getTagName()+": " + e.getAttribute("id")+ " is displayed.");
				break;
			}
		}
	}
	
	/**
	 * Waits for a WebDriver to be created before timeout.
	 */
	public WebDriverWait waitWebDriver(WebDriver driver, long timeout) 
	{
		if (driver != null) 
		{
			WebDriverWait element = new WebDriverWait(driver, timeout);
			return element;
		}
		
		return null;
	}
	
	/**
	 * @throws ClassNotFoundException 
	 * 
	 */
	public void updateGUIfile(Class<?> kls, String callingMethodName) throws ClassNotFoundException
	{
		// Charges the content of the GUI file into the designer-gui.js
		try
		{
			if (getOS().equals("win"))
			{
				FileUtils.copyFile
				(
						new File(getResourcePath(kls, "SeleniumSolutions/" + callingMethodName + ".gui")), 
						new File(Paths.studioPath.substring(0, Paths.studioPath.lastIndexOf("\\")) + "\\Resources\\Web Components\\GUIDesigner\\scripts\\designer\\test\\designer-test.js")
				);
			}
			else
			{
				FileUtils.copyFile
				(
						new File(getResourcePath(kls, "SeleniumSolutions/" + callingMethodName + ".gui")),
						new File(Paths.studioPath + "/Contents/Resources/Web Components/GUIDesigner/scripts/designer/test/designer-test.js")
				);
			}
			
			logger.info("GUI file succesfully charged.");
		} catch (Exception e) {
			logger.info("GUI file could not be charged due to the following exception: " + e);
		}
	}
	
	/**
	 * Updates the global solutions' default waSettings file.<br/>
	 * This should be only called when using Wakanda Server!
	 * 
	 * @author Aleph
	 * @throws Exception
	 */
	public void updateWAKSettings()throws Exception
	{
		logger.info("Updating the global solution's waSettings file..");
		
		// Path to be updated depending on the platform. 
		String waFolder = null;

		// Ready URL to waSettings file.
		String url = Paths.tempTargetPath + "WebEditors" + File.separator + "WebEditors"  + File.separator + "Settings.waSettings";
		logger.info("WebEditor's settings updated:\n" + url);

		// Reading into waSettings as an XML file.
		SAXBuilder builder = new SAXBuilder();
		
		File xmlFile = new File(url);

		Document doc = (Document) builder.build(xmlFile);
		Element rootNode = doc.getRootElement();

		// Retrievs all "virtualFolder" nodes on waSettings file.
		List<Element> vFolder = rootNode.getChildren("virtualFolder");
		
		// Update Studio path depending on the platform.
		for(Element f : vFolder )
		{
			if(getOS().equals("win"))
				waFolder = Paths.studioPath.substring(0,Paths.studioPath.indexOf("\\Wakanda Studio.exe")).replace('\\', '/');
			else
				waFolder = Paths.studioPath+"/Contents/";

			f.setAttribute("location", f.getAttributeValue("location").replaceAll("(\\[.*?\\])", waFolder).replace('\\', '/'));
		}
		
		// Writes results on an XML output file.
		XMLOutputter xmlOutput = new XMLOutputter();
		xmlOutput.output(doc, new FileWriter(xmlFile));
	}


	/**
	 * Doublechecks if ../GUIDesigner/guidesigner.html file integrates correctly the<br/>
	 * 'guidesigner-test.js' file. If not, it will be added dynamically.
	 * 
	 * @deprecated Wakanda Studio seems to have this already integrated per default.
	 */
	public void updateDesignerTestFile() 
	{
		boolean hasGUIDTestScript= false;
		
		String fileContent = null;
		String studioPath = null;
		
		try 
		{
			// Constructs a path to the guidesigner.html File within Wakanda's GUIDesigner folder accordingly.
			if (getOS().equals("win"))
			{
				studioPath = Paths.studioPath.substring(0, Paths.studioPath.indexOf("\\Wakanda Studio.exe")).replace('\\', '/') + "\\Resources\\Web Components\\GUIDesigner\\guidesigner.html";
			}
			else
			{
				studioPath = Paths.studioPath + "/Contents/Resources/Web Components/GUIDesigner/guidesigner.html";
			}

			// Recovers guidesigner.html's binary content as a String object.
			fileContent = FileUtils.readFromFile(studioPath);

			// Doublechecks if the content of guidesigner.html has a tag to including designer-test.js script file.
			hasGUIDTestScript = fileContent.toString().contains("<script type=\"text/javascript\" src=\"./scripts/designer/test/designer-test.js\"></script>");
			
			// If guidesigner.html doesn't include the correct Script file, we add it manually to the last bracket existing.
			if (!hasGUIDTestScript) 
			{
				fileContent = fileContent.toString().replace("<script type=\"text/javascript\" src=\"./scripts/designer/designer-run.js\"></script>", 
						"<script type=\"text/javascript\" src=\"./scripts/designer/designer-run.js\"></script>" + "<script type=\"text/javascript\" src=\"./scripts/designer/test/designer-test.js\"></script>");
				
				// We make sure to write the new String content to our file object guidesigner.html
				FileUtils.writeToFile(new File(studioPath), fileContent);
				
				logger.info("A script was missing: 'designer-test.js' was succesfully integrated to GUIDesigner.");
			}
		} 
		catch (IOException e) 
		{
			logger.warning("A script is missing: failed to integrate 'designer-test.js' to GUIDesigner.");

		}
	}
}
