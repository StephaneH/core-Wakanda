package org.wakanda.qa.widgets.radiogroup.events;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.templates.Template;

public class TestCasesRadioEvents extends Template {

	public TestCasesRadioEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------

	@Test
	public void testRadio_onChange() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#radioGroup1').change();");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange events: "+stack, 1, StringUtils.countMatches(stack, "change"));
	}
	
	@Test
	public void testRadio_onClick() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#radioGroup1').simulate('click');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onClick events: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testRadio_onMouseDown() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#radioGroup1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseDown events: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testRadio_onMouseMove() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#radioGroup1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseMove events: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testRadio_onMouseOut() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#radioGroup1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOut events: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testRadio_onMouseOver() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#radioGroup1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOver events: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testRadio_onMouseUp() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#radioGroup1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseUp events: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

}
