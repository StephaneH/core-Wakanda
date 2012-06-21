package com.wakanda.qa.security.test.extend;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;

import com.wakanda.qa.security.RequestUtil;
import com.wakanda.qa.security.Resources;
import com.wakanda.qa.security.RequestUtil.AuthType;

/**
 * Abstract class that defines methods to implements and provides some common security test cases utilities.
 * @author Ouissam
 *
 */
public abstract class AbstractSecurity {

	public class User {

		private String name;
		private String password;

		public User(String name, String password) {
			super();
			this.name = name;
			this.password = password;
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
	
	public abstract HttpRequest getDefaultRequest() throws Exception;
	
	public User getNonAuthenticatedUser(){
		return new User("wrong","wrong");
	}
	
	public abstract User getAuthenticatedButNotAllowedUser();
	
	public abstract User getAllowedUser();
	
	protected HttpHost getDefaultTarget() {
		return Resources.getDefaultTarget();
	}

	protected HttpHost getNoPermTarget() {
		return Resources.getNoPermTarget();
	}

	protected HttpHost getInheritedPermTarget() {
		return Resources.getInheritedPermTarget();
	}
	
	protected HttpResponse executeAuthenticatedRequest(HttpRequest request,
			HttpHost target,User user)
			throws Exception {
		return RequestUtil.executeAuthenticatedRequest(request, target, user.getName(), user.getPassword(),
				AuthType.BASIC, Resources.getDefaultAuthChallenge());
	}
	
	protected HttpResponse executeAuthenticatedRequest(HttpRequest request, User user)
			throws Exception {
		return executeAuthenticatedRequest(request, getDefaultTarget(), user);
	}
	
	protected Header getDefaultAuthChallenge() throws Exception {
		return Resources.getDefaultAuthChallenge();
	}
	
	public class JSONResponse{
		
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

	public class JSONResquest{
		private JSONEntity[] __ENTITIES;
		public JSONResquest(JSONEntity[] __ENTITIES) {
			super();
			this.__ENTITIES = __ENTITIES;
		}
		public JSONEntity[] getEntities() {
			return __ENTITIES;
		}
	}

	public class JSONEntity{
		
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

}

