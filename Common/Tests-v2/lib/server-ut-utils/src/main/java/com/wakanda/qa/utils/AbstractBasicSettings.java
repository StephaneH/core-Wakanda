/**
 * 
 */
package com.wakanda.qa.utils;

import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.message.BasicHeader;
import org.apache.log4j.Logger;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public abstract class AbstractBasicSettings implements IBasicSettings {
	
	protected Logger logger = Logger.getLogger(this.getClass());

	public HttpHost getWebAdminTarget() {
		return new HttpHost(getDefaultTargetName(), getWebAdminPort());
	}
	
	public HttpHost getDefaultTarget() {
		return new HttpHost(getDefaultTargetName(), getDefaultPort());
	}
	
	public Header getDefaultAuthChallenge() {
		String defaultChallenge = "Basic " + getDefaultRealm();
		return new BasicHeader(HttpHeaders.WWW_AUTHENTICATE, defaultChallenge);
	}
	
	public String getServerPath() {
		String wakSrvEVName = getWakandaServerPathEVName();
		String env = System.getenv(wakSrvEVName);
		String os = getOS();
		String serverPath = null;
		if (env != null) {
			// When Jenkins environement
			serverPath = env;
		} else {
			// otherwise use the server located within the project directory
			serverPath = System.getProperty("user.dir") + "/Wakanda Server";
			if (os.contains("Mac")) {
				// Mac
				serverPath += ".app/Contents/MacOS/Wakanda Server";
			} else if (os.contains("Linux")) {
				// Linux
				serverPath += "/Wakanda";
			} else {
				// Win
				serverPath += "/Wakanda Server.exe";
			}

		}
		return serverPath;
	}
	
	public static String getOS(){
		return System.getProperty("os.name");
	}
}
