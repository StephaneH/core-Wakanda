/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain.deferred;

import com.google.gson.annotations.SerializedName;

public class Blob {
	@SerializedName(value = "__deferred")
	private BlobData deferred;

	public BlobData getDeferred() {
		return deferred;
	}

	public void setDeferred(BlobData deferred) {
		this.deferred = deferred;
	}

	public static class BlobData extends URI {

		@SerializedName(value = "image")
		private boolean image;

		public boolean isImage() {
			return image;
		}

		public void setImage(boolean image) {
			this.image = image;
		}

		@Override
		public boolean equals(Object obj) {
			boolean b = false;
			if (obj instanceof BlobData) {
				BlobData vs = (BlobData) obj;
				b = super.equals(obj);
				b = b && (isImage() == vs.isImage());
			}
			return b;

		}
	}
	
	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof Blob) {
			Blob vs = (Blob) obj;
			b = getDeferred().equals(vs.getDeferred());
		}
		return b;

	}
}
