package org.wakanda.qa.widgets.combobox.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.qa.widgets.template.TestCasesTemplateWidget;

public class TestCasesComboboxAPI extends TestCasesTemplateWidget {

	public TestCasesComboboxAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------
	
	@Test
	public void testCombobox_addOption() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("addOption")).click();
		Thread.sleep(500);

		String mySelection = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
		assertEquals("aaa", mySelection);
		
		String myOption = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[3]")).getAttribute("innerHTML");
		assertEquals("ccc", myOption);
	}
	
	@Test
	public void testCombobox_addSelectedOption() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("addSelectedOption")).click();
		Thread.sleep(500);

		String mySelection = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
		assertEquals("ccc", mySelection);
		
		String myOption = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[3]")).getAttribute("innerHTML");
		assertEquals("ccc", myOption);
	}

	@Test
	public void testCombobox_removeOption() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("removeOption")).click();
		Thread.sleep(500);

		String mySelection = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
		assertEquals("aaa", mySelection);
		
		// Check if the option is added to option list
		try {
			getWebDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[2]"));
			assertTrue(true);
		} catch (Exception e) {}
	}
	
	@Test
	public void testCombobox_removeAddedOption() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("addSelectedOption")).click();
		getWebDriver().findElement(By.id("removeAddedOption")).click();
		Thread.sleep(500);

		String mySelection = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
		assertEquals("", mySelection);
		
		// Check if the option is added to option list
		try {
			getWebDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[3]")).getAttribute("innerHTML");
			assertTrue(true);
		} catch (Exception e) {}
	}
	
	@Test
	public void testCombobox_setValue() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setValue")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
		assertEquals("bbb", myResult);

		String myIndex = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("1", myIndex);
	}
	
	@Test
	public void testCombobox_getValue() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myIndex = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myIndex);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testCombobox_hide() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testCombobox_show() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		getWebDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testCombobox_toggle() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testCombobox_toggle_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testCombobox_addClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("combobox1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCombobox_removeClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		getWebDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("combobox1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCombobox_move() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = getWebDriver().findElement(By.id("combobox1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testCombobox_resize_smaller() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("combobox1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testCombobox_resize_bigger() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("combobox1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testCombobox_setWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("combobox1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCombobox_getWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("153", myResult);
	}
	
	@Test
	public void testCombobox_setHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("combobox1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCombobox_getHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("25", myResult);
	}
	
	@Test
	public void testCombobox_setLeft() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("combobox1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCombobox_setRight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testCombobox_setTop() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("combobox1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testCombobox_setBottom() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testCombobox_getPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("combobox1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCombobox_destroy() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			getWebDriver().findElement(By.id("combobox1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testCombobox_disable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.xpath("//*[@id='combobox1']/button")).click();
		Thread.sleep(500);
		
		String myDisplay = getWebDriver().findElement(By.tagName("ul")).getCssValue("display");
		assertEquals("none", myDisplay);
	}
	
	@Test
	public void testCombobox_enable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("enable")).click();
		getWebDriver().findElement(By.xpath("//*[@id='combobox1']/button")).click();
		Thread.sleep(500);
		
		String myDisplay = getWebDriver().findElement(By.tagName("ul")).getCssValue("display");
		assertEquals("block", myDisplay);
	}
	
	@Test
	public void testCombobox_getTheme() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testCombobox_setBackgroundColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testCombobox_setTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("combobox1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testCombobox_setParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		getWebDriver().findElement(By.id("richText1")).findElement(By.id("combobox1"));
	}
	
	@Test
	public void testCombobox_getParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		getWebDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testCombobox_setErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCombobox_getErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCombobox_setErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCombobox_clearErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		getWebDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCombobox_clear() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("clear")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myValue = getWebDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
		assertEquals("", myValue);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("", myResult);
	}
	
	@Test
	public void testCombobox_setLabelText() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Test
	public void testCombobox_setLabelTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
		getWebDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
