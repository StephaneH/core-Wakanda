package selenium;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
//import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_WidgetDS extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCases_WidgetDS.class, "/widgetDS/widgetDS Solution/widgetDS.waSolution");		
	} 
  
   
    public static void launchHTMLPage(String url){
		selenium.getDriver().get(url);
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    //------------------------------------------------------------------------
    // bindDatasource method
    //------------------------------------------------------------------------
    
    @Test
    public void pageSize_method() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript("var len =10;"+
				"var mywidget = $$('dsWidget1');" +
				"return mywidget.values.pageSize();");
				assertEquals(30, result);
    }
    
    
    @Test
    public void start_method() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript("var len =10;"+
				"var mywidget = $$('dsWidget1');" +		
				"return mywidget.values.start();");
				assertEquals(0, result);
    }
    
    
    @Test
    public void getPage_method_s1() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var success = function(ev){len = ev.length;};"+
				"var error = function(err){};"+
				"mywidget.values.getPage({ start: 5,    pageSize: 10}, success, error);"+
				"return len;");
		
				assertEquals(10, result);
    }
    
    
    @Test
    public void getPage_method_s2 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var success = function(ev){len = ev.length;};"+
				"var error = function(err){};"+
				"mywidget.values.getPage({pageSize: 12}, success, error);"+
				"return len;");
		
				assertEquals(12, result);
    }
    
    
    @Test
    public void getPage_method_s3 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var success = function(ev){len = ev.length;};"+
				"var error = function(err){};"+
				"mywidget.values.getPage(success, error);"+
				"return len;");
		long pageSize =  (Long) js.executeScript("var len =10;"+
				"var mywidget = $$('dsWidget1');" +
				"return mywidget.values.pageSize();");
				assertEquals(result, pageSize);
    }
    
    
    @Test
    public void fetch_method_s1 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		boolean result =  (Boolean) js.executeScript(
				"source.flagFetch.flagFetch = false;" +
				"var mywidget = $$('dsWidget1');" +				
				"setTimeout(mywidget.values.fetch(),200);"+
				"var test = source.flagFetch.flagFetch;" +
				"return test;");		

				assertEquals(false, result);			
    }
    
    
    @Test
    public void fetch_method_s2 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		boolean result =  (Boolean) js.executeScript(
				"source.flagFetch.flagFetch = false;" +
				"var mywidget = $$('dsWidget1');" +				
				"mywidget.values.fetch({pageSize :10});"+
				"var test = source.flagFetch.flagFetch;" +
				"return test;");		

				assertEquals(true, result);			
    }
    
    
    @Test
    public void fetch_method_s3 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript(
				"source.flagFetch.flagFetch = false;" +
				"var mywidget = $$('dsWidget1');" +				
				"mywidget.values.fetch({start :10});"+
				"var test = source.flagFetch.flagFetch;" +
				"return mywidget.values.start();");		

				assertEquals(10, result);			
    }
    
    
    @Test
    public void fetch_method_s4 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript(
				"source.flagFetch.flagFetch = false;" +
				"var mywidget = $$('dsWidget1');" +				
				"mywidget.values.fetch({start:5, pageSize :10});"+
				"var test = source.flagFetch.flagFetch;" +
				"return mywidget.values.start();");		

				assertEquals(5, result);			
    }
    
    @Test
    public void onPageChanged_method_s1 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		boolean result =  (Boolean) js.executeScript(
				"source.flagFetch.flagFetch = false;" +
				"var mywidget = $$('dsWidget1');" +				
				"var sel = new WAF.Selection('multiple');"+
				"sel.setSelectedRows([1,2,6,8,9,10,12,15,18]);"+
				"var flag = false;"+
				"var success = function(e){flag = sources.flagFetch.flagFetch;};"+
				"var error = function(err){return flag;};"+
				"window.setTimeout(function(){var entCol = sources.person.buildFromSelection(sel,{'onSuccess':success, 'onError':error});return flag;},2000);"+
				"" 
				);		
				//Thread.sleep(200);
				assertEquals(true, result);			
    }
    
    @Test
    public void subscribe_method_s1 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		boolean result =  (Boolean) js.executeScript(
				"source.flagFetch.flagFetch = false;" +
				"var mywidget = $$('dsWidget1');" +				
				"var flag = false;"+
				"var callback = function(e){flag = true;};"+
				"mywidget.values.subscribe('elementSaved', callback);"+
				"sources.person.name = 'nameOfPerson';"+
				"sources.person.save();"+
				"return flag;" 
				);		

		assertEquals(true, result);			
    }
    

}
