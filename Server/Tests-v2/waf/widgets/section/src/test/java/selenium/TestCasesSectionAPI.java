package selenium;

import static org.junit.Assert.*;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class TestCasesSectionAPI extends Template {

	public TestCasesSectionAPI(eBrowser browserName, String soluString, boolean launchServerOnlyOneTime) {
		super(browserName, soluString, launchServerOnlyOneTime);
	}

	@Test
	public void test_hide() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').hide();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void test_show() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').hide();" +
				"$$('section1').show();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void test_toggle() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void test_toggle_back() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').toggle();" + 
				"$$('section1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void test_addClass() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').addClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void test_removeClass() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').addClass('toto');" +
					"$$('section1').removeClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void test_move() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').move(0,0);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("section1"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
	}

	@Test
	public void test_resize_smaller() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("section1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void test_resize_bigger() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("section1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void test_setWidth() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void test_getWidth() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('section1').getWidth() +'';");
		assertEquals("Check getWidth() API", "300", result);
	}

	@Test
	public void test_setHeight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void test_getHeight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('section1').getHeight() +'';");
		assertEquals("Check getHeight() API", "162", result);
	}

	@Test
	public void test_setLeft() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void test_setRight() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void test_setTop() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void test_setBottom() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void test_getPosition() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('section1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "36", result);

		result = (String) js.executeScript("return $$('section1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "36", result);
	}

	@Test
	public void test_destroy() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').destroy();");
		Thread.sleep(500);

		try {
			fDriver.findElement(By.id("section1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void test_disable() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').disable();");
		try{
			fDriver.findElement(By.className("waf-switchbox-switch")).click();
		}catch(Exception e){}
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check disable() API", "false", result);
	}

	@Test
	public void test_enable() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').disable();" +
				"$$('section1').enable();");
		fDriver.findElement(By.className("waf-switchbox-switch")).click();
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check enable() API", "true", result);
	}

	@Test
	public void test_getTheme() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('section1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}

	@Test
	public void test_setBackgroundColor() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setBackgroundColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("background-color").replaceAll("\\s", "");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}

	@Test
	public void test_setTextColor() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setTextColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("section1")).getCssValue("color").replaceAll("\\s", "");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}

	@Test
	public void test_setParent() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setParent($$('container1'));");
		Thread.sleep(500);

		fDriver.findElement(By.id("container1")).findElement(By.id("section1"));
	}

	@Test
	public void test_getParent() throws InterruptedException {
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		fDriver.findElement(By.id("section1"));
		Thread.sleep(500);
		js.executeScript("$$('section1').setParent($$('container1'));");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('section1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}

}
