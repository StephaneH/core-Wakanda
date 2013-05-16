package org.wakanda.wastudio.textinput.runtime;

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

public class TextInputEvents extends TemplateSelenium {
	
		public TextInputEvents(eBrowser browser,String solutionName,boolean launchServerOnlyOneTime) {
		this.browserName = browser;
		this.launchServerOnlyOneTime=launchServerOnlyOneTime;
		this.solutionName = solutionName;
		}
		
		@Parameters
		public static Collection<Object[]> data() {
		Object[][] data = new Object[][] { { eBrowser.chrome,"TextInputEvents" ,true } };
		return Arrays.asList(data);
		}

	
		@Test
		public void textInputTestClickEvent() {
			logger.info("beginning test : textInputTestClickEvent");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By
						.xpath("//*[@id='textField1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By
					.xpath("//*[@id='textField1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = fDriver.findElement(By.xpath("//*[@id='textField1']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")
					+ " perfom Click");
			textInput.click();

			
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void textInputTestDoubleClickEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='textField1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='textField1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = fDriver.findElement(By.xpath("//*[@id='textField1']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.doubleClick(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void textInputTestMousedownEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='textField1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='textField1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = fDriver.findElement(By.xpath("//*[@id='textField1']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.clickAndHold(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void textInputTestMouseUpEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='textField3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='textField3']"));
			if (countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = fDriver.findElement(By.xpath("//*[@id='textField3']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void textInputTestMouseOverEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='textField2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='textField2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = fDriver.findElement(By.xpath("//*[@id='textField2']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}
	
		@Test
		public void textInputTestMouseOutEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			fDriver.get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = fDriver.findElement(By.xpath("//*[@id='textField2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = fDriver.findElements(By.xpath("//*[@id='textField2']"));
			if (countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = fDriver.findElement(By.xpath("//*[@id='textField2']"));
			WebElement text = fDriver.findElement(By.xpath("//*[@id='richText2']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(fDriver); 
			builder.click(textInput).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText2').getValue()"));	
			assertEquals("mouseout", binding);
		}
}
