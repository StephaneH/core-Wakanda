package org.wakanda.qa.widgets.frame;


import java.util.Arrays;
import java.util.Collection;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.wastudio.common.TemplateSelenium;

public class FrameEvents extends TemplateSelenium{

	public FrameEvents(eBrowser arg0,String arg1,boolean arg2){
		super(arg0, arg1, arg2);
	}
	
	@Parameters
	public static Collection<Object[]> data() {
		Object[][] data = new Object[][] {
			{ eBrowser.chrome,"FrameEvent",true }
		};
		return Arrays.asList(data);
	}
	@Before
	public void beforeTest(){
		fDriver.get("http://127.0.0.1:8081/");
	}
	@Test
	public void checkOnLoadEvent (){		
		logger.info("get the richText value");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		String actual = (String) ((JavascriptExecutor)fDriver).executeScript("return $$('richText1').getValue();");
		Assert.assertEquals("event should be fired", actual);
		
	}
	

}
