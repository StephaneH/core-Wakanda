package com.wakanda.qa.dataperm.test.simple.method;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
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
public class Promote extends AbstractSecurityTestCase {

	@Override
	protected User getDefaultUser() throws Exception {
		return new User("execute");
	}

	@Override
	protected HttpHost getDefaultTarget() {
		return Targets.PERM;
	}

	/**
	 * Check that "Promote" action is not performed for "Read" permission when
	 * no group is associated with "Promote" permission.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsNotPerformedForReadPermissionWhenWhenPromotePermissionIsBlank()
			throws Exception {
		// request
		String dataClass = "NonPromoteRead";
		String method = "nonPromoteRead";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		// response
		HttpResponse response = executeAuthenticatedRequest(request);
		
		// consume content & release system resources
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);

		// should get a 500
		assertEqualsStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR, response);

		// check content
		JsonError[] errors = (new Gson().fromJson(content, JsonErrors.class))
				.getErrors();
		assertTrue("Cannot find errors stack", errors.length > 0);
		assertEquals(errors[0].getErrCode(), ErrorCode.NO_PERM_READ);
	}

	/**
	 * Check that method is promoted to perform "Read" action when this last is
	 * associated with the "Promote" action group.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForReadAction() throws Exception {
		// request
		String dataClass = "PromoteRead";
		String method = "promoteRead";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		// response
		HttpResponse response = executeAuthenticatedRequest(request);

		// consume content & release system resources
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);
		
		// should get a 200
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		// check content
		String result = (new Gson().fromJson(content, JsonResult.class))
				.getResult();
		assertEquals("true", result);
	}

	/**
	 * Check that "Promote" action is not performed for "Create" permission when
	 * no group is associated with "Promote" permission.
	 * 
	 * @throws Exception
	 */
	@Test
	// @Ignore
	public void testPromoteActionIsNotPerformedForCreatePermissionWhenWhenPromotePermissionIsBlank()
			throws Exception {
		// request
		String dataClass = "NonPromoteCreate";
		String method = "nonPromoteCreate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		// response
		HttpResponse response = executeAuthenticatedRequest(request);
		
		// consume content & release system resources
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);

		// we should get a 500
		assertEqualsStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR, response);

		// check content
		JsonError[] errors = (new Gson().fromJson(content, JsonErrors.class))
				.getErrors();
		assertTrue("Cannot find errors stack", errors.length > 0);
		assertEquals(errors[0].getErrCode(), ErrorCode.CANNOT_SAVE_ENTITY);
	}

	/**
	 * Check that method is promoted to perform "Create" action when this last
	 * is associated with the "Promote" action group.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForCreateAction() throws Exception {
		// request
		String dataClass = "PromoteCreate";
		String method = "promoteCreate";
		HttpRequest request = getRequestForDataClassMethod(dataClass, method);

		// response
		HttpResponse response = executeAuthenticatedRequest(request);

		// consume content & release system resources
		String content = EntityUtils.toString(response.getEntity());
		logger.debug(content);
		
		// should get a 200
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		// check content
		String result = (new Gson().fromJson(content, JsonResult.class))
				.getResult();
		assertEquals("true", result);
	}

	/**
	 * Check that "Promote" action is not performed for "Update" permission when
	 * no group is associated with "Promote" permission.
	 * 
	 * @throws Exception
	 */
	@Test
	// @Ignore
	public void testPromoteActionIsNotPerformedForUpdatePermissionWhenPromotePermissionIsBlank()
			throws Exception {
			// request
			String dataClass = "NonPromoteUpdate";
			String method = "nonPromoteUpdate";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request);

			// consume content & release system resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);
			
			// should get a 500
			assertEqualsStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR,
					response);

			// check content
			JsonError[] errors = (new Gson()
					.fromJson(content, JsonErrors.class)).getErrors();
			assertTrue("Cannot find errors stack", errors.length > 0);
			assertEquals(errors[0].getErrCode(), ErrorCode.CANNOT_SAVE_ENTITY);
	}

	/**
	 * Check that method is promoted to perform "Update" action when this last
	 * is associated with the "Promote" action group.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForUpdateAction() throws Exception {
			// request
			String dataClass = "PromoteUpdate";
			String method = "promoteUpdate";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request);
			
			// consume content & release system resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);
			
			// should get a 200
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check consume
			String result = (new Gson().fromJson(content, JsonResult.class))
			.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that "Promote" action is not performed for "Remove" permission when
	 * no group is associated with "Promote" permission.
	 * 
	 * @throws Exception
	 */
	@Test
	// @Ignore
	public void testPromoteActionIsNotPerformedForRemovePermissionWhenPromotePermissionIsBlank()
			throws Exception {
			// request
			String dataClass = "NonPromoteRemove";
			String method = "nonPromoteRemove";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request);

			// consume content & release system resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);
			
			// should get a 500
			assertEqualsStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR,
					response);

			// check content
			JsonError[] errors = (new Gson()
					.fromJson(content, JsonErrors.class)).getErrors();
			assertTrue("Cannot find errors stack", errors.length > 0);
			assertEquals(errors[0].getErrCode(), ErrorCode.NO_PERM_DELETE);
	}

	/**
	 * Check that method is promoted to perform "Remove" action when this last
	 * is associated with the "Promote" action group.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForRemoveAction() throws Exception {
			// request
			String dataClass = "PromoteRemove";
			String method = "promoteRemove";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request);

			// consume content & release system resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);
			
			// should get a 200
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, JsonResult.class))
					.getResult();
			assertEquals("true", result);
	}

}
