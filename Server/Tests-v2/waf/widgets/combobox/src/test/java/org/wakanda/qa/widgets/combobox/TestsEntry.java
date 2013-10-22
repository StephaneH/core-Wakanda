/**
 * 
 */
package org.wakanda.qa.widgets.combobox;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.combobox.api.TestCasesComboboxAPI;
import org.wakanda.qa.widgets.combobox.mixed.component.AdvanceTestCasesComboboxEvents;
import org.wakanda.qa.widgets.combobox.mixed.component.AdvancedTestCasesComboboxAPI;
import org.wakanda.qa.widgets.combobox.runtime.TestCasesComboboxEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({
    TestCasesComboboxAPI.class,
    TestCasesComboboxEvents.class,
    AdvancedTestCasesComboboxAPI.class,
    AdvanceTestCasesComboboxEvents.class
})
public class TestsEntry {
}