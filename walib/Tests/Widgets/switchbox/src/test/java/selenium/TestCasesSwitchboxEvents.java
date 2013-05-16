package selenium;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesSwitchboxEvents extends Template {

	public TestCasesSwitchboxEvents(eBrowser browser, String solutionName, boolean launchServerOnlyOneTime) {
		super(browser, solutionName, launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------

	@Test
	public void testSwitchbox_onClick() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').simulate('click');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onClick events: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testSwitchbox_onMouseDown() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseDown events: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testSwitchbox_onMouseMove() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseMove events: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testSwitchbox_onMouseOut() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOut events: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testSwitchbox_onMouseOver() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOver events: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testSwitchbox_onMouseUp() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseUp events: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}
	
	//------------------------------------------------------------------------
	// Mobile Events (It does not update the CSS)
	//------------------------------------------------------------------------

	@Test
	public void testSwitchbox_onTouchStart() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').triggerHandler('touchstart');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onTouchStart events: "+stack, 1, StringUtils.countMatches(stack, "touchstart"));
	}
	
	@Test
	public void testSwitchbox_onTouchMove() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').triggerHandler('touchmove');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onTouchMove events: "+stack, 1, StringUtils.countMatches(stack, "touchmove"));
	}
	
	@Test
	public void testSwitchbox_onTouchEnd() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').triggerHandler('touchend');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onTouchEnd events: "+stack, 1, StringUtils.countMatches(stack, "touchend"));
	}
	
	@Test
	public void testSwitchbox_onTouchCancel() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
		fDriver.findElement(By.id("switchbox1"));
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		js.executeScript("$('#switchbox1').triggerHandler('touchcancel');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onTouchCancel events: "+stack, 1, StringUtils.countMatches(stack, "touchcancel"));
	}
}
