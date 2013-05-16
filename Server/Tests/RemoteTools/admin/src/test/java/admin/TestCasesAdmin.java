package admin;

import static org.junit.Assert.*;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.wastudio.common.Utils;

public class TestCasesAdmin extends Template {

@Override
public void maximizeWindow() {}
	
	
	public TestCasesAdmin(eBrowser browserName, String soluString,
			boolean launchServerOnlyOneTime) {
		super(browserName, soluString, launchServerOnlyOneTime);
	}
	 
	
	@Test
	public void testSolutionName() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String solutionName = fDriver.findElement(By.id("solutionName")).getText();
		
		assertEquals("Solution Name is : ", "adminSol", solutionName);
		
	}
	
	@Test
	public void testButtonStop_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);

		String ButtonStop = fDriver.findElement(By.id("label12")).getText(); 
		
		assertEquals("Solution Name is enabled : ", "Stop Solution", ButtonStop);
		
	}
	
	@Test
	public void testButtonStart_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminStopSolutionButton")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.id("adminStartSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		String ButtonStart = fDriver.findElement(By.id("label10")).getAttribute("innerHTML");
		
		assertEquals("Solution Name is enabled :", "Start Solution", ButtonStart);
		
	}
	
	@Test
	public void testButtonBrowse_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);

		String ButtonBrowse = fDriver.findElement(By.id("label9")).getText();
		
		assertEquals("Solution Name is enabled : ", "Browse", ButtonBrowse);
		
	}
	
	@Test
	public void testButtonBrowse_popup_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]")).getAttribute("display");
			if (resultsAtt == "block") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}
		
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[1]/a")).click();
	}
	
	@Test
	public void testButtonBrowse_popup_buttonCancel_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[1]/span")).getAttribute("innerHTML");
		
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[1]/a")).click();
		
		assertEquals("Browse Solution button cancel is : ", "Cancel", resultsAtt);
	}
	
	@Test
	public void testButtonBrowse_popup_buttonLaunch_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[2]/span")).getAttribute("innerHTML");
		
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[1]/a")).click();
		
		assertEquals("Browse Solution button launch is : ", "Launch", resultsAtt);
	}
	
	@Test
	public void testButtonBrowse_popup_typeInput_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		
		try {
		fDriver.findElement(By.id("adminBrowseInput")).sendKeys("/path/to/solution.wa");
	    Thread.sleep(500); 
	    
		assertEquals("Browse Solution button launch is : ", "true" , "true");
	
		} catch (Error e) { 
		
		assertEquals("Browse Solution button launch is : ", "false" , "false");
			
		}
		
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[1]/a")).click();
		
	}
	
	@Test
	public void testSolutionName_disabled() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(2000); 
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			try{
		fDriver.findElement(By.xpath("//img[@class='solution-active-marker']"));
		assertEquals("Solution Name is disabled : ", "true", "true");
			}catch(Exception e){}
        //False
		}
		
		
		String result = (String) js.executeScript("return $('.solution-active-marker').attr('class');");
		
		assertEquals("Solution Name is disabled : ", "solution-active-marker", result);
		
	}
	
	@Test
	public void testSolutionName_enabled() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);

		fDriver.findElement(By.id("adminStartSolutionButton")).click();
		
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.id("adminStopSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $('.solution-maintenance-marker').attr('class');");
		
		assertEquals("Solution Name is enabled : ", "solution-maintenance-marker", result);
		
	}
	
	@Test
	public void testSolutionName_enabled_combobox() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminStopSolutionButton")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.id("adminStartSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $('option').first().text()");
		
		assertEquals("Solution Name is disabled : ", "adminSol", result);
		
	}
	
	
	@Test
	public void testSolutionName_disabled_combobox() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminStartSolutionButton")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String resultsAtt = fDriver.findElement(By.id("adminStopSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $('option').first().text()");
		
		assertEquals("Solution Name is enabled : ", "adminSol (Running)", result);
		
	}
	
	
	
	@Test
	public void testTab_Overview_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
				
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='richText1']")).getText();

		assertEquals("Solution Name is enabled : ", "Overview", resultsAtt);
		
	}
	
	@Test
	public void testTab_Maintenance_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='richText2']")).getText();
		
		assertEquals("Solution Name is enabled : ", "Maintenance", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt1_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/div[1]")).getText();
		
		assertEquals("Solution Name is enabled : ", "Datastore cache size:\n200 MB", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt1_result_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/div[1]/span/span")).getText();

		assertEquals("Solution Name is enabled : ", "200", resultsAtt);
		
	} 
	
	@Test
	public void testTab_opt2_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/div[2]")).getText();
		
		assertEquals("Solution Name is enabled : ", "Flush data buffers every:\n15 seconds", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt2_result_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/div[2]/span/span")).getText();
		
		assertEquals("Solution Name is enabled : ", "15", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt3_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/div[3]")).getText();
		
		assertEquals("Solution Name is enabled : ", "Authentification type:\nbasic", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt3_result_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/div[3]/span/span")).getText();
		
		assertEquals("Solution Name is enabled : ", "basic", resultsAtt);
		
	}
	
	@Test
	public void testEditSolutionSettings_buttonEditSolutionSettings_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/input")).getAttribute("value");
		
		assertEquals("Solution Name is enabled : ", "Edit Solution Settings", resultsAtt);
		
	}
	
	@Test
	public void testEditProjectSettings_buttonEditProjectSettings_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='projectListOverview']/div/div/input")).getAttribute("value");
		
		assertEquals("Solution Name is enabled : ", "Edit Project Settings", resultsAtt);
		
	}
	
	@Test
	public void testEditSolutionSettings_popup_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.xpath("//*[@id='solutionSettingsOverview']/div/input")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.xpath("//*[@id='adminSettingsContainer']")).getAttribute("display");
			if (resultsAtt == "block") {
				assertEquals("Edit Solution Settings popup is opened : ", "true", "true");
				break;
			}
		}
		
		fDriver.findElement(By.id("adminCancelSettingsButton")).click();
		
	}
	
	
	@Test
	public void testEditProjectSettings_popup_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.xpath("//*[@id='projectListOverview']/div/div/input")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.xpath("//*[@id='adminSettingsContainer']")).getAttribute("display");
			if (resultsAtt == "block") {
				assertEquals("Edit Project Settings popup is opened : ", "true", "true");
				break;
			}
		}
		
		fDriver.findElement(By.id("adminCancelSettingsButton")).click();
		
	}
	
	@Test
	public void testOpenSolution_Opening1Solution() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminBrowseButton")).click();	
		
		fDriver.findElement(By.id("adminBrowseInput")).sendKeys(path);
        
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[2]/span")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String resultsAtt = fDriver.findElement(By.id("adminStopSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		String solutionName1Project = fDriver.findElement(By.id("solutionName")).getText();
		
		assertEquals("Solution Name is : ", "adminSolution1", solutionName1Project);
		
		Utils.killServer();	
	}
	
	@Test
	public void testOpenSolution_Opening1Solution_https() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("https://127.0.0.1:4433");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminBrowseButton")).click();	
		
		fDriver.findElement(By.id("adminBrowseInput")).sendKeys(path);
        
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[2]/span")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String resultsAtt = fDriver.findElement(By.id("adminStopSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		String solutionName1Project = fDriver.findElement(By.id("solutionName")).getText();
		
		assertEquals("Solution Name is : ", "adminSolution1", solutionName1Project);
		
		Utils.killServer();	
	}
	
	@Test
	public void testOpenSolution_OpeningXSolution() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminStopSolutionButton")).click();

		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String resultsAtt = fDriver.findElement(By.id("adminStartSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		fDriver.findElement(By.id("adminBrowseInput")).sendKeys(path);
	
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[2]/span")).click();
		
		Thread.sleep(5000);
		
		String solutionNameXProject = fDriver.findElement(By.id("solutionName")).getText();
		
		assertEquals("Solution Name is : ", "adminSolutionProjectX", solutionNameXProject);
		
		Utils.killServer();		
	}
	
	@Test
	public void testOpenSolution_OpeningXSolution_https() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("https://127.0.0.1:4433");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminStopSolutionButton")).click();

		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String resultsAtt = fDriver.findElement(By.id("adminStartSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		fDriver.findElement(By.id("adminBrowseInput")).sendKeys(path);
	
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[2]/span")).click();
		
		Thread.sleep(5000);
		
		String solutionNameXProject = fDriver.findElement(By.id("solutionName")).getText();
		
		assertEquals("Solution Name is : ", "adminSolutionProjectX", solutionNameXProject);
		
		Utils.killServer();		
	}
	
	@Test
	public void testXSolutionNameProjects_exists() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminStopSolutionButton")).click();

		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String resultsAtt = fDriver.findElement(By.id("adminStartSolutionButton")).getAttribute("display");
			if (resultsAtt == "block") {
				break;
			}
		}
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		fDriver.findElement(By.id("adminBrowseInput")).sendKeys(path);
	
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[2]/span")).click();
		
		Thread.sleep(3000);
		
		for(int x = 1; x < 4; x++){
	        
			String xpathName = "//*[@id='projectListOverview']/div["+x+"]/div/h1";
			String projectName = "Project"+x+"";

			Thread.sleep(500);
			String resultAtt = fDriver.findElement(By.xpath(xpathName)).getText();
			
			assertEquals("Solution Name is : ", projectName, resultAtt);
			
	    }
		
		Utils.killServer();			
	}
	
	@Test
	public void testXEditProjectsSettings_buttonEditProjectSettings_exists() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("adminBrowseButton")).click();
		
		fDriver.findElement(By.id("adminBrowseInput")).sendKeys(path);
	
		fDriver.findElement(By.xpath("//*[@id='waf-body']/div[4]/div[3]/div/button[2]/span")).click();
		
		Thread.sleep(3000);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='projectListOverview']/div/div/input")).getAttribute("value");
		assertEquals("Solution Name is enabled : ", "Edit Project Settings", resultsAtt);
		
		for(int x = 1; x < 4; x++){

			Thread.sleep(500);
			String resultAtt = fDriver.findElement(By.xpath("//*[@id='projectListOverview']/div["+x+"]/div/h1")).getText();
			
			assertEquals("Solution Name is : ", "Project"+x+"", resultAtt);
			
	    }
		
		Utils.killServer();	
	
	}
	
	
	@Test
	public void testgetMaintenanceSolution_adminSolution1() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) fDriver;

		while (System.currentTimeMillis() < 10000) {
			Thread.sleep(500);
			Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		
		Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolution1" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				break;
				
			} 
			
		}
		
		
		String solutionName1Project = fDriver.findElement(By.id("solutionName")).getText();

		assertEquals("Solution Name in Maintenance mod is : ", "adminSolution1", solutionName1Project);
	
	
	}
	
	
	@Test
	public void testSolutionName_disabled_maintenanceAdminSolution1_exist() throws InterruptedException {
		
		
		fDriver.get("http://127.0.0.1:8080");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(2000); 

		while (System.currentTimeMillis() < 10000) {
			Thread.sleep(500);
			Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		
		Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolution1" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				break;
				
			} 
			
		}
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			try{
		fDriver.findElement(By.xpath("//img[@class='solution-active-marker']"));
		assertEquals("Solution Name is disabled : ", "true", "true");
			}catch(Exception e){}
        //False
		}
		
		
		String result = (String) js.executeScript("return $('.solution-active-marker').attr('class');");
		
		assertEquals("AdminSolution1 Name is disabled : ", "solution-active-marker", result);
		
		
	}
	
	
	@Test
	public void testgetMaintenanceSolution_adminSolutionXProject() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) fDriver;

		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		
		Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolutionProjectX" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				break;
				
			} 
			
		}
		
		Thread.sleep(2000);
		String solutionNameXProject = fDriver.findElement(By.id("solutionName")).getText();

		assertEquals("Solution Name in Maintenance mod is : ", "adminSolutionProjectX", solutionNameXProject);

		
	}
	

	@Test
	public void testSolutionName_disabled_maintenanceAdminSolutionXProject_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(2000); 
		
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		
		Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolutionProjectX" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				break;
				
			} 
			
		}
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			try{
		fDriver.findElement(By.xpath("//img[@class='solution-active-marker']"));
		assertEquals("Solution Name is disabled : ", "true", "true");
			}catch(Exception e){}
        //False
		}
		
		
		String result = (String) js.executeScript("return $('.solution-active-marker').attr('class');");
		
		assertEquals("AdminSolutionXProject Name is disabled : ", "solution-active-marker", result);
		
	}
	
	
	
	@Test
	public void testButtonVerify_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("maintenanceTab")).click();
		
		String result = fDriver.findElement(By.id("label1")).getText();
		
		assertEquals("Verify button is : ", "Verify", result);
		
	}
	
	@Test
	public void testButtonRepair_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.xpath("//*[@id='maintenanceTab']")).click();
		
		String result = fDriver.findElement(By.id("label5")).getText();
		
		assertEquals("Repair button is : ", "Repair", result);	
	
	}
	
	@Test
	public void testButtonCompact_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("maintenanceTab")).click();
		
		String result = fDriver.findElement(By.id("label6")).getText();
		
		assertEquals("Compact button is : ", "Compact", result);	
		
	}
	
	@Test
	public void testButtonBackup_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("maintenanceTab")).click();
	
		String result = fDriver.findElement(By.id("label7")).getText();
		
		assertEquals("Backup button is : ", "Backup", result);	
		
	}
	
	@Test
	public void testButtonRestore_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("maintenanceTab")).click();
		
		String result = fDriver.findElement(By.id("label8")).getText();
		
		assertEquals("Restore button is : ", "Restore", result);
	
	}
	
	@Test
	public void testLog_exist() throws InterruptedException {
	
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("maintenanceTab")).click();
		
		String result = fDriver.findElement(By.xpath("//*[@id='wafConsole']/div[1]/h1")).getText();
		
		assertEquals("Log space is : ", "Logs", result);
	
	}
	
	
	@Test
	public void testSolution1Project_RightColumn_exist() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("maintenanceTab")).click();
		
		String result = fDriver.findElement(By.xpath("//*[@id='projectList-adminSolution1-adminSolution1']/div")).getText();
	
		assertEquals("Solution is available on Maintenance mod : ", "adminSolution1", result);
		
		Utils.killServer();
		
	}
	
	@Test
	public void testSolutionXProject__exist() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		
		fDriver.findElement(By.id("maintenanceTab")).click();
		
		Long elementLengthDiv = (Long) js.executeScript("return $('#adminMaintenanceProjectList div').length /2");
		for (int x = 1; x <= elementLengthDiv ; x++) {
			
			String result = fDriver.findElement(By.xpath("//*[@id='projectList-adminSolutionProjectX-Project"+x+"']/div")).getAttribute("innerHTML");
			
		assertEquals("Project"+x+" is available on Maintenance mod : ", "Project"+x+"", result);	
			
		}
		
		Utils.killServer();	
	}
}
