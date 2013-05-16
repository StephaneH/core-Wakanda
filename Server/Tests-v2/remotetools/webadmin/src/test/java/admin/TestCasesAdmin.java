package admin;

import static org.junit.Assert.*;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.python.modules.thread.thread;
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
		
		String projectName = fDriver.findElement(By.id("richText10")).getText();
		
		assertEquals("Solution Name is : ", "adminSol", projectName);
		
	}
	
	@Test
	public void testButtonStop_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);

		String ButtonStop = fDriver.findElement(By.id("startStopSolution")).getText(); 
		
		assertEquals("Solution Name is enabled : ", "Stop Solution", ButtonStop);
		
	}
	
	@Test
	public void testButtonStart_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("startStopSol")).click();
		
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "Start Solution") {
				break;
			}
		}
		
		String ButtonStart = fDriver.findElement(By.id("startStopSolution")).getText(); 

		assertEquals("Solution Name is enabled :", "Start Solution", ButtonStart);
		
	}
	
	@Test
	public void testButtonBrowse_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);

		String ButtonBrowse = fDriver.findElement(By.id("browseText")).getText();
		
		assertEquals("Solution Name is enabled : ", "Browse", ButtonBrowse);
		
	}
	
	@Test
	public void testButtonBrowse_popup_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("browseCont")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.xpath("//*[@id='openModal']")).getAttribute("opacity");
			if (resultsAtt == "1") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}
		
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/a")).click();
	}
	
	@Test
	public void testButtonBrowse_popup_buttonCancel_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("browseText")).click();
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='openModal']/div/button[2]")).getAttribute("innerHTML");

		assertEquals("Browse Solution button cancel is : ", "Cancel", resultsAtt);
	}
	
	@Test
	public void testButtonBrowse_popup_buttonLaunch_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("browseText")).click();
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='openModal']/div/button[1]")).getAttribute("innerHTML");
		
		assertEquals("Browse Solution button launch is : ", "OK", resultsAtt);
	}
	
	
	
	@Test
	public void testButtonBrowse_popup_typeInput_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("browseText")).click();

		try {
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys("/path/to/solution.wa");
	    Thread.sleep(500); 
	    
		assertEquals("Browse Solution button launch is : ", "true" , "true");
	
		} catch (Error e) { 
		
		assertEquals("Browse Solution button launch is : ", "false" , "false");
			
		}
		
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/a")).click();
		
	}
	
	
	@Test
	public void testSolutionName_enabled_combobox() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		fDriver.findElement(By.id("startStopSol")).click();
		
		long end = System.currentTimeMillis() + 10000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "Stop Solution") {
				break;
			}
		}
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $('option').first().text()");
		
		assertEquals("Solution Name is enabled : ", "adminSol (Running)", result);
		
	}
	
	
	
	@Test
	public void testButton_generalInfo_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
				
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='label60']")).getText();

		assertEquals("Button general info is : ", "General Info", resultsAtt);
		
	}
	
	@Test
	public void testTitle_admin_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='richText1']")).getText();
		
		assertEquals("Title administration is : ", "Wakanda Server Administration", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt1_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='richText7']")).getText();
		
		assertEquals("Text for first opt1 is : ", "Datastore cache size:", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt1_result_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='cashSizeValue']")).getText();

		assertEquals("Result for first opt1 is : ", "200 MB", resultsAtt);
		
	} 
	
	@Test
	public void testTab_opt2_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='richText8']")).getText();
		
		assertEquals("Text for first opt2 is : ", "Flush data buffers every:", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt2_result_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='dataBufferValue']")).getText();
		
		assertEquals("Result for first opt2 is : ", "15 s", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt3_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='richText9']")).getText();
		
		assertEquals("Text for first opt3 is : ", "Authentification type:", resultsAtt);
		
	}
	
	@Test
	public void testTab_opt3_result_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='authentificationValue']")).getText();
		
		assertEquals("Result for first opt3 is : ", "basic", resultsAtt);
		
	}
	
	@Test
	public void testEditSolutionSettings_buttonEditSolutionSettings_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='richText2']")).getText();
		
		assertEquals("Solution Name is enabled : ", "Solution Settings", resultsAtt);
		
	}
	
	@Test
	public void testEditProjectSettings_buttonEditProjectSettings_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		String resultsAtt = fDriver.findElement(By.xpath("//*[@id='label7']")).getText();
		
		assertEquals("Solution Name is enabled : ", "Settings", resultsAtt);
		
	}
	
	@Test
	public void testEditSolutionSettings_popup_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.xpath("//*[@id='settingsSol']")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.xpath("//*[@id='solutionsSettingsContainer']")).getAttribute("display");
			if (resultsAtt == "block") {
				assertEquals("Edit Solution Settings is opened : ", "true", "true");
				break;
			}
		}
		
		fDriver.findElement(By.xpath("//*[@id='closeSolSettings']/span")).click();
		
	}
	
	
	@Test
	public void testEditProjectSettings_popup_exist() throws InterruptedException {
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		fDriver.findElement(By.xpath("//*[@id='applicationSettings']")).click();
		
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = fDriver.findElement(By.xpath("//*[@id='settingsContainer']")).getAttribute("display");
			if (resultsAtt == "block") {
				assertEquals("Edit Project Settings is opened : ", "true", "true");
				break;
			}
		}
		
	}
	
	@Test
	public void testOpenSolution_Opening1Solution() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		fDriver.findElement(By.id("browseCont")).click();	
		
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
        
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		
		long end = System.currentTimeMillis() + 1000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
		
			String resultsAtt = (String) js.executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = fDriver.findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
				
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
				
			}
		}
		
		
		
		String solutionName1Project = (String) js.executeScript("return $('option').first().text()");
		
		assertEquals("Solution Name is : ", "adminSolution1 (Running)", solutionName1Project);
		
		Utils.killServer();	
	}
	
	@Test
	public void testOpenSolution_Opening1Solution_https() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("https://127.0.0.1:4433");
		Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		fDriver.findElement(By.id("browseCont")).click();	
		
		Thread.sleep(1000);
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
        
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		
		long end = System.currentTimeMillis() + 1000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
		
			String resultsAtt = (String) js.executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = fDriver.findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
				
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
				
			}
		}
		
	
		
		String solutionName1Project = (String) js.executeScript("return $('option').first().text()");
		
		assertEquals("Solution Name is : ", "adminSolution1 (Running)", solutionName1Project);
		
		Utils.killServer();	
	}
	
	@Test
	public void testOpenSolution_OpeningXSolution() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		fDriver.findElement(By.id("browseCont")).click();
		
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
	
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		
		long end = System.currentTimeMillis() + 1000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
		
			String resultsAtt = (String) js.executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = fDriver.findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
				
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
				
			}
		}
			
		String solutionNameXProject = (String) js.executeScript("return $('option').first().text()");
		
		assertEquals("Solution Name is : ", "adminSolutionProjectX (Running)", solutionNameXProject);
		
		Utils.killServer();		
	}
	
	@Test
	public void testOpenSolution_OpeningXSolution_https() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("https://127.0.0.1:4433");
		Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);

		fDriver.findElement(By.id("browseCont")).click();
		
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
	
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		
		long end = System.currentTimeMillis() + 1000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
		
			String resultsAtt = (String) js.executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = fDriver.findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
				
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
				
			}
		}
	
		
		String solutionNameXProject = (String) js.executeScript("return $('option').first().text()");
		
		assertEquals("Solution Name is : ", "adminSolutionProjectX (Running)", solutionNameXProject);
		
		Utils.killServer();		
	}
	
	
	
	@Test
	public void testXSolutionNameProjects_exists() throws InterruptedException {
		
		int y = 0;
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);

		fDriver.findElement(By.id("browseCont")).click();
		
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
		
		fDriver.findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();

		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		long end = System.currentTimeMillis() + 1000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
		
			String resultsAtt = (String) js.executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = fDriver.findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
				
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
				
			}
		}
		
		
		for(int x = 0; x < 4; x++){
				
			y++;
		
			String xpathName = "//*[@id='clone-richText15-"+x+"-0']";
			
			String projectName = "Project"+ y +"";

			String resultAtt = fDriver.findElement(By.xpath(xpathName)).getText();
	
			assertEquals("Project Name is : ", projectName, resultAtt);
			
	    }
		
		
		Utils.killServer();
	}
	
	
	@Test
	public void testgetMaintenanceSolution_adminSolution1() throws InterruptedException {
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		
		Utils.runTheServer(path);
		
		Utils.killServer();
		
		String path0 = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		
		Utils.runTheServer(path0);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");

		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			if (elementLength > 0) {
				break;
			}
		}
		
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolution1&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul[1]/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		
		String solutionName1Project = fDriver.findElement(By.id("richText10")).getText();

		assertEquals("Solution Name in Maintenance mod is : ", "adminSolution1", solutionName1Project);
	
	
	}
	
	
	@Test
	public void testgetMaintenanceSolution_adminSolutionXProject() throws InterruptedException {

		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		Utils.killServer();
		
		String path0 = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		
		Utils.runTheServer(path0);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(1000);

		Long elementLength = (Long) js.executeScript("return $('#solutionCombobox option').length");
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			if (elementLength > 0) {
				break;
			}
		}
		
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolutionProjectX&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		

		String solutionNameXProject = fDriver.findElement(By.id("richText10")).getText();

		assertEquals("Solution Name in Maintenance mod is : ", "Project1", solutionNameXProject);

		
	}
	
	
	@Test
	public void testButtonVerify_exist() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminMaintenanceSol/adminMaintenanceSol Solution/adminMaintenanceSol.waSolution");
		
		Utils.runTheServer(path);
		
		Utils.killServer();
		
		String path0 = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		
		Utils.runTheServer(path0);
		
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
			Thread.sleep(500);
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		fDriver.findElement(By.id("verifyButton")).click();
		Thread.sleep(1000);
	
		String result = fDriver.findElement(By.id("label6")).getText();
		
		assertEquals("Verify button is : ", "Verify", result);
		
	}
	
	
	@Test
	public void testButtonVerify_functionnal() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminMaintenanceSol/adminMaintenanceSol Solution/adminMaintenanceSol.waSolution");
		
		Utils.runTheServer(path);
		
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
			Thread.sleep(500);
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		Thread.sleep(1000);
		fDriver.findElement(By.id("verifyButton")).click();
		Thread.sleep(1000);
		
		
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
			
			if (result.equals("Data was verified successfully.")) {
				break;
			}
		}
		
		String result2 = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();

		assertEquals("Verify button is : ", "Data was verified successfully.", result2);
		
	}
	
	
	
	@Test
	public void testButtonRepair_exist() throws InterruptedException {
		
		Utils.killServer();

		Utils.runTheServer();
		
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
			Thread.sleep(500);
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		fDriver.findElement(By.id("repairButton")).click();
		Thread.sleep(1000);
		
		String result = fDriver.findElement(By.id("label8")).getText();
		
		assertEquals("Repair button is : ", "Repair", result);	
	
	}
	
	@Test
	public void testButtonRepair_functionnal() throws InterruptedException {
		
		Utils.killServer();
		
		Utils.runTheServer();
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
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
			Thread.sleep(500);
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		
		fDriver.findElement(By.id("repairButton")).click();
		
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
			
			if (result.equals("Data was repaired successfully.")) {
				break;
			}
		}
		
		String result2 = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
		
		assertEquals("Verify button is : ", "Data was repaired successfully.", result2);	
	
	}
	
	@Test
	public void testButtonCompact_exist() throws InterruptedException {
		
		Utils.killServer();

		Utils.runTheServer();
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
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
			Thread.sleep(500);
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
			
		fDriver.findElement(By.id("compactButton")).click();
		Thread.sleep(1000);
		
		String result = fDriver.findElement(By.id("label5")).getText();
		
		assertEquals("Compact button is : ", "Compact", result);	
		
	}
	
	@Test
	public void testButtonCompact_functionnal() throws InterruptedException {
		
		Utils.killServer();
				
		Utils.runTheServer();
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
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
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		Thread.sleep(1000);
		fDriver.findElement(By.id("compactButton")).click();
	
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
			
			if (result.equals("Data was compacted successfully.")) {
				break;
			}
		}
		
		String result2 = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
		
		assertEquals("Verify button is : ", "Data was compacted successfully.", result2);		
		
	}
	
	
	
	@Test
	public void testButtonBackup_exist() throws InterruptedException {

		
		
		Utils.killServer();
				
		Utils.runTheServer();
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
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
			Thread.sleep(500);
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		
		fDriver.findElement(By.id("backupButton")).click();
		Thread.sleep(1000);
		
		String result = fDriver.findElement(By.id("label9")).getText();
		
		assertEquals("Backup button is : ", "Backup", result);	
		
	}
	
	
	@Test
	public void testButtonBackup_functionnal() throws InterruptedException {
		
		Utils.killServer();
				
		Utils.runTheServer();
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
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
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		Thread.sleep(1000);
		fDriver.findElement(By.id("compactButton")).click();
	
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
			
			if (result.equals("Data was compacted successfully.")) {
				break;
			}
		}
		
		String result2 = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
		
		assertEquals("Verify button is : ", "Data was compacted successfully.", result2);		
		
	}

	@Test
	public void testButtonRestore_exist() throws InterruptedException {

		
		Utils.killServer();
				
		Utils.runTheServer();
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
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
			Thread.sleep(500);
			String mySolution = fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}

		
		fDriver.findElement(By.id("backupButton")).click();
		
		fDriver.findElement(By.id("restoreButton")).click();
		Thread.sleep(1000);
		
		String result = fDriver.findElement(By.id("richText3")).getText();
		
		assertEquals("Restore button is : ", "Restore", result);
	
}

	@Test
	public void testButtonRestore_functionnal() throws InterruptedException {
		
		Utils.killServer();
				
		Utils.runTheServer();
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
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
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				
				fDriver.findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				fDriver.findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
				
			} 
			
		}
		
		Thread.sleep(1000);
		fDriver.findElement(By.id("compactButton")).click();
	
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
			
			if (result.equals("Data was restored successfully.")) {
				break;
			}
		}
		
		String result2 = fDriver.findElement(By.xpath("//*[@id='main_project_container']/div[1]")).getText();
		
		assertEquals("Verify button is : ", "Data was restored successfully.", result2);		
		
	}
	
	@Test
	public void testLog_exist() throws InterruptedException {
	
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("showLogsconsole")).getText();
		
		assertEquals("Log space is : ", "Logs", result);
	
	}

	@Test
	public void testSolutionXProject__exist() throws InterruptedException {
		
		Utils.killServer();
		
		String path = Utils.getAbsPathFromClassLocation("/admin/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		
		Utils.runTheServer(path);
		
		fDriver.get("http://127.0.0.1:8080");
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		int y = 0;	
		
		Long elementLengthDiv = (Long) js.executeScript("return  $('.matrix-container').children('div').length");
		
		for (int x = 0; x < elementLengthDiv ; x++) {
			y++;
			Thread.sleep(500);
			String result = fDriver.findElement(By.xpath("//*[@id='clone-richText15-"+ x +"-0']")).getAttribute("innerHTML");
			
			assertEquals("Project"+x+" is available on Maintenance mod : ", "Project"+y+"", result);	
			
		}
		
		Utils.killServer();	
	}
	
	
}
