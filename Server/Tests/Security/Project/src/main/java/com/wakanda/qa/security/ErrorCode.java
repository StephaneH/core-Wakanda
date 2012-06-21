/**
 * 
 */
package com.wakanda.qa.security;

import static com.wakanda.qa.security.Resources.*;

import java.util.Properties;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class ErrorCode {

	private static Properties errorCodesp = null;
	public static final int NO_PERM_EXEC = getErrorCode("noPermExec");
	public static final int NO_PERM_READ = getErrorCode("noPermRead");
	public static final int NO_PERM_DELETE = getErrorCode("noPerDelete");
	public static final int CANNOT_SAVE_ENTITY = getErrorCode("cannotSaveEntity");
	
	
	private static Properties getErrorCodesProp() {
		if (errorCodesp == null) {
			errorCodesp = getProperties("errorcodes.properties");
		}
		return errorCodesp;
	}
	
	private static int getErrorCode(String name){
		return Integer.parseInt(getErrorCodesProp().getProperty(name));
	}
	
}
