package com.wakanda.qa.dataperm.test.inherit.method;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import com.google.gson.Gson;
import com.wakanda.qa.dataperm.test.extend.AbstractSecurityTestCase;
import com.wakanda.qa.security.RequestUtil;
import com.wakanda.qa.security.Targets;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Execute extends AbstractSecurityTestCase {

	/**
	 * Check that "Execute" action is not performed when permission is inherited
	 * from the Model and the request is devoid of authentication elements ie.
	 * session cookie or autorization header.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromModelAndRequestIsDevoidOfAuthInfos()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_MODEL;

			// request
			String dataClass = "ExecuteInheritedModel";
			String method = "secured";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = RequestUtil.executeRequest(request, target);
			
			// Ensure proper release of system resources
			EntityUtils.consume(response.getEntity());
			
			// Should get 401 Unauthorized
			assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
			Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
			// Should get the authentication challenge too
			assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from Model and the user is not authenticated ie. does not
	 * exist.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromModelAndUserNotAuthenticated()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_MODEL;

			// request
			String dataClass = "ExecuteInheritedModel";
			String method = "secured";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// user
			User user = getNonAuthenticatedUser();

			// response
			HttpResponse response = executeAuthenticatedRequest(request,
					target, user);
			
			// Ensure proper release of system resources
			EntityUtils.consume(response.getEntity());
			
			// Should get 401 Unauthorized
			assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from Model and the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromModelAndUserAuthenticatedButNotAllowed()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_MODEL;

			// request
			String dataClass = "ExecuteInheritedModel";
			String method = "secured";
			String url = "/rest/" + dataClass + "/" + method;
			HttpGet request = new HttpGet(url);

			// user
			User user = getAuthenticatedButNotAllowedUser();

			// response
			HttpResponse response = executeAuthenticatedRequest(request,
					target, user);
			
			// Ensure proper release of system resources
			EntityUtils.consume(response.getEntity());
			
			// Should get 401 Unauthorized
			assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that Execute action is performed when the permission is inherited
	 * from Model and the user is authenticated and allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsPerformedWhenPermissionInheritedFromModelAndUserAuthenticatedAndAllowed()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_MODEL;

			// request
			String dataClass = "ExecuteInheritedModel";
			String method = "secured";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// user
			User user = new User("executeInheritedModel");

			// response
			HttpResponse response = executeAuthenticatedRequest(request,
					target, user);
			
			// consume content & release system resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, JSONResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from DataClass and the request is devoid of authentication
	 * elements ie. session cookie or autorization header.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromDataClassAndRequestIsDevoidOfAuthInfos()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;

			// request
			String dataClass = "ExecuteInheritedDataClass";
			String method = "secured";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = RequestUtil.executeRequest(request, target);
			// Ensure proper release of system resources
			EntityUtils.consume(response.getEntity());
			
			// Should get 401 Unauthorized
			assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
			
			// Should get the authentication challenge too
			Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
			assertNotNull(AUTH.WWW_AUTH + " header is missing", challenge);
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from DataClass and the user is not authenticated ie. does not
	 * exist.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromDataClassAndUserNotAuthenticated()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;

			// request
			String dataClass = "ExecuteInheritedDatClass";
			String method = "secured";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// user
			User user = getNonAuthenticatedUser();

			// response
			HttpResponse response = executeAuthenticatedRequest(request,
					target, user);
			// Ensure proper release of system resources
			EntityUtils.consume(response.getEntity());
			
			// Should get 401 Unauthorized
			assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that "Execute" action is not performed when the permission is
	 * inherited from DataClass and the user is authenticated but not allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsNotPerformedWhenPermissionInheritedFromDataClassAndUserAuthenticatedButNotAllowed()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;

			// request
			String dataClass = "ExecuteInheritedDataClass";
			String method = "secured";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// user
			User user = getAuthenticatedButNotAllowedUser();

			// response
			HttpResponse response = executeAuthenticatedRequest(request,
					target, user);
			
			// Ensure proper release of system resources
			EntityUtils.consume(response.getEntity());
			
			// Should get 401 Unauthorized
			assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, response);
	}

	/**
	 * Check that Execute action is performed when the permission is inherited
	 * from DataClass and the user is authenticated and allowed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteActionIsPerformedWhenPermissionInheritedFromDataClassAndUserAuthenticatedAndAllowed()
			throws Exception {
			// host
			HttpHost target = Targets.EXECUTE_INHERITED_DATACLASS;

			// request
			String dataClass = "ExecuteInheritedDataClass";
			String method = "secured";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// user
			User user = new User("executeInheritedDataClass");

			// response
			HttpResponse response = executeAuthenticatedRequest(request,
					target, user);
			
			// consume content & release system resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);
			
			// should get 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, JSONResult.class))
					.getResult();
			assertEquals("true", result);
	}
}
