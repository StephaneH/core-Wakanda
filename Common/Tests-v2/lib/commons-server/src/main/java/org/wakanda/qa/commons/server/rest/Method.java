/**
 * 
 */
package org.wakanda.qa.commons.server.rest;

public class Method {

	private String methodName;
	private String[] params;

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		if (methodName == null || methodName.equals("")) {
			throw new IllegalArgumentException("Invalid method name");
		}
		this.methodName = methodName;
	}

	public String[] getParams() {
		return params;
	}

	public void setParams(String[] params) {
		if (params != null && params.length < 1) {
			throw new IllegalArgumentException("Invalid params value");
		}
		this.params = params;
	}

	public Method(String methodName, String[] params) {
		super();
		setMethodName(methodName);
		setParams(params);
	}

}