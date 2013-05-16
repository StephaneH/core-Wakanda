package admin;
import java.io.IOException;

import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.wastudio.common.Utils;

@RunWith(Suite.class)
@Suite.SuiteClasses({
	TestCasesAdmin.class
})
public class TestSuiteRemoteToolsAdmin {
	
	@BeforeClass
	public static void beforeTestSuite() throws IOException{
		Utils.copyStaticRessources();
	}
	
}

