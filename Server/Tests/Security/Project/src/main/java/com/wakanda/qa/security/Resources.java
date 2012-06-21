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

public class Resources {

	private static Logger logger = Logger.getLogger(Resources.class);
	private static Properties globalp = null;

	public static void main(String[] atgs) throws InterruptedException {
		logger.debug(getSolutionPath());
	}

	private static Properties getProperties(String fileName) {
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

	private static Properties getGlobalProp() {
		if (globalp == null) {
			globalp = getProperties("global.properties");
		}
		return globalp;
	}

	public static String getDefaultHostName() {
		return getGlobalProp().getProperty("host");
	}
	
	public static int getWebAdminPort() {
		return Integer.parseInt(getGlobalProp().getProperty("webAdminPort"));
	}
	
	public static HttpHost getWebAdminTarget() {
		return new HttpHost(getDefaultHostName(), getWebAdminPort());
	}
	
	public static int getDefaultPort() {
		return Integer.parseInt(getGlobalProp().getProperty("port2"));
	}
	
	public static HttpHost getDefaultTarget() {
		return new HttpHost(getDefaultHostName(), getDefaultPort());
	}
	
	public static String getDefaultUrl() {
		return getGlobalProp().getProperty("url");
	}
	
	public static HttpHost getNoPermTarget() {
		int port = Integer.parseInt(getGlobalProp().getProperty("port1"));
		return new HttpHost(getDefaultHostName(), port);
	}

	public static HttpHost getInheritedPermTarget() {
		int port = Integer.parseInt(getGlobalProp().getProperty("port3"));
		return new HttpHost(getDefaultHostName(), port);
	}

	private static String getAbsPathFromClassLocation(String relative) {
		try {
			URL url = Resources.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String getSolutionPath() {
		return getAbsPathFromClassLocation(getGlobalProp().getProperty(
				"solution"));
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
