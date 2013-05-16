package org.wakanda.wastudio.runtime.calendar;

import static org.wakanda.wastudio.utils.SeleniumUtil.countWebElements;
import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

import org.wakanda.wastudio.common.TemplateSelenium;
import org.wakanda.wastudio.common.TemplateRuntimeTestClass.eBrowser;

public class CalendarEvents extends TemplateSelenium {
	
		public CalendarEvents(eBrowser browser,String solutionName,boolean launchServerOnlyOneTime) {
		this.browserName = browser;
		this.launchServerOnlyOneTime=launchServerOnlyOneTime;
		this.solutionName = solutionName;
		}
		
		@Parameters
		public static Collection<Object[]> data() {
		Object[][] data = new Object[][] { { eBrowser.chrome,"CalendarEvents" ,true } };
		return Arrays.asList(data);
		}

	
		@Test
		public void calendarTestClickEvent() {
			logger.info("beginning test : calendarTestClickEvent");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By
						.xpath("//*[@id='calendar1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By
					.xpath("//*[@id='calendar1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = fDriver.findElement(By.xpath("//*[@id='calendar1']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")
					+ " perfom Click");
			calendar.click();

			
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void calendarTestDoubleClickEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='calendar1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='calendar1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = fDriver.findElement(By.xpath("//*[@id='calendar1']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.doubleClick(calendar).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void calendarTestMousedownEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='calendar1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='calendar1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = fDriver.findElement(By.xpath("//*[@id='calendar1']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.clickAndHold(calendar).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void calendarTestMouseUpEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='calendar3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='calendar3']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = fDriver.findElement(By.xpath("//*[@id='calendar3']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(calendar).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void calendarTestMouseOverEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='calendar2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='calendar2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = fDriver.findElement(By.xpath("//*[@id='calendar2']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(calendar).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}

	/*	@Test
		public void calendarTestMouseOutEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='calendar2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='calendar2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = fDriver.findElement(By.xpath("//*[@id='calendar2']"));
			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText3']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(calendar).perform(); 
			
			builder.click(text).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText3').getValue()"));	
			assertEquals("mouseout", binding);
		}
		*/
		
}
