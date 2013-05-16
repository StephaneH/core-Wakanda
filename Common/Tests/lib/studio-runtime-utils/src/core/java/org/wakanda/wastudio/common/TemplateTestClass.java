/**
 * @author Ahmed JAAFRI
 */
package org.wakanda.wastudio.common;

import java.awt.AWTException;
import java.awt.Point;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.sikuli.script.App;
import org.sikuli.script.FindFailed;
import org.sikuli.script.Key;

public class TemplateTestClass extends SikuliUtils {

	public enum FileSelector {
		root, image, imageSystem, InitalState, solution, imageCurrentBrowser, solutionCurrentBrowser, seleniumSolution, globalSolutions;
	}

	protected static boolean isFirstTest = false;
	static boolean isFolderErrorsDeleted = false;
	protected static Logger logger = Logger.getLogger(TemplateTestClass.class);
	@Rule
	public TestWatcher watchman = new TestWatcher() {

		@Override
		protected void failed(Throwable e, Description d) {
			logger.info(d.getMethodName()
					+ " failed with error. Check /Errors/" + d.getMethodName()
					+ ".png");
			takePictureOfError(d.getMethodName() + ".png");
			try {
				after();
			} catch (Exception e1) {
			}
		}

		@Override
		protected void succeeded(Description d) {
			logger.info(d.getMethodName() + " succeed");
			try {
				after();
			} catch (Exception e) {
			}
		}
	};

	public static boolean isProduction() {
		return (System.getenv("JOB_NAME") != null);
	}

	public static void addDesignerTestFileToTheStudio() {
		String fr = null;
		try {
			String pathStudio;
			if (Utils.getOS().equals("win"))
				pathStudio = Paths.appStudio.substring(0,
						Paths.appStudio.indexOf("\\Wakanda Studio.exe"))
						.replace('\\', '/')
						+ "\\Resources\\Web Components\\GUIDesigner\\guidesigner.html";
			else
				pathStudio = Paths.appStudio
						+ "/Contents/Resources/Web Components/GUIDesigner/guidesigner.html";

			fr = Utils.readFileToString(pathStudio);

			boolean designertestexist = fr
					.toString()
					.contains(
							"<script type=\"text/javascript\" src=\"./scripts/designer/test/designer-test.js\"></script>");
			if (!designertestexist) {
				String s = fr
						.toString()
						.replace(
								"<script type=\"text/javascript\" src=\"./scripts/designer/designer-run.js\"></script>",
								"<script type=\"text/javascript\" src=\"./scripts/designer/designer-run.js\"></script>"
										+ "<script type=\"text/javascript\" src=\"./scripts/designer/test/designer-test.js\"></script>");
				Utils.writeFile(new File(pathStudio), s);
				logger.info("designer-test.js est ajout� avec succ�!");
			}
		} catch (IOException e) {
			logger.info("Impossible d'ajouter le designer-test.js dynamiquement!!!");

		}
	}

	@BeforeClass
	public static void init() throws InterruptedException, IOException,
			AWTException, DocumentException {

		if (isProduction()) {
			// Settings from Environment variables
			logger.info("Loading Settings from Environment variables");

			Paths.root = new File("").getCanonicalPath();
			Paths.appStudio = System.getenv("WAKANDA_STUDIO_PATH");
			Paths.appServer = System.getenv("WAKANDA_SERVER_PATH");
			Paths.firefoxPath = System.getenv("FIREFOX_PATH");
			Paths.IEPath = System.getenv("IE_PATH");
			Paths.chromePath = System.getenv("CHROME_PATH");
			Paths.studioFolder = System.getenv("WAKANDA_STUDIO_FOLDER");
		} else {
			// Loading UserPref.xml
			logger.info("Loading Settings from UserPref.xml");

			File xml = new File("UserPref.xml");
			SAXReader reader = new SAXReader();
			Document doc = null;
			doc = reader.read(xml);
			Element root = doc.getRootElement();

			// Settings from UserPref.xml
			Paths.root = root.elementText("Root");
			Paths.appStudio = root.elementText("Studio");
			Paths.appServer = root.elementText("Server");
			Paths.firefoxPath = root.elementText("Firefox");
			Paths.IEPath = root.elementText("IE");
			Paths.chromePath = root.elementText("Chrome");
			// Paths.studioFolder=root.elementText("StudioFolder");
		}

		Utils.appStudio = new App(Paths.appStudio);
		Utils.appServer = new App(Paths.appServer);

		if (isFolderErrorsDeleted == false) {
			FileUtils.deleteDirectory(new File("Errors"));
			isFolderErrorsDeleted = true;
		}
		if (!isFirstTest) {
			Utils.killStudio();
			Utils.killServer();
			Utils.killChromeDriver();
			isFirstTest = true;
		}
		
		addDesignerTestFileToTheStudio();
	}

