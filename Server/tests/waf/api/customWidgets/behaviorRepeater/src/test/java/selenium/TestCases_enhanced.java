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

public class TestCases_enhanced extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_enhanced.class, "/BehaviorRepeater/BehaviorRepeater Solution/BehaviorRepeater.waSolution");
	}
	
	@Before
	public void before(){
		selenium.getDriver().get("http://127.0.0.1:8081/RepeaterEnhanced/");
		selenium.getDriver().findElement(By.id("repeaterEnhanced1"));
		selenium.getDriver().findElement(By.id("text10"));
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {}
	}

	@Test
	public void check_display() throws InterruptedException {
		// Vérifie si le widget est bien affiché au runtime
		selenium.getDriver().findElement(By.id("button1"));
		selenium.getDriver().findElement(By.id("button2"));
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#button1').text() +'';");
		assertEquals("Check if Previous has the right text", "Previous Page", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#button1').width() +'/'+ $('#button1').height();");
		assertEquals("Check if Previous has the right size", "75/14", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#button2').text() +'';");
		assertEquals("Check if Next has the right text", "Next Page", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#button2').width() +'/'+ $('#button2').height();");
		assertEquals("Check if Previous has the right size", "55/14", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(0).text() +'';");
		assertEquals("Check text repeated on position 1", "Employee_1 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(1).text() +'';");
		assertEquals("Check text repeated on position 2", "Employee_2 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(2).text() +'';");
		assertEquals("Check text repeated on position 3", "Employee_3 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(3).text() +'';");
		assertEquals("Check text repeated on position 4", "Employee_4 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(4).text() +'';");
		assertEquals("Check text repeated on position 5", "Employee_5 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(5).text() +'';");
		assertEquals("Check text repeated on position 6", "Employee_6 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(6).text() +'';");
		assertEquals("Check text repeated on position 7", "Employee_7 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(7).text() +'';");
		assertEquals("Check text repeated on position 8", "Employee_8 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(8).text() +'';");
		assertEquals("Check text repeated on position 9", "Employee_9 of Company_1(ID:1)", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#repeaterEnhanced1 .waf-text').eq(9).text() +'';");
		assertEquals("Check text repeated on position 10", "Employee_10 of Company_1(ID:1)", result);
	}
	
	@Test
	public void check_repeaterReuseClonedWidgets() throws InterruptedException {
		// Vérifie la réutilisation des clones en ajoutant une valeur à noeud DOM.
		selenium.getJsConsole().executeScript("$('#text1').attr('isSameElement', 'true');");
		selenium.getJsConsole().executeScript("$('#text10').attr('isSameElement', 'true');");
		
		selenium.getDriver().findElement(By.id("button2")).click();
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $('#text1').text() +'';");
		assertEquals("Check if next page is displayed", "Employee_11 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#text1').attr('isSameElement') +'';");
		assertEquals("Check if text1 DOM is still the same", "true", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#text10').attr('isSameElement') +'';");
		assertEquals("Check if text10 DOM is still the same", "true", result);
	}

	@Test
	public void check_widgetsToRemoveOnUpdate() throws InterruptedException {
		// Vérifie l'affichage des clones au changement de page. Supprime les anciens, affiche les nouveaux.
		selenium.getDriver().findElement(By.id("button2")).click();
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').widgets().length +'';");
		assertEquals("Check how many widget displayed", "10", result);

		result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').widget(0).id +'';");
		assertEquals("Check if next page is displayed", "text1", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#text1').text() +'';");
		assertEquals("Check if next page is displayed", "Employee_11 of Company_1(ID:1)", result);

		result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').widget(9).id +'';");
		assertEquals("Check if next page is displayed", "text10", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#text10').text() +'';");
		assertEquals("Check if next page is displayed", "Employee_20 of Company_1(ID:1)", result);
	}
	
	@Test
	public void check_widgetByPosition_withExistingPosition() throws InterruptedException {
		// Vérifie si on a un widget associé à une position de datasource
		String result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').widgetByPosition(0).id +'';");
		assertEquals("Check associated widget to entity number 0", "text1", result);

		result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').widgetByPosition(9).id +'';");
		assertEquals("Check associated widget to entity number 10", "text10", result);
	}
	
	@Test
	public void check_widgetByPosition_withNotExisting() throws InterruptedException {
		// Vérifie si on a aucun widget associé à une position de datasource n'existant pas
		String result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').widgetByPosition(11) ? 'true' : 'false';");
		assertEquals("Check associated widget to entity number 11", "false", result);
	}
	
	@Test
	public void check_getPosition_withExistingWidget() throws InterruptedException {
		// Vérifie la position de la datasource depuis la sélection d'un widget.
		String result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').getPosition($$('repeaterEnhanced1').widget(0)) +'';");
		assertEquals("Check associated datasource to widget number 0", "0", result);

		result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').getPosition($$('repeaterEnhanced1').widget(9)) +'';");
		assertEquals("Check associated datasource to widget number 9", "9", result);
	}
	
	@Test
	public void check_getPosition_withNextPage() throws InterruptedException {
		// Vérifie la position de la datasource depuis la sélection d'un widget.
		selenium.getDriver().findElement(By.id("button2")).click();
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').getPosition($$('repeaterEnhanced1').widget(0)) +'';");
		assertEquals("Check associated datasource to widget number 10", "10", result);

		result = (String) selenium.getJsConsole().executeScript("return $$('repeaterEnhanced1').getPosition($$('repeaterEnhanced1').widget(9)) +'';");
		assertEquals("Check associated datasource to widget number 9", "19", result);
	}
}
