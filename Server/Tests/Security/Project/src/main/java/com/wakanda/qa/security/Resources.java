package com.wakanda.qa.security;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.auth.AUTH;
import org.apache.http.message.BasicHeader;
import org.apache.log4j.Logger;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Resources {

	private static Logger logger = Logger.getLogger(Resources.class);
	private static Properties globalp = null;

	public static void main(String[] atgs) throws Exception {
		logger.debug(getSolutionPath());
	}
	
	public static Properties getProperties(String fileName) {
		Properties p = null;
		try {
			p = new Properties();
			InputStream in = Resources.class.getResourceAsStream(fileName);
			p.load(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return p;
	}

	public static Properties getGlobalProp() {
		if (globalp == null) {
			globalp = getProperties("global.properties");
		}
		return globalp;
	}
	
	public static String getDefaultHostName() {
		return getGlobalProp().getProperty("host");
	}
	
	public static int getWebAdminPort() {
		return Integer.parseInt(getGlobalProp().getProperty("portWebAdmin"));
	}
	
	public static HttpHost getWebAdminTarget() {
		return new HttpHost(getDefaultHostName(), getWebAdminPort());
	}

	public static HttpHost getDefaultTarget() {
		return Targets.NO_PERM;
	}

	public static String getSolutionPath() {
		try {
			String relative = getGlobalProp().getProperty(
			"solution");
			URL url = Resources.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String getWakandaServerPathEVName() {
		return getGlobalProp().getProperty("wakandaServerPathEVName");
	}
	
	public static Header getDefaultAuthChallenge() throws Exception {
		Header challenge = new BasicHeader(AUTH.WWW_AUTH,
				"Basic realm=\"Wakanda\"");
		return challenge;
	}

}
