package selenium;

import java.util.Arrays;
import java.util.Collection;

import org.junit.runners.Parameterized.Parameters;

import org.wakanda.wastudio.common.TemplateSelenium;

public class Template extends TemplateSelenium{
	public Template(eBrowser browserName, String solutionName,boolean launchServerOnlyOneTime) {
		super(browserName, solutionName,launchServerOnlyOneTime);
		// TODO Auto-generated constructor stub
	}

	@Parameters
	public static Collection<Object[]> data() {
		Object[][] data = new Object[][] {
			{ eBrowser.chrome, "widgetRadioGroup", true }
			//{ eBrowser.ie },
			//{ eBrowser.chrome }
		};
		return Arrays.asList(data);
	}
}
