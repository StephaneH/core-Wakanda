/**
 * 
 */
package org.p4d.qa.test.rest.settings;

import java.io.File;
import java.net.URL;

import org.apache.commons.lang.SystemUtils;
import org.wakanda.qa.commons.server.settings.DefaultConfiguration;
import org.wakanda.qa.commons.server.settings.DefaultServerAdminSettings;
import org.wakanda.qa.commons.server.settings.IServerAdminSettings;

/**
 * @author soufiane.tigrioui@4d.com
 *
 */
public class Configuration extends DefaultConfiguration {

	@Override
	public IServerAdminSettings getServerAdminSettings() {
		return new DefaultServerAdminSettings(){
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
		 
			@Override
			public String getServerPath() {
				String SrvEVName = null;
				String env = null;
				String serverPath = null;
				
				SrvEVName = get4DServerPathEVName();
				 	env = System.getenv(SrvEVName);
				 	
					
					if (env != null) {
						// When Jenkins environement
						serverPath = env;
						if(SystemUtils.IS_OS_MAC){
						serverPath += "/4D Server.app/Contents/MacOS/4D Server";
						}
						else{
							serverPath += "\\4D Server\\4D Server.exe";
							}
					} else {
						
						    serverPath = System.getProperty("user.dir");
						    if(SystemUtils.IS_OS_MAC){
						    	// Mac
						    	serverPath += "/4D Server.app/Contents/MacOS/4D Server";
						    }
						    else{
								// Win
								serverPath += "\\4D Server\\"+"4D"+" Server.exe";
						    }
					} 	
				return serverPath;
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
