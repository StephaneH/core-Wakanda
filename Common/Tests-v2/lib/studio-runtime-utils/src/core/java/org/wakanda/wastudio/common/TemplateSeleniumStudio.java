package org.wakanda.wastudio.common;

import java.util.Arrays;
import java.util.Collection;

import org.junit.runners.Parameterized.Parameters;

public class TemplateSeleniumStudio extends TemplateSelenium {
        
    public TemplateSeleniumStudio(eBrowser browser, boolean launchServerOnlyOneTime) {
	this.browserName = browser;
	this.launchServerOnlyOneTime = launchServerOnlyOneTime;
	
    }
    
    @Parameters
    public static Collection<Object[]> data() {
	Object[][] data = new Object[][] { { eBrowser.chrome, true } };
	return Arrays.asList(data);
    }
   
    
    protected static void killChromeDriver() {
	Utils.killChromeDriver();
    }
   
}
