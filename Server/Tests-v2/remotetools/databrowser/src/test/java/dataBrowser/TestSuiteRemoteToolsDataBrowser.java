package dataBrowser;
import java.io.IOException;

import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.wastudio.common.Utils;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesDataBrowser.class
})
public class TestSuiteRemoteToolsDataBrowser {
	
	@BeforeClass
	public static void beforeTestSuite() throws IOException{
		Utils.copyStaticRessources();
	}
}

