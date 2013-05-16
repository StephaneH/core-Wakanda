package org.wakanda.qa.dataperm;

import java.io.File;
import java.net.URL;
import java.util.Properties;

import org.apache.http.HttpHost;
import org.apache.http.client.HttpClient;
import org.apache.http.client.protocol.RequestClientConnControl;
import org.apache.http.client.protocol.RequestDefaultHeaders;
import org.apache.http.protocol.BasicHttpProcessor;
import org.apache.http.protocol.RequestContent;
import org.apache.http.protocol.RequestExpectContinue;
import org.apache.http.protocol.RequestTargetHost;
import org.apache.http.protocol.RequestUserAgent;
import org.wakanda.qa.server.utils.BasicSettings;
import org.wakanda.qa.server.utils.Requestor;
import org.wakanda.qa.server.utils.ServerUtil;



/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Settings extends BasicSettings {

	public static void main(String[] args){
		System.out.println(new Settings().getSolutionPath());
	}
	
	private static Properties settingsp = null;

	public Properties getSettings() {
		if (settingsp == null) {
			settingsp = getProperties("settings.properties");
		}
		return settingsp;
	}
	
	@Override
	public HttpHost getDefaultTarget() {
		return Targets.NO_PERM;
	}

	@Override
	public String getSolutionPath() {
		try {
			String relative = getSettings().getProperty(
			"solution");
			URL url = Settings.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
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


}
