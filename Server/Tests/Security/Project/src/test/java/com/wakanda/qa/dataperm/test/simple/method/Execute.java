package com.wakanda.qa.dataperm.test.simple.method;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.net.URI;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import com.google.gson.Gson;
import com.wakanda.qa.dataperm.ErrorCode;
import com.wakanda.qa.dataperm.Targets;
import com.wakanda.qa.dataperm.test.extend.AbstractSecurityTestCase;
import com.wakanda.qa.utils.JsonUtil.JsonError;
import com.wakanda.qa.utils.JsonUtil.JsonErrors;
import com.wakanda.qa.utils.JsonUtil.JsonResult;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Execute extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.PERM;
	}

	@Override
	protected RestAction getRestAction() {
		return RestAction.EXECUTE;
	}

	@Override
	protected String getDataClassName() {
		return "Execute";
	}

	@Override
	protected String getDataClassMethodName() {
		return "secured";
	}

	@Override
	protected User getAllowedUser() {
		return new User("execute");
	}

	/**
	 * Check that "Execute" action is performed when no privileges are required.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsPerformedWhenNoPermission() throws Exception {
		// Build request
		HttpRequestBase request = (HttpRequestBase) getDefaultRequest();
		URI noPermURI = new URI(request
				.getURI()
				.toString()
				.replace(getDataClassName(), getNoPermDataClassName())
				.replace(getDataClassMethodName(),
						getNoPermDataClassMethodName()));
		request.setURI(noPermURI);
		// Choose No Perm project
		HttpHost target = Targets.NO_PERM;
		// Execute request
		HttpResponse response = getRequestor().execute(target, request);
		// Consume response & release system resources
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);
		// Should get 200 OK
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		// Check content
		String result = (new Gson().fromJson(content, JsonResult.class))
				.getResult();
		assertEquals("true", result);
	}

	/**
	 * Check that "Execute" action is not performed when the request is devoid
	 * of authentication elements ie. session cookie or autorization header.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenRequestIsDevoidOfAuth()
			throws Exception {
		// Execute request
		HttpResponse response = executeRequest();
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);
		// Should get 401 or 500
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
		// check content
		JsonError[] errors = (new Gson().fromJson(content, JsonErrors.class))
				.getErrors();
		assertTrue("Cannot find errors stack", errors.length > 0);
		assertEquals(errors[0].getErrCode(), ErrorCode.NO_PERM_EXEC);
		
	}

	/**
	 * Check that "Execute" action is not performed when the user is not
	 * authenticated ie. does not even exist.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenNotAuthenticated()
			throws Exception {
		// Get the user that does not belong to solution directory
		User user = getNonAuthenticatedUser();
		// Execute request
		HttpResponse response = executeAuthenticatedRequest(user);
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		logger.debug(EntityUtils.toString(entity));
		EntityUtils.consume(entity);
		// Should get 401 Unauthorized
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Execute" action is not performed when the user is
	 * authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenAuthenticatedButNotAllowed()
			throws Exception {
		// Get an authenticated but not allowed user
		User user = getAuthenticatedButNotAllowedUser();
		// Execute request
		HttpResponse response = executeAuthenticatedRequest(user);
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);
		// Should get 401 Unauthorized
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
		// check content
		JsonError[] errors = (new Gson().fromJson(content, JsonErrors.class))
				.getErrors();
		assertTrue("Cannot find errors stack", errors.length > 0);
		assertEquals(errors[0].getErrCode(), ErrorCode.NO_PERM_EXEC);
	}

	/**
	 * Check that "Execute" action is performed when the user is authenticated
	 * and allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsPerformedWhenAuthenticatedAndAllowed()
			throws Exception {
		// Get the user allowed
		User user = getAllowedUser();
		// Execute request
		HttpResponse response = executeAuthenticatedRequest(user);
		// Consume content & release resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);
		// Should get 200 OK
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		// Check content
		String result = (new Gson().fromJson(content, JsonResult.class))
				.getResult();
		assertEquals("true", result);
	}

}
