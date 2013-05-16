package org.wakanda.qa.widgets.template;

import java.util.Arrays;
import java.util.Collection;

import org.junit.runners.Parameterized.Parameters;
import org.wakanda.wastudio.common.TemplateSelenium;

public class TestCasesTemplate extends TemplateSelenium{

	public TestCasesTemplate(eBrowser browserName, String solutionName,boolean launchServerOnlyOneTime) {
		super(browserName, solutionName,launchServerOnlyOneTime);
	}

	@Parameters
	public static Collection<Object[]> data() {
		Object[][] data = new Object[][] {
			{ eBrowser.chrome,"WidgetEvents",true }
		};
		return Arrays.asList(data);
	}

}
