package com.wakanda.qa.dataperm.test.extend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.junit.Rule;
import org.junit.internal.runners.statements.FailOnTimeout;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.rules.Timeout;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

import com.wakanda.qa.dataperm.RequestUtil;
import com.wakanda.qa.dataperm.ServerUtil;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractSecurityTestCase extends AbstractSecurity {

	protected AbstractSecurityTestCase() {
		super();

	}

	protected void before() throws Exception {
		if (!ServerUtil.isSolutionDeployed()) {
			ServerUtil.loadSolutionAndRunOrRestartServer();
		}
	}

	protected List<String> getUnitTestsToExcludeFromBefore() {
		return new ArrayList<String>();
	}

	@Rule
	public TestRule testWatcher = new TestWatcher() {

		@Override
		protected void starting(Description description) {
			String method = description.getMethodName();
			logger.debug(method + " Starting...");
			if (!getUnitTestsToExcludeFromBefore().contains(method)) {
				logger.debug(method + " Init...");
				try {
					before();
					logger.debug(method + " Init done");
				} catch (Exception e) {
					// e.printStackTrace();
					fail(method + " Init failure: " + e.getMessage());
				}
			} else {
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

	protected Map<String, Long> getUnitTestsTimeout() {
		return new HashMap<String, Long>();
	}

	private static int DEFAULT_TIMEOUT = 30000;

	@Rule
	public TestRule timeout = new Timeout(DEFAULT_TIMEOUT) {
		@Override
		public Statement apply(Statement base, Description description) {
			String method = description.getMethodName();
			Long timeout = getUnitTestsTimeout().get(method);
			if (timeout != null) {
				// if defined, use the timeout requested for the current unit
				// test
				logger.debug(method + " Set timeout to " + timeout + " ms");
				return new FailOnTimeout(base, timeout);
			} else {
				// else, use the default one
				logger.debug(method + " Set timeout to the default ("
						+ DEFAULT_TIMEOUT + " ms)");
				return super.apply(base, description);
			}

		}
	};

	protected HttpResponse executeRequest(HttpRequest request, HttpHost target)
			throws Exception {
		HttpResponse response = RequestUtil.executeRequest(request, target);
		return response;
	}

	protected HttpResponse executeRequest(HttpRequest request) throws Exception {
		HttpResponse response = executeRequest(request, getDefaultTarget());
		return response;
	}
	
	protected HttpResponse executeRequest() throws Exception {
		HttpResponse response = executeRequest(getDefaultRequest());
		return response;
	}

	protected void assertEqualsStatusCode(String message, int expectedSC,
			HttpResponse response) {
		int actualStatusCode = response.getStatusLine().getStatusCode();
		assertEquals(message, expectedSC, actualStatusCode);
	}

	protected void assertEqualsStatusCode(int expectedSC, HttpResponse response) {
		assertEqualsStatusCode("Wrong Status code", expectedSC, response);
	}

}