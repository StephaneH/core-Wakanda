package org.wakanda.qa.widgets.dialog.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesDialogEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/WidgetEvents/WidgetsEvents.waSolution";
		AdminCommand.startServer(TestCasesDialogEvents.class,Paths.solutionRelativePath);
	}
	
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/dialogEvents.html");
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testDialog_onClick() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#dialog1').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testDialog_onDoubleClick() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#dialog1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testDialog_onMouseDown() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#dialog1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Ignore
	public void testDialog_onMouseMove() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#dialog1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testDialog_onMouseOut() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#dialog1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testDialog_onMouseOver() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#dialog1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testDialog_onMouseUp() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#dialog1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

}
