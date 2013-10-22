package org.wakanda.wastudio.icon.runtime;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.Common.getResourcePath;
import static org.wakanda.common.Common.serverProcess;
import static org.wakanda.common.Common.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.Paths;
import org.wakanda.templates.SeleniumRuntimeTemplate;

public class TestCasesIconEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/widgetEvents/widgetEvents.waSolution";
		String solutionPath = getResourcePath(TestCasesIconEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);
	}
	@AfterClass
	public static void afterRunning(){
		selenium.deleteDriver();
	}
	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testIcon_onClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/iconEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#icon1').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testIcon_onDoubleClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/iconEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#icon1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testIcon_onMouseDown() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/iconEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#icon1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testIcon_onMouseOut() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/iconEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#icon1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testIcon_onMouseOver() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/iconEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#icon1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testIcon_onMouseUp() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/iconEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#icon1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

}
