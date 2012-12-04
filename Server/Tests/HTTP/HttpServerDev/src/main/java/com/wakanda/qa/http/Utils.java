/**
 * 
 */
package com.wakanda.qa.http;

import java.io.File;
import java.io.IOException;
import java.util.Random;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.http.Header;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.protocol.RequestClientConnControl;
import org.apache.http.client.protocol.RequestDefaultHeaders;
import org.apache.http.message.BasicLineFormatter;
import org.apache.http.protocol.BasicHttpProcessor;
import org.apache.http.protocol.RequestContent;
import org.apache.http.protocol.RequestExpectContinue;
import org.apache.http.protocol.RequestTargetHost;
import org.apache.http.protocol.RequestUserAgent;

import com.wakanda.qa.utils.Requestor;
import com.wakanda.qa.utils.ServerUtil;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Utils{
	
	private static Settings settings = null;
	private static HttpClient httpClient = null;
	private static Requestor requestor = null;
	private static ServerUtil serverUtil = null;
	
	public static Settings getSettingsInstance(){
		if(settings == null){
			settings = new Settings();
		}
		return settings;
	}
	
	/**
	 * Returns an instance of a stateless Http client.
	 * @return
	 */
	public static HttpClient getHttpClientInstance(){
		if(httpClient == null){
			httpClient = new Requestor.DefaultHttpClient(){
				@Override
				protected BasicHttpProcessor createHttpProcessor() {
					BasicHttpProcessor httpproc = new BasicHttpProcessor();
					httpproc.addInterceptor(new RequestDefaultHeaders());
					// Required protocol interceptors
					httpproc.addInterceptor(new RequestContent());
					httpproc.addInterceptor(new RequestTargetHost());
					// Recommended protocol interceptors
					httpproc.addInterceptor(new RequestClientConnControl());
					httpproc.addInterceptor(new RequestUserAgent());
					httpproc.addInterceptor(new RequestExpectContinue());
					return httpproc;
				}
			};
		}
		return httpClient;
	}
	
	public static Requestor getRequestorInstance(){
		if(requestor == null){
			requestor = new  Requestor(getSettingsInstance(), getHttpClientInstance());
		}
		return requestor;
	}
	
	public static ServerUtil getServerUtilInstance(){
		if(serverUtil == null){
			serverUtil = new  ServerUtil(getRequestorInstance());
		}
		return serverUtil;
	}
	
	public static final String CRLF = "\r\n";
	
	public static String getDefaultHeadersFieldsAsString() {
		return "host:" + getSettingsInstance().getDefaultTarget().toHostString() + CRLF + HttpHeaders.CONNECTION + ":"
				+ getSettingsInstance().getDefaultConnectionToken() + CRLF + HttpHeaders.USER_AGENT + ":"
				+ getSettingsInstance().getUserAgent() + CRLF;
	}

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
	
	public static String generateBoundary() {
		StringBuilder buffer = new StringBuilder();
		Random rand = new Random();
		int count = rand.nextInt(11) + 30; // a random size from 30 to 40
		for (int i = 0; i < count; i++) {
			buffer.append(MediaTypeUtil.MULTIPART_CHARS[rand.nextInt(MediaTypeUtil.MULTIPART_CHARS.length)]);
		}
		return buffer.toString();
	}
	
	/**
	 * Creates a text file with a random content of the given size.
	 * 
	 * @param path
	 * @param size
	 * @return
	 */
	public static boolean createRandomContent(String path, int size) {
		File file = new File(path);
		String data = RandomStringUtils.randomAscii(size);
		try {
			FileUtils.writeStringToFile(file, data);
		} catch (IOException e) {
			return false;
		}
		return true;

	}

}
