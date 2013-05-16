package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import org.wakanda.wastudio.common.TemplateSeleniumStudioTestSuite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesSwitchboxAPI.class,
	TestCasesSwitchboxEvents.class
})
public class TestSuiteRuntimeSwitchbox extends TemplateSeleniumStudioTestSuite {

}

