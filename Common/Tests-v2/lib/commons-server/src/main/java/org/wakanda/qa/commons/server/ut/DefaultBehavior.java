/**
 * 
 */
package org.wakanda.qa.commons.server.ut;

import org.apache.log4j.Logger;
import org.wakanda.qa.commons.server.settings.AbstractConfiguration;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class DefaultBehavior {
	
	private static Logger logger = Logger.getLogger(DefaultBehavior.class);
	
	public static void doWhenTestRunStarted(AbstractConfiguration conf) {
		logger.debug("Starting the test suite...");
		if (conf.getSeverAdmin().runServerWithSolution()) {
			return;
		}
		logger.debug("Cannot start server or open solution");
		// for jenkins to end up with a "failed" status instead of "unstable"
		System.exit(1);
	}

	public static void doWhenTestRunFinished(AbstractConfiguration conf) {
		logger.debug("Killing the server...");
		if (!conf.getSeverAdmin().killServerViaCommandLine()) {
			logger.debug("Cannot kill the server");
			return;
		}
		logger.debug("Tests are done !");
	}

}
