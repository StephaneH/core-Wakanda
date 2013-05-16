/**
 * 
 */
package org.wakanda.qa.server.utils.rest;


public class ResponseError {
	private ResponseError.JsonError[] __ERROR;

	public ResponseError.JsonError[] getErrors() {
		return __ERROR;
	}

	public static class JsonError {
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
}