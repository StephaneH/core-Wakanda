/**
 * 
 */
package org.wakanda.qa.server.utils;

import org.apache.http.Header;
import org.apache.http.HttpHost;


/**
 * @author ouissam.gouni@4d.com
 *
 */
public interface IBasicSettings {
	
	/**
	 * Return the default host name.
	 * @return
	 */
	public String getDefaultTargetName();
	
	/**
	 * Returns the web admin port.
	 * @return
	 */
	public int getWebAdminPort() ;
	
	/**
	 * Returns the default solution port.
	 * @return
	 */
	public int getDefaultPort();
	
	/**
	 * Returns the default user agent.
	 * @return
	 */
	public String getUserAgent();
	
	/**
	 * Returns the name of environement variable holding the path to the server.
	 * @return
	 */
	public String getWakandaServerPathEVName();
	
	/**
	 * Returns the path to the server.
	 * @return
	 */
	public String getServerPath();
	
	/**
	 * Returns the solution path.
	 * @return
	 */
	public String getSolutionPath();
	
	/**
	 * Returns the defauld realm used in authentitication process.
	 * @return
	 */
	public String getDefaultRealm();
	
	/**
	 * Return the web admin target.
	 * @return
	 */
	public HttpHost getWebAdminTarget();
	
	/**
	 * Returns the default target
	 * @return
	 */
	public HttpHost getDefaultTarget() ;
	
	/**
	 * Returns the default target
	 * @return
	 */
	public Header getDefaultAuthChallenge();
	
}
