package org.wakanda.qa.widgets.combobox.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesComboboxEvents extends TestCasesTemplate {

	public TestCasesComboboxEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testCombobox_onBlur() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-autocomplete-input').simulate('blur');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "blur"));
	}
	
	@Test
	public void testCombobox_onFocus() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-autocomplete-input').simulate('focus');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "focus"));
	}

	@Ignore 
	// Aucune solution viable n'a encore était trouvé avec une simulation de click
	public void testCombobox_onChange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('combobox1').setValue(2);");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testCombobox_onChange_withAPI() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('combobox1').setValue(2);");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "change"));
	}
	
	@Test
	public void testCombobox_onClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.ui-autocomplete-input').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}

	@Test
	public void testCombobox_onMouseDown() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#combobox1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testCombobox_onMouseMove() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#combobox1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
	}
	
	@Test
	public void testCombobox_onMouseOut() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#combobox1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals( 1, StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testCombobox_onMouseOver() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#combobox1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testCombobox_onMouseUp() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#combobox1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onmouseup"));
	}
}
