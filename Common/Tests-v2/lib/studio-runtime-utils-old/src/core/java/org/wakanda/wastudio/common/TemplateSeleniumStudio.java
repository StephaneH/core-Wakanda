/**
 * @author Ahmed Jaafri
 */
package org.wakanda.wastudio.common;

import java.util.Arrays;
import java.util.Collection;

import org.junit.AfterClass;
import org.junit.runners.Parameterized.Parameters;

public class TemplateSeleniumStudio extends TemplateSelenium {

	static int countTests = 0;

	public TemplateSeleniumStudio(eBrowser browser,
			boolean launchServerOnlyOneTime) {
		this.browserName = browser;
		this.launchServerOnlyOneTime = launchServerOnlyOneTime;

	}

	public void maximizeWindow() {

	}

	@Parameters
	public static Collection<Object[]> data() {
		Object[][] data = new Object[][] { { eBrowser.chrome, true } };
		return Arrays.asList(data);
	}

	// protected void closeAndLaunchServerWithSolution()throws Exception
	// {
	// }
	//

	static protected void killChromeDriver() {
		Utils.killChromeDriver();
	}

	static protected void killWakandaServer() {

	}

	@AfterClass
	public static void afterClass() {
		// clearDrivers();
		// killChromeDriver();
		// killWakandaServer();

	}

}
