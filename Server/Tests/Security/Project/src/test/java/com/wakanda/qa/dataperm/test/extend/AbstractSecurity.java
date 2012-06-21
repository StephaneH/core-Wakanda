package com.wakanda.qa.dataperm.test.extend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.wakanda.qa.dataperm.RequestUtil;
import com.wakanda.qa.dataperm.Resources;
import com.wakanda.qa.dataperm.RequestUtil.AuthType;

/**
 * Abstract class that defines methods to implements and provides some common
 * security test cases utilities.
 * 
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractSecurity {

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

	protected JSONEntity getFirstEntity(String dataClass, HttpHost target) {
		JSONEntity record = null;
		try {
			// Get the entity
			HttpRequest request = getRequestForDataClassAction(RESTAction.READ,
					dataClass);
			HttpResponse response = RequestUtil.executeRequest(request,
					target);
			// Should get a 200 OK
			int status = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_OK, status);

			// Map JSON content to objects
			String content = EntityUtils.toString(response.getEntity());
			logger.debug(content);
			JSONResponse respJSON = new Gson().fromJson(content,
					JSONResponse.class);

			// Get entities list
			JSONEntity[] allRecords = respJSON.getEntities();
			assertNotNull("No entity returned", allRecords);
			assertTrue("No entity returned", allRecords.length > 0);

			// Choose the first entity
			record = allRecords[0];
		} catch (Exception e) {
			logger.debug(e.getMessage());
		}
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
			String dataClass, HttpHost target) {
		HttpRequest request = null;
		String url = null;
		String dataClassUrl = "/rest/" + dataClass;
		String newValue = (new Date()).toString();
		JSONEntity record = null;
		JSONEntity[] recordsToSend = null;
		StringEntity reqEntity = null;

		try {
			switch (action) {
			case READ:
				url = dataClassUrl + "/";
				request = new HttpGet(url);
				break;
			case CREATE:
				url = dataClassUrl + "/?$method=update";
				request = new HttpPost(url);
				record = new JSONEntity((new Date()).toString());
				recordsToSend = new JSONEntity[] { record };
				reqEntity = new StringEntity(
						new Gson().toJson(new JSONResquest(recordsToSend)));
				((HttpPost) request).setEntity(reqEntity);
				break;
			case UPDATE:
				record = getFirstEntity(dataClass, target);
				record.setName(newValue);
				url = dataClassUrl + "/?$method=update";
				request = new HttpPost(url);

				recordsToSend = new JSONEntity[] { record };
				reqEntity = new StringEntity(
						new Gson().toJson(new JSONResquest(recordsToSend)));
				((HttpPost) request).setEntity(reqEntity);
				logger.debug(EntityUtils.toString(reqEntity));
				break;
			case REMOVE:
				record = getFirstEntity(dataClass, target);
				record.setName(newValue);
				url = dataClassUrl + "(" + record.getKey()
						+ ")/?$method=delete";
				request = new HttpGet(url);
				break;
			default:
			}
		} catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return request;
	}
	
	protected HttpRequest getRequestForDataClassAction(RESTAction action,
			String dataClass) {
		return getRequestForDataClassAction(action, dataClass, getDefaultTarget());
	}

	protected HttpRequest getDefaultRequest() throws Exception {
		RESTAction action = getRESTAction();
		if (action == RESTAction.EXECUTE) {
			return getRequestForDataClassMethod(getDataClassName(),
					getDataClassMethodName());
		}
		return getRequestForDataClassAction(action, getDataClassName());
	}

	protected User getAdminUser() {
		return new User("admin");
	}

	protected User getNonAuthenticatedUser() {
		return new User("wrong");
	}

	protected User getAuthenticatedButNotAllowedUser() {
		return new User("noperm");
	}

	protected User getAllowedUser() {
		return getAdminUser();
	}

	protected User getDefaultUser() throws Exception {
		return getAllowedUser();
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			HttpHost target, User user, AuthType scheme) throws Exception {
		return RequestUtil.executeAuthenticatedRequest(request, target,
				user.getName(), user.getPassword(), scheme,
				Resources.getDefaultAuthChallenge());
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			User user, AuthType scheme) throws Exception {
		return executeAuthenticatedRequest(request, getDefaultTarget(), user,
				scheme);
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			HttpHost target, User user) throws Exception {
		return executeAuthenticatedRequest(request, target, user,
				AuthType.BASIC);
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			User user) throws Exception {
		return executeAuthenticatedRequest(request, getDefaultTarget(), user);
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request)
			throws Exception {
		return executeAuthenticatedRequest(request, getDefaultTarget(),
				getDefaultUser());
	}

	protected HttpResponse executeAuthenticatedRequest() throws Exception {
		return executeAuthenticatedRequest(getDefaultRequest(),
				getDefaultTarget(), getDefaultUser());
	}

	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			HttpHost target) throws Exception {
		return executeAuthenticatedRequest(request, target, getDefaultUser());
	}

	protected HttpResponse executeAuthenticatedRequest(User user)
			throws Exception {
		return executeAuthenticatedRequest(getDefaultRequest(), user);
	}

	public class JSONResponse {

		private String __entityModel;
		private String __COUNT;
		private String __SENT;
		private String __FIRST;
		private JSONEntity[] __ENTITIES;

		public String getEntityModel() {
			return __entityModel;
		}

		public String getCount() {
			return __COUNT;
		}

		public String getSent() {
			return __SENT;
		}

		public String getFirst() {
			return __FIRST;
		}

		public JSONEntity[] getEntities() {
			return __ENTITIES;
		}
	}

	public class JSONResquest {
		private JSONEntity[] __ENTITIES;

		public JSONResquest(JSONEntity[] __ENTITIES) {
			super();
			this.__ENTITIES = __ENTITIES;
		}

		public JSONEntity[] getEntities() {
			return __ENTITIES;
		}
	}

	public class JSONEntity {

		private String __KEY;
		private String __STAMP;
		private String ID;
		private String name;

		public JSONEntity(String __KEY, String __STAMP, String ID, String name) {
			this.__KEY = __KEY;
			this.__STAMP = __STAMP;
			this.ID = ID;
			this.name = name;
		}

		public JSONEntity(String ID, String name) {
			this.__KEY = null;
			this.__STAMP = null;
			this.ID = ID;
			this.name = name;
		}

		public JSONEntity(String name) {
			this.__KEY = null;
			this.__STAMP = null;
			this.ID = null;
			this.name = name;
		}

		public String getKey() {
			return __KEY;
		}

		public String getStamp() {
			return __STAMP;
		}

		public String getID() {
			return ID;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	}

	public class JSONErrors {
		private JSONError[] __ERROR;

		public JSONError[] getErrors() {
			return __ERROR;
		}
	}

	public class JSONError {
		private String message;
		private String componentSignature;
		private int errCode;

		public String getMessage() {
			return message;
		}

		public String getComponentSignature() {
			return componentSignature;
		}

		public int getErrCode() {
			return errCode;
		}
	}

	public class JSONResult {
		private String result;

		public String getResult() {
			return result;
		}
	}

	public class User {

		private String name;
		private String password;

		public User(String name, String password) {
			super();
			this.name = name;
			this.password = password;
		}

		public User(String nameSameAsPwd) {
			super();
			this.name = nameSameAsPwd;
			this.password = nameSameAsPwd;

		}

		public void setName(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getPassword() {
			return password;
		}

	}

}
