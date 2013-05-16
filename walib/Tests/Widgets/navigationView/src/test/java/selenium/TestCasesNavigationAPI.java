package selenium;

import static org.junit.Assert.*;

import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class TestCasesNavigationAPI extends Template {

	public TestCasesNavigationAPI(eBrowser browserName, String soluString, boolean launchServerOnlyOneTime) {
		super(browserName, soluString, launchServerOnlyOneTime);
	}

	@Test
	public void testNavigation_hide() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').hide();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testNavigation_show() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').hide();" + "$$('navigationView1').show();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testNavigation_toggle() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testNavigation_toggle_back() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').toggle();" + "$$('navigationView1').toggle();");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testNavigation_addClass() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').addClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testNavigation_removeClass() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').addClass('toto');" + "$$('navigationView1').removeClass('toto');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testNavigation_move() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').move(0,0);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("navigationView1"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
	}

	@Test
	public void testNavigation_resize_smaller() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("navigationView1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testNavigation_resize_bigger() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("navigationView1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testNavigation_setWidth() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testNavigation_getWidth() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').getWidth() +'';");
		;
		assertEquals("Check getWidth() API", "500", result);
	}

	@Test
	public void testNavigation_setHeight() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testNavigation_getHeight() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').getHeight() +'';");
		;
		assertEquals("Check getHeight() API", "500", result);
	}

	@Test
	public void testNavigation_setLeft() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testNavigation_setRight() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testNavigation_setTop() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testNavigation_setBottom() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testNavigation_getPosition() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "0", result);

		result = (String) js.executeScript("return $$('navigationView1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "0", result);
	}

	@Test
	public void testNavigation_destroy() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').destroy();");
		Thread.sleep(500);

		try {
			fDriver.findElement(By.id("navigationView1"));
			assertTrue(false);
		} catch (Exception e) {
		}
	}

	@Test
	public void testNavigation_disable() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('textField1').setValue('aaa');"
				+ "$$('navigationView1').disable();"
				+ "$$('textField1').setValue('bbb');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('textField1').getValue();");
		assertEquals("Check disable() API", "aaa", result);
	}

	@Test
	public void testNavigation_enable() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').disable();" + "$$('navigationView1').enable();" + "$$('navigationView1').setValue('bbb');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}

	@Test
	public void testNavigation_getTheme() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}

	@Test
	public void testNavigation_setBackgroundColor() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setBackgroundColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("background-color").replaceAll("\\s", "");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}

	@Test
	public void testNavigation_setTextColor() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setTextColor('#650092');");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("navigationView1")).getCssValue("color").replaceAll("\\s", "");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}

	@Ignore
	// No setParent() on NavigationView widget
	public void testNavigation_setParent() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setParent($$('container1'));");
		Thread.sleep(500);

		fDriver.findElement(By.id("container1")).findElement(By.id("navigationView1"));
	}

	@Ignore
	// No setParent() on NavigationView widget
	public void testNavigation_getParent() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setParent($$('container1'));");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}

	@Ignore
	// No setErrorDiv() on NavigationView widget
	public void testNavigation_setErrorDiv() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setErrorDiv('container1');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}

	@Ignore
	// No setErrorDiv() on NavigationView widget
	public void testNavigation_getErrorDiv() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').setErrorDiv('container1');");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('navigationView1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}

	@Ignore
	public void testNavigation_setErrorMessage() throws InterruptedException {
	}

	@Ignore
	public void testNavigation_clearErrorMessage() throws InterruptedException {
	}

	@Ignore
	// API not implemented; should send back a Exception
	public void testNavigation_clear() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/navigationAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('navigationView1').clear();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('body1').getChildren().length +'';");
		assertEquals("Check clear() API", "0", result);
	}

}
