package org.wakanda;

import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;
import junit.framework.*;


public class NominalTests extends SeleniumRuntimeTemplate 
{
	public static int CurrentTest = 0;
	@BeforeClass
	 public static void beforeTestSuite() throws URISyntaxException, IOException{
	  
		AdminCommand.startServer(NominalTests.class, "/solutions/FileSysSol/FileSysSol Solution/FileSysSol.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8081/index.waPage/index.html");
	 }
	

	
	public void ExecuteCurrentTest(int CurrentTest)
	{
		//*[@id="clone-Check-0-0"]
		////*[@id="clone-Check-7-0"]
		
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.xpath("//*[@id='clone-Check-"+CurrentTest+"-0']"), 3);
		
		
		selenium.getDriver().findElement(By.xpath("//*[@id='clone-Check-"+CurrentTest+"-0']")).click();
		
		//*[@id="clone-Check-0-0"]
		
		
		String result = selenium.getDriver().findElement(By.id("Result")).getAttribute("innerHTML");
		String expected = selenium.getDriver().findElement(By.id("richText3")).getAttribute("innerHTML");
		//*[@id="richText3"]
		
		Assert.assertEquals(expected, result);
		
	}
	
	@Test
	public void SolutionWindowsVAR1() 
	{
		
		ExecuteCurrentTest(CurrentTest++);
	}
	@Test
	public void SolutionMACVAR1()
	{
		ExecuteCurrentTest(CurrentTest++);
	}
	@Test
	public void SolutionWindowsVAR2()
	{
		ExecuteCurrentTest(CurrentTest++);
	}
	@Test
	public void SolutionMACVAR2()
	{
		ExecuteCurrentTest(CurrentTest++);
	}
	@Test
	public void PojectWindowsVAR1()
	{
		ExecuteCurrentTest(CurrentTest++);
	}
	@Test
	public void ProjectMACVAR1()
	{
		ExecuteCurrentTest(CurrentTest++);
	}
	@Test
	public void ProjectWindowsVAR2()
	{
		ExecuteCurrentTest(CurrentTest++);
	}
	@Test
	public void ProjectMACVAR2()
	{
		ExecuteCurrentTest(CurrentTest++);
	}
	
	
}
