package com.wakanda.qa.dataperm.test.inherit;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import com.wakanda.qa.dataperm.Targets;
import com.wakanda.qa.dataperm.test.extend.AbstractSecurityTestCase;

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
	public void testReadWhenOverriddenThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.READ_OVERRIDE;

		// request
		String dataClass = "ReadOverride";

		// overriden group must not have access
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.READ,
				dataClass);
		User user01 = new User("readInherited");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group must have access
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.READ,
				dataClass);
		User user02 = new User("read");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);

	}

	/**
	 * Check that when "Create" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCreateWhenOverriddenThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.CREATE_OVERRIDE;

		// request
		String dataClass = "CreateOverride";

		// overriden group must not have access
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.CREATE,
				dataClass);
		User user01 = new User("createInherited");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group must have access
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.READ,
				dataClass);
		User user02 = new User("create");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);
	}

	/**
	 * Check that when "Update" permission is overridden, individual permission
	 * is applied and the inherited one is not applied anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdateWhenOverriddenThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.UPDATE_OVERRIDE;

		// request
		String dataClass = "UpdateOverride";

		// overriden group must not have access
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.UPDATE,
				dataClass, target);
		User user01 = new User("updateInherited");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group must have access
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.UPDATE,
				dataClass, target);
		User user02 = new User("update");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);
	}

	/**
	 * Check that when "Remove" permission is overridden, individual permission
	 * is applied and the inherited one is not anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testRemoveWhenOverriddenThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.REMOVE_OVERRIDE;

		// request
		String dataClass = "RemoveOverride";

		// overriden group must not have access
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.REMOVE,
				dataClass, target);
		User user01 = new User("removeInherited");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group must have access
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.REMOVE,
				dataClass, target);
		User user02 = new User("remove");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);
	}

	/**
	 * Check that when "Execute" permission overrides the one inherited from Model, individual permission
	 * is applied and the inherited one is not anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteWhenOverriddesModelSettingThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.EXECUTE_OVERRIDE;

		// request
		String dataClass = "ExecuteOverrideModel";
		String method = "secured";

		// overriden group must not have access
		HttpRequest request01 = getRequestForDataClassMethod(dataClass, method);
		User user01 = new User("executeInheritedModel");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group must have access
		HttpRequest request02 = getRequestForDataClassMethod(dataClass, method);
		User user02 = new User("execute");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);
	}
	
	/**
	 * Check that when "Execute" permission overrides the one inherited from DataClass, individual permission
	 * is applied and the inherited one is not anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testExecuteWhenOverriddesDataClassSettingThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.EXECUTE_OVERRIDE;

		// request
		String dataClass = "ExecuteOverrideDataClass";
		String method = "secured";

		// overriden group must not have access
		HttpRequest request01 = getRequestForDataClassMethod(dataClass, method);
		User user01 = new User("executeInheritedDataClass");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group must have access
		HttpRequest request02 = getRequestForDataClassMethod(dataClass, method);
		User user02 = new User("execute");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode(
				"Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);
	}

	/**
	 * Check that when "Promote" permission overrides the one inherited from Model, individual permission
	 * is applied and the inherited one is not anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteWhenOverriddesModelSettingThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// user with execute privilege
		User user = new User("execute");
		// DataClass
		String dataClass = "PromoteOverrideModel";
		// overriden group should not have access anymore
		// method
		String method = "doUnauthRead";
		// request
		HttpRequest request01 = getRequestForDataClassMethod(dataClass, method);
		// response
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user);
		logger.debug(response01.getStatusLine());
		// consume content & release resources
		String content = EntityUtils.toString(response01.getEntity());
		logger.debug(content);
		// should get 401
		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group should now have access
		// method
		method = "doAuthCreate";
		// request
		HttpRequest request02 = getRequestForDataClassMethod(dataClass, method);
		// response
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user);
		logger.debug(response02.getStatusLine());
		// consume content & release resources
		content = EntityUtils.toString(response02.getEntity());
		logger.debug(content);
		// should get 200
		assertEqualsStatusCode("Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);

	}
	
	/**
	 * Check that when "Promote" permission overrides the one inherited from Model, individual permission
	 * is applied and the inherited one is not anymore.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteWhenOverriddesDataClassSettingThatIndividualPermissionIsAppliedAndInheritedOneIsNot()
			throws Exception {
		// host
		HttpHost target = Targets.PROMOTE_OVERRIDE;
		// user with execute privilege
		User user = new User("execute");
		// DataClass
		String dataClass = "PromoteOverrideDataClass";
		// overriden group should not have access anymore
		// method
		String method = "doUnauthRead";
		// request
		HttpRequest request01 = getRequestForDataClassMethod(dataClass, method);
		// response
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user);
		logger.debug(response01.getStatusLine());
		// consume content & release resources
		String content = EntityUtils.toString(response01.getEntity());
		logger.debug(content);
		// should get 401
		assertEqualsStatusCode(
				"Now that permission is overriden, group of the model level should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// individual group should now have access
		// method
		method = "doAuthCreate";
		// request
		HttpRequest request02 = getRequestForDataClassMethod(dataClass, method);
		// response
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user);
		logger.debug(response02.getStatusLine());
		// consume content & release resources
		content = EntityUtils.toString(response02.getEntity());
		logger.debug(content);
		// should get 200
		assertEqualsStatusCode("Now that permission is overriden, group of dataclass level should get access rights",
				HttpStatus.SC_OK, response02);
	}

}
