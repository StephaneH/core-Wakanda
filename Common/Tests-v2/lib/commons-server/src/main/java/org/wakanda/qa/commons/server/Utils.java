/**
 * 
 */
package org.wakanda.qa.commons.server;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Utils {
	/**
	 * Finds the properties associated with the given class.
	 * 
	 * @param theclass
	 * @param name
	 * @return
	 * @throws ConfigurationException
	 */
	public static PropertiesConfiguration getPropertiesConfiguration(Class<?> klass,
			String name) {
		PropertiesConfiguration p = null;
		try {
			p = new PropertiesConfiguration(
					klass.getResource(name));
		} catch (ConfigurationException e) {
			e.printStackTrace();
		}
		return p;
	}
	
	public static String getOS() {
		return System.getProperty("os.name");
	}
}
