package org.wakanda.wastudio.icon.mixed.component;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.Common.getResourcePath;
import static org.wakanda.common.Common.serverProcess;
import static org.wakanda.common.Common.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.Paths;
import org.wakanda.templates.SeleniumRuntimeTemplate;
public class AdvancedTestCasesIconEvents extends SeleniumRuntimeTemplate {
	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/mixedwidgetEvents/mixedwidgetEvents Solution/mixedwidgetEvents.waSolution";
		String solutionPath = getResourcePath(AdvancedTestCasesIconEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);
	}
   
    @Before
    public void beforeTest() throws Throwable{
	selenium.getDriver().get("http://127.0.0.1:8081/iconEvents.html");
	selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    //------------------------------------------------------------------------
    // Desktop Events
    //------------------------------------------------------------------------
    
   
    
      
    @Test
    public void testIcon_onMouseDown() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#icon1').simulate('mousedown');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
    }
    
    @Test
    public void testIcon_onMouseOut() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#icon1').simulate('mouseout');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
    }
    
    @Test
    public void testIcon_onMouseOver() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#icon1').simulate('mouseover');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
    }
    
    @Test
    public void testIcon_onMouseUp() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#icon1').simulate('mouseup');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
    }
    @Test
    public void testIcon_onClick() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#icon1').simulate('click');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
    }
    @Test
    public void testIcon_onDoubleClick() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#icon1').simulate('dblclick');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
    }
}
