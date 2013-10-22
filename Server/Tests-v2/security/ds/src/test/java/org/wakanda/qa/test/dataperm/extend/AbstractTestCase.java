package org.wakanda.qa.test.dataperm.extend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.auth.Credentials;
import org.apache.http.util.EntityUtils;
import org.wakanda.qa.commons.server.rest.DSUtil;
import org.wakanda.qa.commons.server.rest.domain.RESTError;
import org.wakanda.qa.commons.server.rest.domain.ResponseError;
import org.wakanda.qa.commons.server.settings.IConfiguration;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.dataperm.domain.Sample;
import org.wakanda.qa.test.dataperm.settings.Configuration;

import com.google.gson.Gson;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractTestCase extends
		org.wakanda.qa.commons.server.ut.AbstractTestCase {

	@Override
	protected int getDefaultTimeout() {
		return 60000;
	}
	/**
	 * @return
	 */
	protected abstract HttpHost getDefaultTarget();

	/**
	 * @return
	 * @throws Exception
	 */
	protected abstract HttpRequest getDefaultRequest() throws Exception;

	protected HttpResponse executeRequest(HttpRequest request) throws Exception {
		HttpResponse response = executeRequest(request, getDefaultTarget());
		return response;
	}

	/**
	 * Executes the default request.
	 * 
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest() throws Exception {
		HttpResponse response = executeRequest(getDefaultRequest());
		return response;
	}

	protected void check(HttpRequest request, Credentials credentials,
			int expectedSC, ResponseHandler responseHandler) throws Throwable {
		check(request, getDefaultTarget(), credentials, expectedSC,
				responseHandler);
	}

	protected void check(HttpRequest request, Credentials credentials,
			int expectedSC) throws Throwable {
		check(request, getDefaultTarget(), credentials, expectedSC);
	}

	protected void check(Credentials credentials, int expectedSC,
			ResponseHandler responseHandler) throws Throwable {
		check(getDefaultRequest(), getDefaultTarget(), credentials, expectedSC,
				responseHandler);
	}

	protected void check(Credentials credentials, int expectedSC)
			throws Throwable {
		check(getDefaultRequest(), credentials, expectedSC);
	}

	protected void check(Credentials credentials,
			ResponseHandler responseHandler) throws Throwable {
		check(getDefaultRequest(), getDefaultTarget(), credentials,
				responseHandler);
	}

	/**
	 * Asserts that the first response error code equals the given error code.
	 * 
	 * @param response
	 * @param errorCode
	 */
	protected void assertFirstErrorEquals(HttpResponse response, int errorCode) {
		String content = null;
		try {
			content = EntityUtils.toString(response.getEntity());
		} catch (Exception e) {
			throw new AssertionError(e);
		}
		logger.debug(content);
		ResponseError respError = (new Gson().fromJson(content,
				ResponseError.class));
		assertNotNull("Response should contain errors", respError);
		RESTError[] errors = respError.getErrors();
		assertTrue("Cannot find errors stack", errors.length > 0);
		assertEquals(errors[0].getErrCode(), errorCode);
	}

	/**
	 * Asserts that the first response error code related to the first entity equals the given error code.
	 * 
	 * @param response
	 * @param errorCode
	 */
	protected void assertFirstErrorEquals2(HttpResponse response, int errorCode) {
		try {
			Sample e = DSUtil.fromJson(response, Sample.class);
			assertNotNull("Server should return an entity with errors", e);
			RESTError[] er = e.getErrors();
			assertNotNull("Error array must not be null", er);
			assertTrue("Errors array must not be empty", er.length > 0);
			assertEquals(er[0].getErrCode(), errorCode);
		} catch (Exception e) {
			throw new AssertionError(e);
		}
	}

	/**
	 * Asserts that response status-code is either 401 or 500
	 * 
	 * @param response
	 */
	protected void assertIsUnauthorized(HttpResponse response) {
		// Should get either 401 or 500
		int actual = response.getStatusLine().getStatusCode();
		String fail = "Wrong status-code. Expected: "
				+ HttpStatus.SC_UNAUTHORIZED + "/"
				+ HttpStatus.SC_INTERNAL_SERVER_ERROR + ". Actual: " + actual;
		assertTrue(fail, (actual == HttpStatus.SC_UNAUTHORIZED)
				|| (actual == HttpStatus.SC_INTERNAL_SERVER_ERROR));
		if (actual == HttpStatus.SC_UNAUTHORIZED) {
			Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
			// Should get the authentication challenge too
			assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
		}
	}

	protected void assertIsUnauthorized(HttpResponse response, int errorCode) {
		assertIsUnauthorized(response);
		assertFirstErrorEquals(response, errorCode);
	}
	
	@Override
	protected IConfiguration getConfiguration() {
		return Configuration.getInstance();
	}

}