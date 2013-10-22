/**
 * 
 */
package org.wakanda.qa.test.rest.ds.settings;

import java.io.File;
import java.net.URL;

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
				try {
					String relative = Settings.getSettings().getString("solution");
					URL url = Settings.class.getResource(relative);
					String absPath = new File(url.toURI()).getCanonicalPath();
					return absPath;
				} catch (Exception e) {
					e.printStackTrace();
				}
				return null;
			}
		};
	}
	
	private static Configuration instance = null;
	
	public static Configuration getInstance(){
		if(instance==null){
			instance = new Configuration();
		}
		return instance;
	}

}
