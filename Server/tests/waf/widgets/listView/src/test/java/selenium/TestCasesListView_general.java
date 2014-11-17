package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesListView_general extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesListView_general.class, "/solutions/widgetListview/widgetListview Solution/widgetListview.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
	}

	@Test
	public void testListview_container() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').width() +'/'+ $('#listView1').height();");
		assertEquals("Check if listView container (width/height)", "318/298", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#listView1').position().left +'/'+ $('#listView1').position().top;");
		assertEquals("Check if listView container position (x/y)", "50/26", result);
	}
	
	@Test
	public void testListview_numericValue() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#clone-numberValue1-0-0').width() +'/'+ $('#clone-numberValue1-0-0').height();");
		assertEquals("Check if listView label (width/height)", "58/16", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#clone-numberValue1-0-0').position().left +'/'+ $('#clone-numberValue1-0-0').position().top;");
		assertEquals("Check if listView label position(x/y)", "206/12", result);
	}
	
}
