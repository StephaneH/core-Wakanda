package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesListviewAPI.class,
	TestCasesListviewEvents.class
})
public class TestSuiteRuntimeListview {}
