package org.wakanda.qa.widgets.chart;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.widgets.chart.mixed.component.AdvancedTestCasesChartEvents;
import org.wakanda.qa.widgets.chart.runtime.TestCasesChartEvents;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesChartEvents.class,
	AdvancedTestCasesChartEvents.class
})
public class TestsEntry {

}
