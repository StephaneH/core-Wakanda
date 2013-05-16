package org.wakanda.templates;

import java.io.File;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.openqa.selenium.By;
import org.wakanda.common.Paths;
import org.wakanda.selenium.SeleniumActions;
import org.wakanda.templates.GenericTemplate;
import static org.wakanda.common.Common.*;

/** 
 * An example template to running Selenium GUI Design tests for Wakanda.<br/>
 * GUIDesigner tests can be run on both:<br/><br/>
 * - Apache HTTP Server<br/>
 * - Wakanda Server<br/><br/>
 * Make sure to comment/uncomment the correspondant methods (see code commentary).<br/><br/> 
 * 
 *  <b>Suggestion made by Yann @ 08/01/2013:</b><br/>
 * Eliminate inheritance from "Predefined" classes such as this one from GenericTemplate Class.<br/><br/>
 * 
 *  <b>Suggestion studied @ 10/01/2013:</b><br/> 
 * It might have been better but sadly it cannot be done due to a conception basis:<br/>
 * The method <b>updateGUIFile()</b> takes two arguments <b>callingMethodName</b> and <b>callingClassName</b><br/>
 * from it's super-class. Henceforth, we can't eliminate such inheritance and delegate the procedure<br/>
 * to the lower-class. 
 *   
 * @author Aleph
 */
public class SeleniumGUIDTemplate extends GenericTemplate 
{
	protected static  SeleniumActions selenium = null;
	
	@BeforeClass
	public static void beforeClass() throws Exception 
	{	
		logger.info("testTemplate class is being loaded.");
		
		// Loads selenium utilities
		selenium = getSeleniumUtility();
		
		// Creates Driver
		selenium.createChromeDriver();
		
		/*
		 * ## Required for: Wakanda Server.
		 *  Updating waSettings file of the globalsolution before loading it.
		 *  
		 */
		selenium.updateWAKSettings();
		
		/*
		 * ## Required for: Wakanda Server
		 *  Loads a default solution with preconfigured vFolders into Wakanda Server.
		 */
		String solutionPath = Paths.tempTargetPath + "WebEditors" + File.separator + "WebEditors Solution" + File.separator + "WebEditors.waSolution";
		serverProcess = startServer(solutionPath);
		
		/*
		 *  Makes sure that designer-test.js script is well integrated into the GUIDesigner before launching.
		 *  NO LONGER NEEDED, SHOULD BE MARKED FOR DEPRECATION LATER.
		 */
//		selenium.updateDesignerTestFile();
		
		/*
		 * ## Required for: Apache HTTP Server.		
		 * 	Loads the webDriver in order to save the URL for the first time on Cache for FASTER use.
		 */
//		selenium.getDriver().get("http://127.0.0.1:8081/guid/guidesigner.html");
	}

	@Before
	public void before() throws ClassNotFoundException
	{
		logger.info("Before TestCase:");
		logger.info("Loading GUI's initial state.");
				
		/*
		 * ## Required for: both Wakanda Server AND Apache HTTP Server.
		 *  Load a specific GUI file content to designer-test.js
		 */
		selenium.updateGUIfile(callingClass, callingMethodName);
		
		selenium.getDriver().get("http://127.0.0.1:8081/guid/guidesigner.html");
		
		/*
		 *  Waits for the GUID to be fully loaded on browser.
		 *  PS: This is a timeout and not a static sleep/wait.
		 */
		selenium.waitWebElement(selenium.getDriver().findElement(By.id("waf-body")), 5000);
	}

	@After
	public void after() 
	{}

	@AfterClass
	public static void afterClass() 
	{
		logger.info("testTemplate class is unloaded.");

		/*
		 *  Stops Wakanda Server in case we are not using Apache HTTP Server
		 *  ## Required for: Wakanda Server.
		 */
		if(!stopServer(serverProcess))
			logger.warning("Wakanda Server could not be halted.");
		
		selenium.deleteDriver();
	}
}
