package org.wakanda.wastudio.icon;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import org.wakanda.wastudio.common.TemplateSeleniumStudioTestSuite;
import org.wakanda.wastudio.icon.runtime.IconEvents;
import org.wakanda.wastudio.icon.runtime.TestCasesIconEvents;
@RunWith(Suite.class)
@Suite.SuiteClasses({
	IconEvents.class,
	TestCasesIconEvents.class
	})
public class TestsEntry extends TemplateSeleniumStudioTestSuite {

}
