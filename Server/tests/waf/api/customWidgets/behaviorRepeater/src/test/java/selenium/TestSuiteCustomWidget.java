package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCases_runtimeDisplay.class,
	TestCases_enhanced.class
})
public class TestSuiteCustomWidget {}
