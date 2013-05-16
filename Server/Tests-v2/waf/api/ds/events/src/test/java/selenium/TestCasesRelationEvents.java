package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesRelationEvents extends Template {

	public TestCasesRelationEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Events
	//------------------------------------------------------------------------
	
	@Test
	public void testRelation_onBeforeCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		while("" == getWebDriver().findElement(By.id("textField_onBeforeCurrentElementChange")).getAttribute("innerHTML"))
			Thread.sleep(1000);
			
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onBeforeCurrentElementChange').setValue('0');" +
				"sources.emp.selectNext();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testRelation_onCurrentElementChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		Thread.sleep(500);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}
	
	@Test
	public void testRelation_onCurrentElementChange_afterSelect() throws InterruptedException	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		while("" == getWebDriver().findElement(By.id("textField_onCurrentElementChange")).getAttribute("innerHTML"))
			Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onCurrentElementChange').setValue('0');" +
				"sources.emp.selectNext();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testRelation_onElementSaved() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		while("" == getWebDriver().findElement(By.id("textField_onElementSaved")).getAttribute("innerHTML"))
			Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onElementSaved').setValue('0');" +
				"sources.emp.name = 'Updated';" +
				"sources.emp.save();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onElementSaved').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testRelation_onCollectionChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		Thread.sleep(500);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}
	
	@Test
	public void testRelation_onCollectionChange_afterQuery() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		while("" == getWebDriver().findElement(By.id("textField_onCollectionChange")).getAttribute("innerHTML"))
			Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onCollectionChange').setValue('0');" +
				"sources.emp.filterQuery('ID = 1');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testRelation_onIDAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		Thread.sleep(500);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onIDAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}
	
	@Test
	public void testRelation_onnameAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		Thread.sleep(500);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}
	
	@Test
	public void testRelation_onnameAttributeChange_afterSave() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		while("" == getWebDriver().findElement(By.id("textField_onnameAttributeChange")).getAttribute("innerHTML"))
			Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField_onnameAttributeChange').setValue('0');" +
				"sources.emp.name = 'Unupdated';" +
				"sources.emp.save();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
	
	@Test
	public void testRelation_oncompAttributeChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/relationEvents.html");
		Thread.sleep(500);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		String result = (String) js.executeScript("return $$('textField_oncompAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}
	
}
