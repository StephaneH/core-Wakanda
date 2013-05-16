/**
 * 
 */
package org.wakanda.qa.server.utils;

import static org.junit.Assert.assertTrue;

import org.apache.http.HttpHost;
import org.wakanda.qa.server.utils.ServerUtil;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class TestServerUtil {
	
	@SuppressWarnings("unused")
	private static final  String HOST_32 = "192.168.223.210";
	private static final String HOST_64 =  "192.168.223.211";
	private static final int ADMIN_PORT = 8080;
	private static final int PROJECT_PORT = 8081;
	
	private static String getCurrentHost(){
		return HOST_64;
	}

	//@Test
	public void testIsServerResponding() {
		assertTrue(ServerUtil.isServerRespondingSt(new HttpHost(
				getCurrentHost(), ADMIN_PORT)));
	}

	//@Test
	public void testIsSolutionDeployed() {
			assertTrue(ServerUtil.isSolutionDeployedSt(new HttpHost(
					getCurrentHost(), PROJECT_PORT)));
	}

	//@Test
	public void testLoadSolution() {
		@SuppressWarnings("unused")
		String simpleSol = "/home/wakandaqa/WakTest/basic/simple-solution/simple-solution Solution/simple-solution.waSolution";
		String complexSol = "/home/wakandaqa/WakTest/P4WS/depot/Wakanda/main/Server/Tests-v2/security/ds/src/main/resources/com/wakanda/qa/dataperm/solution/DataStorePermTest/DataStorePermTest.waSolution";
		assertTrue(ServerUtil
				.justSendLoadSolutionRequest(complexSol,
						new HttpHost(getCurrentHost(), ADMIN_PORT)));

	}

	//@Test
	public void testCloseSolution() {
		assertTrue(ServerUtil.closeSolutionSt(new HttpHost(getCurrentHost(),
				ADMIN_PORT)));
	}
	
	
}
