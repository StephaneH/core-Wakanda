package org.wakanda.qa.dataperm.inherit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AUTH;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.wakanda.qa.dataperm.ErrorCode;
import org.wakanda.qa.dataperm.Targets;
import org.wakanda.qa.dataperm.extend.AbstractSecurityTestCase;
import org.wakanda.qa.server.utils.JsonUtil.JsonErrors.JsonError;
import org.wakanda.qa.server.utils.JsonUtil.JsonErrors;

import com.google.gson.Gson;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class OverridePerm extends AbstractSecurityTestCase {

	/**
	 * Check that when "Read" permission is overridden, individual permission is
	 * applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideReadPermissionThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.READ_OVERRIDE;
		// DataClass
		String dataClass = "ReadOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.READ,
				dataClass);
		// User
		User user = new User("readInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}

	/**
	 * Check that when "Read" permission is overridden, individual permission is
	 * applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideReadPermissionThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.READ_OVERRIDE;
		// DataClass
		String dataClass = "ReadOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.READ,
				dataClass);
		// User
		User user = new User("read");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

	/**
	 * Check that when "Create" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideCreatePermissionThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.CREATE_OVERRIDE;
		// DataClass
		String dataClass = "CreateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.CREATE,
				dataClass);
		// User
		User user = new User("createInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}

	/**
	 * Check that when "Create" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideCreatePermissionThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.CREATE_OVERRIDE;
		// DataClass
		String dataClass = "CreateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.CREATE,
				dataClass);
		// User
		User user = new User("create");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

	/**
	 * Check that when "Update" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideUpdatePermissionThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.UPDATE_OVERRIDE;
		// DataClass
		String dataClass = "UpdateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.UPDATE,
				dataClass, target);
		// User
		User user = new User("updateInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}

	/**
	 * Check that when "Update" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideUpdatePermissionThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.UPDATE_OVERRIDE;
		// DataClass
		String dataClass = "UpdateOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.UPDATE,
				dataClass, target);
		// User
		User user = new User("update");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

	/**
	 * Check that when "Remove" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideRemovePermissionThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.REMOVE_OVERRIDE;
		// DataClass
		String dataClass = "RemoveOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.REMOVE,
				dataClass, target);
		// User
		User user = new User("removeInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}

	/**
	 * Check that when "Remove" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideRemovePermissionThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.REMOVE_OVERRIDE;
		// DataClass
		String dataClass = "RemoveOverride";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.REMOVE,
				dataClass, target);
		// User
		User user = new User("remove");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromModelThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("executeInheritedModel");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
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
		assertEquals("Wrong error code", ErrorCode.NO_PERM_EXEC,
				errors[0].getErrCode());
	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromModelThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromDataClassThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("executeInheritedDataClass");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
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
		assertEquals("Wrong error code", ErrorCode.NO_PERM_EXEC,
				errors[0].getErrCode());

	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverrideExecutePermissionInheritedFromDataClassThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.EXECUTE_OVERRIDE;
		// DataClass & method
		String dataClass = "ExecuteOverrideDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromModelThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideModel";
		String method = "doUnauthRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
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
		assertEquals("Wrong error code", ErrorCode.NO_PERM_READ,
				errors[0].getErrCode());

	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * Model, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromModelThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideModel";
		String method = "doAuthCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromDataClassThatInheritedOneIsNotApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideDataClass";
		String method = "doUnauthRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
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
		assertEquals("Wrong error code", ErrorCode.NO_PERM_READ,
				errors[0].getErrCode());

	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from
	 * DataClass, individual permission is applied and the inherited one is not
	 * applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenOverridePromotePermissionInheritedFromDataClassThatIndividualPermissionIsApplied()
			throws Exception {
		// Target
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// DataClass & method
		String dataClass = "PromoteOverrideDataClass";
		String method = "doAuthCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target, request,
				user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response);

	}

}
