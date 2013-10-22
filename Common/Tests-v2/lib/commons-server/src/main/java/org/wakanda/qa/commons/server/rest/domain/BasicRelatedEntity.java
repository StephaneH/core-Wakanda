/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.deferred.NToOneLinkData;

import com.google.gson.annotations.SerializedName;

public class BasicRelatedEntity extends BasicEntity {

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
		boolean b = super.equals(obj);
		if (obj instanceof BasicRelatedEntity) {
			BasicRelatedEntity vs = (BasicRelatedEntity) obj;
			b = b && (getDeferred() == null ? vs.getDeferred() == null
					: getDeferred().equals(vs.getDeferred()));
		}
		return b;

	}

}