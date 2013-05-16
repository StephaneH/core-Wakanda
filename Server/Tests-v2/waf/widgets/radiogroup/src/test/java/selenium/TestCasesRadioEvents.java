package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;


public class TestCasesRadioEvents extends Template {

	public TestCasesRadioEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------

	@Test
	public void testRadio_onFocus() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('focus');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onFocus').getValue();");;
		assertEquals("onFocus events: ", "1", result);
	}

	
	@Test
	public void testRadio_onChange() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').change();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onChange').getValue();");;
		assertEquals("onChange events: ", "1", result);
	}

	@Test
	public void testRadio_onBlur() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('blur');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onBlur').getValue();");;
		assertEquals("onBlur events: ", "1", result);
	}

	@Test
	public void testRadio_onClick() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('click');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onClick').getValue();");;
		assertEquals("onClick events: ", "1", result);
	}
	
	@Test
	public void testRadio_onMouseDown() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('mousedown');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseDown').getValue();");;
		assertEquals("onMouseDown events: ", "1", result);
	}
	
	@Test
	public void testRadio_onMouseMove() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('mousemove');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseMove').getValue();");;
		assertEquals("onMouseMove events: ", "1", result);
	}
	
	@Test
	public void testRadio_onMouseOut() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('mouseout');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseOut').getValue();");;
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Test
	public void testRadio_onMouseOver() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('mouseover');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseOver').getValue();");;
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Test
	public void testRadio_onMouseUp() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioEvents.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#radioGroup1-0').simulate('mouseup');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onMouseUp').getValue();");;
		assertEquals("onMouseUp events: ", "1", result);
	}

}
