/**
 * 
 */
package org.wakanda.qa.commons.server.ut;

import org.wakanda.qa.commons.server.settings.DefaultConfiguration;


/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class StopServer {

	public static void main(String[] args) {
		DefaultBehavior.doWhenTestRunFinished(new DefaultConfiguration());
	}

}
