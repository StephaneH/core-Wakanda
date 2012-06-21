package com.wakanda.qa.security.test.inhertperms;

import static org.junit.Assert.assertNotNull;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.client.methods.HttpGet;
import org.junit.Test;

import com.wakanda.qa.security.test.extend.AbstractSecurityTestCase;

public class Read extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return getInheritedPermTarget();
	}

	@Override
	public HttpRequest getDefaultRequest() {
		String url = "/rest/InheritedReadPerm/";
		HttpGet request = new HttpGet(url);
		return request;
	}

	@Override
	public User getAuthenticatedButNotAllowedUser() {
		return new User("user2", "password2");
	}

	@Override
	public User getAllowedUser() {
		return new User("user1", "password1");
	}

	/**
	 * Check the basic scenario: that "Read" action is not performed when the
	 * permission is inherited and the request is devoid of authentication
	 * elements (Session cookie or Autorization header).
	 * 
	 * @throws Exception
	 */
	@Test
	public void testReadActionIsNotPerformedWhenInheritedPermissionAndRequestIsDevoidOfAuth()
			throws Exception {
		HttpResponse response = executeRequest(getDefaultRequest());
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
		Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
	}

	/**
	 * Check that "Read" action is not performed when the permission is
	 * inherited and the user is not authenticated (does not exist).
	 * 
	 * @throws Exception
	 */
	@Test
	public void testReadActionIsNotPerformedWhenInheritedPermissionAndNotAuthenticated()
			throws Exception {
		User user = getNonAuthenticatedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Read" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testReadActionIsNotPerformedWhenAuthenticatedButNotAllowed()
			throws Exception {
		User user = getAuthenticatedButNotAllowedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that read action is not performed when the permission is inherited
	 * and the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testReadActionIsPerformedWhenAuthenticatedAndAllowed()
			throws Exception {
		User user = getAllowedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

}
