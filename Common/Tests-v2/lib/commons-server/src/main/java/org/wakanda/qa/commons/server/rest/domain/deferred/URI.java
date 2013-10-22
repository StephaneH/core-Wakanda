/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain.deferred;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class URI {

	@SerializedName(value = "uri")
	private String uri;
	
	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof URI) {
			URI vs = (URI) obj;
			b = getUri().equals(vs.getUri());
		}
		return b;

	}

}
