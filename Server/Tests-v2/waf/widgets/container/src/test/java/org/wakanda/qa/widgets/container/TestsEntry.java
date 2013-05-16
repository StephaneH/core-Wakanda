package org.wakanda.qa.widgets.container;

import java.io.File;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.container.api.TestCasesContainerAPI;
import org.wakanda.qa.widgets.container.runtime.TestCasesContainerEvents;
import org.wakanda.wastudio.common.Paths;
import org.wakanda.wastudio.common.Utils;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesContainerAPI.class,
	TestCasesContainerEvents.class
})
public class TestsEntry {
	@BeforeClass
	public static void beforeTestSuite() throws Exception {
		Utils.copyStaticRessources();
	}
	@AfterClass
	public static void clear() throws Exception {
		Utils.killServer();
		Utils.killChromeDriver();
		Utils.killStudio();

		File file = null;
		if (Utils.getOS().equals("win"))
			file = new File(Paths.appStudio.substring(0,Paths.appStudio.lastIndexOf("\\"))+ "\\Resources\\Web Components\\GUIDesigner\\scripts\\designer\\test\\designer-test.js");
		else
			file = new File(Paths.appStudio	+ "/Contents/Resources/Web Components/GUIDesigner/scripts/designer/test/designer-test.js");

		Utils.copyFolderImpl(new File(Paths.tempMac + "/designer-test.js"),	file);
	}
}
