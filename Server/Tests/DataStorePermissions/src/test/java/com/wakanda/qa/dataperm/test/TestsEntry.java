package com.wakanda.qa.dataperm.test;

import static org.junit.Assert.fail;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import com.wakanda.qa.dataperm.Settings;
import com.wakanda.qa.dataperm.test.inherit.InheritedPermTestSuite;
import com.wakanda.qa.dataperm.test.simple.SimplePermTestSuite;
import com.wakanda.qa.utils.ServerUtil;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ SimplePermTestSuite.class, InheritedPermTestSuite.class })
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
		ServerUtil.killServerViaCommandLine();
		if (ServerUtil.isServerRunning()) {
			logger.debug("Cannot kill the server");
			return;
		}
		logger.debug("Server is killed");
		logger.debug("Finished");
	};

}
