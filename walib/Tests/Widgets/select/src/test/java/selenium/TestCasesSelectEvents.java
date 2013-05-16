package selenium;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesSelectEvents extends Template {

	public TestCasesSelectEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------

	@Test
	public void testSelect_onBlur() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').focus().blur();");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onBlur events: "+stack, 1, StringUtils.countMatches(stack, "blur"));
	}
	
	@Test
	public void testSelect_onFocus() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').focus();");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onFocus events: "+stack, 1, StringUtils.countMatches(stack, "focus"));
	}
	
	@Test
	public void testSelect_onChange() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').change();");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange events: "+stack, 1, StringUtils.countMatches(stack, "change"));
	}
	
	@Test
	public void testSelect_onClick() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').simulate('click');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onClick events: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testSelect_onMouseDown() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseDown events: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testSelect_onMouseMove() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseMove events: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testSelect_onMouseOut() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOut events: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testSelect_onMouseOver() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOver events: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testSelect_onMouseUp() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseUp events: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}
	
	//------------------------------------------------------------------------
	// Mobile Events (It does not update the CSS)
	//------------------------------------------------------------------------

	@Test
	public void testSelect_onTouchStart() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').trigger('touchstart');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onTouchStart events: "+stack, 1, StringUtils.countMatches(stack, "touchstart"));
	}
	
	@Test
	public void testSelect_onTouchEnd() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').trigger('touchend');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onTouchEnd events: "+stack, 1, StringUtils.countMatches(stack, "touchend"));
	}
	
	@Test
	public void testSelect_onTouchCancel() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#select1').trigger('touchcancel');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onTouchCancel events: "+stack, 1, StringUtils.countMatches(stack, "touchcancel"));
	}

}
