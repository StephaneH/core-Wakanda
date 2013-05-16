package org.wakanda.qa.widgets.imagebutton.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesImagebuttonEvents extends TestCasesTemplate {

	public TestCasesImagebuttonEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testImage_onClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/imageEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#image1').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testImage_onDoubleClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/imageEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#image1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testImage_onMouseDown() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/imageEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#image1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testImage_onMouseMove() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/imageEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#image1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testImage_onMouseOut() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/imageEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#image1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testImage_onMouseOver() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/imageEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#image1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testImage_onMouseUp() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/imageEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#image1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

}
