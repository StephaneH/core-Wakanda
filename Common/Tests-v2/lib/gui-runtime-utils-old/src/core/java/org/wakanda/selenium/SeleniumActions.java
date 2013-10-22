package org.wakanda.selenium;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
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
		// Constructs the temporary target folder where ChromeDriver was already copied.
		String tempChromeDriver = Paths.tempTargetPath + "chromedriver";
		
			ChromeOptions options = new ChromeOptions();
			
			options.addArguments("bwsi");
			options.addArguments("disable-translate");
			options.addArguments("disable-extensions");

			String myOS = getOS();
			
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

			logger.info("Internet Explorer driver successfully created !\n");

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
				FileUtils.copyFile(
						new File(getResourcePath(kls, "SeleniumSolutions/" + callingMethodName + ".gui")), 
						new File(Paths.studioPath.substring(0, Paths.studioPath.lastIndexOf("\\")) 
						+ "\\Resources\\Web Components\\GUIDesigner\\scripts\\designer\\test\\designer-test.js"));
			}
			else
			{
				FileUtils.copyFile(
						new File(getResourcePath(kls, "SeleniumSolutions/" + callingMethodName + ".gui")),
						new File(Paths.studioPath
						+ "/Contents/Resources/Web Components/GUIDesigner/scripts/designer/test/designer-test.js"));
			}
			
			logger.info("GUI file succesfully charged.");
		} catch (Exception e) {
			logger.info("GUI file could not be charged due to the following exception: " + e);
		}
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

	public JavascriptExecutor getJsConsole() 
	{
		return jsConsole;
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

	public WebDriver getDriver() {
		return driver;
	}

	/**
	 * Waits for a WebElement to be displayed on page before timeout.
	 */
	public void waitWebElement(WebElement e, long time)
	{
		long end = System.currentTimeMillis() + time;
		while (System.currentTimeMillis() < end) 
		{
			if (e.isDisplayed()) {
				logger.info(e.getTagName()+": "+e.getAttribute("id")+" Displayed");
				break;
			}
		}
	}
	
	/**
	 * Waits for a WebDriver to be created before timeout.
	 */
	public static WebDriverWait waitWebDriver(WebDriver driver, long timeout) 
	{
		if (driver != null) 
		{
			WebDriverWait element = new WebDriverWait(driver, timeout);
			return element;
		}
		
		return null;
	}
}
