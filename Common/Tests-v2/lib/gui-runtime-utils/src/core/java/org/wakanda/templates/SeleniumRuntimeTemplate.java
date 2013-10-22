package org.wakanda.templates;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.wakanda.selenium.SeleniumActions;
import org.wakanda.templates.GenericTemplate;

import static org.wakanda.common.Common.*;

/**
 * An example template to running Selenium Runtime tests for Wakanda.<br/><br/>
 * 
 * Methods such as : before() and after() are invoked in a "testCase context", and they can be overwritten.<br/>
 * beforeClass() and afterClass() containing the annotations @BeforeClass and @AfterClass cannot be redefined:<br/>
 * It is up to the Tester to make his own on an inherited class if he wishes so.<br/><br/>
 * 
 * All these methods can be renamed if rewritten in an inherited class.<br/> 
 * @author Aleph
 */
public class SeleniumRuntimeTemplate extends GenericTemplate 
{
	/*
	 *  Instantiating Selenium librairies in order to simplify method invocation:
	 *  "getSeleniumUtility().____" becomes as simple as "selenium.____".
	 */
	protected static SeleniumActions selenium = null;
	
	@BeforeClass
	public static void beforeClass() throws URISyntaxException, IOException 
	{	
		logger.info("testTemplate class is being loaded.");
		
		// Loads selenium utilities via Singleton. Here we insure that only one instance of the library is meant to exist.
		selenium = getSeleniumUtility();

		// Creating ChromeDriver.
		selenium.createChromeDriver();
	}

	@Before
	public void before() 
	{}

	@After
	public void after() 
	{}

	@AfterClass
	public static void afterClass() 
	{
		logger.info("testTemplate class is unloaded.");

		if(!stopServer(serverProcess))
		logger.info("Server started.");
		
		// Removing ChromeDriver.	
		selenium.deleteDriver();
	}
}
