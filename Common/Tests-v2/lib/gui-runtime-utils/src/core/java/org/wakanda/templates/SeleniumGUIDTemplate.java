package org.wakanda.templates;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.openqa.selenium.By;
import org.wakanda.selenium.SeleniumActions;
import org.wakanda.templates.GenericTemplate;

import static org.wakanda.common.Common.*;

/** 
 * An example template to running Selenium GUI Design tests for Wakanda.<br/><br/>
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
	}

	@Before
	public void before() throws ClassNotFoundException
	{
		logger.info("Before TestCase:");
		logger.info("Loading GUI's initial state.");
				
		// Load a specific GUI file content to designer-test.js
		selenium.updateGUIfile(callingClass, callingMethodName);
		
		selenium.getDriver().get("http://gui.wakanda.net/");
		
		// Waits for the GUID to be fully loaded on browser.
		// PS: This is a timeout and not a static sleep/wait.
		selenium.waitWebElement(selenium.getDriver().findElement(By.id("waf-body")), 5000);
	}

	@After
	public void after() 
	{}

	@AfterClass
	public static void afterClass() 
	{
		logger.info("testTemplate class is unloaded.");

		if(!stopServer(serverProcess))
		logger.info("Server started.");
		
		selenium.deleteDriver();
	}

	
}
