/**
 * 
 */
package org.wakanda.qa.commons.server.settings;

import org.apache.http.client.HttpClient;
import org.wakanda.qa.commons.server.http.DefaultHttpClient;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class DefaultConfiguration extends AbstractConfiguration {
	
	@Override
	public AbstractSettings getSettings() {
		return new DefaultSettings();
	}

	@Override
	public HttpClient getHttpClient() {
		return new DefaultHttpClient();
	}


}
