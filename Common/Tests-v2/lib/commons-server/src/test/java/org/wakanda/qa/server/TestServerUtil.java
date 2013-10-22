/**
 * 
 */
package org.wakanda.qa.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.wakanda.qa.commons.server.ServerAdmin;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class TestServerUtil {

	private Logger logger = Logger.getLogger(TestServerUtil.class);

	@SuppressWarnings("unused")
	private static final String HOST_32 = "192.168.223.210";
	private static final String HOST_64 = "192.168.223.211";
	private static final int ADMIN_PORT = 8080;
	@SuppressWarnings("unused")
	private static final int PROJECT_PORT = 8081;

	private static ServerAdmin su = null;

	private static ServerAdmin getServerAdminInstance() {
		if (su == null) {
			su = new ServerAdmin();
		}
		return su;
	}

	private static String getCurrentHost() {
		return HOST_64;
	}


	// @Test
	public void testLoadSolution() throws Exception {
		@SuppressWarnings("unused")
		String simpleSol = "/home/wakandaqa/WakTest/basic/simple-solution/simple-solution Solution/simple-solution.waSolution";
		String complexSol = "/home/wakandaqa/WakTest/P4WS/depot/Wakanda/main/Server/Tests-v2/security/ds/src/main/resources/com/wakanda/qa/dataperm/solution/DataStorePermTest/DataStorePermTest.waSolution";
		HttpPost request = ServerAdmin.getOpenSolutionRequest(complexSol);
		HttpResponse response = getServerAdminInstance().getRequestor().execute(
				new HttpHost(getCurrentHost(), ADMIN_PORT), request);
		String content = EntityUtils.toString(response.getEntity());
		int statusCode = response.getStatusLine().getStatusCode();
		boolean accepted = statusCode == HttpStatus.SC_OK
				&& content.contains("\"result\":true");
		assertTrue(accepted);

	}

	// @Test
	public void testCloseSolution() {
		assertTrue(getServerAdminInstance().closeSolution());
	}

	// @Test
	public void testRunServerWithSolution() {
		boolean b = getServerAdminInstance().runServerWithSolution();
		assertTrue(b);
	}

	// @Test
	public void testLoadSolutionAndRunOrRestartServer() {
		boolean b = getServerAdminInstance().loadSolutionAndRunOrRestartServer();
		assertTrue(b);
		for (int i = 0; i < 50; i++) {
			getServerAdminInstance().isSolutionDeployed();
		}
	}

	// @Test
	public void testLoadSolutionAndRunOrRestartServer2() throws Exception {
		@SuppressWarnings("unused")
		String solution1 = "C:\\P4WS\\depot\\Wakanda\\main\\Server\\Tests-v2\\waf\\api\\rest\\ds\\target\\classes\\org\\wakanda\\qa\\rest\\ds\\solution\\rest-ds\\rest-ds Solution\\rest-ds.waSolution";
		String solution2 = "C:\\P4WS\\depot\\Wakanda\\main\\Server\\Tests-v2\\security\\ds\\target\\classes\\org\\wakanda\\qa\\dataperm\\solution\\DataStorePermTest\\DataStorePermTest.waSolution";
		@SuppressWarnings("unused")
		String solution3 = "C:\\P4WS\\depot\\Wakanda\\main\\Server\\Tests-v2\\http\\rfc\\target\\classes\\org\\wakanda\\qa\\http\\solution\\HttpServer\\HttpServer.waSolution";
		boolean b;
		// b =
		// getServerUtilInstance().loadSolutionAndRunOrRestartServer(solution2);
		b = getServerAdminInstance().runServerWithSolution(solution2);
		assertTrue(b);
		for (int i = 0; i < 100; i++) {
			HttpResponse response = getServerAdminInstance().getRequestor().execute(
					new HttpGet("/"));
			EntityUtils.consume(response.getEntity());
			int sc = response.getStatusLine().getStatusCode();
			logger.debug(i + ":" + sc);
			assertEquals(HttpStatus.SC_OK, sc);
		}
	}

}
