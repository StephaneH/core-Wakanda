package org.wakanda.wastudio.common;

import java.io.File;

public class TemplateSeleniumStudioGUI extends TemplateSeleniumStudio {

    protected String urlGuiDesigner = null;
    
    public TemplateSeleniumStudioGUI(eBrowser browser, boolean launchServerOnlyOneTime) {
	super(browser, launchServerOnlyOneTime);
    }
    
    public void before() throws Exception {
	super.before();
	logger.info("Before Test Case: " + getSolutionName());
	logger.info("Copy gui file into designer-test.js");
	try {
	    if (Utils.getOS().equals("win"))
		Utils.copyFolderImpl(new File(getFileFromRessources(getSolutionName(),FileSelector.seleniumSolution) + ".gui"),
				new File(Paths.appStudio.substring(0,Paths.appStudio.lastIndexOf("\\"))
						+ "\\Resources\\Web Components\\GUIDesigner\\scripts\\designer\\test\\designer-test.js"));
	    else
		Utils.copyFolderImpl(new File(getFileFromRessources(getSolutionName(),FileSelector.seleniumSolution) + ".gui"),
				new File(Paths.appStudio+ "/Contents/Resources/Web Components/GUIDesigner/scripts/designer/test/designer-test.js"));
	    logger.info("Copy succeed");
	}catch(NullPointerException e){
	    logger.info("Copy of gui file failed : the previous gui file will be used");
	}
	catch (Exception e) {
	    logger.error("Copy of gui file failed :"+e.getMessage());
	}
	
	if (urlGuiDesigner == null)
	    urlGuiDesigner = "http://127.0.0.1:8081/guid/guidesigner.html";
	
	fDriver = getWebDriver();
	fDriver.get(urlGuiDesigner);
	
	/* Anas
	 * the following code line is used in order to avoid cache problems
	 */
	fDriver.navigate().refresh();
    }
    
}
