package org.wakanda.qa.widgets.menubar.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesMenubarEvents extends TestCasesTemplate {

	public TestCasesMenubarEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	
	@Test
	public void testMenubar_onClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuBar1').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuBar1_click"));
	}

	@Test
	public void testMenubar_onMouseDown() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuBar1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuBar1_mousedown"));
	}
	
	@Test
	public void testMenubar_onMouseMove() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuBar1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuBar1_mousemove"));
	}
	
	@Test
	public void testMenubar_onMouseOut() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuBar1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuBar1_mouseout"));
	}

	@Test
	public void testMenubar_onMouseOver() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuBar1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuBar1_mouseover"));
	}

	@Test
	public void testMenubar_onMouseUp() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuBar1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuBar1_onmouseup"));
	}

	@Test
	public void testMenuitem_onClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuItem1').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuItem1_click"));
	}

	@Test
	public void testMenuitem_onMouseDown() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuItem1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuItem1_mousedown"));
	}
	
	@Test
	public void testMenuitem_onMouseMove() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuItem1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuItem1_mousemove"));
	}
	
	@Test
	public void testMenuitem_onMouseOut() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuItem1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuItem1_mouseout"));
	}

	@Test
	public void testMenuitem_onMouseOver() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuItem1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuItem1_mouseover"));
	}

	@Test
	public void testMenuitem_onMouseUp() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/menubarEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#menuItem1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "menuItem1_onmouseup"));
	}
	
}
