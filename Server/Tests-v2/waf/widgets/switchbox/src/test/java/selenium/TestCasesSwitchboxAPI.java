package selenium;

import static org.junit.Assert.*;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class TestCasesSwitchboxAPI extends Template {

	public TestCasesSwitchboxAPI(eBrowser browser, String solutionName, boolean launchServerOnlyOneTime) {
		super(browser, solutionName, launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------
	
	@Test
	public void testSwitchbox_slide_true() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').slide(true);");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check slide() API", "true", result);
	}

	@Test
	public void testSwitchbox_slide_false() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').slide(false);");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check slide() API", "false", result);
	}

	@Test
	public void testSwitchbox_toggleSlide() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').toggleSlide();");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check toggleSlide() API", "true", result);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testSwitchbox_getValue() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check getValue() API", "false", result);
	}
	
	@Test
	public void testSwitchbox_setValue() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setValue('off');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check setValue() API", "false", result);
	}
	
	@Test
	public void testSwitchbox_hide() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').hide();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}
	
	@Test
	public void testSwitchbox_show() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').hide();" +
				"$$('switchbox1').show();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testSwitchbox_toggle() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}
	
	@Test
	public void testSwitchbox_toggle_back() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').toggle();" +
				"$$('switchbox1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}
	
	@Test
	public void testSwitchbox_addClass() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').addClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check addClass() API", "true", result);
	}
	
	@Test
	public void testSwitchbox_removeClass() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').addClass('toto');" +
				"$$('switchbox1').removeClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check removeClass() API", "false", result);
	}
	
	@Test
	public void testSwitchbox_move() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').move(0,0);");
		Thread.sleep(500);
		
		WebElement myElement = fDriver.findElement(By.id("switchbox1"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testSwitchbox_resize_smaller() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("switchbox1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSwitchbox_resize_bigger() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("switchbox1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSwitchbox_setWidth() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("switchbox1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}
	
	@Test
	public void testSwitchbox_getWidth() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('switchbox1').getWidth() +'';");;
		assertEquals("Check getWidth() API", "77", result);
	}
	
	@Test
	public void testSwitchbox_setHeight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("switchbox1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}
	
	@Test
	public void testSwitchbox_getHeight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('switchbox1').getHeight() +'';");;
		assertEquals("Check getHeight() API", "27", result);
	}
	
	@Test
	public void testSwitchbox_setLeft() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("switchbox1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}
	
	@Test
	public void testSwitchbox_setRight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testSwitchbox_setTop() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("switchbox1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testSwitchbox_setBottom() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}
	
	@Test
	public void testSwitchbox_getPosition() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "55", result);

		result = (String) js.executeScript("return $$('switchbox1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "31", result);
	}
	
	@Test
	public void testSwitchbox_destroy() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').destroy();");
		Thread.sleep(500);
		
		try{
			fDriver.findElement(By.id("switchbox1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testSwitchbox_disable() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').slide(false);" +
				"$$('switchbox1').disable();" +
				"$$('switchbox1').slide(true);");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check disable() API", "false", result);
	}
	
	@Test
	public void testSwitchbox_enable() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').disable();" +
				"$$('switchbox1').enable();" +
				"$$('switchbox1').slide(true);");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check enable() API", "true", result);
	}
	
	@Test
	public void testSwitchbox_getTheme() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}
	
	@Test
	public void testSwitchbox_setBackgroundColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Test
	public void testSwitchbox_setTextColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setTextColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("switchbox1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Test
	public void testSwitchbox_setParent() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setParent($$('container1'));");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("container1")).findElement(By.id("switchbox1"));
	}
	
	@Test
	public void testSwitchbox_getParent() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setParent($$('container1'));");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}
	
	@Test
	public void testSwitchbox_setErrorDiv() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}
	
	@Test
	public void testSwitchbox_getErrorDiv() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('switchbox1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}
	
	@Test
	public void testSwitchbox_setLabelText() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setLabelText('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("Check setLabelText() API", "toto", result);
	}
	
	@Test
	public void testSwitchbox_setLabelTextColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
		fDriver.findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('switchbox1').setLabelTextColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("Check setLabelTextColor() API", "rgba(101,0,146,1)", result);
	}
	
}
