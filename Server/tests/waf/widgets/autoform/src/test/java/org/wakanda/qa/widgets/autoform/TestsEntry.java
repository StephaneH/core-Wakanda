package org.wakanda.qa.widgets.autoform;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.autoform.api.TestCasesAutoformAPI;
import org.wakanda.qa.widgets.autoform.mixed.component.AdvancedTestCasesAutoformAPI;
import org.wakanda.qa.widgets.autoform.mixed.component.AdvancedTestCasesAutoformEvents;
import org.wakanda.qa.widgets.autoform.runtime.TestCasesAutoformEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({ 
    TestCasesAutoformEvents.class,
    TestCasesAutoformAPI.class, 
    AdvancedTestCasesAutoformEvents.class,
    AdvancedTestCasesAutoformAPI.class })
public class TestsEntry {
 
}