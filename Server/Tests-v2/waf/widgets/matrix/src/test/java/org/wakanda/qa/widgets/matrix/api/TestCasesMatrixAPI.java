package org.wakanda.qa.widgets.matrix.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.qa.widgets.template.TestCasesTemplateWidget;

public class TestCasesMatrixAPI extends TestCasesTemplateWidget {

	public TestCasesMatrixAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------

	@Test
	public void testMatrix_getCurrentPage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("getCurrentPage")).click();
		Thread.sleep(500);

		String myPage = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myPage);
	}
	
	@Test
	public void testMatrix_getDisplayedRow() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("getDisplayedRow")).click();
		Thread.sleep(500);

		String myRow = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myRow);
	}
	
	@Test
	public void testMatrix_getTotalPages() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("getTotalPages")).click();
		Thread.sleep(500);

		String myPage = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("3", myPage);
	}
	
	@Test
	public void testMatrix_goToFirst() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("goToFirst")).click();
		Thread.sleep(500);
		getWebDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myPage);
	}
	
	@Test
	public void testMatrix_goToLast() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("goToLast")).click();
		Thread.sleep(1000);
		getWebDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("3", myPage);
	}
	
	@Test
	public void testMatrix_goToNextPage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("goToNextPage")).click();
		Thread.sleep(1000);
		getWebDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("2", myPage);
	}
	
	@Test
	public void testMatrix_goToPreviousPage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("goToLast")).click();
		Thread.sleep(1000);
		getWebDriver().findElement(By.id("goToPreviousPage")).click();
		Thread.sleep(1000);
		getWebDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("1", myPage);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testMatrix_hide() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testMatrix_show() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		getWebDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testMatrix_toggle() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testMatrix_toggle_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testMatrix_addClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("matrix1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_removeClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		getWebDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("matrix1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testMatrix_move() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = getWebDriver().findElement(By.id("matrix1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testMatrix_resize_smaller() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("matrix1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testMatrix_resize_bigger() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("matrix1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testMatrix_setWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("matrix1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testMatrix_getWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("201", myResult);
	}
	
	@Test
	public void testMatrix_setHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("matrix1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testMatrix_getHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("77", myResult);
	}
	
	@Test
	public void testMatrix_setLeft() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("matrix1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testMatrix_setRight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testMatrix_setTop() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("matrix1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testMatrix_setBottom() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testMatrix_getPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("matrix1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testMatrix_destroy() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			getWebDriver().findElement(By.id("matrix1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testMatrix_disable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		Thread.sleep(500);
		
		Boolean isEnale = getWebDriver().findElement(By.id("clone-textField1-0-0")).isEnabled();
		assertEquals(false, isEnale);
	}
	
	@Test
	public void testMatrix_enable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("enable")).click();
		Thread.sleep(500);
		
		Boolean isEnale = getWebDriver().findElement(By.id("clone-textField1-0-0")).isEnabled();
		assertEquals(true, isEnale);
	}
	
	@Test
	public void testMatrix_getTheme() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testMatrix_setBackgroundColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testMatrix_setTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("matrix1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testMatrix_setParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		getWebDriver().findElement(By.id("richText1")).findElement(By.id("matrix1"));
	}
	
	@Test
	public void testMatrix_getParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		getWebDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testMatrix_setErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_getErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_setErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_clearErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		getWebDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testMatrix_clear() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setValue_true")).click();
		getWebDriver().findElement(By.id("clear")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testMatrix_setLabelText() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Ignore
	public void testMatrix_setLabelTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		getWebDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