	@Before
	public void before() throws Exception {
		/**
		 * Commented in order to bypass the redundant Certificate Popup.
		 */
		//Utils.deleteStudioPreferences();
		if (Utils.isServerRunning())
			Utils.killServer();
		boolean redemmarerSiStandardExistPas = standardExist();
		boolean redemmarerSiStudioRepondPas = false;
		redemmarerSiStudioRepondPas = glisserDebut();

		if (redemmarerSiStandardExistPas == false
				|| redemmarerSiStudioRepondPas == false) {
			logger.info("");
			redemmarerEtOuvrir();
		if(this instanceof TemplateSelenium)
		    maximizeStudio();
		} else {
			logger.info("Studio is opened");
		}

	}

	public void after() throws Exception {

		keyUp();
		try {
			click(getFileFromRessources("homeInactive.png",
					FileSelector.InitalState), 0.90f);
		} catch (FindFailed e) {
			System.out
					.println("homeInactive.png does not exists on the screen!");

		}
		// Thread.sleep(2000);
		try {
			rightClick(
					getFileFromRessources("debut.png", FileSelector.InitalState),
					0.75f);
		} catch (FindFailed e) {
			logger.info("debut.png does not exists on the screen!");

		}
		try {
			click(getFileFromRessources("collapse.png",
					FileSelector.InitalState), 0.9f);
		} catch (FindFailed e) {
			logger.info("collapse.png does not exists on the screen!");

		}

	}

	public static void main(String[] arg) {
		String res = TemplateTestClass.class.getResource("systems").toString()
				.concat("/")
				+ Utils.getOS() + "/" + System.getProperty("os.name");
		System.out.println(res);
	}

	public String getFolderFromRessources(FileSelector selector)
			throws IOException, URISyntaxException {
		// Yann : Ca pourrait être calculé une fois et enregistré dans une
		// variable.
		String result = null;
		switch (selector) {
		case root:
			/*
			 * File fic = new File(getClass().getResource(
			 * Utils.getOS()).toURI()); result = fic.getCanonicalPath();
			 */
			break;
		case image:
			result = getClass().getResource(Utils.getOS()).toString();

			break;
		case InitalState:

			result = TemplateTestClass.class.getResource(
					"captures" + "/" + Utils.getOS()).toString();
			logger.info(result);
			break;
		case imageSystem:
			result = TemplateTestClass.class.getResource(
					"systems" + "/" + Utils.getOS() + "/"
							+ System.getProperty("os.name")).toString();
			logger.info(result);

			break;
		case solution:
			// URL url = getClass().getResource("solutions");
			// if (url == null)
			// return null;
			// URI uri = url.toURI();
			// fic = new File(uri);
			URL url = getClass().getResource("solutions");
			File fic = new File(url.toURI());

			result = fic.getCanonicalPath();
			break;

		}
		return result;
	}

