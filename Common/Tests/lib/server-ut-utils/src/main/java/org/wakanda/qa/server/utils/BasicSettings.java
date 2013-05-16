/**
 * 
 */
package org.wakanda.qa.server.utils;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class BasicSettings extends AbstractBasicSettings {

	public static void main(String[] args) throws Exception {
		System.out.println(new BasicSettings().getUserAgent());
	}

	protected Logger logger = Logger.getLogger(getClass());
	private static Properties settings = null;
	
	static{
		settings = getProperties(BasicSettings.class, "settings.properties");
	}

	/**
	 * Finds the properties associated with the given class.
	 * 
	 * @param theclass
	 * @param name
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Properties getProperties(Class theclass, String name) {
		Properties p = null;
		try {
			p = new Properties();
			InputStream in = theclass.getResourceAsStream(name);
			p.load(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return p;
	}

	/**
	 * Utility function that finds the properties associated with the class of the current object.
	 * 
	 * @param fileName
	 * @return
	 */
	protected final Properties getProperties(String fileName) {
		return getProperties(getClass(), fileName);
	}

	private Properties getDefaultSettings() {
		if (settings == null) {
			settings = getProperties("settings.properties");
		}
		return settings;
	}

	public String getDefaultTargetName() {
		return getDefaultSettings().getProperty("host");
	}

	public int getWebAdminPort() {
		return Integer.parseInt(getDefaultSettings()
				.getProperty("webAdminPort"));
	}

	public int getDefaultPort() {
		return Integer
				.parseInt(getDefaultSettings().getProperty("defaultPort"));
	}

	public String getWakandaServerPathEVName() {
		return getDefaultSettings().getProperty("wakandaServerPathEVName");
	}

	public String getDefaultRealm() {
		return getDefaultSettings().getProperty("defaultRealm");
	}

	public String getSolutionPath() {
		try {
			String relative = getDefaultSettings().getProperty("basicSolution");
			URL url = getClass().getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getUserAgent() {
		return getDefaultSettings().getProperty("userAgent");
	}

}
