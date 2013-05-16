package org.wakanda.qa.widgets.slider.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesSliderEvents extends TestCasesTemplate {

	public TestCasesSliderEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testSlider_onCreate() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('slider1').addHandle(80);");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidecreate"));
	}
		
	@Test
	public void testSlider_onStart() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-slider-handle').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidestart"));
	}
	
	@Test
	public void testSlider_onSlide() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-slider-handle').simulate('drag', {dx:10});");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("slide"));
	}
	
	@Test
	public void testSlider_onChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-slider-handle').simulate('drag', {dx:10});");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidechange"));
	}
	
	@Test
	public void testSlider_onStop() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-slider-handle').simulate('drag', {dx:10});");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "slidestop"));
	}

}
