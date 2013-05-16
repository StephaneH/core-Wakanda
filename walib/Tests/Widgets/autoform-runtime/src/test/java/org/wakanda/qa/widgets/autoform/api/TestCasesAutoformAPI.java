package org.wakanda.qa.widgets.autoform.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.wakanda.qa.widgets.template.TestCasesTemplateWidget;

public class TestCasesAutoformAPI extends TestCasesTemplateWidget {

	public TestCasesAutoformAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------
	
	@Test
	public void testAutoform_addEntity() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Integer out = 0;
		while(out < 5000){
			Thread.sleep(100);
			out+=100;
			if (fDriver.findElement(By.id("autoForm1_name")).getAttribute("value").equals("emp_1")){
				out=5000;
			}
		}
		js.executeScript("$$('autoForm1').addEntity();");
		Thread.sleep(500);

		assertEquals("Check ID field is empty", "", fDriver.findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("Check name field is empty", "", fDriver.findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	@Test
	public void testAutoform_findEntity() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("addEntity")).click();
		fDriver.findElement(By.id("autoForm1_name")).sendKeys("emp_1");
		fDriver.findElement(By.id("findEntity")).click();
		Thread.sleep(500);
		
		assertEquals("1", fDriver.findElement(By.id("autoForm1_ID")).getAttribute("value"));
	}
	
	@Test
	public void testAutoform_saveEntity() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("addEntity")).click();
		fDriver.findElement(By.id("autoForm1_name")).sendKeys("Donald Duck");
		fDriver.findElement(By.id("saveEntity")).click();
		Thread.sleep(500);
		fDriver.findElement(By.id("autoForm1_name")).sendKeys("Donald Duck");
		fDriver.findElement(By.id("findEntity")).click();
		Thread.sleep(500);
		
		// Check if entity is display
		assertEquals("Donald Duck", fDriver.findElement(By.id("autoForm1_name")).getAttribute("value"));
		Thread.sleep(5000); // Time needed to save into the database. 
	}

	@Test
	public void testAutoform_dropEntity() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("addEntity")).click();
		fDriver.findElement(By.id("autoForm1_name")).sendKeys("Donald Duck");
		fDriver.findElement(By.id("findEntity")).click();
		Thread.sleep(500);

		// Check if entity to delete is found
		assertEquals("Donald Duck", fDriver.findElement(By.id("autoForm1_name")).getAttribute("value"));

		fDriver.findElement(By.id("dropEntity")).click();
		Thread.sleep(500);
		
		// Check if autoform is empty after delete
		assertEquals("", fDriver.findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("", fDriver.findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	@Test
	public void testAutoform_nextEntity() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("nextEntity")).click();
		Thread.sleep(500);

		assertEquals("2", fDriver.findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("emp_2", fDriver.findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	@Test
	public void testAutoform_previousEntity() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("nextEntity")).click();
		fDriver.findElement(By.id("prevEntity")).click();
		Thread.sleep(500);
		
		assertEquals("1", fDriver.findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("emp_1", fDriver.findElement(By.id("autoForm1_name")).getAttribute("value"));
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------

	@Test
	public void testAutoform_hide() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testAutoform_show() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("hide")).click();
		fDriver.findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testAutoform_toggle() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testAutoform_toggle_back() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("toggle")).click();
		fDriver.findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testAutoform_addClass() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = fDriver.findElement(By.id("autoForm1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testAutoform_removeClass() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("addClass")).click();
		fDriver.findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = fDriver.findElement(By.id("autoForm1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testAutoform_move() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = fDriver.findElement(By.id("autoForm1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testAutoform_resize_smaller() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("autoForm1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testAutoform_resize_bigger() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("autoForm1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testAutoform_setWidth() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("autoForm1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testAutoform_getWidth() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("250", myResult);
	}
	
	@Test
	public void testAutoform_setHeight() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("autoForm1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testAutoform_getHeight() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("250", myResult);
	}
	
	@Test
	public void testAutoform_setLeft() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("autoForm1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testAutoform_setRight() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testAutoform_setTop() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("autoForm1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testAutoform_setBottom() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testAutoform_getPosition() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = fDriver.findElement(By.id("autoForm1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testAutoform_destroy() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			fDriver.findElement(By.id("autoForm1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testAutoform_disable() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$$('autoForm1').disable();" +
				"$$('autoForm1_ID').setValue('100');");
		Thread.sleep(500);
		
		String myID = (String) js.executeScript("return $$('autoForm1_ID').val() +'';");
		assertEquals("1", myID);
	}
	
	@Test
	public void testAutoform_enable() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("disable")).click();
		fDriver.findElement(By.id("enable")).click();
		fDriver.findElement(By.id("autoForm1_ID")).click();
		Thread.sleep(500);
		
		Boolean myID = fDriver.findElement(By.id("autoForm1_ID")).isEnabled();
		assertEquals(true, myID);
		
		Boolean myName = fDriver.findElement(By.id("autoForm1_ID")).isEnabled();
		assertEquals(true, myName);
	}
	
	@Test
	public void testAutoform_getTheme() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testAutoform_setBackgroundColor() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testAutoform_setTextColor() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("autoForm1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testAutoform_setParent() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		fDriver.findElement(By.id("richText1")).findElement(By.id("autoForm1"));
	}
	
	@Test
	public void testAutoform_getParent() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setParent")).click();
		fDriver.findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testAutoform_setErrorDiv() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setErrorDiv")).click();
		fDriver.findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testAutoform_getErrorDiv() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setErrorDiv")).click();
		fDriver.findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testAutoform_setErrorMessage() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setErrorDiv")).click();
		fDriver.findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testAutoform_clearErrorMessage() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setErrorDiv")).click();
		fDriver.findElement(By.id("setErrorMessage")).click();
		fDriver.findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testAutoform_clear() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("clear")).click();
		Thread.sleep(500);
		
		assertEquals("", fDriver.findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("", fDriver.findElement(By.id("autoForm1_name")).getAttribute("value"));
	}
	
	@Ignore
	public void testAutoform_setLabelText() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Ignore
	public void testAutoform_setLabelTextColor() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/autoFormAPI.html");
		fDriver.findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = fDriver.findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
}
