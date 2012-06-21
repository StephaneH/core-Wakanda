package com.wakanda.qa.http.test;

import static org.junit.Assert.fail;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import com.wakanda.qa.http.Resources;
import com.wakanda.qa.http.ServerUtil;
import com.wakanda.qa.http.test.auth.AuthenticationTestSuite;
import com.wakanda.qa.http.test.cache.CacheTestSuite;
import com.wakanda.qa.http.test.connection.ConnectionTestSuite;
import com.wakanda.qa.http.test.entitiy.EntitiyTestSuite;
import com.wakanda.qa.http.test.messages.MessagesTestSuite;
import com.wakanda.qa.http.test.negotiation.ContentNegociationTestSuite;
import com.wakanda.qa.http.test.statuscodes.StatusCodeTestSuite;
import com.wakanda.qa.http.test.urls.URITestSuite;

/**
 * @author Ouissam
 * 
 */

@RunWith(Suite.class)
@Suite.SuiteClasses({ MessagesTestSuite.class, URITestSuite.class,
		EntitiyTestSuite.class, StatusCodeTestSuite.class,
		ConnectionTestSuite.class, CacheTestSuite.class,
		AuthenticationTestSuite.class, ContentNegociationTestSuite.class })
public class TestsEntry {

	private static Logger logger = Logger.getLogger(TestsEntry.class);

	@BeforeClass
	public static void before() throws Throwable {
		logger.debug("Starting the test suite...");
		if (ServerUtil.loadSolutionAndRunOrRestartServer()) {
			return;
		}
		fail("Cannot start server or load solution on "
				+ Resources.getDefaultHostName() + " : "
				+ Resources.getDefaultPort());

	};

	@AfterClass
	public static void after() throws Throwable {
		logger.debug("Test suite is done");
		logger.debug("Killing the server as inner process...");
		com.wakanda.qa.http.ServerUtil.killServerViaInnerProcess();
		if(ServerUtil.isServerRunning()){
			logger.debug("Cannot kill the server");
			logger.debug("Killing the server as extern process...");
			ServerUtil.killServerViaCommandLine();
			if(ServerUtil.isServerRunning()){
				logger.debug("Cannot kill the server");
				return;
			}
		}
		logger.debug("Server is killed");
		logger.debug("Finished");
	};

}
