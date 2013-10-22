/**
 * 
 */
package org.wakanda.qa.commons.server.http;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.entity.BufferedHttpEntity;

public class HttpSimpleBufferedResponse{

	private HttpResponse originalResponse;
	private BufferedHttpEntity entity;
	
	public HttpSimpleBufferedResponse(HttpResponse response){
		this.originalResponse = response;
		try {
			this.entity = new BufferedHttpEntity(response.getEntity());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public BufferedHttpEntity getEntity() {
		return entity;
	}

	public HttpResponse getOriginalResponse() {
		return originalResponse;
	}

	public int getStatusCode() {
		return getStatusLine().getStatusCode();
	}
	
	public StatusLine getStatusLine() {
		return originalResponse.getStatusLine();
	}
	
	
}