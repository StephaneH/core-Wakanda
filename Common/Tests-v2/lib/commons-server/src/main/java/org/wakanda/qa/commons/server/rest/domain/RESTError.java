/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain;

public class RESTError {
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

	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof RESTError) {
			RESTError vs = (RESTError) obj;
			b = true;
			b = b
					&& (getMessage() == null ? vs.getMessage() == null
							: getMessage().equals(vs.getMessage()));

			b = b
					&& (getComponentSignature() == null ? vs
							.getComponentSignature() == null
							: getComponentSignature().equals(
									vs.getComponentSignature()));

			b = b && (getErrCode() == vs.getErrCode());
		}
		return b;
	}
}