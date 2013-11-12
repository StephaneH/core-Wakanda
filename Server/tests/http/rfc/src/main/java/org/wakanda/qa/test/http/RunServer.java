/**
 * 
 */
package org.wakanda.qa.test.http;

import org.wakanda.qa.commons.server.ut.DefaultBehavior;
import org.wakanda.qa.test.http.settings.Configuration;


/**
 * @author ouissam.gouni@4d.com
 *
 */
public class RunServer {

	public static void main(String[] args) {
		DefaultBehavior.doWhenTestRunStarted(Configuration.getInstance());
	}

}
