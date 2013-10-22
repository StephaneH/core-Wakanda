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
public class StopServer {

	public static void main(String[] args) {
		DefaultBehavior.doWhenTestRunFinished(Configuration.getInstance());
	}

}
