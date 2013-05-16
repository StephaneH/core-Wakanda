package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesPopoverEvents extends Template {

	public TestCasesPopoverEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Touch Events
	//------------------------------------------------------------------------
	
	@Test
	public void testPopover_onTouchStart() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#popover1').trigger('touchstart');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onTouchStart').getValue();");
		assertEquals("onTouchStart events: ", "1", result);
	}
	
	@Test
	public void testPopover_onTouchEnd() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#popover1').trigger('touchend');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onTouchEnd').getValue();");
		assertEquals("onTouchEnd events: ", "1", result);
	}
	
	@Test
	public void testPopover_onTouchCancel() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting Events to be bound
		js.executeScript("$('#popover1').trigger('touchcancel');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField_onTouchCancel').getValue();");
		assertEquals("onTouchCancel events: ", "1", result);
	}

	
}
