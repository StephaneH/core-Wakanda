package org.wakanda.qa.widgets.frame;

import java.io.File;
import java.io.IOException;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;
import org.wakanda.qa.widgets.frame.FrameEvents;
import org.wakanda.wastudio.common.Paths;
import org.wakanda.wastudio.common.TemplateSeleniumStudioTestSuite;
import org.wakanda.wastudio.common.Utils;

@RunWith(Suite.class)
@SuiteClasses({ FrameEvents.class })
public class TestsEntry extends TemplateSeleniumStudioTestSuite {

	@BeforeClass
	public static void beforeTestSuite() throws Exception {
		Utils.copyStaticRessources();
	}

	@AfterClass
	public static void clear() {
		Utils.killServer();
		Utils.killChromeDriver();
		Utils.killStudio();

		File file = null;
		if (Utils.getOS().equals("win"))
			file = new File(
					Paths.appStudio.substring(0,Paths.appStudio.lastIndexOf("\\")) + "\\Resources\\Web Components\\GUIDesigner\\scripts\\designer\\test\\designer-test.js");
		else
			file = new File(Paths.appStudio	+ "/Contents/Resources/Web Components/GUIDesigner/scripts/designer/test/designer-test.js");

		try {
			Utils.copyFolderImpl(new File(Paths.tempMac + "/designer-test.js"),
					file);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
