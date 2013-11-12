package org.wakanda.qa.widgets.chart.mixed.component;

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

public class AdvancedTestCasesChartEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/mixedwidgetEvents/mixedwidgetEvents Solution/mixedwidgetEvents.waSolution";
		AdminCommand.startServer(AdvancedTestCasesChartEvents.class,Paths.solutionRelativePath);
	}
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/chartEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("richText1"), 5);
	}
	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------

	@Test
	public void testChart_onStartResize() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
		"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "startResize"));
	}

	@Test
	public void testChart_onResize() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
		"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("onResize"));
	}

	@Test
	public void testChart_onStopResize() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
		"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "stopResize"));
	}

	@Test
	public void testChart_onClick() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#canvas1').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}

	@Test
	public void testChart_onDoubleClick() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#canvas1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testChart_onMouseDown() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#canvas1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}

	@Test
	public void testChart_onMouseOut() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#canvas1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testChart_onMouseOver() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#canvas1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testChart_onMouseUp() throws InterruptedException
	{
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('#canvas1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

}
