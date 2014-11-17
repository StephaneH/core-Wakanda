package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesListView_general.class,
	TestCasesListviewAPI.class,
	TestCasesListviewEvents.class,
	TestCasesListViewSource.class,
	TestCases_bugs.class
})
public class TestSuiteRuntimeListview {}
