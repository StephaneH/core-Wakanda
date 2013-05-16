package org.wakanda.wastudio.common;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import org.junit.AfterClass;
import org.junit.Rule;
import org.junit.rules.MethodRule;
import org.junit.rules.TestWatchman;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.model.FrameworkMethod;
import org.sikuli.script.FindFailed;
import org.wakanda.wastudio.utils.SeleniumUtil;

@RunWith(Parameterized.class)
public class TemplateRuntimeTestClass extends TemplateTestClass {
	protected eBrowser browserName;
	protected String methodName;
	protected String solutionName;
	protected boolean launchServerOnlyOneTime;
	private static boolean sIsServerLaunched = false;

	public TemplateRuntimeTestClass() {
		// constructeur par dï¿½faut
		this(null, null, false);
	}

	public TemplateRuntimeTestClass(eBrowser browserName) {
		// Ce constructeur sert a lancer une suite de tests avec plusieurs
		// solutions
		this(browserName, null, false);
	}

	public TemplateRuntimeTestClass(eBrowser browserName, String solutionName) {
		// Ce constructeur sert a lancer une suite de tests avec une seule
		// solution et plusieurs instance de serveur
		this(browserName, solutionName, false);
	}

	protected String getSolutionName() {
		if (solutionName != null)
			return solutionName;
		return methodName;
	}

	public TemplateRuntimeTestClass(eBrowser browserName, String solutionName,
			boolean launchServerOnlyOneTime) {
		// Ce constructeur sert a lancer une suite de tests avec une seule
		// solution et Un/plusieurs instance(s) de serveur
		this.browserName = browserName;
		this.solutionName = solutionName;
		this.launchServerOnlyOneTime = launchServerOnlyOneTime;
	}

	@Rule
	public MethodRule watchman = new TestWatchman() {
		@Override
		public void failed(Throwable e, FrameworkMethod method) {

			logger.info(e.toString());
			String imageName = method.getName() + ".png";
			logger.info("FAILED: " + method.getName());
			switch (browserName) {
			case chrome:
				imageName = method.getName() + "_chrome.png";
				break;
			case firefox:
				imageName = method.getName() + "_firefox.png";
				break;
			case ie:
				imageName = method.getName() + "_IE.png";
				break;
			}

			takePictureOfError(imageName);
			after();
		}

		@Override
		public void succeeded(FrameworkMethod method) {
			logger.info("SUCCESS: " + method.getName());
			after();
		}

		public void starting(FrameworkMethod method) {
			methodName = method.getName();
			super.starting(method);
			int x = 10;
			x++;
		}
	};

	public enum eBrowser {
		firefox, ie, chrome, ipad
	};

	public void before() throws Exception {
		closeAndLaunchServerWithSolution();
		openAndPrepareBrowserInBefore();
		maximizeWindow();
	}

	protected void openAndPrepareBrowserInBefore() throws Exception {
		killBrowser(browserName);

		Utils.closeBrowser();

		switch (browserName) {
		case firefox:
			prepareForFirefox();
			break;
		case ie:
			prepareForIE();
			break;
		case chrome:
			prepareForChrome();
			break;
		}
	}

	protected void killServerIfNotOnlyOneTime() {
		if (!launchServerOnlyOneTime)
			if (Utils.isServerRunning())
				Utils.killServer();
	}

	protected void closeBrowseInAfter() {
		Utils.closeBrowser();
	}

	public void after() {
		closeBrowseInAfter();
		killServerIfNotOnlyOneTime();
	}

