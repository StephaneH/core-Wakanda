package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Test;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_runtimeDisplay extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_runtimeDisplay.class, "/BehaviorRepeater/BehaviorRepeater Solution/BehaviorRepeater.waSolution");
	}

	@Test
	public void repeaterText() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/RepeaterText/");
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(0).text() +'';");
		assertEquals("Check text repeated on position 1", "Employee_1 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(1).text() +'';");
		assertEquals("Check text repeated on position 2", "Employee_2 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(2).text() +'';");
		assertEquals("Check text repeated on position 3", "Employee_3 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(3).text() +'';");
		assertEquals("Check text repeated on position 4", "Employee_4 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(4).text() +'';");
		assertEquals("Check text repeated on position 5", "Employee_5 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(5).text() +'';");
		assertEquals("Check text repeated on position 6", "Employee_6 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(6).text() +'';");
		assertEquals("Check text repeated on position 7", "Employee_7 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(7).text() +'';");
		assertEquals("Check text repeated on position 8", "Employee_8 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(8).text() +'';");
		assertEquals("Check text repeated on position 9", "Employee_9 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterText1 .waf-text').eq(9).text() +'';");
		assertEquals("Check text repeated on position 10", "Employee_10 of Company_1(ID:1)", result);
	}
	
	@Test
	public void repeaterContainer() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/RepeaterContainer/");
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(0).val() +'';");
		assertEquals("Check container/input repeated on position 1", "Employee_1 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(1).val() +'';");
		assertEquals("Check container/input repeated on position 2", "Employee_2 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(2).val() +'';");
		assertEquals("Check container/input repeated on position 3", "Employee_3 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(3).val() +'';");
		assertEquals("Check container/input repeated on position 4", "Employee_4 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(4).val() +'';");
		assertEquals("Check container/input repeated on position 5", "Employee_5 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(5).val() +'';");
		assertEquals("Check container/input repeated on position 6", "Employee_6 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(6).val() +'';");
		assertEquals("Check container/input repeated on position 7", "Employee_7 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(7).val() +'';");
		assertEquals("Check container/input repeated on position 8", "Employee_8 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(8).val() +'';");
		assertEquals("Check container/input repeated on position 9", "Employee_9 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterContainer1 .waf-container input').eq(9).val() +'';");
		assertEquals("Check container/input repeated on position 10", "Employee_10 of Company_1(ID:1)", result);
	}
	
	@Test
	public void repeaterComposed() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/RepeaterComposed/");
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(0).val() +'';");
		assertEquals("Check composed/content/input repeated on position 1", "Employee_1 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(1).val() +'';");
		assertEquals("Check composed/content/input repeated on position 2", "Employee_2 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(2).val() +'';");
		assertEquals("Check composed/content/input repeated on position 3", "Employee_3 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(3).val() +'';");
		assertEquals("Check composed/content/input repeated on position 4", "Employee_4 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(4).val() +'';");
		assertEquals("Check composed/content/input repeated on position 5", "Employee_5 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(5).val() +'';");
		assertEquals("Check composed/content/input repeated on position 6", "Employee_6 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(6).val() +'';");
		assertEquals("Check composed/content/input repeated on position 7", "Employee_7 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(7).val() +'';");
		assertEquals("Check composed/content/input repeated on position 8", "Employee_8 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(8).val() +'';");
		assertEquals("Check composed/content/input repeated on position 9", "Employee_9 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterComposed1 .waf-composed .waf-composed-part-content input').eq(9).val() +'';");
		assertEquals("Check composed/content/input repeated on position 10", "Employee_10 of Company_1(ID:1)", result);
	}
}
