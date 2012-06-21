package com.wakanda.qa.security.test.inhertperms;

import static org.junit.Assert.assertNotNull;

import java.util.Date;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import com.google.gson.Gson;
import com.wakanda.qa.security.test.extend.AbstractSecurityTestCase;

public class Create extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return getInheritedPermTarget();
	}
	
	@Test
	public void test() throws Exception{
		getDefaultRequest();
	}

	@Override
	public HttpRequest getDefaultRequest() throws Exception {
		String url = "/rest/InheritedCreatePerm/?$method=update";
		HttpPost request = new HttpPost(url);
		String value = (new Date()).toString();
		JSONEntity entity = new JSONEntity(value);
		JSONEntity[] entities = {entity};
		StringEntity reqEntity = new StringEntity(new Gson().toJson(new JSONResquest(entities)));
		request.setEntity(reqEntity);
		logger.debug(EntityUtils.toString(reqEntity));
		return request;
	}

	@Override
	public User getAuthenticatedButNotAllowedUser() {
		return new User("user1", "password1");
	}

	@Override
	public User getAllowedUser() {
		return new User("user2", "password2");
	}

	/**
	 * Check the basic scenario: that "Create" action is not performed when the
	 * permission is inherited and the request is devoid of authentication
	 * elements (Session cookie or Autorization header).
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenInheritedPermissionAndRequestIsDevoidOfAuth()
			throws Exception {
		HttpResponse response = executeRequest(getDefaultRequest());
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
		Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
	}

	/**
	 * Check that "Create" action is not performed when the permission is
	 * inherited and the user is not authenticated (does not exist).
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenInheritedPermissionAndNotAuthenticated()
			throws Exception {
		User user = getNonAuthenticatedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Create" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenInheritedPermissionAndAuthenticatedButNotAllowed()
			throws Exception {
		User user = getAuthenticatedButNotAllowedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Create" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsPerformedWhenInheritedPermissionAndAuthenticatedAndAllowed()
			throws Exception {
		User user = getAllowedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

}
