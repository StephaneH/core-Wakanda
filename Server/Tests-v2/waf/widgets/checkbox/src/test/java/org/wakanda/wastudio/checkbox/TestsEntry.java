package org.wakanda.wastudio.checkbox;

import java.io.File;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.wastudio.checkbox.api.TestCasesCheckboxAPI;
import org.wakanda.wastudio.checkbox.runtime.CheckboxEvents;
import org.wakanda.wastudio.checkbox.runtime.TestCasesCheckboxEvents;
import org.wakanda.wastudio.common.Paths;
import org.wakanda.wastudio.common.Utils;
@RunWith(Suite.class)
@Suite.SuiteClasses({
	CheckboxEvents.class,
	TestCasesCheckboxAPI.class,
	TestCasesCheckboxEvents.class
	})
public class TestsEntry{
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
