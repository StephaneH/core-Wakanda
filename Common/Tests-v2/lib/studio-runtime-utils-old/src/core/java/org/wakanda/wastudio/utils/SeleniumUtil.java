/**
 * @author Anas Bihi
 */
package org.wakanda.wastudio.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.List;

import org.apache.log4j.Logger;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.XMLOutputter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.wakanda.wastudio.common.Paths;
import org.wakanda.wastudio.common.TemplateTestClass;
import org.wakanda.wastudio.common.Utils;


public class SeleniumUtil {
	private static Logger logger = Logger.getLogger(SeleniumUtil.class);
	private static final String WASETTINGS_PATH_TO_STUDIO_REGEX  ="(\\[.*?\\])";
	public static FirefoxDriver openFireFox() {
		logger.info("Launching FireFox Browser");
		FirefoxProfile profile = new FirefoxProfile();
		profile.setEnableNativeEvents(true);
		return new FirefoxDriver(profile);
	}

	@SuppressWarnings("deprecation")
	public static ChromeDriver openChrome() throws IOException {
		logger.info("Launching Chrome Browser");

		//System.setProperty("webdriver.chrome.driver", getChromeDriver());
		//return new ChromeDriver();
		// DesiredCapabilities cCapabilities = DesiredCapabilities.chrome();
		// cCapabilities.setCapability("chrome.switches",
		// java.util.Arrays.asList("--start-maximized --proxy-auto-detect"));
		// return new ChromeDriver(cCapabilities);
		ChromeDriverService service;
		WebDriver driver;
		service = new ChromeDriverService.Builder()
		.usingChromeDriverExecutable(new File("C:\\PerforceWorkspace\\depot\\Wakanda\\main\\Studio\\Tests\\WakandaStudioTests\\src\\principal\\resources\\com\\wakanda\\wastudio\\utils\\driver\\win\\chromedriver.exe"))
		.usingAnyFreePort()
		.build();
		service.start();
		driver = new RemoteWebDriver(service.getUrl(),
				DesiredCapabilities.chrome());
		return (ChromeDriver) driver;

	}

	public static InternetExplorerDriver openInternetExplorer() {
		logger.info("Launching Internet Explorer 9 Browser");

		DesiredCapabilities ieCapabilities = DesiredCapabilities.internetExplorer();
		ieCapabilities.setCapability(
				InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS,
				true);
		ieCapabilities.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
		return new InternetExplorerDriver(ieCapabilities);
	}

	public static WebDriverWait waitWebDriver(WebDriver driver, long timeout) {
		if (driver != null) {
			WebDriverWait element = new WebDriverWait(driver, timeout);
			return element;
		}
		return null;
	}
	public static void waitWebElement(WebElement e, long time){
		long end = System.currentTimeMillis() + time;
		while (System.currentTimeMillis() < end) {
			if (e.isDisplayed()) {
				logger.info(e.getTagName()+": "+e.getAttribute("id")+" Displayed");
				break;
			}
		}

	}

	public static boolean isInternetExplorer(WebDriver driver) {
		if (driver != null) {
			if (driver.getClass() == InternetExplorerDriver.class)
				return true;
		}
		return false;
	}

	public static int countDataGridElements(List<WebElement> rows) {
		int count = 0;
		String text = null;
		if (rows != null) {
			for (WebElement e : rows) {
				text = e.getText();
				if (text.length() != 0) {
					count++;
					text = null;
				}
			}
		}
		return count;
	}

	public static int countWebElements(List<WebElement> rows) {
		return rows.size();
	}

	public static void setCustomWaSettingsFile() throws Exception{
		logger.info("set new waSettings file");
		SAXBuilder builder = new SAXBuilder();

		String url =Utils.tempFolder+"/target/temp/undoRedo/undoRedo/undoRedo/Settings.waSettings";


		logger.info("Le chemin du fichier Settings du projet undoRedo est : "+url.toString());
		File xmlFile = new File(url);


		Document doc = (Document) builder.build(xmlFile);
		Element rootNode = doc.getRootElement();

		List<Element> vFolder = rootNode.getChildren("virtualFolder");
		String path=null;
		for(Element f : vFolder ){
			if(Utils.getOS().equals("win"))
				path = Paths.appStudio.substring(0,Paths.appStudio.indexOf("\\Wakanda Studio.exe")).replace('\\', '/');
			else
				path = Paths.appStudio+"/Contents/";



			f.setAttribute("location",f.getAttributeValue("location").replaceAll(WASETTINGS_PATH_TO_STUDIO_REGEX, path).replace('\\', '/'));
		}
		XMLOutputter xmlOutput = new XMLOutputter();
		xmlOutput.output(doc, new FileWriter(xmlFile));
	}
}