	public String getFileFromRessources(String file, FileSelector selector)
			throws IOException, URISyntaxException {
		String parentFolder = getFolderFromRessources(selector);
		String result = null;
		if (parentFolder != null) {
			// File fic = new File(parentFolder, file);
			if (selector.equals(selector.solution))
				result = new File(parentFolder, file).getCanonicalPath();
			else
				result = parentFolder + "/" + file;
			// System.out.println("*************"+result);
			//
		}
		return result;

	}

	private boolean standardExist() throws Exception {
		boolean exist = true;
		try {
			wait(getFileFromRessources("standard.png", FileSelector.InitalState),
					0.8f);

		} catch (FindFailed e) {
			exist = false;

			logger.info("standard.png does not exist on the screen!");
			return false;

		}
		return exist;

	}

	private boolean glisserDebut() throws Exception {

		try {

			doubleClick(
					getFileFromRessources("fin2.png", FileSelector.InitalState),
					0.9f);
		} catch (FindFailed e) {
			logger.info("fin2.png  does not exists on the screen!!");
			return false;
		}
		try {
			wait(getFileFromRessources("debut.png", FileSelector.InitalState),
					0.75f, 5);

		} catch (FindFailed e) {
			logger.info("debut.png does not exists on the screen!!");
			return false;
		}
		return true;
	}

	private void redemmarerEtOuvrir() {

		try {

			Utils.killStudio();
			Utils.openStudio();

			click(getFileFromRessources("home.png", FileSelector.InitalState),
					0.8f, 15);

		} catch (FindFailed e) {
			logger.info("home.png does not exists on the screen!!");
		} catch (Exception e) {
			System.out
					.println("impossible d'ouvrir le Studio, vérifier le chemain dans la class Paths.java!");

		}
	}

	public void takePictureOfError(String Name) {
		try {
			Utils.takePictureOfError(Name);
		} catch (IOException e) {
		} catch (AWTException e) {
		}
	}

	public void loadProject(String name) throws Exception {
		loadSolution(name);
	}

	public void loadSolution(String nameSolution,
			boolean isOldWakandaSolutionArchitecture) throws Exception {
		if (Utils.appStudio != null) {

			// (Key.ALT+"fos");
			wait(getFileFromRessources("home.png", FileSelector.InitalState),
					0.8f, 15);
			openSolution();
			wait(getFileFromRessources("comboSolution.png",
					FileSelector.imageSystem), 10);
			logger.info(getFileFromRessources(nameSolution + "/" + nameSolution
					+ ".waSolution", FileSelector.solution));
			if (isOldWakandaSolutionArchitecture)
				paste(getFileFromRessources(nameSolution + "/" + nameSolution
						+ ".waSolution", FileSelector.solution));
			else
				paste(getFileFromRessources(nameSolution + "/" + nameSolution
						+ " Solution/" + nameSolution + ".waSolution",
						FileSelector.solution));

			enter();
			if (Utils.getOS().equals("mac"))
				enter();// pour mac il faut une deuxi�me entrer
			wait(getFileFromRessources("no.png", FileSelector.imageSystem), 20);
			clickAndWait(
					getFileFromRessources("no.png", FileSelector.imageSystem),
					getFileFromRessources("homeInactive.png",
							FileSelector.InitalState), 20);

		}
	}

	public void loadSolution(String nameSolution) throws Exception {
		String wasolutionPathNew = getFileFromRessources(nameSolution + "/"
				+ nameSolution + " Solution/" + nameSolution + ".waSolution",
				FileSelector.solution);
		String wasolutionPathOld = getFileFromRessources(nameSolution + "/"
				+ nameSolution + ".waSolution", FileSelector.solution);

		if (new File(wasolutionPathNew).exists())
			loadSolution(nameSolution, false);
		else if (new File(wasolutionPathOld).exists())
			loadSolution(nameSolution, true);
		else
			logger.info("Solution Introuvable  :" + nameSolution);

	}

