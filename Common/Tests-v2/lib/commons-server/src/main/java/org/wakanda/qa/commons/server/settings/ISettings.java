/**
 * 
 */
package org.wakanda.qa.commons.server.settings;



/**
 * @author ouissam.gouni@4d.com
 *
 */
public interface ISettings {
	
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
	public String getRealm();
	
}
