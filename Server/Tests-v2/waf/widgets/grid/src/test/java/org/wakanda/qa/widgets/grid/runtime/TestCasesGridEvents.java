package org.wakanda.qa.widgets.grid.runtime;

import static org.junit.Assert.assertEquals;

import org.apache.commons.lang.StringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.qa.widgets.template.TestCasesTemplate;

public class TestCasesGridEvents extends TestCasesTemplate {

	public TestCasesGridEvents(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	@Test
	public void testGrid_onHeaderClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/gridEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.waf-dataGrid-col-ID:first').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onHeaderClick"));
	}

	@Ignore
	public void testGrid_onError() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/gridEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.waf-dataGrid-col-ID').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onError"));
	}
	
	@Test
	public void testGrid_onRowDraw() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("onRowDraw"));
	}
	
	@Test
	public void testGrid_onRowClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.waf-dataGrid-row:first').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onRowClick"));
	}
	
	@Test
	public void testGrid_onRowRightClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.waf-widget-content:first').trigger({type: 'contextmenu',which: 3});");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onRowRightClick"));
	}
	
	// Does not throw on cellClick but only on cell/inputClick. 
	@Test
	public void testGrid_onCellClick() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$('.waf-dataGrid-cell:eq(2)').simulate('click');");
		Thread.sleep(500);

		String stack = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onCellClick"));
	}
}
