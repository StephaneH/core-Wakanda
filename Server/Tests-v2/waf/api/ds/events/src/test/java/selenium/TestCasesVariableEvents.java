package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesVariableEvents extends Template {

	public TestCasesVariableEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Events
	//------------------------------------------------------------------------
	
	@Test
	public void testVariable_onAttributeChange_withSync() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/variableEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("sources.variableSource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testVariable_onAttributeChange_withAutoDispatch() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/variableEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("variableSource = 'test';" +
				"sources.variableSource.autoDispatch();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

}
