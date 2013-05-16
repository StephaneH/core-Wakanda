package selenium;

import static org.junit.Assert.*;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class TestCasesSelectAPI extends Template {

	public TestCasesSelectAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testSelect_getValue() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getValue();");
		assertEquals("Check getValue() API", "aaa", result);
	}
	
	@Test
	public void testSelect_setValue() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getValue();");
		assertEquals("Check setValue() API", "bbb", result);
	}
	
	@Test
	public void testSelect_hide() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').hide();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}
	
	@Test
	public void testSelect_show() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').hide();" +
				"$$('select1').show();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testSelect_toggle() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}
	
	@Test
	public void testSelect_toggle_back() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').toggle();" +
				"$$('select1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}
	
	@Test
	public void testSelect_addClass() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').addClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check addClass() API", "true", result);
	}
	
	@Test
	public void testSelect_removeClass() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').addClass('toto');" +
				"$$('select1').removeClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check removeClass() API", "false", result);
	}
	
	@Test
	public void testSelect_move() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').move(0,0);");
		Thread.sleep(500);
		
		WebElement myElement = fDriver.findElement(By.id("select1"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testSelect_resize_smaller() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("select1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSelect_resize_bigger() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("select1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSelect_setWidth() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("select1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}
	
	@Test
	public void testSelect_getWidth() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('select1').getWidth() +'';");;
		assertEquals("Check getWidth() API", "196", result);
	}
	
	@Test
	public void testSelect_setHeight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("select1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}
	
	@Test
	public void testSelect_getHeight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('select1').getHeight() +'';");;
		assertEquals("Check getHeight() API", "20", result);
	}
	
	@Test
	public void testSelect_setLeft() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("select1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}
	
	@Test
	public void testSelect_setRight() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("select1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testSelect_setTop() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("select1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testSelect_setBottom() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("select1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}
	
	@Test
	public void testSelect_getPosition() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "66", result);

		result = (String) js.executeScript("return $$('select1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "30", result);
	}
	
	@Test
	public void testSelect_destroy() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').destroy();");
		Thread.sleep(500);
		
		try{
			fDriver.findElement(By.id("select1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testSelect_disable() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').disable();" +
				"$$('select1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getValue();");
		assertEquals("Check disable() API", "bbb", result);

		result = (String) js.executeScript("return $('#select1 select').attr('disabled');");
		assertEquals("Check if select is disabled", "disabled", result);
}

	@Test
	public void testSelect_enable() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').disable();" +
				"$$('select1').enable();" +
				"$$('select1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}
	
	@Test
	public void testSelect_getTheme() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}
	
	@Test
	public void testSelect_setBackgroundColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Test
	public void testSelect_setTextColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setTextColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("select1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Test
	public void testSelect_setParent() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setParent($$('container1'));");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("container1")).findElement(By.id("select1"));
	}
	
	@Test
	public void testSelect_getParent() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setParent($$('container1'));");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}
	
	@Test
	public void testSelect_setErrorDiv() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}
	
	@Test
	public void testSelect_getErrorDiv() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}
	
	@Test
	public void testSelect_clear() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').clear();");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('select1').getValue() + '';");
		assertEquals("Check clear() API", "undefined", result);

		result = (String) js.executeScript("return $('#select1 option').length + '';");
		assertEquals("Check clear() API", "0", result);
	}
	
	@Test
	public void testSelect_setLabelText() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setLabelText('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("Check setLabelText() API", "toto", result);
	}
	
	@Test
	public void testSelect_setLabelTextColor() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		fDriver.get("http://127.0.0.1:8081/tablet/selectAPI.html");
		fDriver.findElement(By.id("select1"));
		Thread.sleep(500); // Waiting API to be available
		js.executeScript("$$('select1').setLabelTextColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("Check setLabelTextColor() API", "rgba(101,0,146,1)", result);
	}
	
}
