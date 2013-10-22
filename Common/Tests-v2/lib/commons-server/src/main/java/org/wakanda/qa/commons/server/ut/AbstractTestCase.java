/**
 * 
 */
package org.wakanda.qa.commons.server.ut;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.auth.Credentials;
import org.apache.http.client.methods.AbortableHttpRequest;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.junit.Rule;
import org.junit.internal.runners.statements.FailOnTimeout;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.rules.Timeout;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;
import org.wakanda.qa.commons.server.ServerAdmin;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.commons.server.http.Requestor;
import org.wakanda.qa.commons.server.rest.HttpGetRest;
import org.wakanda.qa.commons.server.settings.AbstractSettings;
import org.wakanda.qa.commons.server.settings.IConfiguration;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractTestCase{
	
	protected Logger logger = Logger.getLogger(this.getClass());
	private static Logger sLogger = Logger.getLogger(AbstractTestCase.class);
	
	protected abstract IConfiguration getConfiguration();

	@Rule
	public TestRule uTProcess = new TestWatcher() {

		@Override
		protected void starting(Description description) {
			String method = description.getMethodName();
			//logger.debug(method + " Starting...");
			if (!getUnitTestsToExcludeFromBefore().contains(method)) {
				//logger.debug(method + " Init...");
				try {
					// init unit test
					before();
					//logger.debug(method + " Init done");
				} catch (Exception e) {
					e.printStackTrace();
					fail(method + " Init failure: " + e.getMessage());
				}
			} else {
				//logger.debug(method + " Init skipped");
			}
		}

		@Override
		protected void failed(Throwable e, Description description) {
			sLogger.debug(description.getMethodName() + " has failed :(");
		}

		@Override
		protected void succeeded(Description description) {
			sLogger.debug(description.getMethodName() + " has passed :)");
		}
	};

	/**
	 * Specifies unit tests to exclude from before method execution.
	 * 
	 * @return
	 */
	protected List<String> getUnitTestsToExcludeFromBefore() {
		return new ArrayList<String>();
	}
	
	/**
	 * Executed before each unit test.
	 * 
	 * @throws Exception
	 */
	protected void before() throws Exception {
		if (!getServerAdmin().isSolutionDeployed()) {
			getServerAdmin().loadSolution();
		}

	}


	@Rule
	public TestRule uTimeout = new Timeout(getDefaultTimeout()) {
		@Override
		public Statement apply(Statement base, Description description) {
			String method = description.getMethodName();
			Long timeout = getUnitTestsTimeout().get(method);
			if (timeout != null) {
				// if defined, use the timeout requested for the current unit
				// test
				//logger.debug(method + " Set timeout to " + timeout + " ms");
				return new FailOnTimeout(base, timeout);
			} else {
				// else, use the default one
				// logger.debug(method + " Set timeout to the default ("
				// + getDefaultTimeout() + " ms)");
				return super.apply(base, description);
			}

		}
	};

	private final static int DEFAULT_TIMEOUT = 30000;

	/**
	 * Sets the default timeout, by default 30 secondes.
	 * 
	 * @return
	 */
	protected int getDefaultTimeout() {
		return DEFAULT_TIMEOUT;
	}
	
	
	/**
	 * Sets unit tests timeouts.
	 * 
	 * @return
	 */
	protected Map<String, Long> getUnitTestsTimeout() {
		return new HashMap<String, Long>();
	}

	/**
	 * Executes an http request to the given target.
	 * 
	 * @param request
	 * @param target
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request, HttpHost target)
			throws Exception {
		HttpResponse response = getRequestor().execute(target, request);
		return response;
	}

	/**
	 * Sends the request to the default target.
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request) throws Exception {
		HttpResponse response = executeRequest(request, getSettings()
				.getDefaultTarget());
		return response;
	}

	/**
	 * Executes a request to the given target.
	 * 
	 * @param request
	 * @param target
	 * @param discardEntity
	 *            when true, discards the response entity and so releases the
	 *            system resources.
	 * 
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request, HttpHost target,
			boolean discardEntity) throws Exception {
		HttpResponse response = getRequestor().execute(target, request);
		if (discardEntity)
			EntityUtils.consume(response.getEntity());
		return response;
	}

	/**
	 * Executes a request to the default target.
	 * 
	 * @param request
	 * @param discardEntity
	 *            when true, discards the response entity and so releases the
	 *            system resources.
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request,
			boolean discardEntity) throws Exception {
		return executeRequest(request, getSettings().getDefaultTarget(),
				discardEntity);
	}

	/**
	 * Executes a raw request to the given target.
	 * 
	 * @param target
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpSimpleBufferedResponse executeRawRequest(HttpHost target,
			String request) throws Exception {
		return getRequestor().executeRaw(target, request);
	}

	/**
	 * Asserts that reponse status-code equals the expected one.
	 * 
	 * @param message
	 * @param expectedSC
	 * @param response
	 */
	protected void assertEqualsStatusCode(String message, int expectedSC,
			HttpResponse response) {
		int actualStatusCode = response.getStatusLine().getStatusCode();
		assertEquals(message, expectedSC, actualStatusCode);
	}

	/**
	 * Asserts that reponse status-code equals the expected one.
	 * 
	 * @param expectedSC
	 * @param response
	 */
	protected void assertEqualsStatusCode(int expectedSC, HttpResponse response) {
		assertEqualsStatusCode("Wrong Status code", expectedSC, response);
	}

	/**
	 * Asserts that reponse status-code equals the expected one.
	 * 
	 * @param message
	 * @param expectedSC
	 * @param response
	 */
	protected void assertEqualsStatusCode(String message, int expectedSC,
			HttpSimpleBufferedResponse response) {
		int actualStatusCode = response.getStatusCode();
		assertEquals(message, expectedSC, actualStatusCode);
	}

	/**
	 * Asserts that reponse status-code equals the expected one.
	 * 
	 * @param expectedSC
	 * @param response
	 */
	protected void assertEqualsStatusCode(int expectedSC,
			HttpSimpleBufferedResponse response) {
		assertEqualsStatusCode("Wrong Status code", expectedSC, response);
	}

	/**
	 * Checks the response status-code of the given URL.
	 * 
	 * @param expectedSC
	 * @param url
	 * 
	 * @throws Exception
	 */
	protected void assertEqualsStatusCode(int expectedSC, String url)
			throws Exception {
		HttpRequest request = new HttpGetRest(url);
		logger.debug(request.getRequestLine());
		assertEqualsStatusCode(expectedSC, request);
	}

	/**
	 * Checks the response status-code of the given request.
	 * 
	 * @param expectedSC
	 * @param request
	 * 
	 * @throws Exception
	 */
	protected void assertEqualsStatusCode(int expectedSC, HttpRequest request)
			throws Exception {
		HttpResponse response = executeRequest(request, true);
		try {
			assertEqualsStatusCode(expectedSC, response);
		} finally {
			((AbortableHttpRequest) request).abort();
		}
	}


	/**
	 * Executes the given request using the given credentials, checks the
	 * response status code and executes a response handler.
	 * 
	 * @param request
	 * @param target
	 * @param credentials
	 * @param expectedSC
	 * @param responseHandler
	 * @throws Throwable
	 */
	protected void check(HttpRequest request, HttpHost target,
			Credentials credentials, int expectedSC,
			final ResponseHandler responseHandler) throws Throwable {
		UTResponseHandler utHandler = new UTResponseHandler(request, target,
				credentials, expectedSC) {
			@Override
			public void handleResponse(HttpResponse response) throws Throwable {
				responseHandler.handleResponse(response);

			}
		};
		utHandler.evaluate();
	}

	/**
	 * Executes the given request using the default target and the given credentials, checks the
	 * response status code then executes a response handler.
	 * 
	 * @param request
	 * @param credentials
	 * @param expectedSC
	 * @param responseHandler
	 * @throws Throwable
	 */
	protected void check(HttpRequest request,
			Credentials credentials, int expectedSC,
			final ResponseHandler responseHandler) throws Throwable{
		check(request, getSettings().getDefaultTarget(), credentials, expectedSC, responseHandler);
	}

	/**
	 * Executes the given request using the given credentials then executes the
	 * given response handler.
	 * 
	 * @param request
	 * @param target
	 * @param credentials
	 * @param responseHandler
	 * @throws Throwable
	 */
	protected void check(HttpRequest request, HttpHost target,
			Credentials credentials, final ResponseHandler responseHandler)
			throws Throwable {
		UTResponseHandler utHandler = new UTResponseHandler(request, target,
				credentials) {
			@Override
			public void handleResponse(HttpResponse response) throws Throwable
					 {
				responseHandler.handleResponse(response);
			}
		};
		utHandler.evaluate();
	}

	/**
	 * Executes the given request using the given credentials and checks the
	 * response status code.
	 * 
	 * @param request
	 * @param target
	 * @param credentials
	 * @param expectedSC
	 * @throws Throwable
	 */
	protected void check(HttpRequest request, HttpHost target,
			Credentials credentials, int expectedSC) throws Throwable {
		check(request, target, credentials, expectedSC, new ResponseHandler() {
			public void handleResponse(HttpResponse response)
					throws Throwable {
				// default: do nothing
			}

		});
	}

	protected abstract class UTResponseHandler implements ResponseHandler {
		private HttpRequest request;
		private HttpHost target;
		private Integer expectedSC;
		private Credentials credentials;

		public UTResponseHandler(HttpRequest request, HttpHost target,
				Integer expectedSC, Credentials credentials) {
			this(request, target, credentials, expectedSC);
		}

		public UTResponseHandler(HttpRequest request, HttpHost target,
				Credentials credentials, Integer expectedSC) {
			this.setRequest(request);
			this.setTarget(target);
			this.setCredentials(credentials);
			this.setExpectedSC(expectedSC);
		}

		public UTResponseHandler(HttpRequest request, HttpHost target,
				Credentials credentials) {
			this.setRequest(request);
			this.setTarget(target);
			this.setCredentials(credentials);
		}

		public HttpRequest getRequest() {
			return request;
		}

		public void setRequest(HttpRequest request) {
			this.request = request;
		}

		public HttpHost getTarget() {
			return target;
		}

		public void setTarget(HttpHost target) {
			this.target = target;
		}

		public Integer getExpectedSC() {
			return expectedSC;
		}

		public void setExpectedSC(Integer expectedSC) {
			this.expectedSC = expectedSC;
		}

		public Credentials getCredentials() {
			return credentials;
		}

		public void setCredentials(Credentials credentials) {
			this.credentials = credentials;
		}

		public void evaluate() throws Throwable {
			HttpResponse response = getCredentials() == null ? executeRequest(
					getRequest(), getTarget()) : getRequestor()
					.executeAuthenticated(getTarget(), getRequest(),
							getCredentials());
			try {
				if (getExpectedSC() != null)
					assertEqualsStatusCode(getExpectedSC(), response);
				handleResponse(response);
			} finally {
				HttpClientUtils.closeQuietly(response);
			}
		}

	}

	protected AbstractSettings getSettings() {
		return getConfiguration().getSettings();
	}

	protected Requestor getRequestor() {
		return getConfiguration().getRequestor();
	}

	protected ServerAdmin getServerAdmin() {
		return getConfiguration().getSeverAdmin();
	}

}
