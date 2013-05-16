package org.wakanda.templates;

import java.awt.Dimension;

import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;

import java.util.logging.Logger;

import javax.imageio.ImageIO;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.wakanda.common.Paths;
import org.wakanda.selenium.SeleniumActions;
import static org.wakanda.common.Common.*;

/**
 * This class serves as a template for both Sikuli and Selenium tests.<br/><br/>
 * A Tester must inherit from this class to create their own template for their own test suites.<br/>
 * A Tester can yet define his own before and after methods. These methods helps the Tester to perform specific actions
 * before and after the call of a class or a unit test.
 * 
 * + more flexible
 * + more modular
 * 
 * @author Aleph
 */
public class GenericTemplate 
{
	// Saves the last callingMethod's name
	protected static String callingMethodName = null;
	protected static String callingClassName = null;
	protected static Class<?> callingClass = null;
	
	// Specific logger for test-cases
	protected static Logger logger = Logger.getLogger("[UnitTest LOGGER]");
	
	// Members from Selenium main classes, mandatory for composition 
	protected static SeleniumActions selenium = null;
		
	// Instantiating both Selenium composition link using sublte singleton getters. 
	
	/**
	 * Selenium Utilities accessor: Unable the use of Selenium Utilities in a static manner.
	 * 
	 * @author Aleph
	 */
	protected static SeleniumActions getSeleniumUtility()
	{
		return SeleniumActions.getSeleniumInstance();
	}
	
	/**
	 * Common routine called before charging a template.
	 * 
	 * @author Aleph
	 */
	@BeforeClass
	public static void beforeTemplate() 
	{		
		logger.info("CHARGING A GENERIC TEMPLATE");
		
		// Retrieving environment variables from operating system.
		getEnvironmentVariables();
		
		// Copying static resources to destination testing environment.
		copyStaticRessources();
		
		// Halting ongoing Wakanda processes..
		killWakandaProcesses();
	}

	@Before
	public void before() throws Exception
	{}

	@After
	public void after() throws Exception 
	{}

	/**
	 * Common routine called after discarding a template.
	 * 
	 * @author Aleph
	 */
	@AfterClass
	public static void afterTemplate() 
	{
		logger.info("DISCARDING THE GENERIC TEMPLATE");
		
		// Halting ongoing Wakanda processes..
		killWakandaProcesses();
		
		/*
		 * Please take note:
		 * 
		 * There are two different ways to halt an ongoing Wakanda process:
		 * 1 - By killing the process as it's passed explicitly as an argument to the stopXXXXXX(Process) methods.
		 * 2 - By killing the process using a commandLine, practicaly when we are oblivious to what process
		 * is ongoing. Or when we have multiple processes running for the same application.  
		 * 
		 */
	}

	/**
	 * A screenshot is taken whenever the test's result fails.<br/>
	 * If the test is successful, the logger should show so.
	 * 
	 * @author Aleph
	 */
	@Rule
	public TestWatcher watchman = new TestWatcher() 
	{
		/**
		 * Screen-captures test failures.
		 * 
		 * @author Aleph
		 */
		@Override
		protected void failed(Throwable err, Description descr) 
		{
			// Initializes an /Errors/ folder
			File fileScrError = new File("Errors");

			try 
			{
				// Create the Errors' folder if it doesn't already exist.
				if(!fileScrError.exists())
				{
					new File("Errors").mkdir();
				}

				Toolkit toolkit = Toolkit.getDefaultToolkit();
				Dimension screenSize = toolkit.getScreenSize();
				Rectangle screenRect = new Rectangle(screenSize);
				
				// Take a screenshot and save it in /Errors/
				Robot robot = new Robot();
				BufferedImage image = robot.createScreenCapture(screenRect);
				ImageIO.write(image, "png", new File("Errors/" + descr.getMethodName() + ".png"));
			} 
			catch (Exception e) 
			{
				logger.warning("Cannot take error screenshot !\n" + e);
			}

			logger.warning("TEST FAILED !\nScreenshot saved at : /Errors/" + descr.getMethodName() + ".png !\n" + err);
		}
		/**
		 * Logs test successes.
		 * 
		 * @author Aleph
		 */
		@Override
		protected void succeeded(Description descr) 
		{
			logger.info("SUCCESS: " + descr.getMethodName());
		}
		
		/**
		 * Retrieves the calling class or method names for a specific unit test.
		 * 
		 * @author Aleph
		 * @param callingMethodName
		 */
		public void starting(Description descr) 
		{
			callingMethodName = descr.getMethodName();
			callingClass = descr.getTestClass();
			
			super.starting(descr);
		}
	};

	/**
	 * Loads environment variables:<br/><br/>
	 * 
	 * - Browsers' specific EnvVars: BROWSER_NAME, FIREFOX_PATH, IE_PATH, CHROME_PATH<br/>
	 * - Jenkins' specific EnvVars : WORKSPACE<br/>
	 * - Wakanda specific EnvVars : WAKANDA_STUDIO_PATH, WAKANDA_STUDIO_FOLDER, WAKANDA_SERVER_PATH<br/><br/>
	 * 
	 * For local manual debugging, EnvVars can be set through an existing XML document at the root of the project<br/>
	 * This document (UserPref.xml) should contain:<br/><br/>
	 * 
	 * Root: full path to the root folder of the unit tests (as on Perforce)<br/>
	 * Studio: path to waStudio <br/>
	 * Server: path to waServer<br/>
	 * Firefox: full path to Mozilla Firefox executable<br/>
	 * IE: full path to Internet Explorer executable<br/>
	 * Chrome: full path to Google Chrome's executable<br/>
	 * 
	 * @author Aleph
	 */
	private static void getEnvironmentVariables() 
	{
		if (System.getenv("JOB_NAME") != null) 
		{
			// Sets paths from environment variables
			Paths.defaultBrowser = System.getenv("BROWSER_NAME");
			Paths.rootPath = System.getenv("WORKSPACE");
			Paths.studioPath = System.getenv("WAKANDA_STUDIO_PATH");
			Paths.serverPath = System.getenv("WAKANDA_SERVER_PATH");
			Paths.firefoxPath = System.getenv("FIREFOX_PATH");
			Paths.iePath = System.getenv("IE_PATH");
			Paths.chromePath = System.getenv("CHROME_PATH");
			Paths.studioFolder = System.getenv("WAKANDA_STUDIO_FOLDER");

		} else {

			// Sets paths variables from UserPref.xml
			Element root = null;

			try 
			{
				File xml = new File("UserPref.xml");
				SAXReader reader = new SAXReader();
				Document doc = reader.read(xml);
				root = doc.getRootElement();
			} catch (Exception e) 
			{
				logger.warning("UserPref not found !\n" + e);
			}

			Paths.rootPath = root.elementText("Root");
			Paths.studioPath = root.elementText("Studio");
			Paths.serverPath = root.elementText("Server");
			Paths.firefoxPath = root.elementText("Firefox");
			Paths.iePath = root.elementText("IE");
			Paths.chromePath = root.elementText("Chrome");
		}
	}

}
