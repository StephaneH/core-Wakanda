package selenium;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;


public class TestCasesRadioAPI extends Template {

	public TestCasesRadioAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	@Test
	public void testRadio_getValue() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$('#radioGroup1-0').simulate('click');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check getValue() API", "aaa", result);
	}
	
	@Test
	public void testRadio_setValue() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check setValue() API", "bbb", result);
	}
	
	@Test
	public void testRadio_hide() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').hide();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}
	
	@Test
	public void testRadio_show() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').hide();" +
				"$$('radioGroup1').show();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testRadio_toggle() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}
	
	@Test
	public void testRadio_toggle_back() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').toggle();" +
				"$$('radioGroup1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}
	
	@Test
	public void testRadio_addClass() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').addClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check addClass() API", "true", result);
	}
	
	@Test
	public void testRadio_removeClass() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').addClass('toto');" +
				"$$('radioGroup1').removeClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check removeClass() API", "false", result);
	}
	
	@Test
	public void testRadio_move() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').move(0,0);");
		Thread.sleep(500);
		
		WebElement myElement = fDriver.findElement(By.id("radioGroup1"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testRadio_resize_smaller() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("radioGroup1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testRadio_resize_bigger() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("radioGroup1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testRadio_setWidth() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("radioGroup1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}
	
	@Test
	public void testRadio_getWidth() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('radioGroup1').getWidth() +'';");;
		assertEquals("Check getWidth() API", "100", result);
	}
	
	@Test
	public void testRadio_setHeight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("radioGroup1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}
	
	@Test
	public void testRadio_getHeight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('radioGroup1').getHeight() +'';");;
		assertEquals("Check getHeight() API", "36", result);
	}
	
	@Test
	public void testRadio_setLeft() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("radioGroup1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}
	
	@Test
	public void testRadio_setRight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testRadio_setTop() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("radioGroup1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testRadio_setBottom() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}
	
	@Test
	public void testRadio_getPosition() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "77", result);

		result = (String) js.executeScript("return $$('radioGroup1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "26", result);
	}
	
	@Test
	public void testRadio_destroy() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').destroy();");
		Thread.sleep(500);
		
		try{
			fDriver.findElement(By.id("radioGroup1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testRadio_disable() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setValue('aaa');" +
				"$$('radioGroup1').disable();" +
				"$$('radioGroup1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check disable() API", "aaa", result);
	}
	
	@Test
	public void testRadio_enable() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').disable();" +
				"$$('radioGroup1').enable();" +
				"$$('radioGroup1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}
	
	@Test
	public void testRadio_getTheme() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}
	
	@Test
	public void testRadio_setBackgroundColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Test
	public void testRadio_setTextColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setTextColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("radioGroup1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Test
	public void testRadio_setParent() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setParent($$('container1'));");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("container1")).findElement(By.id("radioGroup1"));
	}
	
	@Test
	public void testRadio_getParent() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setParent($$('container1'));");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}
	
	@Test
	public void testRadio_setErrorDiv() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}
	
	@Test
	public void testRadio_getErrorDiv() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}
	
	@Test
	public void testRadio_clear() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').clear();");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('radioGroup1').getValue() + '';");
		assertEquals("Check clear()/getValue() API", "undefined", result);

		result = (String) js.executeScript("return $('#radioGroup1 input').length + '';");
		assertEquals("Check clear()/displayed input API", "0", result);
	}
	
	@Test
	public void testRadio_setLabelText() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setLabelText('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("Check setLabelText() API", "toto", result);
	}
	
	@Test
	public void testRadio_setLabelTextColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/radioAPI.html");
		fDriver.findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('radioGroup1').setLabelTextColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("Check setLabelTextColor() API", "rgba(101,0,146,1)", result);
	}
	
}
