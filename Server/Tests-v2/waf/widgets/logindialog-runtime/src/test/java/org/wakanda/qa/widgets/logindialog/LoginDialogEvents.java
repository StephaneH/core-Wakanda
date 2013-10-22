package org.wakanda.qa.widgets.logindialog;

import static org.wakanda.common.Common.getResourcePath;
import static org.wakanda.common.Common.serverProcess;
import static org.wakanda.common.Common.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.Paths;
import org.wakanda.templates.SeleniumRuntimeTemplate;

public class LoginDialogEvents extends SeleniumRuntimeTemplate {
	
	
	
		
	
	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		//selenium.deleteDriver();
		Paths.solutionRelativePath = "/solutions/LoginDialogTest/LoginDialogTest Solution/LoginDialogTest.waSolution";
		String solutionPath = getResourcePath(LoginDialogEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);
	}
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/index");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 500);
	}
	//@AfterClass
	/*public static void afterRunning(){
		selenium.deleteDriver();
	}*/
	@Test
	public void checkLogInEvent (){
		logger.info("test case : checkLogInEvent");
		
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		selenium.getDriver().findElement(By.xpath("//*[@id='login1']"));
		selenium.getDriver().findElement(By.xpath("//*[@id='login1']//a[text()='Login']")).click();
		
		logger.info("insert login");
		selenium.getDriver().findElement(By.xpath("//*[@id='name_login_login1']")).clear();
		selenium.getDriver().findElement(By.xpath("//*[@id='name_login_login1']")).sendKeys("test");
		
		logger.info("insert password");
		selenium.getDriver().findElement(By.xpath("//*[@id='password_login_login1']")).clear();
		selenium.getDriver().findElement(By.xpath("//*[@id='password_login_login1']")).sendKeys("test");
		
		logger.info("click login button");
		selenium.getDriver().findElement(By.xpath("//*[@id='button_login_login1']/span")).click();
		
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue();");
		Assert.assertEquals("logged out", actual);
		
	}
	@Test
	public void checkLogOutEvent (){
		logger.info("test case : checkLogOutEvent");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		selenium.getDriver().findElement(By.xpath("//*[@id='login1']"));
		selenium.getDriver().findElement(By.xpath("//*[@id='login1']//a[text()='Logout']")).click();
	
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue();");	
		Assert.assertEquals("logged in", actual);
		
	}

}
