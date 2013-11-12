package org.wakanda.qa.widgets.component.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesComponentEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{

		Paths.solutionRelativePath  = "/solutions/WidgetEvents/WidgetEvents.waSolution";
		AdminCommand.startServer(TestCasesComponentEvents.class, Paths.solutionRelativePath);
	}

	@Before
	public void beforetest(){
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
	}
	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testComponent_onClick() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#component1').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testComponent_onDoubleClick() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#component1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testComponent_onMouseDown() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#component1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testComponent_onMouseOut() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#component1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testComponent_onMouseOver() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#component1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testComponent_onMouseUp() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#component1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}
}
