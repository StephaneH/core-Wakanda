package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesClassEvents extends Template {

	public TestCasesClassEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Events
	//------------------------------------------------------------------------
	
	@Test
	public void testClass_onBeforeCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		// onBeforeCurrentElementChange is only thrown after a selection. At start up, there is no result.
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "0", result);
	}
	
	@Test
	public void testClass_onBeforeCurrentElementChange_afterSelect() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onBeforeCurrentElementChange').setValue('0');" +
				"sources.companies.selectNext();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testClass_onCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}
	
	@Test
	public void testClass_onCurrentElementChange_afterSelect() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onCurrentElementChange').setValue('0');" +
				"sources.companies.selectNext();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testClass_onElementSaved() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onElementSaved').setValue('0');" +
				"sources.companies.name = 'update"+System.currentTimeMillis()+"';" +
				"sources.companies.save();");
		Thread.sleep(1000);

		String result = (String) js.executeScript("return $$('textField_onElementSaved').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testClass_onCollectionChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testClass_onCollectionChange_afterQuery() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onCollectionChange').setValue('0');" +
				"sources.companies.query('ID = 1');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testClass_onIDAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onIDAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}
	
	@Test
	public void testClass_onnameAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(500);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}
	
	@Test
	public void testClass_onnameAttributeChange_afterSave() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onnameAttributeChange').setValue('0');" +
				"sources.companies.name = 'Unupdated';" +
				"sources.companies.save();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testClass_onempAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/classEvents.html");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onempAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}
	
}
