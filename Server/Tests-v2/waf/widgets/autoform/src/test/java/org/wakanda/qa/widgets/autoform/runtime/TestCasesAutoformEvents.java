package org.wakanda.qa.widgets.autoform.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesAutoformEvents extends TestCasesTemplate {

	public TestCasesAutoformEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	@Test
	public void testAutoform_onErrorHandler() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/autoFormEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#autoForm1_ID').val('wrongValue').blur();$$('autoForm1').saveEntity();");
		Thread.sleep(500);

		String stack = (String)js.executeScript("return $('#richText1').text();");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onError"));
	}
	
	@Test
	public void testAutoform_onStartResize() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/autoFormEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "startResize"));
	}

	@Test
	public void testAutoform_onResize() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/autoFormEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("onResize"));
	}

	@Test
	public void testAutoform_onStopResize() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/autoFormEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "stopResize"));
	}
	
}
