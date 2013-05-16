package org.wakanda.qa.widgets.logindialog.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.qa.widgets.template.TestCasesTemplateWidget;

public class TestCasesLoginAPI extends TestCasesTemplateWidget {

	public TestCasesLoginAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------
	
	@Test
	public void testLogin_login() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("login")).click();
		Thread.sleep(500);

		String myLabel = getWebDriver().findElement(By.xpath("//div[@id='login1']/div")).getAttribute("innerHTML");
		assertEquals("Signed in as Donal Duck", myLabel);
		
		String myButton = getWebDriver().findElement(By.tagName("a")).getAttribute("innerHTML");
		assertEquals("Logout", myButton);
	}
	
	@Test
	public void testLogin_showLoginDialog() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("showLoginDialog")).click();
		Thread.sleep(500);

		String myDialog = getWebDriver().findElement(By.className("ui-dialog")).getCssValue("display");
		assertEquals("block", myDialog);
	}
	
	@Test
	public void testLogin_logout() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("login")).click();
		getWebDriver().findElement(By.id("logout")).click();
		Thread.sleep(500);

		String myButton = getWebDriver().findElement(By.tagName("a")).getAttribute("innerHTML");
		assertEquals("Login", myButton);
	}
	
	
	@Test
	public void testLogin_refresh() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("refresh")).click();
		Thread.sleep(500);
		
		String myButton = getWebDriver().findElement(By.tagName("a")).getAttribute("innerHTML");
		assertEquals("Logout", myButton);
	}
	
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testLogin_hide() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testLogin_show() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		getWebDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testLogin_toggle() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testLogin_toggle_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testLogin_addClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("login1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testLogin_removeClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		getWebDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("login1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testLogin_move() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = getWebDriver().findElement(By.id("login1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testLogin_resize_smaller() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("login1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testLogin_resize_bigger() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("login1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testLogin_setWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("login1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testLogin_getWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("185", myResult);
	}
	
	@Test
	public void testLogin_setHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("login1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testLogin_getHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("80", myResult);
	}
	
	@Test
	public void testLogin_setLeft() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("login1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testLogin_setRight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testLogin_setTop() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("login1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testLogin_setBottom() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testLogin_getPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("login1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testLogin_destroy() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			getWebDriver().findElement(By.id("login1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testLogin_disable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.xpath("//div[@id='login1']/div[2]/a")).click();
		Thread.sleep(500);
		
		try{
			getWebDriver().findElement(By.className("ui-dialog"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testLogin_enable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("enable")).click();
		getWebDriver().findElement(By.xpath("//div[@id='login1']/div[2]/a")).click();
		Thread.sleep(500);
		
		getWebDriver().findElement(By.className("ui-dialog"));
	}
	
	@Test
	public void testLogin_getTheme() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testLogin_setBackgroundColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testLogin_setTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("login1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testLogin_setParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		getWebDriver().findElement(By.id("richText1")).findElement(By.id("login1"));
	}
	
	@Test
	public void testLogin_getParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		getWebDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testLogin_setErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testLogin_getErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testLogin_setErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testLogin_clearErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		getWebDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testLogin_clear() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setValue_true")).click();
		getWebDriver().findElement(By.id("clear")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testLogin_setLabelText() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Ignore
	public void testLogin_setLabelTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/loginAPI.html");
		getWebDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
