/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain.deferred;

import org.wakanda.qa.commons.server.rest.domain.deferred.Blob.BlobData;

import com.google.gson.annotations.SerializedName;

public class Image {
	@SerializedName(value = "__deferred")
	private ImageData deferred;

	public ImageData getDeferred() {
		return deferred;
	}

	public void setDeferred(ImageData deferred) {
		this.deferred = deferred;
	}

	public static class ImageData extends BlobData {

	}
	
	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof Image) {
			Image vs = (Image) obj;
			b = getDeferred().equals(vs.getDeferred());
		}
		return b;

	}
}