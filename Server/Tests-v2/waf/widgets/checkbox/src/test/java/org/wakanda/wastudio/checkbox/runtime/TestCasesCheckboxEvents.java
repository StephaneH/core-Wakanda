package org.wakanda.wastudio.checkbox.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesCheckboxEvents extends TestCasesTemplate {

	public TestCasesCheckboxEvents(eBrowser browserName, String soluString,
			boolean launchServerOnlyOneTime) {
		super(browserName, soluString, launchServerOnlyOneTime);
	}

	// ------------------------------------------------------------------------
	// Desktop Events
	// ------------------------------------------------------------------------

	@Test
	public void testCheckbox_onChange() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		getWebDriver().findElement(By.xpath("//*[@id='checkbox1']/input"))
				.click();
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testCheckbox_onChange_withAPI() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('checkbox1').setValue(true);");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testCheckbox_onChange_withLabel() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		getWebDriver().findElement(By.id("label1")).click();
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testCheckbox_onClick() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		getWebDriver().findElement(By.xpath("//*[@id='checkbox1']/input"))
				.click();
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "click"));
	}

	@Test
	public void testCheckbox_onClick_withLabel() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		getWebDriver().findElement(By.id("label1")).click();
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "click"));
	}

	@Test
	public void testCheckbox_onMouseDown() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#checkbox1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mousedown"));
	}

	@Test
	public void testCheckbox_onMouseMove() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#checkbox1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mousemove"));
	}

	@Test
	public void testCheckbox_onMouseOut() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#checkbox1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testCheckbox_onMouseOver() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#checkbox1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testCheckbox_onMouseUp() throws InterruptedException {
		getWebDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('#checkbox1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mouseup"));
	}

}
