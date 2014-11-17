package selenium;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.junit.BeforeClass;
//import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_SourceNavigation extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCases_SourceNavigation.class, "/widgetDS/widgetDS Solution/widgetDS.waSolution");		
	} 
  
   
    public static void launchHTMLPage(String url){
		selenium.getDriver().get(url);
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    //------------------------------------------------------------------------
    // bindDatasource method
    //------------------------------------------------------------------------
    
    @Test
    public void pageSize_method_s1() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript("var len =10;"+
				"var mywidget = $$('dsWidget1');" +		
				"return mywidget.pageSize();");
				assertEquals(20, result);
    }
    
    
    @Test
    public void pageSize_method_s2() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +
				"result.push(mywidget.pageSize());" +
				"mywidget.pageSize(30);" +
				"result.push(mywidget.pageSize());" +
				"return result;");
				
				
				assertEquals(20,result.get(0).longValue());
				assertEquals(30,result.get(1).longValue());
    }
    
    
    @Test
    public void start_method_s1() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		long result =  (Long) js.executeScript("var len =10;"+
				"var mywidget = $$('dsWidget1');" +		
				"return mywidget.start();");
				assertEquals(0, result);
    }
    
    
    @Test
    public void start_method_s2() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +
				"result.push(mywidget.start());" +
				"mywidget.start(5);" +
				"result.push(mywidget.start());" +
				"return result;");
				
				
				assertEquals(0,result.get(0).longValue());


    }
    
    
    @Test
    public void navigationMode_method_s1() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String result =  (String) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"mywidget.navigationMode('pagination');"+
				"var len = mywidget.navigationMode();"+
				"return len;");
		
				assertEquals("pagination", result);
    }
    
    
    @Test
    public void navigationMode_method_s2() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String result =  (String) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"mywidget.navigationMode('loadmore');"+
				"var len = mywidget.navigationMode();"+
				"return len;");
		
				assertEquals("loadmore", result);
    }
    
    
    @Test
    public void navigationMode_method_s3 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
    	
    	selenium.getDriver().manage().timeouts().setScriptTimeout(5, TimeUnit.SECONDS);
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +
				"result.push(mywidget.start());" +
				"result.push(mywidget.pageSize());" +
				"mywidget.navigationMode('loadmore');"+
				"return result;");
		
		
		js.executeAsyncScript("source.person.select(50,{onSuccess:function(e){return true;},onError:function(err){return false;}}); return true;","");		
		@SuppressWarnings("unchecked")
		ArrayList<Long> result2 =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +
				"result.push(mywidget.start());" +
				"result.push(mywidget.pageSize());" +		
				"return result;");
		
				assertEquals(0, result.get(0).longValue()); //old start
				assertEquals(20, result.get(1).longValue()); //old start
				assertEquals(0, result2.get(0).longValue()); //new start shouldn't be changed!
				assertEquals(51, result2.get(1).longValue()); //new page should be changed!
    }
    
    
    @Test
    public void navigationMode_method_s4 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +
				"result.push(mywidget.start());" +
				"result.push(mywidget.pageSize());" +
				"mywidget.navigationMode('pagination');"+				
				"source.person.select(50);"+
				"result.push(mywidget.start());" +
				"result.push(mywidget.pageSize());" +
				"return result;");
		
				assertEquals(0, result.get(0).longValue()); //old start
				assertEquals(20, result.get(1).longValue()); //old start
				assertEquals(40, result.get(2).longValue()); //new start should be changed!
				assertEquals(20, result.get(3).longValue()); //new start shouldn't be changed!
    }
    
    
    @Test
    public void currentPage_method_s1 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +	
				"result.push(mywidget.currentPage());" +
				"mywidget.navigationMode('pagination');"+				
				"source.person.select(50);"+
				"result.push(mywidget.currentPage());" +
				"return result;");
		
				assertEquals(1, result.get(0).longValue()); //currentpage before navigation
				assertEquals(3, result.get(1).longValue()); //current page
				
    }
 
    
    @Test
    public void currentPage_method_s2 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +	
				"result.push(mywidget.currentPage());" +
				"mywidget.nextPage();"+				
				"result.push(mywidget.currentPage());" +
				"mywidget.nextPage();"+				
				"result.push(mywidget.currentPage());" +
				"return result;");
		
				assertEquals(1, result.get(0).longValue()); //currentpage before navigation
				assertEquals(2, result.get(1).longValue()); //current page
				assertEquals(3, result.get(2).longValue()); //current page
				
    }
    
    
    @Test
    public void currentPage_method_s3 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
				"var mywidget = $$('dsWidget1');" +
				"var result = [];" +	
				"result.push(mywidget.currentPage());" +
				"mywidget.navigationMode('pagination');"+				
				"source.person.select(50);"+
				"result.push(mywidget.currentPage());" +
				"mywidget.prevPage();"+				
				"result.push(mywidget.currentPage());" +
				"mywidget.prevPage();"+				
				"result.push(mywidget.currentPage());" +
				"return result;");
		
				assertEquals(1, result.get(0).longValue()); //currentpage before navigation
				assertEquals(3, result.get(1).longValue()); //current page
				assertEquals(2, result.get(2).longValue()); //current page
				assertEquals(1, result.get(3).longValue()); //current page
				
    }
    
    
    @Test
    public void loadMore_method_s1 () throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
//    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
//		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		@SuppressWarnings("unchecked")
		
		ArrayList<Long> result =  (ArrayList<Long>) js.executeScript(
						"var mywidget = $$('dsWidget1');" +
						"var result = [];" +
						"result.push(mywidget.pageSize());" +
						"mywidget.loadMore();"+				
						"result.push(mywidget.pageSize());" +
						"return result;");
		
				assertEquals(20, result.get(0).longValue()); //currentpage before navigation
				assertEquals(40, result.get(1).longValue()); //current page
			
				
    }
  
    

}
