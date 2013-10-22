/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain;

import com.google.gson.annotations.SerializedName;


public class ResponseError {
	@SerializedName(value = "__ERROR")
	private RESTError[] errors;

	public RESTError[] getErrors() {
		return errors;
	}
}