/**
 * 
 */
package org.wakanda.qa.commons.server.ut;

import org.apache.http.HttpResponse;

public interface ResponseHandler {
	public void handleResponse(HttpResponse response)
			throws Throwable;
}