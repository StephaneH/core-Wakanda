package com.wakanda.qa.http;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.net.URL;
import java.util.GregorianCalendar;
import java.util.Properties;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.http.Header;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpException;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.auth.MalformedChallengeException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.AuthSchemeBase;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.auth.DigestScheme;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicLineFormatter;
import org.apache.log4j.Logger;

public class Resources {

	private static Logger logger = Logger.getLogger(Resources.class);
	private static Properties globalp = null;
	private static Properties entitiesp = null;
	private static Properties urlp = null;

	public static void main(String[] atgs) throws InterruptedException {
		logger.debug(getDefaultTargetName());
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

	public static Properties getGlobalProp() {
		if (globalp == null) {
			globalp = getProperties("global.properties");
		}
		return globalp;
	}

	public static Properties getURLsProp() {
		if (urlp == null) {
			urlp = getProperties("urls/urls.properties");
		}
		return urlp;
	}

	public static Properties getEntitiesProp() {
		if (entitiesp == null) {
			entitiesp = getProperties("entities/entities.properties");
		}
		return entitiesp;
	}

	public static HttpHost getDefaultTarget() {
		return new HttpHost(getDefaultTargetName(), getDefaultPort());
	}

	public static HttpHost getWebAdminTarget() {
		return new HttpHost(getDefaultTargetName(), getWebAdminPort());
	}

	public static String getDefaultTargetName() {
		return getGlobalProp().getProperty("host");// "192.168.0.2";
													// "www.voila.fr";
	}

	public static int getDefaultPort() {
		return Integer.parseInt(getGlobalProp().getProperty("port"));// 80;
																		// 8081;
	}
	
	public static int getMultiHostPort() {
		return Integer.parseInt(getGlobalProp().getProperty("multiHostPort"));
	}

	public static int getWebAdminPort() {
		return Integer.parseInt(getGlobalProp().getProperty("webAdminPort"));
	}

	public static String getDefaultUrl() {
		return getGlobalProp().getProperty("url");
	}

	public static String getDefaultUserAgent() {
		return getGlobalProp().getProperty("UserAgent");
	}

	public static String getAbsPathFromClassLocation(String relative) {
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

	public static String getDefaultProjectWebFolderPath() {
		return getAbsPathFromClassLocation(getGlobalProp().getProperty(
				"project1WebFolder"));
	}

	public static String getWakandaServerPathEVName() {
		return getGlobalProp().getProperty("wakandaServerPathEVName");
	}

	public static String getDefaultConnection() {
		return getGlobalProp().getProperty("Connection");
	}

	public static String getDefaultHostHeaderValue() {
		return getDefaultTarget().toHostString();
	}

	public static String getDefaultHeadersFieldsAsString() {
		return "host:" + getDefaultHostHeaderValue() + CRLF + HttpHeaders.CONNECTION + ":"
				+ getDefaultConnection() + CRLF + HttpHeaders.USER_AGENT + ":"
				+ getDefaultUserAgent() + CRLF;
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

	public static HttpResponse executeRequest(HttpRequest request)
			throws IOException, ClientProtocolException {
		return executeRequest(request, getDefaultTarget());
	}

	public static HttpResponse executeRequest(HttpRequest request,
			HttpHost target) throws IOException, ClientProtocolException {
		HttpClient httpclient = new DefaultHttpClient();
		HttpResponse response = httpclient.execute(target, request);
		return response;
	}

	public static HttpResponse executeDefaultRequest() throws IOException,
			ClientProtocolException {
		return executeURL(getDefaultUrl());
	}

	public static HttpResponse executeURL(String url) throws IOException,
			ClientProtocolException {
		HttpClient httpclient = new DefaultHttpClient();
		HttpGet request = new HttpGet(url);
		HttpResponse response = httpclient.execute(getDefaultTarget(), request);
		return response;
	}

	public static HttpResponse executeRequestString(String request)
			throws HttpException, IOException {
		return executeRequestString(request, getDefaultTarget());
	}

	public static HttpResponse executeRequestString(String request,
			HttpHost target) throws HttpException, IOException {
		HttpResponse response = HttpRequestExecutor.execute(target, request);
		return response;
	}
	
	public enum AuthType {
		BASIC, DIGEST, CUSTOM
	};
	
	public static HttpResponse executeAuthenticatedRequest(final HttpRequest request,
			HttpHost target, String user, String password, AuthType scheme,
			Header challenge) throws Exception {

		// set credentials
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, password);
		// build authen response header
		AuthSchemeBase authscheme = null;
		switch (scheme) {
		case BASIC:
			authscheme = new BasicScheme();
			break;
		case DIGEST:
			authscheme = new DigestScheme();
			break;
		default:
			throw new MalformedChallengeException("Invalid scheme identifier: "
					+ scheme);
		}
		
		if (scheme == AuthType.BASIC || scheme == AuthType.DIGEST) {
			authscheme.processChallenge(challenge);
			Header authResponse = authscheme.authenticate(creds, request, null);
			request.addHeader(authResponse);
		}

		// send the authenticated request
		HttpResponse response = executeRequest(request, target);

		return response;
	}
	
	public static HttpResponse executeAuthenticatedRequest(final HttpRequest request,
			HttpHost target, AuthType scheme,
			Header challenge) throws Exception {
		return executeAuthenticatedRequest(request, target, "admin", "", scheme, challenge);
	}
	
	public static HttpResponse executeAuthenticatedRequest(final HttpRequest request, HttpHost target) throws Exception {
		return executeAuthenticatedRequest(request, target, AuthType.BASIC, new BasicHeader(HttpHeaders.WWW_AUTHENTICATE, "Basic Wakanda"));
	}
	
	public static HttpResponse executeAuthenticatedRequest(final HttpRequest request) throws Exception {
		return executeAuthenticatedRequest(request, getDefaultTarget());
	}

	public static String readFileAsString(String filePath)
			throws java.io.IOException {
		byte[] buffer = new byte[(int) new File(filePath).length()];
		BufferedInputStream f = null;
		try {
			f = new BufferedInputStream(new FileInputStream(filePath));
			f.read(buffer);
		} finally {
			if (f != null)
				try {
					f.close();
				} catch (IOException ignored) {
				}
		}
		return new String(buffer, "UTF-8");
	}

	public static byte[] readFileAsBytes(String filePath)
			throws java.io.IOException {
		byte[] buffer = new byte[(int) new File(filePath).length()];
		BufferedInputStream f = null;
		try {
			f = new BufferedInputStream(new FileInputStream(filePath));
			f.read(buffer);
		} finally {
			if (f != null)
				try {
					f.close();
				} catch (IOException ignored) {
				}
		}
		return buffer;
	}

	public static boolean writeBytesToFile(String path, byte[] content) {
		try {
			FileOutputStream writer = new FileOutputStream(path);
			writer.write(content);
			writer.flush();
			writer.close();
			// logger.debug("File created: " + new
			// File(path).getAbsolutePath());
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	public static boolean writeStringToFile(String path, String content) {
		try {
			FileWriter writer = new FileWriter(path);
			writer.write(content);
			writer.flush();
			writer.close();
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	public static boolean createRandomContent(String url, int size) {
		File file = new File(getDefaultProjectWebFolderPath() + url);
		if (!file.exists()) {
			try {
				file.delete();
				file.createNewFile();
				FileWriter wr = new FileWriter(file);
				String randomString = RandomStringUtils.randomAscii(size);
				wr.write(randomString);
				wr.flush();
			} catch (IOException e) {
				// e.printStackTrace();
				return false;
			}
		}
		return true;

	}

	public static String convertStreamToString(InputStream is)
			throws IOException {
		return convertStreamToString(new InputStreamReader(is));
	}

	public static String convertStreamToString(Reader isReader)
			throws IOException {
		/*
		 * To convert the InputStream to String we use the Reader.read(char[]
		 * buffer) method. We iterate until the Reader return -1 which means
		 * there's no more data to read. We use the StringWriter class to
		 * produce the string.
		 */
		if (isReader != null) {
			Writer writer = new StringWriter();

			char[] buffer = new char[1024];
			try {
				Reader reader = new BufferedReader(isReader);
				int n;
				while ((n = reader.read(buffer)) != -1) {
					writer.write(buffer, 0, n);
				}
			} finally {
				isReader.close();
			}
			return writer.toString();
		} else {
			return "";
		}
	}

	public static String getOrCreateFolderInSolutionWebFolder(String folderName) {
		String folderPath = getDefaultProjectWebFolderPath() + "/" + folderName;
		File folder = new File(folderPath);
		if (!folder.exists())
			folder.mkdir();

		return folderPath;
	}

	public static String getMediaTypeFolder() {
		return getOrCreateFolderInSolutionWebFolder("mediaType");
	}

	public static String getCharsetFolder() {
		return getOrCreateFolderInSolutionWebFolder("charsets");
	}

	public static String getMultipartFolder() {
		return getOrCreateFolderInSolutionWebFolder("multipart");
	}

	public static String getCacheFolder() {
		return getOrCreateFolderInSolutionWebFolder("cache");
	}

	public static final String CR = "\r";
	public static final String LF = "\n";
	public static final String CRLF = CR + LF;

	public static String getRequestAsString(HttpRequest request) {
		StringBuffer result = new StringBuffer();
		BasicLineFormatter lineFormatter = BasicLineFormatter.DEFAULT;

		result.append(lineFormatter.formatRequestLine(null,
				request.getRequestLine()));
		result.append(CRLF);

		HeaderIterator it = request.headerIterator();
		while (it.hasNext()) {
			Header header = it.nextHeader();
			result.append(lineFormatter.formatHeader(null, header));
			result.append(CRLF);
		}
		result.append(CRLF);
		return result.toString();
	}

	public static String getResponseAsString(HttpResponse response) {
		StringBuffer result = new StringBuffer();
		BasicLineFormatter lineFormatter = BasicLineFormatter.DEFAULT;

		result.append(lineFormatter.formatStatusLine(null,
				response.getStatusLine()));
		result.append(CRLF);

		HeaderIterator it = response.headerIterator();
		while (it.hasNext()) {
			Header header = it.nextHeader();
			result.append(lineFormatter.formatHeader(null, header));
			result.append(CRLF);
		}
		result.append(CRLF);
		return result.toString();
	}

}
