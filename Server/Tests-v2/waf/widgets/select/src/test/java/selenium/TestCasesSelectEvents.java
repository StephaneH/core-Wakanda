package selenium;

import static org.junit.Assert.assertEquals;

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
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').focus().blur();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onBlur').getValue();");
		assertEquals("onBlur events: ", "1", result);

	}
	
	@Test
	public void testSelect_onFocus() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').focus();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onFocus').getValue();");
		assertEquals("onFocus events: ", "1", result);
	}
	
	@Test
	public void testSelect_onChange() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').change();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onChange').getValue();");
		assertEquals("onChange events: ", "1", result);
	}
	
	@Test
	public void testSelect_onClick() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').simulate('click');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onClick').getValue();");
		assertEquals("onClick events: ", "1", result);
	}
	
	@Test
	public void testSelect_onMouseDown() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').simulate('mousedown');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseDown').getValue();");
		assertEquals("onMouseDown events: ", "1", result);
	}
	
	@Test
	public void testSelect_onMouseMove() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').simulate('mousemove');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseMove').getValue();");
		assertEquals("onMouseMove events: ", "1", result);
	}
	
	@Test
	public void testSelect_onMouseOut() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').simulate('mouseout');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseOut').getValue();");
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Test
	public void testSelect_onMouseOver() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').simulate('mouseover');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseOver').getValue();");
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Test
	public void testSelect_onMouseUp() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').simulate('mouseup');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseUp').getValue();");
		assertEquals("onMouseUp events: ", "1", result);
	}
	
	//------------------------------------------------------------------------
	// Mobile Events (It does not update the CSS)
	//------------------------------------------------------------------------

	@Test
	public void testSelect_onTouchStart() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').trigger('touchstart');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onTouchStart').getValue();");
		assertEquals("onTouchStart events: ", "1", result);
	}
	
	@Test
	public void testSelect_onTouchEnd() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').trigger('touchend');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onTouchEnd').getValue();");
		assertEquals("onTouchEnd events: ", "1", result);
	}
	
	@Test
	public void testSelect_onTouchCancel() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectEvents.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#select1').trigger('touchcancel');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onTouchCancel').getValue();");
		assertEquals("onTouchCancel events: ", "1", result);
	}

}