	protected void closeAndLaunchServerWithSolution() throws Exception {

		if (launchServerOnlyOneTime && solutionName != null) 
		{
			// Si le nom de la solution est fournis comme paramétre de la classe fille, on démmare le serveur une seul fois, et on charge la solution depuis le dossier Solution
			
			if (!sIsServerLaunched || !Utils.isServerRunning()) 
			{
				Utils.killServer();
				String browserWasolutionPath = getFileFromRessources(solutionName + "/" + solutionName + ".waSolution",	FileSelector.solution);
				if (!new File(browserWasolutionPath).exists())
				{
					browserWasolutionPath = getFileFromRessources(solutionName + "/" + solutionName + " Solution/" + solutionName + ".waSolution", FileSelector.solution);
				}

				Utils.runTheServer(new File(browserWasolutionPath).getCanonicalPath());
				
				sIsServerLaunched = true;
			}
		}

		else if (!launchServerOnlyOneTime && solutionName == null) 
		{
			// Sinon on redï¿½mmare le serveur a chaque fois avec le nom de la solution qui est identique que celui du test case
			if (Utils.isServerRunning())
			{
				Utils.killServer();
			}

			String browserWasolutionPath = null;
			File browserFolder;
			File solFolder;

			String browser = null;

			// Cree ou utiliser le repertoire
			solFolder = new File( getFolderFromRessources(FileSelector.solution) + "/" + methodName);
			browserFolder = new File(getFolderFromRessources(FileSelector.solutionCurrentBrowser));
			
			Utils.copyFolder(solFolder, browserFolder);
			
			switch (browserName) 
			{
			case firefox:
				browser = Utils.cFirefox;
				break;
			case ie:
				browser = Utils.cIE;
				break;
			}

			if (browser != null) 
			{

				browserWasolutionPath = getFileFromRessources(methodName + "/" + methodName + " Solution/" + methodName + ".waSolution", FileSelector.solutionCurrentBrowser);

				if (!new File(browserWasolutionPath).exists())
				{
					browserWasolutionPath = getFileFromRessources(methodName + "/" + methodName + ".waSolution", FileSelector.solutionCurrentBrowser);
				}

				Utils.runTheServer(new File(browserWasolutionPath).getCanonicalPath());
			}
		} else if (launchServerOnlyOneTime && solutionName == null) 
		{
			// Lancer une seule instance de serveur et plusieurs solutions:
			// - le nom de la solution est identique a celui du test case ou bien du test suite?
			// - CrÃ©ation d'un dossier temporaire temp dans target
			
			if (!TemplateRuntimeTestClass.sIsServerLaunched || !Utils.isServerRunning()) 
			{
				String browserWasolutionPath;

				// browserWasolutionPath = TemplateTestClass.class.getResource("globalsolutions/undoRedo/undoRedo Solution/undoRedo.waSolution").toString();
				// browserWasolutionPath=System.getProperty("user.dir")+"\\undoRedo\\undoRedo\\undoRedo Solution\\undoRedo.waSolution";
				
				if (Utils.getOS().equals("win"))
				{
					browserWasolutionPath = Paths.tempWin + "\\undoRedo\\undoRedo\\undoRedo Solution\\undoRedo.waSolution";
				}
				else
				{
					browserWasolutionPath = Paths.tempMac + "/undoRedo/undoRedo/undoRedo Solution/undoRedo.waSolution";
				}
				
				// browserWasolutionPath=getAbsPathFromClassLocation(browserWasolutionPath);

				// URL url=TemplateRuntimeTestClass.class.getResource(browserWasolutionPath);
				
				// Partie de code accessible seulement par les classes filles de TemplateSeleniumStudio:
				if(this instanceof TemplateSeleniumStudio)
				{
					SeleniumUtil.setCustomWaSettingsFile();
				}
				
				logger.info("Chemin de la solution : " + browserWasolutionPath);
				Utils.runTheServer(browserWasolutionPath);
				TemplateRuntimeTestClass.sIsServerLaunched = true;
			}

		} else if (!launchServerOnlyOneTime && solutionName != null) 
		{
			// Lancer plusieurs instances de serveurs et une seul solution fournis en paramï¿½tres
		}
	}

	public static String getAbsPathFromClassLocation(String relative) {
		try {
			URL url = TemplateRuntimeTestClass.class.getResource(relative);
			String absPath = url.toString();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getCurrentBrowserName() {
		String browser = null;
		switch (browserName) {
		case firefox:

			browser = Utils.cFirefox;
			break;

		case ie:

			browser = Utils.cIE;
			break;

		}

		return browser;
	}

	public String getFolderFromRessources(FileSelector selector)
			throws IOException, URISyntaxException {
		String result = super.getFolderFromRessources(selector);
		if (result == null) {
			String currentBrowserName = getCurrentBrowserName();
			switch (selector) {
			case imageCurrentBrowser:

				result = getClass().getResource(
						Utils.getOS() + "//" + currentBrowserName).toString();

				break;
			case solutionCurrentBrowser:
				URL url = getClass().getResource(
						"solutions" + "//" + currentBrowserName);
				if (url == null)
					return null;
				URI uri = url.toURI();
				File fic = new File(uri);
				result = fic.getCanonicalPath();
				break;
			case globalSolutions:
				// url = getClass().getResource("globalSolutions");
				result = getClass().getResource("globalsolutions").toString();
				break;

			}
		}
		return result;

	}

	protected void killBrowser(eBrowser browserName) {
		switch (browserName) {
		case firefox:
			Utils.killBrowser(Utils.cFirefox);
			break;
		case ie:
			Utils.killBrowser(Utils.cIE);
			break;
		}
	}

	protected void prepareForFirefox() throws Exception {
		Utils.closeBrowser();
		Utils.openBrowser(Paths.firefoxPath);
		try {
			wait(getFileFromRessources("firefoxLogo.png",
					FileSelector.InitalState), 8);
			// click(Utils.getInitialStateImage("MaximazeBrowser.png"));
			// maximizeWindow();
		} catch (FindFailed e) {
			e.printStackTrace();
		}
	}

	protected void prepareForChrome() throws Exception {
		Utils.closeBrowser();
		Utils.openBrowser(Paths.chromePath);
		try {
			wait(getFileFromRessources("chromeLogo.png",
					FileSelector.InitalState), 8);
			// click(Utils.getInitialStateImage("MaximazeBrowser.png"));
			// maximizeWindow();
		} catch (FindFailed e) {
			e.printStackTrace();
		}
	}

	protected void prepareForIE() throws Exception {
		Utils.closeBrowser();
		Utils.openBrowser(Paths.IEPath);

		try {
			wait(getFileFromRessources("ieLogo.png", FileSelector.InitalState),
					8);
			// maximizeWindow();
			// click(Utils.getInitialStateImage("MaximazeBrowser.png"));
		} catch (FindFailed e) {
			e.printStackTrace();
		}
	}

	@AfterClass
	public static void afterClass() {
		Utils.killServer();
		sIsServerLaunched = false;
	}
}
