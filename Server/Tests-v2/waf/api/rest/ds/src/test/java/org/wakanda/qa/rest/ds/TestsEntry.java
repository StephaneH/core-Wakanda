package org.wakanda.qa.rest.ds;

import static org.junit.Assert.fail;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import org.wakanda.qa.rest.ds.Settings;
import org.wakanda.qa.rest.ds.access.CaseSensitivity;
import org.wakanda.qa.rest.ds.access.Scope;

import org.wakanda.qa.server.utils.ServerUtil;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ CaseSensitivity.class, Scope.class })
public class TestsEntry {
	private static Logger logger = Logger.getLogger(TestsEntry.class);

	@BeforeClass
	public static void before() throws Throwable {
		
		logger.debug("Starting the test suite...");
		if (Settings.getServerUtilInstance().loadSolutionAndRunOrRestartServer()) {
			return;
		}
		String failmsg = "Cannot start server or load solution";
		logger.debug(failmsg);
		fail(failmsg);
	};

	@AfterClass
	public static void after() throws Throwable {
		logger.debug("Killing the server...");
		if (!ServerUtil.killServerViaCommandLine()) {
			logger.debug("Cannot kill the server");
			return;
		}
		logger.debug("Server is killed");
		logger.debug("Finished");
	};

}