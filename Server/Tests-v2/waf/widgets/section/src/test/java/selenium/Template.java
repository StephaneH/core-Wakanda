package selenium;

import java.util.Arrays;
import java.util.Collection;

import org.junit.BeforeClass;
import org.junit.runners.Parameterized.Parameters;

import org.wakanda.wastudio.common.TemplateSelenium;
import org.wakanda.wastudio.common.Utils;

public class Template extends TemplateSelenium{
	public Template(eBrowser browserName, String solutionName,boolean launchServerOnlyOneTime) {
		super(browserName, solutionName,launchServerOnlyOneTime);
		// TODO Auto-generated constructor stub
	}

	@BeforeClass
	public static void beforeTestSuite() throws Exception {
		Utils.copyStaticRessources();
	}
	
	public void before() throws Exception {
		closeAndLaunchServerWithSolution();
		openAndPrepareBrowserInBefore();
	}
	
	@Parameters
	public static Collection<Object[]> data() {
		Object[][] data = new Object[][] {
			{ eBrowser.chrome, "widgetSection", true }
			//{ eBrowser.ie },
			//{ eBrowser.chrome }
		};
		return Arrays.asList(data);
	}
}
