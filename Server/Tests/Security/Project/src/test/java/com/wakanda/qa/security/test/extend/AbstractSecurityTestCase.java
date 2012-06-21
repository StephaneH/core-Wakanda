package com.wakanda.qa.security.test.extend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.junit.Rule;
import org.junit.internal.runners.statements.FailOnTimeout;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.rules.Timeout;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

import com.google.gson.Gson;
import com.wakanda.qa.security.RequestUtil;
import com.wakanda.qa.security.Resources;
import com.wakanda.qa.security.ServerUtil;


/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author Ouissam
 * 
 */

public abstract class AbstractSecurityTestCase extends AbstractSecurity {

	protected Logger logger = Logger.getLogger(this.getClass());
	
	protected AbstractSecurityTestCase() {
		super();

	}
	
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

	public void before() throws Exception {
		if (!ServerUtil.isSolutionDeployed()) {
			ServerUtil.loadSolutionAndRunOrRestartServer();
		}
	}

	protected String getDefaultHostName() {
		return Resources.getDefaultHostName();
	}
	

	protected HttpResponse executeRequest(HttpRequest request,
			HttpHost target) throws Exception {
		return RequestUtil.executeRequest(request, target);
	}

	protected HttpResponse executeRequest(HttpRequest request)
			throws Exception {
		return executeRequest(request, getDefaultTarget());
	}
	
	protected JSONResponse getJSONResponse(HttpResponse response) throws Exception{
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);
		return new Gson().fromJson(content, JSONResponse.class);
	}
	
	protected void assertEqualsStatusCode(int expectedSC,
			HttpResponse response) {
		int actualStatusCode = response.getStatusLine().getStatusCode();
		assertEquals("Wrong Status code", expectedSC,
				actualStatusCode);
	}
	
	protected void assertNotEqualsStatusCode(int notExpectedSC,
			HttpResponse response) {
		int actualStatusCode = response.getStatusLine().getStatusCode();
		assertFalse("Not expected Status code: " + notExpectedSC, notExpectedSC==actualStatusCode);
	}
	

}