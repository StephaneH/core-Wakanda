package org.wakanda.wastudio.icon.runtime;

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
public class IconEvents extends TemplateSelenium {
	
		public IconEvents(eBrowser browser,String solutionName,boolean launchServerOnlyOneTime) {
		this.browserName = browser;
		this.launchServerOnlyOneTime=launchServerOnlyOneTime;
		this.solutionName = solutionName;
		}
		
		@Parameters
		public static Collection<Object[]> getSol() {
		Object[][] data = new Object[][] { { eBrowser.chrome,"IconEvents" ,true } };
		return Arrays.asList(data);
		}

	
		@Test
		public void iconTestClickEvent() {
			logger.info("beginning test : iconTestClickEvent");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='icon1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By
					.xpath("//*[@id='icon1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Icon not found");

			WebElement icon = fDriver.findElement(By.xpath("//*[@id='icon1']"));
			logger.info(icon.getTagName() + ": " + icon.getAttribute("id")
					+ " perfom Click");
			icon.click();

			
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void iconTestDoubleClickEvent() {
			logger.info("beginning test : openIcon");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='icon1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='icon1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Icon not found");

			WebElement icon = fDriver.findElement(By.xpath("//*[@id='icon1']"));
			logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.doubleClick(icon).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void iconTestMousedownEvent() {
			logger.info("beginning test : openIcon");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='icon1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='icon1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Icon not found");

			WebElement icon = fDriver.findElement(By.xpath("//*[@id='icon1']"));
			logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.clickAndHold(icon).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void iconTestMouseUpEvent() {
			logger.info("beginning test : openIcon");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='icon3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='icon3']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Icon not found");

			WebElement icon = fDriver.findElement(By.xpath("//*[@id='icon3']"));
			logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(icon).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void iconTestMouseOverEvent() {
			logger.info("beginning test : openIcon");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='icon2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='icon2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Icon not found");

			WebElement icon = fDriver.findElement(By.xpath("//*[@id='icon2']"));
			logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(icon).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}
	
	/*	@Test
		public void iconTestMouseOutEvent() {
			logger.info("beginning test : openIcon");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='icon2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='icon2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Icon not found");

			WebElement icon = fDriver.findElement(By.xpath("//*[@id='icon2']"));
			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText1']"));
			logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(icon).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText3').getValue()"));	
			assertEquals("mouseout", binding);
		}*/
}
