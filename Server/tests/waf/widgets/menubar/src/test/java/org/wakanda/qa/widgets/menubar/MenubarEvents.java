package org.wakanda.qa.widgets.menubar;

import static org.wakanda.common.Common.getResourcePath;
import static org.wakanda.common.Common.serverProcess;
import static org.wakanda.common.Common.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.Paths;
import org.wakanda.templates.SeleniumRuntimeTemplate;

public class MenubarEvents extends SeleniumRuntimeTemplate{

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		Paths.solutionRelativePath = "/solutions/widgetEvents/widgetEvents.waSolution";
		String solutionPath = getResourcePath(MenubarEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);
		
	}
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5000);
	}
	
	@Test
	public void checkOnClickEvent (){
		logger.info("test case : checkOnClickEvent");
		selenium.getDriver().findElement(By.xpath("//*[@id='menuBar1']")).click();

		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText4').getValue();");	
		Assert.assertEquals("click event", actual);

	}
	@Test
	public void checkOnMouseDownEvent (){
		logger.info("test case : checkOnMouseDownEvent");

		selenium.getDriver().findElement(By.xpath("//*[@id='menuBar1']")).click();
		selenium.getDriver().findElement(By.xpath("//*[@id='richText5']")).click();

		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText5').getValue();");	
		Assert.assertEquals("mousedown event", actual);

	}

	@Test
	public void checkOnMouseMoveEvent (){
		logger.info("test case : checkOnMouseMoveEvent");
		selenium.getDriver().findElement(By.xpath("//*[@id='menuBar1']")).click();
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText6').getValue();");	

		Assert.assertEquals("mousemove event", actual);

	}

	@Test
	public void checkOnMouseOutEvent (){
		logger.info("test case : checkOnMouseOutEvent");
		selenium.getDriver().findElement(By.xpath("//*[@id='richText7']")).click();
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText7').getValue();");	
		Assert.assertEquals("mouseout event", actual);

	}

	@Test
	public void checkOnMouseOverEvent (){
		logger.info("test case : checkOnMouseOverEvent");
		selenium.getDriver().findElement(By.xpath("//*[@id='menuBar1']")).click();
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText11').getValue();");	
		Assert.assertEquals("mouseover event", actual);

	}

	@Test
	public void checkOnMouseUpEvent (){
		logger.info("test case : checkOnMouseUpEvent");

		selenium.getDriver().findElement(By.xpath("//*[@id='menuBar1']")).click();
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText12').getValue();");	
		Assert.assertEquals("onmouseup event", actual);

	}


}
