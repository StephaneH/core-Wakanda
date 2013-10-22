/**
 * 
 */
package org.wakanda.qa.test.http.settings;

import org.apache.http.client.HttpClient;
import org.wakanda.qa.commons.server.settings.AbstractSettings;
import org.wakanda.qa.commons.server.settings.DefaultConfiguration;
import org.wakanda.qa.commons.server.settings.DefaultSettings;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Configuration extends DefaultConfiguration {

	@Override
	public AbstractSettings getSettings() {
		return new DefaultSettings(){
			@Override
			public String getSolutionPath() {
				return Settings.getSolutionPath();
			}
		};
	}
	
	@Override
	public HttpClient getHttpClient() {
		// use a new HttpClient instance for each request
		return new org.wakanda.qa.test.http.settings.HttpClient();
	}
	
	private static Configuration instance = null;
	
	public static Configuration getInstance(){
		if(instance==null){
			instance = new Configuration();
		}
		return instance;
	}

}
