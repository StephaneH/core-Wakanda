package org.wakanda.wastudio.checkbox.runtime;

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

public class CheckboxEvents extends TemplateSelenium {
	
		public CheckboxEvents(eBrowser browser,String solutionName,boolean launchServerOnlyOneTime) {
		this.browserName = browser;
		this.launchServerOnlyOneTime=launchServerOnlyOneTime;
		this.solutionName = solutionName;
		}
		
		@Parameters
		public static Collection<Object[]> data() {
		Object[][] data = new Object[][] { { eBrowser.chrome,"CheckboxEvents" ,true } };
		return Arrays.asList(data);
		}

	
		@Test
		public void checkboxTestClickEvent() {
			logger.info("beginning test : checkboxTestClickEvent");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By
						.xpath("//*[@id='checkbox1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By
					.xpath("//*[@id='checkbox1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = fDriver.findElement(By.xpath("//*[@id='checkbox1']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")
					+ " perfom Click");
			checkbox.click();

			
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

	/*	@Test
		public void checkboxTestChangeEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='checkbox1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='checkbox1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = fDriver.findElement(By.xpath("//*[@id='checkbox1']/input"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("change", binding);
		}
	
	*/
		@Test
		public void checkboxTestMousedownEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='checkbox1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='checkbox1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = fDriver.findElement(By.xpath("//*[@id='checkbox1']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.clickAndHold(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void checkboxTestMouseUpEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='checkbox3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='checkbox3']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = fDriver.findElement(By.xpath("//*[@id='checkbox3']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void checkboxTestMouseOverEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='checkbox2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='checkbox2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = fDriver.findElement(By.xpath("//*[@id='checkbox2']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}
	
		@Test
		public void checkboxTestMouseOutEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='checkbox4']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='checkbox4']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = fDriver.findElement(By.xpath("//*[@id='checkbox4']/input"));
			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText2']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.doubleClick(checkbox).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText2').getValue()"));	
			assertEquals("mouseout", binding);
		}
}
