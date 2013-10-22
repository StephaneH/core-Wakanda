/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain.deferred;

import com.google.gson.annotations.SerializedName;

public class NToOneLinkData extends URI {
	@SerializedName(value="__KEY")
	private String key;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof NToOneLinkData) {
			NToOneLinkData vs = (NToOneLinkData) obj;
			b = super.equals(obj);
			b = getKey() == null ? vs.getKey() == null
					: getKey().equals(vs.getKey());
		}
		return b;

	}
}