package org.wakanda.qa.widgets.menubar;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;
import org.wakanda.qa.widgets.menubar.runtime.TestCasesMenubarEvents;

@RunWith(Suite.class)
@SuiteClasses({ 
	MenubarEvents.class ,
	TestCasesMenubarEvents.class
	})
public class TestsEntry {
}