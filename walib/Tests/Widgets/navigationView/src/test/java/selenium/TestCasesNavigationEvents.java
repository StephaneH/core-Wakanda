package selenium;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesNavigationEvents extends Template {

	public TestCasesNavigationEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testNavigation_onClick() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/navigationEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#navigationView1').simulate('click');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onClick events: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testNavigation_onDoubleClick() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/navigationEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#navigationView1').trigger('dblclick');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onDblClick events: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}
	
	@Test
	public void testNavigation_onMouseDown() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/navigationEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#navigationView1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseDown events: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testNavigation_onMouseOut() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/navigationEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#navigationView1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOut events: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testNavigation_onMouseOver() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/navigationEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#navigationView1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseOver events: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testNavigation_onMouseUp() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/navigationEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$('#navigationView1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = fDriver.findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMouseUp events: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

}
