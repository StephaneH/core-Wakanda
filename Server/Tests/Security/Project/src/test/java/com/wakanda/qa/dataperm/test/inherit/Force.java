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
public class Force extends AbstractSecurityTestCase {

	/**
	 * Check that when "Force" option is checked for a "Read" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForReadAction() throws Exception {
		// host
		HttpHost target = Targets.FORCE_READ;

		// DataClass
		String dataClass = "ForceRead";

		// original group
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.READ, dataClass);
		User user01 = new User("read");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced user
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.READ, dataClass);
		User user02 = new User("readInherited");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);

	}
	
	/**
	 * Check that when "Force" option is checked for a "Create" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForCreateAction() throws Exception {
		// host
		HttpHost target = Targets.FORCE_CREATE;

		// DataClass
		String dataClass = "ForceCreate";
		
		// original group
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.CREATE, dataClass);
		User user01 = new User("create");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced user
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.CREATE, dataClass);
		User user02 = new User("createInherited");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);

	}
	
	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForUpdateAction() throws Exception {
		// host
		HttpHost target = Targets.FORCE_UPDATE;

		// DataClass
		String dataClass = "ForceUpdate";
		
		// original group
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.UPDATE, dataClass, target);
		User user01 = new User("update");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced user
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.UPDATE, dataClass, target);
		User user02 = new User("updateInherited");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);

	}
	
	/**
	 * Check that when "Force" option is checked for a "Update" action (at Model
	 * level), DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForRemoveAction() throws Exception {
		// host
		HttpHost target = Targets.FORCE_REMOVE;

		// DataClass
		String dataClass = "ForceRemove";
		
		// original group
		HttpRequest request01 = getRequestForDataClassAction(RESTAction.REMOVE, dataClass, target);
		User user01 = new User("remove");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced user
		HttpRequest request02 = getRequestForDataClassAction(RESTAction.REMOVE, dataClass, target);
		User user02 = new User("removeInherited");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);

	}

	/**
	 * Check that when "Force" option is checked for an "Execute" action at Model
	 * level, DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForExecuteActionFromModel() throws Exception {
		// host
		HttpHost target = Targets.FORCE_EXECUTE_MODEL;

		// DataClass & Method
		String dataClass = "ForceExecuteModel";
		String method = "secured";
		
		// original group
		HttpRequest request01 = getRequestForDataClassMethod(dataClass, method);
		User user01 = new User("execute");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced user
		HttpRequest request02 = getRequestForDataClassMethod(dataClass, method);
		User user02 = new User("executeInheritedModel");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);

	}
	
	/**
	 * Check that when "Force" option is checked for an "Execute" action at DataClass
	 * level, DataClass methods take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForExecuteActionFromDataClass() throws Exception {
		// host
		HttpHost target = Targets.FORCE_EXECUTE_DATACLASS;

		// DataClass & Method
		String dataClass = "ForceExecuteDataClass";
		String method = "secured";
		
		// original group
		HttpRequest request01 = getRequestForDataClassMethod(dataClass, method);
		User user01 = new User("execute");
		HttpResponse response01 = executeAuthenticatedRequest(request01,
				target, user01);
		logger.debug(response01.getStatusLine());
		EntityUtils.consume(response01.getEntity());

		assertEqualsStatusCode(
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced user
		HttpRequest request02 = getRequestForDataClassMethod(dataClass, method);
		User user02 = new User("executeInheritedModel");
		HttpResponse response02 = executeAuthenticatedRequest(request02,
				target, user02);
		logger.debug(response02.getStatusLine());
		EntityUtils.consume(response02.getEntity());

		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);

	}


	/**
	 * Check that when "Force" option is checked for an "Promote" action at Model
	 * level, DataClasses take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForPromoteActionFromModel() throws Exception {
		// host
		HttpHost target = Targets.FORCE_PROMOTE_MODEL;
		// user with execute privilege
		User user = new User("execute");
		// DataClass
		String dataClass = "ForcePromoteModel";
		// original group should not have access anymore
		// method
		String method = "promoteRead";
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
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced group should now have access
		// method
		method = "promoteCreate";
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
		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);

	}
	
	/**
	 * Check that when "Force" option is checked for an "Promote" action at DataClass
	 * level, DataClass methods take on that access rights and the individual setting
	 * is ignored.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testForceForPromoteActionFromDataClass() throws Exception {
		// host
		HttpHost target = Targets.FORCE_PROMOTE_DATACLASS;
		// user with execute privilege
		User user = new User("execute");
		// DataClass
		String dataClass = "ForcePromoteDataClass";
		// original group should not have access anymore
		// method
		String method = "promoteRead";
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
				"Now that permission is forced, original group should not have access rights anymore",
				HttpStatus.SC_UNAUTHORIZED, response01);

		// forced group should now have access
		// method
		method = "promoteCreate";
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
		assertEqualsStatusCode("Forced group should get access rights",
				HttpStatus.SC_OK, response02);
	}

}
