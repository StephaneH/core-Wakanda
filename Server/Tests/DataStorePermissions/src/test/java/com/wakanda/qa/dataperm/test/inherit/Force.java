package com.wakanda.qa.dataperm.test.inherit;

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

import com.google.gson.Gson;
import com.wakanda.qa.dataperm.ErrorCode;
import com.wakanda.qa.dataperm.Targets;
import com.wakanda.qa.dataperm.test.extend.AbstractSecurityTestCase;
import com.wakanda.qa.utils.JsonUtil.JsonError;
import com.wakanda.qa.utils.JsonUtil.JsonErrors;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Force extends AbstractSecurityTestCase {

	/**
	 * Check that when "Force" option is checked for a "Read" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceReadPermissionThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_READ;
		// DataClass
		String dataClass = "ForceRead";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.READ, dataClass);
		User user = new User("read");
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		EntityUtils.consume(response.getEntity());

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}
	
	/**
	 * Check that when "Force" option is checked for a "Read" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceReadPermissionThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_READ;
		// DataClass
		String dataClass = "ForceRead";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.READ, dataClass);
		// User
		User user = new User("readInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}
	
	/**
	 * Check that when "Force" option is checked for a "Create" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceCreatePermissionThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_CREATE;
		// DataClass
		String dataClass = "ForceCreate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.CREATE, dataClass);
		// User
		User user = new User("create");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}
	
	/**
	 * Check that when "Force" option is checked for a "Create" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceCreatePermissionThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_CREATE;
		// DataClass
		String dataClass = "ForceCreate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.CREATE, dataClass);
		// User
		User user = new User("createInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}
	
	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceUpdatePermissionThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_UPDATE;
		// DataClass
		String dataClass = "ForceUpdate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.UPDATE, dataClass, target);
		User user = new User("update");
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}
	
	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceUpdatePermissionThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_UPDATE;
		// DataClass
		String dataClass = "ForceUpdate";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.UPDATE, dataClass, target);
		// User
		User user = new User("updateInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}
	
	
	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceRemovePermissionThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_REMOVE;
		// DataClass
		String dataClass = "ForceRemove";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.REMOVE, dataClass, target);
		// User
		User user = new User("remove");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response);

	}
	
	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceRemovePermissionThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_REMOVE;
		// DataClass
		String dataClass = "ForceRemove";
		// Request
		HttpRequest request = getRequestForDataClassAction(RestAction.REMOVE, dataClass, target);
		// User
		User user = new User("removeInherited");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}

	/**
	 * Check that when "Force" option is checked for an "Execute" action at Model
	 * level, DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceExecutePermissionFromModelThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_MODEL;
		// DataClass & Method
		String dataClass = "ForceExecuteModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
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
		assertEquals("Wrong error code", errors[0].getErrCode(), ErrorCode.NO_PERM_EXEC);

	}
	
	/**
	 * Check that when "Force" option is checked for an "Execute" action at Model
	 * level, DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceExecutePermissionFromModelThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_MODEL;
		// DataClass & Method
		String dataClass = "ForceExecuteModel";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("executeInheritedModel");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}
	
	/**
	 * Check that when "Force" option is checked for an "Execute" action at DataClass
	 * level, DataClass methods take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceExecutePermissionFromDataClassThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForceExecuteDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
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
		assertEquals("Wrong error code", errors[0].getErrCode(), ErrorCode.NO_PERM_EXEC);

	}
	
	/**
	 * Check that when "Force" option is checked for an "Execute" action at DataClass
	 * level, DataClass methods take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForceExecutePermissionFromDataClassThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_EXECUTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForceExecuteDataClass";
		String method = "secured";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("executeInheritedDataClass");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}
	
	/**
	 * Check that when "Force" option is checked for an "Promote" action at Model
	 * level, DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForcePromotePermissionFromModelThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_MODEL;
		// DataClass & Method
		String dataClass = "ForcePromoteModel";
		String method = "promoteRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
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
		assertEquals("Wrong error code", ErrorCode.NO_PERM_READ, errors[0].getErrCode());

	}
	
	/**
	 * Check that when "Force" option is checked for an "Promote" action at Model
	 * level, DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForcePromotePermissionFromModelThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_MODEL;
		// DataClass & Method
		String dataClass = "ForcePromoteModel";
		String method = "promoteCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}
	
	/**
	 * Check that when "Force" option is checked for an "Promote" action at DataClass
	 * level, DataClass methods take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForcePromotePermissionFromDataClassThatOriginalGroupDoesNotHaveAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForcePromoteDataClass";
		String method = "promoteRead";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
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
		assertEquals("Wrong error code", ErrorCode.NO_PERM_READ, errors[0].getErrCode());

	}
	
	/**
	 * Check that when "Force" option is checked for an "Promote" action at DataClass
	 * level, DataClass methods take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWhenForcePromotePermissionFromDataClassThatForcedGroupHasAccessRights() throws Exception {
		// Target
		HttpHost target = Targets.FORCE_PROMOTE_DATACLASS;
		// DataClass & Method
		String dataClass = "ForcePromoteDataClass";
		String method = "promoteCreate";
		// Request
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);
		// User
		User user = new User("execute");
		// Response
		HttpResponse response = executeAuthenticatedRequest(target,
				request, user);
		logger.debug(response.getStatusLine());
		
		// Ensure proper release of system resources
		HttpEntity entity = response.getEntity();
		String content = EntityUtils.toString(entity);
		logger.debug(content);
		EntityUtils.consume(entity);

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response);
	}
	
}
