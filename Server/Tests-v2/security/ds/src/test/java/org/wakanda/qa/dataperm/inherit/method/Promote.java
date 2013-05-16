package org.wakanda.qa.dataperm.inherit.method;

import static org.junit.Assert.assertEquals;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.wakanda.qa.dataperm.Targets;
import org.wakanda.qa.dataperm.extend.AbstractSecurityTestCase;
import org.wakanda.qa.server.utils.rest.MethodResult;

import com.google.gson.Gson;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Promote extends AbstractSecurityTestCase {

	@Override
	protected User getDefaultUser() throws Exception {
		return new User("execute");
	}

	/**
	 * Check that method is promoted to perform "Read" action when "Promote"
	 * permission is inherited from DataClass
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForReadActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;

			// request
			String dataClass = "PromoteInheritedDataClassRead";
			String method = "promoteInheritedDataClassRead";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);

			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that method is promoted to perform "Read" action when "Promote"
	 * permission is inherited from Model
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForReadActionWhenPromotePermissionIsInheritedFromModel()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_MODEL_READ;

			// request
			String dataClass = "PromoteInheritedModelRead";
			String method = "promoteInheritedModelRead";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);

			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that method is promoted to perform "Create" action when "Promote"
	 * permission is inherited from DataClass
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForCreateActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;

			// request
			String dataClass = "PromoteInheritedDataClassCreate";
			String method = "promoteInheritedDataClassCreate";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);

			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that method is promoted to perform "Create" action when "Promote"
	 * permission is inherited from Model
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForCreateActionWhenPromotePermissionIsInheritedFromModel()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_MODEL_CREATE;

			// request
			String dataClass = "PromoteInheritedModelCreate";
			String method = "promoteInheritedModelCreate";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);

			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that method is promoted to perform "Update" action when "Promote"
	 * permission is inherited from DataClass
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForUpdateActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;

			// request
			String dataClass = "PromoteInheritedDataClassUpdate";
			String method = "promoteInheritedDataClassUpdate";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);

			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that method is promoted to perform "Update" action when "Promote"
	 * permission is inherited from Model
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForUpdateActionWhenPromotePermissionIsInheritedFromModel()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_MODEL_UPDATE;

			// request
			String dataClass = "PromoteInheritedModelUpdate";
			String method = "promoteInheritedModelUpdate";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);

			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that method is promoted to perform "Remove" action when "Promote"
	 * permission is inherited from DataClass
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForRemoveActionWhenPromotePermissionIsInheritedFromDataClass()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_DATACLASS;

			// request
			String dataClass = "PromoteInheritedDataClassRemove";
			String method = "promoteInheritedDataClassRemove";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);
			
			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

	/**
	 * Check that method is promoted to perform "Remove" action when "Promote"
	 * permission is inherited from Model
	 * 
	 * @throws Exception
	 */
	@Test
	public void testPromoteActionIsPerformedForRemoveActionWhenPromotePermissionIsInheritedFromModel()
			throws Exception {
			// host
			HttpHost target = Targets.PROMOTE_INHERITED_MODEL_REMOVE;

			// request
			String dataClass = "PromoteInheritedModelRemove";
			String method = "promoteInheritedModelRemove";
			HttpRequest request = getRequestForDataClassMethod(dataClass, method);

			// response
			HttpResponse response = executeAuthenticatedRequest(request, target);
			
			// consume content & release resources
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);

			// should get a 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check content
			String result = (new Gson().fromJson(content, MethodResult.class))
					.getResult();
			assertEquals("true", result);
	}

}
