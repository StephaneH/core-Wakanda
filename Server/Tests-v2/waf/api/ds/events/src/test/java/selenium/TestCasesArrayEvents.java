package selenium;
import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesArrayEvents extends Template {

	public TestCasesArrayEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Events
	//------------------------------------------------------------------------
	
	@Test
	public void testArray_onnameAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/arrayEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onnameAttributeChange').setValue('0');"+
				"arraySource.push({ID:1, name:'aaa'});" +
				"sources.arraySource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testArray_onIDAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/arrayEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onIDAttributeChange').setValue('0');"+
				"arraySource.push({ID:1, name:'aaa'});" +
				"sources.arraySource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onIDAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testArray_onCollectionChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/arrayEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onCollectionChange').setValue('0');"+
				"arraySource.push({ID:1, name:'aaa'});" +
				"sources.arraySource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testArray_onCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/arrayEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onCurrentElementChange').setValue('0');"+
				"arraySource.push({ID:1, name:'aaa'});" +
				"sources.arraySource.sync();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testArray_onBeforeCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/arrayEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onBeforeCurrentElementChange').setValue('0');"+
				"arraySource.push({ID:1, name:'aaa'});" +
				"arraySource.push({ID:2, name:'bbb'});" +
				"sources.arraySource.sync();" +
				"sources.arraySource.selectNext()");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
		
}
