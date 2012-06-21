package com.wakanda.qa.http.test.extend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.ProtocolVersion;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.log4j.Logger;
import org.junit.Rule;
import org.junit.internal.runners.statements.FailOnTimeout;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.rules.Timeout;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

import com.wakanda.qa.http.Resources;
import com.wakanda.qa.http.ServerUtil;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author Ouissam
 * 
 */

public abstract class AbstractHttpTestCase {

	protected Logger logger = Logger.getLogger(this.getClass());

	@Rule
	public TestRule unitTestLogger = new TestWatcher() {
		
		@Override
		protected void starting(Description description) {
			String method = description.getMethodName();
			logger.debug( method + " Starting...");
			if(!isToExcludeFromBefore(method)){
				logger.debug(method +  " Init...");
				try {
					before();
					logger.debug(method +  " Init done");
				} catch (Exception e) {
					//e.printStackTrace();
					fail( method + " Init failure: " + e.getMessage());
				}
			}else{
				logger.debug(method + " Init skipped");
			}
		}
		
		@Override
		protected void failed(Throwable e, Description description) {
			logger.debug(description.getMethodName() + " has failed :(");
		}
		
		@Override
		protected void succeeded(Description description) {
			logger.debug(description.getMethodName() + " has passed :)");
		}
	};
	
	private boolean isToExcludeFromBefore(String testMethod){
		return getUnitTestsToExcludeFromBefore().contains(testMethod);
	}
	
	protected List<String> getUnitTestsToExcludeFromBefore(){
		return new ArrayList<String>();
	}
	
	protected Map<String, Long> getUnitTestsTimeout(){
		return new HashMap<String, Long>();
	}
	
	private static int DEFAULT_TIMEOUT = 10000;
	
	@Rule
	public TestRule timeout = new Timeout(DEFAULT_TIMEOUT){
		@Override
		public Statement apply(Statement base, Description description) {
			String method = description.getMethodName();
			Long timeout = getUnitTestsTimeout().get(method);
			if(timeout != null){
				//if defined, use the timeout requested for the current unit test
				logger.debug(method + " Set timeout to " + timeout + " ms");
				return new FailOnTimeout(base, timeout);
			}else{
				//else, use the default one
				logger.debug(method + " Set timeout to the default (" + DEFAULT_TIMEOUT + " ms)");
				return super.apply(base, description);
			}
			
		}
	}; 
	
	protected static final String CR = "\r";
	protected static final String LF = "\n";
	protected static final String CRLF = CR + LF;

	protected AbstractHttpTestCase() {
		super();

	}

	protected void before() throws Exception {
		if (!ServerUtil.isSolutionDeployed()) {
			ServerUtil.loadSolutionAndRunOrRestartServer();
		}

	}

	protected Properties getGlobalProp() {
		return Resources.getGlobalProp();
	}

	protected Properties getURLsProp() {
		return Resources.getURLsProp();
	}

	protected Properties getPropEntitie() {
		return Resources.getEntitiesProp();
	}

	protected HttpHost getDefaultTarget() {
		return Resources.getDefaultTarget();
	}

	protected String getDefaultHostName() {
		return Resources.getDefaultHostName();
	}

	protected int getDefaultPort() {
		return Resources.getDefaultPort();
	}

	protected HttpHost getWebAdminTarget() {
		return Resources.getWebAdminTarget();
	}

	protected String getDefaultUrl() {
		return Resources.getDefaultUrl();
	}

	protected String getDefaultUserAgent() {
		return Resources.getDefaultUserAgent();
	}

	protected String getDefaultConnection() {
		return Resources.getDefaultConnection();
	}

	protected String getDefaultHostHeaderValue() {
		return Resources.getDefaultHostHeaderValue();
	}

	protected String getDefaultHeadersFieldsAsString() {
		return Resources.getDefaultHeadersFieldsAsString();
	}

	protected String[] getSupportedMethods() {
		return Resources.getSupportedMethods();
	}

	protected String[] getSupportedContentCoding() {
		return Resources.getSupportedContentCoding();
	}
	
	protected String getAbsPathFromResourcesDir(String relative){
		return Resources.getAbsPathFromClassLocation(relative);
	}

	protected String getSolutionPath() {
		return Resources.getSolutionPath();
	}

	protected String getDefaultProjectWebFolderPath() {
		return Resources.getDefaultProjectWebFolderPath();
	}

	protected HttpPost getDefaultPostRequest() throws ClientProtocolException,
			IOException {
		return Resources.getDefaultPostRequest();
	}

	protected HttpResponse executeRequest(HttpRequest request)
			throws IOException, ClientProtocolException {
		return Resources.executeRequest(request);
	}

	protected HttpResponse executeDefaultRequest() throws IOException,
			ClientProtocolException {
		return Resources.executeDefaultRequest();
	}

	protected HttpResponse executeURL(String url) throws IOException,
			ClientProtocolException {
		return Resources.executeURL(url);
	}

	protected HttpResponse executeRequestString(String request, HttpHost target)
			throws HttpException, IOException {
		return Resources.executeRequestString(request, target);
	}

	protected HttpResponse executeRequestString(String request)
			throws HttpException, IOException {
		return executeRequestString(request, getDefaultTarget());
	}

	protected void assertEqualsStatusCode(int expectedStatusCode,
			HttpResponse response) {
		int actualStatusCode = response.getStatusLine().getStatusCode();
		assertEquals("Wrong Status code", expectedStatusCode,
				actualStatusCode);
	}

	protected void assertEqualsReasonPhrase(String expectedReasonPhrase,
			HttpResponse response) {
		String actualReasonPhrase = response.getStatusLine().getReasonPhrase();
		assertEquals("Wrong Reason Phrase", expectedReasonPhrase,
				actualReasonPhrase);
	}

	protected void assertEqualsProtocolVersion(
			ProtocolVersion expectedProtocolVersion, HttpResponse response) {
		ProtocolVersion actualProtocolVersion = response.getProtocolVersion();
		assertEquals("Wrong Protocol Version", expectedProtocolVersion,
				actualProtocolVersion);
	}

	protected boolean createRandomContent(String url, int size) {
		return Resources.createRandomContent(url, size);
	}

	protected String getRequestAsString(HttpRequest request) {
		return Resources.getRequestAsString(request);
	}

	protected String getResponseAsString(HttpResponse response) {
		return Resources.getResponseAsString(response);
	}

}