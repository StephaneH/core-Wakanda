/**
 * 
 */
package org.wakanda.qa.commons.server.settings;

import org.wakanda.qa.commons.server.ServerAdmin;
import org.wakanda.qa.commons.server.http.Requestor;

/**
 * Class that provides the configuration of the server test projet.
 * 
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractConfiguration implements IConfiguration{

	/**
	 * Returns the requestor object used for sending requests.
	 * 
	 * @return
	 */
	public Requestor getRequestor() {
		return new Requestor(getSettings(), getHttpClient());
	}

	/**
	 * Returns the ServerAdmin object used to manage the server.
	 * 
	 * @return
	 */
	public ServerAdmin getSeverAdmin() {
		return new ServerAdmin(getRequestor());
	}

}
