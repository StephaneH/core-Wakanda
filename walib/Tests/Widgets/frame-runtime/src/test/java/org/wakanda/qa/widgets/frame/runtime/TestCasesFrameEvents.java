package org.wakanda.qa.widgets.frame.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesFrameEvents extends TestCasesTemplate {

	public TestCasesFrameEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testFrame_onLoad() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/frameEvents.html");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onLoad"));
	}
	
}
