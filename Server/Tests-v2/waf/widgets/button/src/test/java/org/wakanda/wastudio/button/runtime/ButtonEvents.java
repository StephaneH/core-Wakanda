package org.wakanda.wastudio.button.runtime;

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

import  org.wakanda.wastudio.common.TemplateSelenium;

public class ButtonEvents extends TemplateSelenium {
	
		public ButtonEvents(eBrowser browser,String solutionName,boolean launchServerOnlyOneTime) {
		this.browserName = browser;
		this.launchServerOnlyOneTime=launchServerOnlyOneTime;
		this.solutionName = solutionName;
		}
		
		@Parameters
		public static Collection<Object[]> getSol() {
		Object[][] data = new Object[][] { { eBrowser.chrome,"ButtonEvents" ,true } };
		return Arrays.asList(data);
		}

	
		@Test
		public void buttonTestClickEvent() {
			logger.info("beginning test : buttonTestClickEvent");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='button1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By
					.xpath("//*[@id='button1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement button = fDriver.findElement(By.xpath("//*[@id='button1']"));
			logger.info(button.getTagName() + ": " + button.getAttribute("id")
					+ " perfom Click");
			button.click();

			
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void buttonTestDoubleClickEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='button1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='button1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement button = fDriver.findElement(By.xpath("//*[@id='button1']"));
			logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.doubleClick(button).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void buttonTestMousedownEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='button1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='button1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement button = fDriver.findElement(By.xpath("//*[@id='button1']"));
			logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.clickAndHold(button).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void buttonTestMouseUpEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='button3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='button3']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement button = fDriver.findElement(By.xpath("//*[@id='button3']"));
			logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(button).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void buttonTestMouseOverEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='button2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='button2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement button = fDriver.findElement(By.xpath("//*[@id='button2']"));
			logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(button).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}
	
	/*	@Test
		public void buttonTestMouseOutEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='button2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='button2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement button = fDriver.findElement(By.xpath("//*[@id='button2']"));
			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText1']"));
			logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(button).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText3').getValue()"));	
			assertEquals("mouseout", binding);
		}*/
}