	public void openFileFromSolution(String nameSolution, String nameFile)
			throws Exception {
		if (Utils.appStudio != null) {

			// (Key.ALT+"fof");
			wait(getFileFromRessources("homeInactive.png",
					FileSelector.InitalState), 10);
			openFile();
			wait(getFileFromRessources("comboSolution.png",
					FileSelector.imageSystem));
			paste(getFileFromRessources(nameSolution + "/" + nameFile,
					FileSelector.solution));
			enter();
			if (Utils.getOS().equals("mac"))
				enter();

		}
	}

	public void closeSolution() throws Exception {
		if (Utils.getOS().equals("win")) {
			keyDown(Key.ALT);
			keyUp();
			type("fccc");
			enter();
			keyUp();
		} else {
			keyDown(Key.CTRL);
			keyDown(Key.F2);
			keyUp();
			keyDown(Key.RIGHT);
			enter();
			type("ccc");
			enter();

			keyUp();
		}
	}

	public void openSolution() throws Exception {
		keyUp();
		if (Utils.getOS().equals("win")) {
			type(Key.ALT + "fos");
		} else {

			click(getFileFromRessources("file.png", FileSelector.imageSystem),
					0.9f, 5);
			click(getFileFromRessources("open.png", FileSelector.imageSystem),
					0.9f, 5);
			click(getFileFromRessources("solutionOrFile.png",
					FileSelector.imageSystem), 0.9f, new Point(-8, -8), 5);
			wait(getFileFromRessources("cancel.png", FileSelector.imageSystem),
					0.9f, 5);

			keyDown(Key.META);
			keyDown(Key.SHIFT);
			type("g");
			keyUp();
		}

	}

	public void openFile() throws Exception {
		keyUp();
		if (Utils.getOS().equals("win")) {
			type(Key.ALT + "fof");
		} else {
			// Region reg=new Region(0,0,700,200);

			click(getFileFromRessources("file.png", FileSelector.imageSystem),
					0.9f, 4);
			click(getFileFromRessources("open.png", FileSelector.imageSystem),
					0.9f, 4);
			click(getFileFromRessources("solutionOrFile.png",
					FileSelector.imageSystem), 0.9f, new Point(-16, 10), 5);
			wait(getFileFromRessources("cancel.png", FileSelector.imageSystem),
					0.9f, 5);

			keyDown(Key.META);
			keyDown(Key.SHIFT);
			type("g");
			keyUp();
		}
	}

	public void maximizeWindow() {

		try {
			if (Utils.getOS().equals("win")) {
				keyDown(Key.ALT);
				keyDown(Key.SPACE);
				type("n");
				keyUp();
			} else {
				// Il manque le traitement pour la plateforme MAC.
				// Ceci fait tomber le testcase : closeDebuggerAfterMaximizeIt
				// (Debugger)
				// - Mohammed Achraf L.
				maximizeFocusedAppMac();
			}

		} catch (Exception e) {
		}
	}

	private void maximizeFocusedAppMac() {

		String script = "tell application \"System Events\"\n"
				+ "set FrontApplication to (get name of every process whose frontmost is true) as string\n"
				+ "tell process FrontApplication\n"
				+ "click button 2 of window 1\n" + "end tell\n" + "end tell";

		try {
			new ScriptEngineManager().getEngineByName("AppleScript").eval(
					script);
		} catch (final ScriptException e) {
			// TODO Auto-generated catch block
			System.out
					.println("Impossible de maximiser l'application en premier plan!");
		}
	}

	public void maximizeStudio() {

		if (Utils.getOS().equals("win")) {
			keyDown(Key.ALT);
			keyDown(Key.SPACE);
			try {
				type("n");
			} catch (Exception e) {
				// TODO Auto-generated catch block
			}
			keyUp();
		} else {
			// le seul moyen pour le moment est de cliquer sur le bouton vert
			// click(Utils.getInitialStateImage("maximize.png"));
			// --->R�solu, un script Mac qui fait clique sur le bouton vert
			try {

				maximizeFocusedAppMac();

			} catch (Exception e) {
			}
		}
	}

}
