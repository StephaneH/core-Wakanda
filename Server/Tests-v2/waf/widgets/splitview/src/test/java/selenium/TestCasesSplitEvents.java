package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesSplitEvents extends Template {

	public TestCasesSplitEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testSplit_onClick() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/splitViewEvents.html");
		fDriver.findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#splitView1').simulate('click');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onClick').getValue();");
		assertEquals("onClick events: ", "1", result);
	}
	
	@Test
	public void testSplit_onDoubleClick() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/splitViewEvents.html");
		fDriver.findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#splitView1').trigger('dblclick');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onDblClick').getValue();");
		assertEquals("onDblClick events: ", "1", result);
	}
	
	@Test
	public void testSplit_onMouseDown() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/splitViewEvents.html");
		fDriver.findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#splitView1').simulate('mousedown');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseDown').getValue();");
		assertEquals("onMouseDown events: ", "1", result);
	}
	
	@Test
	public void testSplit_onMouseOut() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/splitViewEvents.html");
		fDriver.findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#splitView1').simulate('mouseout');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseOut').getValue();");
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Test
	public void testSplit_onMouseUp() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/splitViewEvents.html");
		fDriver.findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#splitView1').simulate('mouseup');");
		Thread.sleep(500);
	
		String result = (String) js.executeScript("return $$('textField_onMouseUp').getValue();");
		assertEquals("onMouseUp events: ", "1", result);
	}

	@Test
	public void testSplit_onMouseOver() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/splitViewEvents.html");
		fDriver.findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#splitView1').simulate('mouseover');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseOver').getValue();");
		assertEquals("onMouseOver events: ", "1", result);
	}

}
