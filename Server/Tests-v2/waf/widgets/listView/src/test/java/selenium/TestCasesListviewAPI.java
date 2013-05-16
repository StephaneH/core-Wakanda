package selenium;

import static org.junit.Assert.*;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class TestCasesListviewAPI extends Template {

	public TestCasesListviewAPI(eBrowser browserName, String soluString, boolean launchServerOnlyOneTime) {
		super(browserName, soluString, launchServerOnlyOneTime);
	}

	@Test
	public void testListview_hide() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').hide();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testListview_show() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').hide();" +
				"$$('listView1').show();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testListview_toggle() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testListview_toggle_back() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').toggle();" + 
				"$$('listView1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testListview_addClass() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').addClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testListview_removeClass() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').addClass('toto');" +
					"$$('listView1').removeClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testListview_move() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').move(0,0);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("listView1"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
	}

	@Test
	public void testListview_resize_smaller() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("listView1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testListview_resize_bigger() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("listView1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testListview_setWidth() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testListview_getWidth() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('listView1').getWidth() +'';");
		assertEquals("Check getWidth() API", "320", result);
	}

	@Test
	public void testListview_setHeight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testListview_getHeight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('listView1').getHeight() +'';");
		assertEquals("Check getHeight() API", "300", result);
	}

	@Test
	public void testListview_setLeft() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testListview_setRight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testListview_setTop() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testListview_setBottom() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testListview_getPosition() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('listView1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "50", result);

		result = (String) js.executeScript("return $$('listView1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "41", result);
	}

	@Test
	public void testListview_destroy() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').destroy();");
		Thread.sleep(500);

		try {
			fDriver.findElement(By.id("listView1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testListview_disable() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').disable();");
		fDriver.findElement(By.id("clone-row1-3-0")).click();
		Thread.sleep(500);

		String result = (String) js.executeScript("return $('#clone-row1-3-0').hasClass('waf-state-selected') +'';");
		assertEquals("Check disable() API", "false", result);
	}

	@Test
	public void testListview_enable() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').disable();" +
				"$$('listView1').enable();");
		fDriver.findElement(By.id("clone-row1-3-0")).click();
		Thread.sleep(500);

		String result = (String) js.executeScript("return $('#clone-row1-3-0').hasClass('waf-state-selected') +'';");
		assertEquals("Check enable() API", "true", result);
	}

	@Test
	public void testListview_getTheme() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('listView1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}

	@Test
	public void testListview_setBackgroundColor() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setBackgroundColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("background-color").replaceAll("\\s", "");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}

	@Test
	public void testListview_setTextColor() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setTextColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("listView1")).getCssValue("color").replaceAll("\\s", "");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}

	@Test
	public void testListview_setParent() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setParent($$('toContainer'));");
		Thread.sleep(500);

		fDriver.findElement(By.id("toContainer")).findElement(By.id("listView1"));
	}

	@Test
	public void testListview_getParent() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("listView1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('listView1').setParent($$('toContainer'));");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('listView1').getParent().id;");
		assertEquals("Check getParent() API", "toContainer", result);
	}

}
