/**
 * @author Ahmed Jaafri
 */
package org.wakanda.wastudio.common;

import java.io.File;

public class TemplateSeleniumStudioModel extends TemplateSeleniumStudio {

	public TemplateSeleniumStudioModel(eBrowser browser,
			boolean launchServerOnlyOneTime) {
		super(browser, launchServerOnlyOneTime);
	}

	public void before() throws Exception {
		Utils.copyFolderImpl(
				new File(getFileFromRessources(getSolutionName(),
						FileSelector.seleniumSolution) + ".model"),
				new File(
						Paths.appStudio.substring(0,
								Paths.appStudio.lastIndexOf("\\"))
								+ "\\Resources\\Web Components\\emEditor\\scripts\\eme.js"));
		super.before();
		fDriver = getWebDriver();
		fDriver.get("http://model.wakanda.net/");
	}
}
