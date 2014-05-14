package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesListviewAPI.class,
	TestCasesListviewEvents.class,
	TestCases_bugs.class
})
public class TestSuiteRuntimeListview {}
