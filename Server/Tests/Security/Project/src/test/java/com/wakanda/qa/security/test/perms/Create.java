package com.wakanda.qa.security.test.perms;

import static org.junit.Assert.assertNotNull;

import java.net.URI;
import java.util.Date;

import org.apache.http.Header;
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
	public HttpRequest getDefaultRequest() throws Exception {
		String url = "/rest/CreatePerm/?$method=update";
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
	 * Check that "Create" action is performed when no permission was defined.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsPerformedWhenNoPermission() throws Exception {
		HttpPost request = (HttpPost) getDefaultRequest();
		request.setURI(new URI(request.getURI().toString().replace("CreatePerm", "NoPerm")));
		HttpResponse response = executeRequest(request, getNoPermTarget());
		String resEntity = EntityUtils.toString(response.getEntity());
		logger.debug(resEntity);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

	/**
	 * Check the basic scenario: that "Create" action is not performed when the request is devoid of
	 * authentication elements (Session cookie or Autorization header).
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenRequestIsDevoidOfAuth()
			throws Exception {
		HttpResponse response = executeRequest(getDefaultRequest());
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
		Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
	}

	/**
	 * Check that "Create" action is not performed when the user is not authenticated (does not exist).
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenNotAuthenticated()
			throws Exception {
		User user = getNonAuthenticatedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Create" action is not performed when the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsNotPerformedWhenAuthenticatedButNotAllowed()
			throws Exception {
		User user = getAuthenticatedButNotAllowedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user );
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Create" action is not performed when the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateActionIsPerformedWhenAuthenticatedAndAllowed()
			throws Exception {
		User user = getAllowedUser();
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

}
