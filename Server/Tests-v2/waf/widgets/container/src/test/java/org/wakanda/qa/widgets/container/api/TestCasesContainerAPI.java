package org.wakanda.qa.widgets.container.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.qa.widgets.template.TestCasesTemplateWidget;

public class TestCasesContainerAPI extends TestCasesTemplateWidget {

	public TestCasesContainerAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------

	@Test
	public void testContainer_getSplitPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("getSplitPosition")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("96", myResult);
	}
	
	@Test
	public void testContainer_setSplitPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setSplitPosition")).click();
		getWebDriver().findElement(By.id("getSplitPosition")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("50", myResult);
	}
	
	@Test
	public void testContainer_collapseSplitter() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("collapseSplitter")).click();
		getWebDriver().findElement(By.id("getSplitPosition")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myResult);
	}
	
	@Test
	public void testContainer_expandSplitter() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("collapseSplitter")).click();
		getWebDriver().findElement(By.id("expandSplitter")).click();
		getWebDriver().findElement(By.id("getSplitPosition")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("96", myResult);
	}
	
	@Test
	public void testContainer_toggleSplitter() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("toggleSplitter")).click();
		getWebDriver().findElement(By.id("getSplitPosition")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myResult);
	}
	
	@Test
	public void testContainer_toggleSplitter_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("toggleSplitter")).click();
		getWebDriver().findElement(By.id("toggleSplitter")).click();
		getWebDriver().findElement(By.id("getSplitPosition")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("96", myResult);
	}

	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testContainer_hide() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testContainer_show() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		getWebDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testContainer_toggle() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testContainer_toggle_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testContainer_addClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("container1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testContainer_removeClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		getWebDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("container1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testContainer_move() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = getWebDriver().findElement(By.id("container1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testContainer_resize_smaller() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("container1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testContainer_resize_bigger() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("container1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testContainer_setWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("container1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testContainer_getWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("200", myResult);
	}
	
	@Test
	public void testContainer_setHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("container1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testContainer_getHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("200", myResult);
	}
	
	@Test
	public void testContainer_setLeft() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("container1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testContainer_setRight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testContainer_setTop() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("container1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testContainer_setBottom() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testContainer_getPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("container1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testContainer_destroy() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			getWebDriver().findElement(By.id("container1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testContainer_disable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("textField5")).isEnabled();
		assertEquals(false, myResult);
		
		Boolean myResult2 = getWebDriver().findElement(By.id("textField6")).isEnabled();
		assertEquals(false, myResult2);
	}

	@Test
	public void testContainer_enable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("enable")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("textField5")).isEnabled();
		assertEquals(true, myResult);
		
		Boolean myResult2 = getWebDriver().findElement(By.id("textField6")).isEnabled();
		assertEquals(true, myResult2);
	}
	
	@Test
	public void testContainer_getTheme() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testContainer_setBackgroundColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testContainer_setTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("container1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testContainer_setParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		getWebDriver().findElement(By.id("richText1")).findElement(By.id("container1"));
	}
	
	@Test
	public void testContainer_getParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		getWebDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testContainer_setErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testContainer_getErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testContainer_setErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testContainer_clearErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		getWebDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testContainer_clear() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setValue_true")).click();
		getWebDriver().findElement(By.id("clear")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testContainer_setLabelText() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Ignore
	public void testContainer_setLabelTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/containerAPI.html");
		getWebDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

	
}
