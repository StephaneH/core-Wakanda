package org.wakanda.qa.widgets.dialog.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesDialogEvents extends TestCasesTemplate {

	public TestCasesDialogEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testDialog_onClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/dialogEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#dialog1').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testDialog_onDoubleClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/dialogEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#dialog1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testDialog_onMouseDown() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/dialogEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#dialog1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Ignore
	public void testDialog_onMouseMove() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/dialogEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#dialog1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testDialog_onMouseOut() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/dialogEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#dialog1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testDialog_onMouseOver() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/dialogEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#dialog1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testDialog_onMouseUp() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/dialogEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#dialog1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

}
