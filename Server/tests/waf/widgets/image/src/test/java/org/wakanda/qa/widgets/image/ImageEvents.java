package org.wakanda.qa.widgets.image;

import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class ImageEvents extends SeleniumRuntimeTemplate{

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		
		AdminCommand.startServer(ImageEvents.class, "runtime/solutions/widgetEvents/widgetEvents.waSolution");
	
		

	}
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5000);
	}

	@Test
	public void checkDbClickEvent (){
		logger.info("test case : checkOnClickEvent");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5000);
		Actions act = new Actions(selenium.getDriver());
		WebElement e = selenium.getDriver().findElement(By.id("image1"));
		act.doubleClick(e).perform();
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText2').getValue();");	
		Assert.assertEquals("double click event", actual);

	}
	@Test
	public void checkOnClickEvent (){
		logger.info("test case : checkOnClickEvent");
		selenium.getDriver().findElement(By.xpath("//*[@id='image1']")).click();
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue();");	
		Assert.assertEquals("click event", actual);

	}
	@Test
	public void checkOnMouseDownEvent (){
		logger.info("test case : checkOnMouseDownEvent");
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText3').getValue();");	
		Assert.assertEquals("mousedown event", actual);

	}

	@Test
	public void checkOnMouseMoveEvent (){
		logger.info("test case : checkOnMouseMoveEvent");
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText4').getValue();");	

		Assert.assertEquals("mousemove event", actual);

	}

	@Test
	public void checkOnMouseOutEvent (){
		logger.info("test case : checkOnMouseOutEvent");
		selenium.getDriver().findElement(By.xpath("//*[@id='richText5']")).click();
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText5').getValue();");	
		Assert.assertEquals("", actual);

	}

	@Test
	public void checkOnMouseOverEvent (){
		logger.info("test case : checkOnMouseOverEvent");
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText6').getValue();");	
		Assert.assertEquals("mouseover event", actual);

	}

	@Test
	public void checkOnMouseUpEvent (){
		logger.info("test case : checkOnMouseUpEvent");
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText7').getValue();");	
		Assert.assertEquals("mouseup event", actual);

	}


}
