package selenium;

import static org.junit.Assert.*;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

public class TestCasesPopoverAPI extends Template {

	public TestCasesPopoverAPI(eBrowser browserName, String soluString, boolean launchServerOnlyOneTime) {
		super(browserName, soluString, launchServerOnlyOneTime);
	}

	@Test
	public void testPopover_hide() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').hide();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testPopover_show() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').hide();" +
				"$$('popover1').show();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);

	}
	@Test
	public void testPopover_toggle() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testPopover_toggle_back() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').toggle();" + 
				"$$('popover1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testPopover_addClass() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').addClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testPopover_removeClass() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').addClass('toto');" +
					"$$('popover1').removeClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testPopover_move() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').move(0,0);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("popover1"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
	}

	@Test
	public void testPopover_resize_smaller() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("popover1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testPopover_resize_bigger() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("popover1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testPopover_setWidth() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testPopover_getWidth() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('popover1').getWidth() +'';");
		assertEquals("Check getWidth() API", "220", result);
	}

	@Test
	public void testPopover_setHeight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testPopover_getHeight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('popover1').getHeight() +'';");
		assertEquals("Check getHeight() API", "300", result);
	}

	@Test
	public void testPopover_setLeft() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testPopover_setRight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testPopover_setTop() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testPopover_setBottom() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testPopover_getPosition() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('popover1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "124", result);

		result = (String) js.executeScript("return $$('popover1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "35", result);
	}

	@Test
	public void testPopover_destroy() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').destroy();");
		Thread.sleep(500);

		try {
			fDriver.findElement(By.id("popover1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testPopover_disable() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').disable();" +
				"$('#textField1').select();");
		try{
			fDriver.findElement(By.id("textField1")).sendKeys("newValue");
			fDriver.findElement(By.id("textField1")).sendKeys(Keys.ENTER);
		}catch(Exception e){}
		Thread.sleep(500);
			
		String result = (String) js.executeScript("return $$('textField1').getValue();");
		assertEquals("Check disable() API", "oldValue", result);
	}

	@Test
	public void testPopover_enable() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').disable();" +
				"$$('popover1').enable();" +
				"$('#textField1').select();");
		fDriver.findElement(By.id("textField1")).sendKeys("newValue");
		fDriver.findElement(By.id("textField1")).sendKeys(Keys.ENTER);
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField1').getValue();");
		assertEquals("Check enable() API", "newValue", result);
	}

	@Test
	public void testPopover_getTheme() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('popover1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}

	@Test
	public void testPopover_setBackgroundColor() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setBackgroundColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("background-color").replaceAll("\\s", "");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}

	@Test
	public void testPopover_setTextColor() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setTextColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("popover1")).getCssValue("color").replaceAll("\\s", "");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}

	@Test
	public void testPopover_setParent() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setParent($$('container1'));");
		Thread.sleep(500);

		fDriver.findElement(By.id("container1")).findElement(By.id("popover1"));
	}

	@Test
	public void testPopover_getParent() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('popover1').setParent($$('container1'));");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('popover1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}

}
