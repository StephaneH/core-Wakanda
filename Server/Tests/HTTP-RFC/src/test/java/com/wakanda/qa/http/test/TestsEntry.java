package com.wakanda.qa.http.test;

import static org.junit.Assert.fail;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import com.wakanda.qa.http.Utils;
import com.wakanda.qa.http.test.auth.AuthenticationTestSuite;
import com.wakanda.qa.http.test.cache.CacheTestSuite;
import com.wakanda.qa.http.test.connection.ConnectionTestSuite;
import com.wakanda.qa.http.test.entitiy.EntitiyTestSuite;
import com.wakanda.qa.http.test.messages.MessagesTestSuite;
import com.wakanda.qa.http.test.negotiation.ContentNegociationTestSuite;
import com.wakanda.qa.http.test.statuscodes.StatusCodeTestSuite;
import com.wakanda.qa.http.test.urls.URITestSuite;
import com.wakanda.qa.utils.ServerUtil;

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
		if (Utils.getServerUtilInstance().loadSolutionAndRunOrRestartServer()) {
			return;
		}
		String failmsg = "Cannot start server or load solution";
		logger.debug(failmsg);
		fail(failmsg);

	};

	@AfterClass
	public static void after() throws Throwable {
		logger.debug("Test suite is done");
		logger.debug("Killing the server...");
		ServerUtil.killServerViaCommandLine();
		if (ServerUtil.isServerRunning()) {
			logger.debug("Cannot kill the server");
			return;
		}
		logger.debug("Server is killed");
		logger.debug("Finished");
	};

}
