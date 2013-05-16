package org.wakanda.wastudio.textinput.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesInputEvents extends TestCasesTemplate {

	public TestCasesInputEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------

	@Test
	public void testInput_onChange_withBlur() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		getWebDriver().findElement(By.id("textField1")).sendKeys("toto");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('blur');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testInput_onChange_withAPI() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('textField1').setValue('toto');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "change"));
	}
	
	@Test
	public void testInput_onBlur() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('blur');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "blur"));
	}
	
	@Test
	public void testInput_onFocus() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('focus');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "focus"));
	}
	
	@Test
	public void testInput_onClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testInput_onDoubleClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('dblclick');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	@Test
	public void testInput_onMouseDown() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testInput_onMouseMove() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testInput_onMouseOut() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testInput_onMouseOver() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testInput_onMouseUp() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}
	
	@Test
	public void testInput_onKeyDown() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('keydown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "keydown"));
	}

	@Test
	public void testInput_onKeyUp() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('keyup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "keyup"));
	}
	
	@Ignore
	public void testInput_onSelect() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/inputEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#textField1').simulate('select');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "select"));
	}
}
