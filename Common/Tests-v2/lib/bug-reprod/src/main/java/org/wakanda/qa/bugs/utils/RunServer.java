/**
 * 
 */
package org.wakanda.qa.bugs.utils;

import org.wakanda.qa.bugs.settings.Configuration;
import org.wakanda.qa.commons.server.ut.DefaultBehavior;


/**
 * @author ouissam.gouni@4d.com
 *
 */
public class RunServer {

	public static void main(String[] args) {
		DefaultBehavior.doWhenTestRunStarted(Configuration.getInstance());
	}

}
