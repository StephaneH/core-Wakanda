/**
 * 
 */
package org.wakanda.qa.commons.server.settings;

import org.apache.http.client.HttpClient;
import org.wakanda.qa.commons.server.ServerAdmin;
import org.wakanda.qa.commons.server.http.Requestor;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public interface IConfiguration {

	public abstract AbstractSettings getSettings();

	/**
	 * Returns the HTTP client configuration used while sending requests.
	 * 
	 * @return
	 */
	public HttpClient getHttpClient();

	/**
	 * Returns the requestor object used for sending requests.
	 * 
	 * @return
	 */
	public Requestor getRequestor();

	/**
	 * Returns the ServerAdmin object used to manage the server.
	 * 
	 * @return
	 */
	public ServerAdmin getSeverAdmin();

}
