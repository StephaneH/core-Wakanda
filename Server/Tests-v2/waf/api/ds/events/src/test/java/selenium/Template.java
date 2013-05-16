package selenium;

import java.util.Arrays;
import java.util.Collection;

import org.junit.BeforeClass;
import org.junit.runners.Parameterized.Parameters;

import org.wakanda.wastudio.common.TemplateSelenium;
import org.wakanda.wastudio.common.Utils;

public class Template extends TemplateSelenium{

	int timeOut = 5; // Seconds
	
	public Template(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
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
			{ eBrowser.firefox,"datasourceEvents",true }
			//{ eBrowser.ie },
			//{ eBrowser.chrome }
		};
		return Arrays.asList(data);
	}
	
	
}
