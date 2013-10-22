/**
 * 
 */
package org.wakanda.qa.commons.server.ut;

import org.wakanda.qa.commons.server.settings.DefaultConfiguration;


/**
 * @author ouissam.gouni@4d.com
 *
 */
public class RunServer {

	public static void main(String[] args) {
		DefaultBehavior.doWhenTestRunStarted(new DefaultConfiguration());
	}

}
