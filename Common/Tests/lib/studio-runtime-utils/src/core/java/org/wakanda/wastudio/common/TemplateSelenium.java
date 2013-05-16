/**
 * @author Ahmed Jaafri
 */

/**
 * @author Anas Bihi
 */
package org.wakanda.wastudio.common;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.sikuli.script.Screen;

import com.thoughtworks.selenium.Selenium;
import org.wakanda.wastudio.utils.SeleniumUtil;

@RunWith(Parameterized.class)
public class TemplateSelenium extends TemplateRuntimeTestClass {

	protected WebDriver fDriver;
	protected static Selenium selenium;
	int timeOut = 5;
	Screen screen = new Screen();
	static protected Map<eBrowser, WebDriver> sBrowserDriverMap = new HashMap<eBrowser, WebDriver>();

	protected static Logger logger = Logger.getLogger(TemplateSelenium.class);

	public TemplateSelenium() {
		this(null, null, false);
	}

	public TemplateSelenium(eBrowser browserName) {
		this(browserName, null, false);
	}

	public TemplateSelenium(eBrowser browserName, String solutionName) {
		this(browserName, solutionName, false);
	}

	public TemplateSelenium(eBrowser browserName, String solutionName,
			boolean launchServerOnlyOneTime) {
		this.browserName = browserName;
		this.solutionName = solutionName;
		this.launchServerOnlyOneTime = launchServerOnlyOneTime;
	}

	public void after() {
		super.after();
	}

	public void before() throws Exception {
		super.before();

	}

	protected void openAndPrepareBrowserInBefore() throws Exception {
		WebDriver currentBrowserDriver;
		currentBrowserDriver = getWebDriver();

		if (currentBrowserDriver == null) {
			currentBrowserDriver = createWebDriver();
			sBrowserDriverMap.put(browserName, currentBrowserDriver);
			currentBrowserDriver.manage().timeouts()
					.implicitlyWait(5, TimeUnit.SECONDS);
			logger.info("Change implicitWait to 5");
		}

		fDriver = sBrowserDriverMap.get(browserName);
	}

	protected void closeBrowseInAfter() {

	}

	public WebDriver createWebDriver() throws Exception {
		switch (browserName) {
		case firefox: {
			logger.info("initializing Mozilla Firefox");
			return SeleniumUtil.openFireFox();
		}
		case ie: {
			logger.info("initializing Microsoft Internet Explorer");
			return SeleniumUtil.openInternetExplorer();
		}
		case chrome: {
			logger.info("initializing Google Chrome");
			return openChrome();
		}
		case ipad: {
			logger.info("initializing iPad Simulator");
			return openIpad();
		}
		}
		return null;
	}

	protected WebDriver openChrome() throws Exception {

		logger.info("Launching Chrome Browser");
		/*
		 * list of chrome options
		 * http://peter.sh/experiments/chromium-command-line-switches/
		 */
		ChromeOptions options = new ChromeOptions();
		options.addArguments("bwsi");
		options.addArguments("disable-translate");
		options.addArguments("disable-extensions");
		options.addArguments("disable-application-cache");
		new File(Utils.tempFolder + "/target/temp").mkdirs();

		if (Utils.getOS().equals("win")) {
			System.setProperty("webdriver.chrome.driver", Paths.tempWin
					+ "\\chromedriver.exe");
		} else {
			Runtime.getRuntime().exec(
					"chmod 777 " + Paths.tempMac + "/chromedriver");

			// System.setProperty("webdriver.chrome.driver",
			// getFileFromRessources("chromedriver", FileSelector.InitalState));
		}
		WebDriver driver = new ChromeDriver(options);
		return driver;
	}

	protected WebDriver openIpad() throws Exception {
		WebDriver driver = new RemoteWebDriver(new URL(
				"http://localhost:3001/wd/hub"), DesiredCapabilities.ipad());
		return driver;
	}

	void closeWebDriver() {
		logger.info("closing web driver");
		if (fDriver != null) {
			fDriver.close();
			fDriver = null;
		}
	}

	protected void prepareForFirefox() throws Exception {
		logger.info("preparing web driver in order to start unit test");
		closeWebDriver();
		Utils.closeBrowser();
		fDriver = createWebDriver();
	}

	public WebDriver getWebDriver() {
		return sBrowserDriverMap.get(browserName);
	}

	protected void prepareForIE() throws Exception {
		logger.info("preparing web driver in order to start unit test");
		closeWebDriver();
		Utils.closeBrowser();
		fDriver = createWebDriver();
	}

	public String getFolderFromRessources(FileSelector selector)
			throws IOException, URISyntaxException {
		String result = super.getFolderFromRessources(selector);
		if (result == null) {
			switch (selector) {
			case seleniumSolution:
				URL url1 = getClass().getResource("SeleniumSolutions");
				if (url1 == null)
					return null;
				URI uri1 = url1.toURI();
				File fic = new File(uri1);
				result = fic.getCanonicalPath();
				break;
			}
		}
		return result;

	}

	@SuppressWarnings("rawtypes")
	static protected void clearDrivers() {
		Set s = sBrowserDriverMap.entrySet();
		Iterator it = s.iterator();

		while (it.hasNext()) {
			Map.Entry m = (Map.Entry) it.next();
			WebDriver driver = (WebDriver) m.getValue();
			driver.quit();
		}

		sBrowserDriverMap.clear();
	}

	static protected void killChromeDriver() {
		Utils.killChromeDriver();
	}

	static protected void killWakandaServer() {
		TemplateRuntimeTestClass.afterClass();
	}

	@AfterClass
	public static void afterClass() {
		clearDrivers();
		killChromeDriver();
		killWakandaServer();

	}
}
