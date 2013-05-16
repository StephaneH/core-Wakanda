package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesObjectEvents extends Template {

	public TestCasesObjectEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Events
	//------------------------------------------------------------------------
	
	@Test
	public void testObject_onnameAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/objectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("objectSource = {ID:1, name:'aaa'};" +
				"sources.objectSource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testObject_onIDAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/objectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("objectSource = {ID:1, name:'aaa'};" +
				"sources.objectSource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onIDAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testObject_onCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/objectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("objectSource = {ID:1, name:'aaa'};" +
				"sources.objectSource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testObject_onBeforeCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/objectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("objectSource = {ID:1, name:'aaa'};" +
				"sources.objectSource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
		
}
