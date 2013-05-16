package org.wakanda.wastudio.text.runtime;

import static org.junit.Assert.assertEquals;
import static org.wakanda.wastudio.utils.SeleniumUtil.countWebElements;

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

public class TextEvents extends TemplateSelenium {
	
		public TextEvents(eBrowser browser,String solutionName,boolean launchServerOnlyOneTime) {
		this.browserName = browser;
		this.launchServerOnlyOneTime=launchServerOnlyOneTime;
		this.solutionName = solutionName;
		}
		
		@Parameters
		public static Collection<Object[]> data() {
		Object[][] data = new Object[][] { { eBrowser.chrome,"TextEvents" ,true } };
		return Arrays.asList(data);
		}

	
		@Test
		public void textTestClickEvent() {
			logger.info("beginning test : textTestClickEvent");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By
						.xpath("//*[@id='richText1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By
					.xpath("//*[@id='richText1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Text not found");

			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText1']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")
					+ " perfom Click");
			text.click();

			
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText4').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void textTestDoubleClickEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='richText1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='richText1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Text not found");

			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText1']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.doubleClick(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText4').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void textTestMousedownEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='richText1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='richText1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Text not found");

			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText1']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.clickAndHold(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText4').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void textTestMouseUpEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='richText3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='richText3']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Text not found");

			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText3']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText4').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void textTestMouseOverEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='richText2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='richText2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Text not found");

			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText2']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText5').getValue()"));	
			assertEquals("mouseover", binding);
		}
	/*
		@Test
		public void textTestMouseOutEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='richText2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='richText2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Text not found");

			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText2']"));
			
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.clickAndHold(text).perform(); 
			
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText5').getValue()"));	
			assertEquals("mouseout", binding);
		}*/
}
