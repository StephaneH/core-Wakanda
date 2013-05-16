/**
 * 
 */
package org.wakanda.qa.server.utils;

import static org.junit.Assert.assertEquals;
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
import org.wakanda.qa.server.utils.Requestor.HttpSimpleBufferedResponse;


/**
 * @author ouissam.gouni@4d.com
 *
 */
public abstract class AbstractTestCase {
	protected Logger logger = Logger.getLogger(this.getClass());

	@Rule
	public TestRule unitTestLogger = new TestWatcher() {
		
		@Override
		protected void starting(Description description) {
			String method = description.getMethodName();
			logger.debug( method + " Starting...");
			if(!getUnitTestsToExcludeFromBefore().contains(method)){
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
	
	/**
	 * Specifies unit tests to exclude from before method execution.
	 * @return
	 */
	protected List<String> getUnitTestsToExcludeFromBefore(){
		return new ArrayList<String>();
	}
	
	/**
	 * Sets unit tests timeouts.
	 * @return
	 */
	protected Map<String, Long> getUnitTestsTimeout(){
		return new HashMap<String, Long>();
	}
	
	private static int DEFAULT_TIMEOUT = 60000;
	
	@Rule
	public TestRule timeout = new Timeout(getDefaultTimeout()){
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

	/**
	 * Executed before each unit test.
	 * @throws Exception
	 */
	protected void before() throws Exception {
		ServerUtil serverUtil = new ServerUtil(getRequestor());
		if (!serverUtil.isSolutionDeployed()) {
			serverUtil.loadSolution();
		}

	}
	
	
	/**
	 * Sets the default settings that would be used to request the sever.
	 * @return
	 */
	protected abstract IBasicSettings getDefaultSettings();
	
	/**
	 * Returns the requestor based on the defined settings.
	 * @return
	 */
	protected Requestor getRequestor(){
		return new Requestor(getDefaultSettings());
	}
	/**
	 * Sets the default timeout, by default 30 secondes.
	 * @return
	 */
	protected int getDefaultTimeout(){
		return DEFAULT_TIMEOUT;
	}
	

	/**
	 * Executes a request to the given target.
	 * 
	 * @param target
	 * @param request
	 * @param discardEntity
	 *            when true, discards the response entity and so releases the
	 *            system resources.
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpHost target, HttpRequest request,
			boolean discardEntity) throws Exception {
		HttpResponse response = getRequestor().execute(target, request);
		if (discardEntity)
			EntityUtils.consume(response.getEntity());
		return response;
	}
	
	/**
	 * Executes a raw request to the given target.
	 * 
	 * @param target
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpSimpleBufferedResponse executeRawRequest(HttpHost target, String request) throws Exception {
		return Requestor.executeRaw(target, request);
	}

	
	protected void assertEqualsStatusCode(String message, int expectedSC,
			HttpResponse response) {
		int actualStatusCode = response.getStatusLine().getStatusCode();
		assertEquals(message, expectedSC, actualStatusCode);
	}

	protected void assertEqualsStatusCode(int expectedSC, HttpResponse response) {
		assertEqualsStatusCode("Wrong Status code", expectedSC, response);
	}
	
	protected void assertEqualsStatusCode(String message, int expectedSC,
			HttpSimpleBufferedResponse response) {
		int actualStatusCode = response.getStatusCode();
		assertEquals(message, expectedSC, actualStatusCode);
	}

	protected void assertEqualsStatusCode(int expectedSC, HttpSimpleBufferedResponse response) {
		assertEqualsStatusCode("Wrong Status code", expectedSC, response);
	}

}
