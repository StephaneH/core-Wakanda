package org.wakanda.qa.dataperm.inherit;

import static org.junit.Assert.assertNotNull;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.wakanda.qa.dataperm.Targets;
import org.wakanda.qa.dataperm.extend.AbstractSecurityTestCase;


/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Remove extends AbstractSecurityTestCase {

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.REMOVE_INHERITED;
	}

	@Override
	protected RestAction getRestAction() {
		return RestAction.REMOVE;
	}

	@Override
	protected String getDataClassName() {
		return "RemoveInherited";
	}

	@Override
	protected User getAllowedUser() {
		return new User("removeInherited");
	}

	/**
	 * Check that "Remove" action is not performed when the permission is
	 * inherited and the request is devoid of authentication elements (Session
	 * cookie or Autorization header).
	 * 
	 * @throws Exception
	 */
	@Test
	public void testRemoveActionIsNotPerformedWhenPermissionInheritedAndRequestIsDevoidOfAuthInfos()
			throws Exception {
		// Execute request
		HttpResponse response = executeRequest();
		// Ensure proper release of system resources
		EntityUtils.consume(response.getEntity());
		// Should get 401 Unauthorized
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
		Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
		// Should get the authentication challenge too
		assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
	}

	/**
	 * Check that "Remove" action is not performed when the permission is
	 * inherited and the user is not authenticated ie. does not exist.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testRemoveActionIsNotPerformedWhenPermissionInheritedAndUserNotAuthenticated()
			throws Exception {
		// Get the user that does not belong to solution directory
		User user = getNonAuthenticatedUser();
		// Execute request
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		// Ensure proper release of system resources
		EntityUtils.consume(response.getEntity());
		// Should get 401 Unauthorized
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Remove" action is not performed when the permission is
	 * inherited and the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testRemoveActionIsNotPerformedWhenPermissionInheritedAndUserAuthenticatedButNotAllowed()
			throws Exception {
		// Get an authenticated but not allowed user
		User user = getAuthenticatedButNotAllowedUser();
		// Execute request
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		// Ensure proper release of system resources
		EntityUtils.consume(response.getEntity());
		// Should get 401 Unauthorized
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Remove" action is performed when the permission is inherited
	 * and the user is authenticated and allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testRemoveActionIsPerformedWhenPermissionInheritedAndUserAuthenticatedAndAllowed()
			throws Exception {
		// Get the user allowed
		User user = getAllowedUser();
		// Execute request
		HttpResponse response = executeAuthenticatedRequest(
				getDefaultRequest(), user);
		// Ensure proper release of system resources
		EntityUtils.consume(response.getEntity());
		// Should get 200 OK
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
	}

}
