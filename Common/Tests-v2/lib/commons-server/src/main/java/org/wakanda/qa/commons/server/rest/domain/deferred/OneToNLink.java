/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain.deferred;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

public class OneToNLink{
	
	@SerializedName(value = "__deferred")
	private OneToNLinkData deferred;

	public OneToNLinkData getDeferred() {
		return deferred;
	}

	public void setDeferred(OneToNLinkData deferred) {
		this.deferred = deferred;
	}

	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof OneToNLink) {
			OneToNLink vs = (OneToNLink) obj;
			b = getDeferred() == null ? vs.getDeferred() == null
					: getDeferred().equals(vs.getDeferred());
		}
		return b;

	}
	
	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}