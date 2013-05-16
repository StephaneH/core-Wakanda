package org.wakanda.qa.widgets.slider.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.wakanda.qa.widgets.template.TestCasesTemplateWidget;

public class TestCasesSliderAPI extends TestCasesTemplateWidget {

	public TestCasesSliderAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------

	@Test
	public void testSlider_getValue() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("110", myValue);
	}
	
	
	@Test
	public void testSlider_setValue() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setValue")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("156", myValue);
	}
	
	@Test
	public void testSlider_setValues() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("addHandle")).click();
		getWebDriver().findElement(By.id("setValues")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("50,180", myValue);
	}
	
	@Test
	public void testSlider_addHandle() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("addHandle")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("80,110", myValue);
	}
	
	@Test
	public void testSlider_getMin() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getMin")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("20", myValue);
	}
	
	@Test
	public void testSlider_getMax() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getMax")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("200", myValue);
	}
	
	@Test
	public void testSlider_getStep() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getStep")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("2", myValue);
	}
	
	@Test
	public void testSlider_setStep() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setStep")).click();
		getWebDriver().findElement(By.id("getStep")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("5", myValue);
	}
	
	@Test
	public void testSlider_getRange() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getRange")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("min", myValue);
		
		getWebDriver().findElement(By.className("ui-slider-range-min"));
	}
	
	@Test
	public void testSlider_setRange_max() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setRange_max")).click();
		getWebDriver().findElement(By.id("getRange")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("max", myValue);
		
		getWebDriver().findElement(By.className("ui-slider-range-max"));
	}
	
	@Test
	public void testSlider_setRange_none() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setRange_none")).click();
		getWebDriver().findElement(By.id("getRange")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("none", myValue);
		
		WebElement elementResult = getWebDriver().findElement(By.xpath("//div[@id='slider1']/div"));
		assertEquals("none", elementResult.getCssValue("display"));
	}
	
	
	@Test
	public void testSlider_getOrientation() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getOrientation")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("horizontal", myValue);
	}
	
	@Test
	public void testSlider_setOrientation_vertical() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setOrientation_vertical")).click();
		getWebDriver().findElement(By.id("getOrientation")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("vertical", myValue);
	}
	
	@Test
	public void testSlider_setOrientation_horizontal() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setOrientation_vertical")).click();
		getWebDriver().findElement(By.id("setOrientation_horizontal")).click();
		getWebDriver().findElement(By.id("getOrientation")).click();
		Thread.sleep(500);

		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("horizontal", myValue);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testSlider_hide() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testSlider_show() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("hide")).click();
		getWebDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testSlider_toggle() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testSlider_toggle_back() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("toggle")).click();
		getWebDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testSlider_addClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("slider1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_removeClass() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("addClass")).click();
		getWebDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("slider1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testSlider_move() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = getWebDriver().findElement(By.id("slider1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testSlider_resize_smaller() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("slider1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSlider_resize_bigger() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = getWebDriver().findElement(By.id("slider1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSlider_setWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("slider1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testSlider_getWidth() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("200", myResult);
	}
	
	@Test
	public void testSlider_setHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("slider1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testSlider_getHeight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("15", myResult);
	}
	
	@Test
	public void testSlider_setLeft() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("slider1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testSlider_setRight() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testSlider_setTop() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("slider1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testSlider_setBottom() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testSlider_getPosition() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("slider1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testSlider_destroy() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			getWebDriver().findElement(By.id("slider1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testSlider_disable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("setValue")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("110", myValue);
	}
	
	@Test
	public void testSlider_enable() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("disable")).click();
		getWebDriver().findElement(By.id("enable")).click();
		getWebDriver().findElement(By.id("setValue")).click();
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myValue = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("156", myValue);
	}
	
	@Test
	public void testSlider_getTheme() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testSlider_setBackgroundColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testSlider_setTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("slider1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testSlider_setParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		getWebDriver().findElement(By.id("richText1")).findElement(By.id("slider1"));
	}
	
	@Test
	public void testSlider_getParent() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setParent")).click();
		getWebDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testSlider_setErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_getErrorDiv() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_setErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_clearErrorMessage() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setErrorDiv")).click();
		getWebDriver().findElement(By.id("setErrorMessage")).click();
		getWebDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = getWebDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testSlider_clear() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) getWebDriver();
		js.executeScript("$$('slider1').setValue(110);" +
				"$$('slider1').clear();");
		getWebDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = (String) js.executeScript("return $$('slider1').getValue() +'';");
		assertEquals("110", myResult);
	}
	
	@Test
	public void testSlider_setLabelText() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Test
	public void testSlider_setLabelTextColor() throws InterruptedException
	{
		getWebDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		getWebDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = getWebDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
