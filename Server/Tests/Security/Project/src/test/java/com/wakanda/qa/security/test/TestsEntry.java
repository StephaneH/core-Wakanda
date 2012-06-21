package com.wakanda.qa.security.test;

import static org.junit.Assert.fail;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import com.wakanda.qa.security.Resources;
import com.wakanda.qa.security.ServerUtil;
import com.wakanda.qa.security.test.inhertperms.InheritedPermTestSuite;
import com.wakanda.qa.security.test.perms.PermTestSuite;

/**
 * @author Ouissam
 * 
 */

@RunWith(Suite.class)
@Suite.SuiteClasses({PermTestSuite.class, InheritedPermTestSuite.class})

public class TestsEntry{
	private static Logger logger = Logger.getLogger(TestsEntry.class);

	@BeforeClass
	public static void before() throws Throwable {
		logger.debug("Starting the test suite...");
		if (ServerUtil.loadSolutionAndRunOrRestartServer()) {
			return;
		}
		String failmsg = "Cannot start server or load solution on "
			+ Resources.getDefaultHostName() + " : "
			+ Resources.getDefaultPort();
		logger.debug(failmsg);
		fail(failmsg);
		

	};

	@AfterClass
	public static void after() throws Throwable {
		logger.debug("Test suite is done");
		logger.debug("Killing the server as inner process...");
		ServerUtil.killServerViaInnerProcess();
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
