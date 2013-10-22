/**
 * @author Ahmed Jaafri
 */
package org.wakanda.wastudio.common;

import java.io.File;

import org.junit.Rule;
import org.junit.rules.TestName;

public class TemplateSeleniumStudioGUI extends TemplateSeleniumStudio {
	@Rule
	public TestName name = new TestName();
	protected String urlGuiDesigner = null;

	public TemplateSeleniumStudioGUI(eBrowser browser,
			boolean launchServerOnlyOneTime) {
		super(browser, launchServerOnlyOneTime);
	}

	public void before() throws Exception {
		super.before();
		logger.info("Before Test Case: " + getSolutionName());
		logger.info("Copy gui file into designer-test.js");
		try {
			if (Utils.getOS().equals("win"))
				Utils.copyFolderImpl(
						new File(getFileFromRessources(getSolutionName(),
								FileSelector.seleniumSolution) + ".gui"),
						new File(
								Paths.appStudio.substring(0,
										Paths.appStudio.lastIndexOf("\\"))
										+ "\\Resources\\Web Components\\GUIDesigner\\scripts\\designer\\test\\designer-test.js"));
			else
				Utils.copyFolderImpl(
						new File(getFileFromRessources(getSolutionName(),
								FileSelector.seleniumSolution) + ".gui"),
						new File(
								Paths.appStudio
										+ "/Contents/Resources/Web Components/GUIDesigner/scripts/designer/test/designer-test.js"));
			logger.info("Copy succeed");
		} catch (Exception e) {
			logger.info("Copy of gui file does not Succeed");
		}

		if (urlGuiDesigner == null)
			urlGuiDesigner = "http://127.0.0.1:8081/guid/guidesigner.html";
		fDriver = getWebDriver();
		fDriver.get(urlGuiDesigner);

	}

}
