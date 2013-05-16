package org.wakanda.wastudio.checkbox.api;

import static org.junit.Assert.*;

import org.junit.Test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.qa.widgets.template.TestCasesTemplateWidget;

public class TestCasesCheckboxAPI extends TestCasesTemplateWidget {

	public TestCasesCheckboxAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------
	
	@Test
	public void testCheckbox_check() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("check")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}
	
	@Test
	public void testCheckbox_uncheck() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("check")).click();
		getWebDriver().findElement(By.id("uncheck")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	@Test
	public void testCheckbox_toggleCheckbox() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("toggleCheckbox")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}
	
	@Test
	public void testCheckbox_toggleCheckbox_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("toggleCheckbox")).click();
		getWebDriver().findElement(By.id("toggleCheckbox")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	@Test
	public void testCheckbox_setValue_true() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setValue_true")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}

	@Test
	public void testCheckbox_setValue_false() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setValue_false")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testCheckbox_hide() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testCheckbox_show() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		getWebDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testCheckbox_toggle() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testCheckbox_toggle_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testCheckbox_addClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_removeClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		getWebDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCheckbox_move() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = getWebDriver().findElement(By.id("checkbox1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testCheckbox_resize_smaller() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("checkbox1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testCheckbox_resize_bigger() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("checkbox1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testCheckbox_setWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("checkbox1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCheckbox_getWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("16", myResult);
	}
	
	@Test
	public void testCheckbox_setHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("checkbox1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCheckbox_getHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("16", myResult);
	}
	
	@Test
	public void testCheckbox_setLeft() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("checkbox1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCheckbox_setRight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testCheckbox_setTop() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("checkbox1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testCheckbox_setBottom() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testCheckbox_getPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("checkbox1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCheckbox_destroy() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			getWebDriver().findElement(By.id("checkbox1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testCheckbox_disable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("setValue_true")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		Boolean myClass = getWebDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("waf-state-selected");
		assertEquals(false, myClass);
		
		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myValue);
	}
	
	@Test
	public void testCheckbox_enable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("enable")).click();
		getWebDriver().findElement(By.id("setValue_true")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		Boolean myClass = getWebDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("waf-state-selected");
		assertEquals(true, myClass);
		
		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myValue);
	}
	
	@Test
	public void testCheckbox_getTheme() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testCheckbox_setBackgroundColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testCheckbox_setTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("checkbox1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testCheckbox_setParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		getWebDriver().findElement(By.id("richText1")).findElement(By.id("checkbox1"));
	}
	
	@Test
	public void testCheckbox_getParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		getWebDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testCheckbox_setErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_getErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_setErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_clearErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		getWebDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCheckbox_clear() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setValue_true")).click();
		getWebDriver().findElement(By.id("clear")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	@Test
	public void testCheckbox_setLabelText() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Test
	public void testCheckbox_setLabelTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		getWebDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
		
}
