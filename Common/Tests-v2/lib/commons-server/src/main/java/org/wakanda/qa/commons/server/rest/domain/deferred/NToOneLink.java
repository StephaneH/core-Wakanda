/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain.deferred;

import com.google.gson.annotations.SerializedName;

public class NToOneLink{
	
	@SerializedName(value = "__deferred")
	private NToOneLinkData deferred;

	public NToOneLinkData getDeferred() {
		return deferred;
	}

	public void setDeferred(NToOneLinkData deferred) {
		this.deferred = deferred;
	}

	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof NToOneLink) {
			NToOneLink vs = (NToOneLink) obj;
			b = getDeferred() == null ? vs.getDeferred() == null
					: getDeferred().equals(vs.getDeferred());
		}
		return b;

	}
	
	
}