package org.wakanda.wastudio.utils;

import java.io.File;
import java.net.URL;

import org.wakanda.wastudio.common.Utils;


public class SolutionUtil {

	public static String getAbsPathFromClassLocation(String relative) {
		try {
			URL url = SolutionUtil.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String getChromeDriver() {
		String chromeDriver = null;
		String os = Utils.getOS();
		if (os.startsWith("win"))
			chromeDriver = "driver/win/chromedriver.exe";
		else if ((os.startsWith("mac")) || (os.startsWith("Mac")))
			chromeDriver = "driver/mac/chromedriver";
		else
			chromeDriver = null;
		return getAbsPathFromClassLocation(chromeDriver);
	}

	public static String getGonoGoSolutionPath() {
		return getAbsPathFromClassLocation("gonogoStudio/gonogoStudio.waSolution");
	}

	public static String getSolutionPath() {
		return getAbsPathFromClassLocation("test_GUID/test_GUID.waSolution");
	}

	public static String getImagePath() {
		return getAbsPathFromClassLocation("test_GUID/test_GUID/WebFolder/images/4D_logo.PNG");
	}
}
