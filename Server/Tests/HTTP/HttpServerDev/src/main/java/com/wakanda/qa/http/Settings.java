package com.wakanda.qa.http;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.GregorianCalendar;
import java.util.Properties;

import org.apache.http.HttpHeaders;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;

import com.wakanda.qa.utils.BasicSettings;


/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Settings extends BasicSettings {

	public static void main(String[] args) throws Exception{
		System.out.println(new Settings().getSolutionPath());
	}
	
	private static Properties globalp = null;
	private static Properties entitiesp = null;
	private static Properties urlp = null;

	public Properties getGlobalSettings() {
		if (globalp == null) {
			globalp = getProperties("settings.properties");
		}
		return globalp;
	}
	
	public Properties getUrlSettings() {
		if (urlp == null) {
			urlp = getProperties("urls/urls.properties");
		}
		return urlp;
	}
	
	public Properties getEntitiesSettings() {
		if (entitiesp == null) {
			entitiesp = getProperties("entities/entities.properties");
		}
		return entitiesp;
	}
	
	private String getAbsolutePath(String relativePath) {
		try {
			URL url = getClass().getResource(relativePath);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public String getSolutionPath() {
		return getAbsolutePath(getGlobalSettings().getProperty(
				"solution"));
	}

	public String getDefaultProjectWebFolderPath() {
		return getAbsolutePath(getGlobalSettings().getProperty(
				"project1WebFolder"));
	}
	
	public int getMultiHostPort() {
		return Integer.parseInt(getGlobalSettings().getProperty("multiHostPort"));
	}
	
	public String getDefaultUrl() {
		return getGlobalSettings().getProperty("url");
	}
	
	public  String getDefaultConnectionToken() {
		return getGlobalSettings().getProperty("connection");
	}

	public static String[] getSupportedMethods() {
		return new String[] { "GET", "HEAD", "TRACE" };

	}

	public static String[] getSupportedContentCoding() {
		return new String[] { "gzip", "deflate", "identity", "x-gzip" };
	}
	
	public static HttpPost getDefaultPostRequest()
			throws ClientProtocolException, IOException {
		HttpPost request = new HttpPost("/rpc/");
		request.addHeader(HttpHeaders.CONTENT_TYPE,
				"application/json-rpc; charset=utf-8");
		long id = GregorianCalendar.getInstance().getTimeInMillis();
		String body = "{\"jsonrpc\":\"2.0\",\"id\":" + id
				+ ",\"method\":\"getCatalog\",\"params\":[[]]}";
		StringEntity entity = new StringEntity(body);
		request.setEntity(entity);
		return request;
	}
	
	private String getOrCreateFolderInSolutionWebFolder(String folderName) {
		String folderPath = getDefaultProjectWebFolderPath() + "/" + folderName;
		File folder = new File(folderPath);
		if (!folder.exists())
			folder.mkdir();

		return folderPath;
	}

	public String getMediaTypeFolder() {
		return getOrCreateFolderInSolutionWebFolder("mediaType");
	}

	public String getCharsetFolder() {
		return getOrCreateFolderInSolutionWebFolder("charsets");
	}

	public String getMultipartFolder() {
		return getOrCreateFolderInSolutionWebFolder("multipart");
	}

	public String getCacheFolder() {
		return getOrCreateFolderInSolutionWebFolder("cache");
	}
	
	@Override
	public String getServerPath() {
		return super.getServerPath();
	}

}
