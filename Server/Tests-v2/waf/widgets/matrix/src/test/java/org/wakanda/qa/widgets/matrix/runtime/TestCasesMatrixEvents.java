package org.wakanda.qa.widgets.matrix.runtime;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.Common.getResourcePath;
import static org.wakanda.common.Common.serverProcess;
import static org.wakanda.common.Common.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.Paths;
import org.wakanda.templates.SeleniumRuntimeTemplate;

public class TestCasesMatrixEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/WidgetEvents/WidgetsEvents.waSolution";
		String solutionPath = getResourcePath(TestCasesMatrixEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);
	}
	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------

	@Test
	public void testMatrix_onStartResize() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
				"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "startResize"));
	}

	@Test
	public void testMatrix_onResize() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
				"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("onResize"));
	}

	@Test
	public void testMatrix_onStopResize() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
				"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "stopResize"));
	}
	
	@Test
	public void testMatrix_onClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#matrix1').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testMatrix_onDoubleClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#matrix1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testMatrix_onMouseDown() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#matrix1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testMatrix_onMouseOut() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#matrix1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testMatrix_onMouseOver() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#matrix1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testMatrix_onMouseUp() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#matrix1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

	@Test
	public void testMatrix_onDraw() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 6, StringUtils.countMatches(stack, "onChildrenDraw"));
	}
}
