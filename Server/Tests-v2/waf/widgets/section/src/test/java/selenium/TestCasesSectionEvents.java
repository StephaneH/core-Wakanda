package selenium;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

public class TestCasesSectionEvents extends Template {

	public TestCasesSectionEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	@Test
	public void test_onClick() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').simulate('click');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onClick').getValue();");;
		assertEquals("onClick events: ", "1", result);
	}
	
	@Test
	public void test_onDblClick() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').simulate('dblclick');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onDblClick').getValue();");;
		assertEquals("onDblClick events: ", "1", result);
	}
	
	@Test
	public void test_onMouseDown() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').simulate('mousedown');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onMouseDown').getValue();");;
		assertEquals("onMouseDown events: ", "1", result);
	}
	
	@Test
	public void test_onMouseOut() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').simulate('mouseout');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onMouseOut').getValue();");;
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Test
	public void test_onMouseOver() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').simulate('mouseover');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onMouseOver').getValue();");;
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Test
	public void test_onMouseUp() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').simulate('mouseup');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onMouseUp').getValue();");;
		assertEquals("onMouseUp events: ", "1", result);
	}
	
	@Test
	public void test_onTouchStart() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').trigger('touchstart');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onTouchStart').getValue();");
		assertEquals("onTouchStart events: ", "1", result);
	}
	
	@Test
	public void test_onTouchEnd() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').trigger('touchend');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onTouchEnd').getValue();");
		assertEquals("onTouchEnd events: ", "1", result);
	}
	
	@Test
	public void test_onTouchMove() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').trigger('touchmove');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onTouchMove').getValue();");
		assertEquals("onTouchMove events: ", "1", result);
	}
	
	@Test
	public void test_onTouchCancel() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$('#section1').trigger('touchcancel');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('onTouchCancel').getValue();");
		assertEquals("onTouchCancel events: ", "1", result);
	}
	
}
