/**
 * 
 */
package org.wakanda.qa.commons.server.settings;

import java.io.File;
import java.net.URL;

import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.log4j.Logger;
import org.wakanda.qa.commons.server.Utils;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class DefaultSettings extends AbstractSettings {

	protected Logger logger = Logger.getLogger(getClass());

	private PropertiesConfiguration getDefaults() {
		return Utils.getPropertiesConfiguration(DefaultSettings.class,
				"settings.properties");
	}

	@Override
	public String getDefaultTargetName() {
		return getDefaults().getString("host");
	}

	@Override
	public int getWebAdminPort() {
		return getDefaults().getInt("webAdminPort");
	}

	@Override
	public int getDefaultPort() {
		return getDefaults().getInt("defaultPort");
	}

	public String getWakandaServerPathEVName() {
		return getDefaults().getString("wakandaServerPathEVName");
	}

	@Override
	public String getRealm() {
		return getDefaults().getString("defaultRealm");
	}

	@Override
	public String getSolutionPath() {
		try {
			String relative = getDefaults().getString(
					"basicSolution");
			URL url = DefaultSettings.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getUserAgent() {
		return getDefaults().getString("userAgent");
	}

	@Override
	public String getServerPath() {
		String wakSrvEVName = getWakandaServerPathEVName();
		String env = System.getenv(wakSrvEVName);
		String os = Utils.getOS();
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

}
