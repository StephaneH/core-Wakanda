package org.wakanda.qa.widgets.slider.runtime;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.Common.serverProcess;
import static org.wakanda.common.Common.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.Common;
import org.wakanda.common.Paths;
import org.wakanda.templates.SeleniumRuntimeTemplate;

public class TestCasesSliderEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		Paths.solutionRelativePath = "/solutions/WidgetEvents/WidgetEvents.waSolution";
		String solutionPath = Common.getResourcePath(TestCasesSliderEvents.class, Paths.solutionRelativePath);
		
		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testSlider_onCreate() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$$('slider1').addHandle(80);");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidecreate"));
	}
		
	@Test
	public void testSlider_onStart() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('.ui-slider-handle').simulate('mousedown');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidestart"));
	}
	
	@Test
	public void testSlider_onSlide() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('.ui-slider-handle').simulate('drag', {dx:10});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("slide"));
	}
	
	@Test
	public void testSlider_onChange() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('.ui-slider-handle').simulate('drag', {dx:10});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidechange"));
	}
	
	@Test
	public void testSlider_onStop() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$('.ui-slider-handle').simulate('drag', {dx:10});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidestop"));
	}

}
