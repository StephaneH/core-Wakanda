package org.wakanda.qa.test.dataperm.extend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.commons.server.rest.DCUtil;
import org.wakanda.qa.commons.server.rest.DSUtil;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.domain.ResponseEntities;
import org.wakanda.qa.test.dataperm.domain.Sample;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractSecurityTestCase extends AbstractTestCase {

	protected Logger logger = Logger.getLogger(this.getClass());

	public enum RESTAction {
		NONE, READ, CREATE, UPDATE, REMOVE, EXECUTE
	}

	protected HttpHost getDefaultTarget() {
		return null;
	}

	protected String getDataClassName() {
		return null;
	}

	protected String getDataClassMethodName() {
		return null;
	}

	protected String getNoPermDataClassName() {
		return "NoPerm";
	}

	protected String getNoPermDataClassMethodName() {
		return "unsecured";
	}

	protected Sample getFirstEntity(String dataClass, HttpHost target) throws Exception {
		Sample record = null;
			// Get the entity
			HttpRequest request = getRequestForDataClassAction(RESTAction.READ,
					dataClass);
			HttpResponse response = executeRequest(request, target);
			// Should get a 200 OK
			int status = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_OK, status);

			// Map JSON content to objects
			String content = EntityUtils.toString(response.getEntity());
			ResponseEntities<Sample> respJSON = DCUtil
					.getInstance(Sample.class).getResponseEntities(content);

			// Get entities list
			Sample[] allRecords = respJSON.getEntities();
			assertNotNull("No entity returned", allRecords);
			assertTrue("No entity returned", allRecords.length > 0);

			// Choose the first entity
			record = allRecords[0];
		return record;
	}

	protected HttpRequest getRequestForDataClassMethod(String dataClass,
			String method) {
		String url = "/rest/" + dataClass + "/" + method;
		HttpGet request = new HttpGet(url);
		return request;
	}

	protected RESTAction getRESTAction() {
		return RESTAction.NONE;
	}

	protected HttpRequest getRequestForDataClassAction(RESTAction action,
			String dataClass, HttpHost target) throws Exception {
		RESTRequestBuilder rb = null;
		HttpRequest request = null;
		Sample entity = null;
		String newValue = (new Date()).toString();
		
		switch (action) {
		case READ:
			rb = new RESTRequestBuilder(dataClass);
			request = rb.buildRequest();
			break;
		case CREATE:
			entity = new Sample();
			entity.setName(newValue);
			
			// Build the request
			request = DSUtil.getUpdateRequest(dataClass, entity, Sample.class);
			
			break;
		case UPDATE:
			// Get the entity to update
			entity = getFirstEntity(dataClass, target);
			entity.setName(newValue);
			
			// Build the request
			request = DSUtil.getUpdateRequest(dataClass, entity, Sample.class);
			
			break;
			
		case REMOVE:
			entity = getFirstEntity(dataClass, target);
			rb = new RESTRequestBuilder();
			rb.addDataClass(dataClass)
					.addKey(entity.getKey())
					.addParameters(
							ArrayUtils.toArray(new BasicNameValuePair(
									Constants.METHOD, Constants.DELETE)));
			request = rb.buildRequest();
			break;
		default:
		}
		return request;
	}

	protected HttpRequest getRequestForDataClassAction(RESTAction action,
			String dataClass) throws Exception {
		return getRequestForDataClassAction(action, dataClass,
				getDefaultTarget());
	}

	protected HttpRequest getDefaultRequest() throws Exception {
		RESTAction action = getRESTAction();
		if (action == RESTAction.EXECUTE) {
			return getRequestForDataClassMethod(getDataClassName(),
					getDataClassMethodName());
		}
		return getRequestForDataClassAction(action, getDataClassName());
	}

	protected Credentials getAdminUser() {
		return new User("admin");
	}

	protected Credentials getNonAuthenticatedUser() {
		return new User("wrong");
	}

	protected Credentials getAuthenticatedButNotAllowedUser() {
		return new User("noperm");
	}

	protected Credentials getAllowedUser() {
		return getAdminUser();
	}

	protected Credentials getDefaultUser() throws Exception {
		return getAllowedUser();
	}

	protected HttpResponse executeAuthenticatedRequest(HttpHost target,
			HttpRequest request, Credentials credentials) throws Exception {
		return getRequestor()
				.executeAuthenticated(target, request, credentials);
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			Credentials credentials) throws Exception {
		return executeAuthenticatedRequest(getDefaultTarget(), request,
				credentials);
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request)
			throws Exception {
		return executeAuthenticatedRequest(getDefaultTarget(), request,
				getDefaultUser());
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			HttpHost target) throws Exception {
		return executeAuthenticatedRequest(target, request, getDefaultUser());
	}

	protected HttpResponse executeAuthenticatedRequest(Credentials credentials)
			throws Exception {
		return executeAuthenticatedRequest(getDefaultRequest(), credentials);
	}
	
	protected class User extends UsernamePasswordCredentials{
		
		private static final long serialVersionUID = 8368469517807131657L;

		public User(String userName, String password) {
			super(userName, password);
		}
		
		/**
		 * Sets the password as the username
		 * @param userName
		 */
		public User(String userName) {
			super(userName, userName);
		}
		
	}

}