package org.wakanda.wastudio.common;

import java.io.File;
import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;

public class TemplateSeleniumStudioTestSuite {
	protected static Logger logger = Logger
			.getLogger(TemplateSeleniumStudioTestSuite.class);

	@BeforeClass
	public static void beforeTestSuite() throws Exception {
		Utils.copyStaticRessources();

	}

	@AfterClass
	public static void clear() {
		Utils.killServer();
		Utils.killChromeDriver();
		Utils.killStudio();
		try {
			File file = null;

			if (Utils.getOS().equals("win"))
				file = new File(
						Paths.appStudio.substring(0,
								Paths.appStudio.lastIndexOf("\\"))
								+ "\\Resources\\Web Components\\GUIDesigner\\scripts\\designer\\test\\designer-test.js");
			else
				file = new File(
						Paths.appStudio
								+ "/Contents/Resources/Web Components/GUIDesigner/scripts/designer/test/designer-test.js");

			Utils.copyFolderImpl(new File(Paths.tempMac + "/designer-test.js"),
					file);

			logger.info("GUID restored to default");

		} catch (Exception e) {
			logger.info("GUID not restored to default");
		}

	}

}
