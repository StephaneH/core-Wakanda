package org.wakanda.qa.widgets.image;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;
import org.wakanda.qa.widgets.image.api.TestCasesImageAPI;
import org.wakanda.qa.widgets.image.mixed.component.AdvancedTestCasesImageAPI;
import org.wakanda.qa.widgets.image.mixed.component.AdvancedTestCasesImageEvents;
import org.wakanda.qa.widgets.image.runtime.TestCasesImageEvents;

@RunWith(Suite.class)
@SuiteClasses({ 
	TestCasesImageAPI.class,
	TestCasesImageEvents.class,
	AdvancedTestCasesImageAPI.class,
	AdvancedTestCasesImageEvents.class
	})
public class TestsEntry {
}