package selenium;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesSectionAPI.class,
	TestCasesSectionEvents.class
})
public class TestSuiteRuntimeSection {

}

