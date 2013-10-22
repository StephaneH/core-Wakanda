/**
 * 
 */
package org.wakanda.qa.commons.server.settings;

import org.apache.http.HttpHost;
import org.apache.log4j.Logger;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractSettings implements ISettings {

	protected Logger logger = Logger.getLogger(this.getClass());

	public HttpHost getWebAdminTarget() {
		return new HttpHost(getDefaultTargetName(), getWebAdminPort());
	}

	public HttpHost getDefaultTarget() {
		return new HttpHost(getDefaultTargetName(), getDefaultPort());
	}
}
