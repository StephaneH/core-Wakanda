package selenium;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_bindDatasourceAttribute_method extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCases_bindDatasourceAttribute_method.class, "/Untitled465/Untitled465 Solution/Untitled465.waSolution");
	} 
  
    public static void launchHTMLPage(String url){
		selenium.getDriver().get(url);
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    //------------------------------------------------------------------------
    // formatter without argument
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_without_argument() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute('dataClass1.name|lowercase','stringProp')");
		
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return sources.dataClass1.name.toLowerCase();");
		String formatterName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		Long formatterArg =  (Long) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].formatter.arguments.length");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName.equals("lowercase") && formatterArg == 0) ? true : false;  
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with 1 argument type string
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_argument_type_string() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|prefix 'mm' \",'stringProp')");
		
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return 'mm_' + source.dataClass1.name;");
		String formatterName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		Long formatterArg =  (Long) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].formatter.arguments.length");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName.equals("prefix") && formatterArg == 1) ? true : false; 
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with 1 argument type number
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_argument_type_number() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|prefix 123 \",'stringProp')");
		
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return '123_' + source.dataClass1.name;");
		String formatterName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		Long formatterArg =  (Long) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].formatter.arguments.length");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName.equals("prefix") && formatterArg == 1) ? true : false; 
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with 1 argument type datasource expression
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_argument_type_ds_expression() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|prefix dataClass1.ID \",'stringProp')");
		
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return sources.dataClass1.ID +'_'+ sources.dataClass1.name;");
		String formatterName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		Long formatterArg =  (Long) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].formatter.arguments.length");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName.equals("prefix") && formatterArg == 1) ? true : false; 
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with many arguments type string
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_arguments_type_string() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|concat 'aa' 'bb' \",'stringProp')");
		
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return 'aa_bb_'+ sources.dataClass1.name;");
		String formatterName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		Long formatterArg =  (Long) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].formatter.arguments.length");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName.equals("concat") && formatterArg == 2) ? true : false; 
		
		assertEquals(result, true);
		
    }
   
    //------------------------------------------------------------------------
    // formatter with many arguments type number
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_arguments_type_number() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|concat 11 22 \",'stringProp')");
		
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return '11_22_'+ sources.dataClass1.name;");
		String formatterName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		Long formatterArg =  (Long) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].formatter.arguments.length");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName.equals("concat") && formatterArg == 2) ? true : false; 
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with many arguments type datasource expression
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_arguments_type_ds_expression() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute('dataClass1.name|concat dataClass1.ID dataClass1.number','stringProp')");
		
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return sources.dataClass1.ID +'_'+ sources.dataClass1.number +'_' + sources.dataClass1.name;");
		String formatterName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		Long formatterArg =  (Long) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].formatter.arguments.length");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName.equals("concat") && formatterArg == 2) ? true : false; 
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with argument formater type string 
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_argument_formater_type_string() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|lowercase|prefix 'bb'\",'stringProp')");
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return 'bb_'+ sources.dataClass1.name.toLowerCase();");
		String formatterName_1 = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		String formatterName_2 = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[1].name");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName_1.equals("lowercase") && formatterName_2.equals("prefix") ) ? true : false; 
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with argument formater type number 
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_argument_formater_type_number() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|lowercase|prefix 123\",'stringProp')");
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return '123_'+ sources.dataClass1.name.toLowerCase();");
		String formatterName_1 = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		String formatterName_2 = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[1].name");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName_1.equals("lowercase") && formatterName_2.equals("prefix") ) ? true : false; 
		
		assertEquals(result, true);
		
    }
    
    //------------------------------------------------------------------------
    // formatter with many arguments type number expression
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasourceAttribute_with_argument_formater_type_ds_expression() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index/");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').bindDatasourceAttribute(\"dataClass1.name|lowercase|prefix dataClass1.ID\",'stringProp')");
		String actualValue = (String) js.executeScript("return $$('test1').stringProp();");
		String expectedValue = (String) js.executeScript("return  sources.dataClass1.ID + '_'+ sources.dataClass1.name.toLowerCase();");
		String formatterName_1 = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[0].name");
		String formatterName_2 = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().formatters[1].name");
		
		Boolean result = ( actualValue.equals(expectedValue) && formatterName_1.equals("lowercase") && formatterName_2.equals("prefix") ) ? true : false; 
		
		assertEquals(result, true);
		
    }
}
