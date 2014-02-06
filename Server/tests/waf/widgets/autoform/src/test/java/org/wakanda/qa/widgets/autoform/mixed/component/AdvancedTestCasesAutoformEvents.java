package org.wakanda.qa.widgets.autoform.mixed.component;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class AdvancedTestCasesAutoformEvents extends SeleniumRuntimeTemplate {
    @BeforeClass
    public static void beforeTestSuite() throws URISyntaxException, IOException{
	startServer(AdvancedTestCasesAutoformEvents.class, "/solutions/mixedwidgetEvents/mixedwidgetEvents Solution/mixedwidgetEvents.waSolution");
    }
    
    @Before
    public void beforeTest(){
	selenium.getDriver().get("http://127.0.0.1:8081/autoFormEvents.html");
	selenium.getDriver().navigate().refresh();
	selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
    }
    @Test
    public void testAutoform_onErrorHandler() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('#autoForm1_ID').val('wrongValue').blur();");
	js.executeScript("$$('autoForm1').saveEntity();");
	Thread.sleep(500);
	
	String stack = (String)js.executeScript("return $('#richText1').text();");
	assertEquals("StackTrace: "+stack, 0, StringUtils.countMatches(stack, "onError"));
    }
    
    @Test
    public void testAutoform_onStartResize() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('.ui-resizable-se').simulate('mouseover');");
	js.executeScript("$('.ui-resizable-se').simulate('drag', {dx:150, dy:150})");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "startResize"));
    }
    
    @Test
    public void testAutoform_onResize() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('.ui-resizable-se').simulate('mouseover');");
	js.executeScript("$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, true, stack.contains("onResize"));
    }
    
    @Test
    public void testAutoform_onStopResize() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('.ui-resizable-se').simulate('mouseover');");
	js.executeScript("$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "stopResize"));
    }
    
}
