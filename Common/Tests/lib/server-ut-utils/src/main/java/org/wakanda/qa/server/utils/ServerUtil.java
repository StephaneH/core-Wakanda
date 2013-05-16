package org.wakanda.qa.server.utils;

import static org.wakanda.qa.server.utils.AbstractBasicSettings.getOS;

import java.io.UnsupportedEncodingException;
import java.util.GregorianCalendar;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

public class ServerUtil {

	protected static Logger logger = Logger.getLogger(ServerUtil.class);
	private Requestor requestor;

	/**
	 * Creates a new ServerUtil from the given requestor.
	 */
	public ServerUtil(Requestor requestor) {
		this.requestor = requestor;
	}

	/**
	 * Creates a new ServerUtil from the given settings.
	 */
	public ServerUtil(IBasicSettings settings) {
		this.requestor = new Requestor(settings);
	}

	/**
	 * Creates a new ServerUtil using the default settings.
	 */
	public ServerUtil() {
		this(new BasicSettings());
	}

	public static void main(String[] args) {
		new ServerUtil().loadSolutionAndRunOrRestartServer();
	}

	private static String[] getCommandThatLaunchesServer(String pathToServer) {
		String command;
		String[] shellCommand;
		String serverPath = "\"" + pathToServer + "\"";
		String os = getOS();
		String shell;
		if (os.contains("Mac")) {
			// Mac
			shell = System.getenv("SHELL");
			serverPath = serverPath.replace("\\ ", " ");
			command = serverPath + " > /dev/null 2>&1 &";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			serverPath = serverPath.replace("\\ ", " ");
			command = serverPath + " > /dev/null 2>&1 &";
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			command = "START /B CALL " + serverPath + " > NUL 2>&1";
			shellCommand = new String[] { "CMD", "/C", command };
		}
		return shellCommand;
	}

	private Process serverProcess = null;

	public boolean killServerViaInnerProcess() {
		if (serverProcess != null) {
			serverProcess.destroy();
			serverProcess = null;
			return true;
		} else {
			logger.debug("No inner process attached to the server (Not started or already killed)");
			return false;
		}
	}

	public static boolean runTheServer(String pathToServer) {
		String[] command = getCommandThatLaunchesServer(pathToServer);
		try {
			logger.debug("Starting the server using: " + command[2]);
			Process p = Runtime.getRuntime().exec(command);
			return p != null;
		} catch (Exception e) {
			logger.debug(e);
		}
		return false;
	}

	public boolean runTheServer() {
		return runTheServer(getServerPath());
	}

	public boolean runTheServerAndWait(long millis) {
		boolean result = runTheServer();
		try {
			Thread.sleep(millis);
		} catch (InterruptedException e) {
			result = false;
			e.printStackTrace();
		}
		return result;
	}

	public boolean runTheServerAndCheckIt() {
		logger.debug("Trying to start the server...");
		if (!runTheServer() || !isServerRunning()) {
			logger.debug("Could not start the server");
			return false;
		}
		logger.debug("Server is started");
		if (!isServerResponding()) {
			logger.debug("Server is not responding");
			return false;
		}
		return true;
	}

	private static String[] getCommandThatKillsSerever() {
		String command;
		String[] shellCommand;
		String os = getOS();
		String shell;
		if (os.contains("Mac")) {
			// Mac
			shell = System.getenv("SHELL");
			command = "sudo killall -9 'Wakanda Server'";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			command = "sudo killall -9 Wakanda";
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			command = "taskkill /im \"Wakanda Server*\" /f /t && exit";
			shellCommand = new String[] { "CMD", "/C", command };
		}
		return shellCommand;
	}

	public static boolean killServerViaCommandLine() {
		boolean killed = false;
		String[] command = getCommandThatKillsSerever();
		try {
			logger.debug("Killing the server using: " + command[2]);
			Process p = Runtime.getRuntime().exec(command);
			// logger.debug(IOUtils.toString(p.getInputStream()));
			// logger.debug(IOUtils.toString(p.getErrorStream()));
			killed = p != null;
			killed = killed && !isServerRunning();
		} catch (Exception e) {
			logger.debug(e);
		}
		return killed;
	}

	private static boolean doLoadSolutionAndRunOrRestartServer(
			String pathToServer, String solution, HttpHost webAdmin,
			HttpHost target, Requestor requestor) {
		if (!isServerRunning()) {
			logger.debug("Server is not running");

		} else {
			logger.debug("Server is already running");
			logger.debug("Trying to restart server...");
			logger.debug("Trying to kill the server...");
			boolean isServerAlive = true;
			boolean isKillExec = killServerViaCommandLine();
			if (isKillExec) {
				int i = 0;
				long start = GregorianCalendar.getInstance().getTimeInMillis();
				while (isServerAlive && (i < 10)) {
					try {
						isServerAlive = isServerRunning();
						Thread.sleep((++i) * 1000);
					} catch (Exception e) {
						logger.debug("Exception: " + e.getMessage());
					}
				}
				long duration = GregorianCalendar.getInstance()
						.getTimeInMillis() - start;
				if (isServerAlive) {
					logger.debug("Server is not killed after " + duration
							+ " ms of waiting");
					return false;
				} else {
					logger.debug("Server is killed after " + duration
							+ " ms of waiting");
				}

			} else {
				logger.debug("Command that kills the server cannot be executed.");
				return false;
			}
		}

		// The server is not running or killed so we launch it
		logger.debug("Trying to start server...");
		if (!runTheServer(pathToServer) || !isServerRunning()) {
			logger.debug("Could not start server");
			return false;
		}
		logger.debug("Server is started");
		logger.debug("Waiting a bit for the web admin to be ready...");

		boolean ready = false;
		int i = 0;
		long start = GregorianCalendar.getInstance().getTimeInMillis();
		while (!ready && i < 10) {
			try {
				ready = doIsServerResponding(webAdmin, requestor);
				Thread.sleep((++i) * 1000);
			} catch (Exception e) {
				logger.debug("Exception: " + e.getMessage());
			}
		}
		long duration = GregorianCalendar.getInstance().getTimeInMillis()
				- start;

		if (!ready) {
			logger.debug("Server is not responding (after " + duration
					+ " sec)");
			return false;
		}

		logger.debug("Web admin is ready (after " + duration + " ms)");

		// Server is launched & Server is responding
		// so lets load the solution
		logger.debug("Loading the solution...");
		return doLoadSolution(solution, webAdmin, target, false, requestor);
	}

	public static boolean loadSolutionAndRunOrRestartServerSt(
			String pathToServer, String solution, HttpHost webAdmin,
			HttpHost target) {
		return doLoadSolutionAndRunOrRestartServer(pathToServer, solution,
				webAdmin, target, getDefaultRequestor());

	}

	public static boolean loadSolutionAndRunOrRestartServerSt(String solution,
			HttpHost webAdmin, HttpHost target) {
		return loadSolutionAndRunOrRestartServerSt(getDefaultRequestor()
				.getSetting().getServerPath(), solution, webAdmin, target);
	}

	public boolean loadSolutionAndRunOrRestartServer(String pathToServer,
			String solution, HttpHost webAdmin, HttpHost target) {
		return doLoadSolutionAndRunOrRestartServer(pathToServer, solution,
				webAdmin, target, getRequestor());

	}

	public boolean loadSolutionAndRunOrRestartServer(String solution,
			HttpHost webAdmin, HttpHost target) {
		return loadSolutionAndRunOrRestartServer(getServerPath(), solution,
				webAdmin, target);
	}

	public boolean loadSolutionAndRunOrRestartServer(String solution) {
		return loadSolutionAndRunOrRestartServer(solution, getWebAdminTarget(),
				getDefaultTarget());
	}

	public boolean loadSolutionAndRunOrRestartServer() {
		return loadSolutionAndRunOrRestartServer(getSolutionPath(),
				getWebAdminTarget(), getDefaultTarget());
	}

	private static HttpPost buildRpcRequest(String body)
			throws UnsupportedEncodingException {
		HttpPost request = new HttpPost("/rpc/");
		request.addHeader(HttpHeaders.CONTENT_TYPE,
				"application/json-rpc; charset=utf-8");
		StringEntity entity = new StringEntity(body);
		request.setEntity(entity);
		return request;
	}

	private static boolean doCloseSolution(HttpHost webAdmin,
			boolean fixedWait, Requestor requestor) {
		// if the web admin is available, close the solution
		boolean closed = false;
		if (isServerRespondingSt(webAdmin)) {
			try {
				// build the post request body
				long id = GregorianCalendar.getInstance().getTimeInMillis();
				String payload = "{\"jsonrpc\":\"2.0\",\"id\":"
						+ id
						+ ",\"module\":\"admin\",\"method\":\"closeSolution\",\"params\":[]}";
				HttpPost request = buildRpcRequest(payload);
				logger.debug("POST:" + payload);
				HttpResponse response = requestor.execute(webAdmin, request);
				String content = EntityUtils.toString(response.getEntity());
				logger.debug(content);
				int statusCode = response.getStatusLine().getStatusCode();
				boolean accepted = statusCode == HttpStatus.SC_OK
						&& content.contains("\"result\":true");
				logger.debug("Server has "
						+ (accepted ? "accepted" : "rejected")
						+ " close solution request");
				closed = accepted;
			} catch (Exception e) {
				logger.debug("Unexpected exception: " + e.getMessage());
				e.printStackTrace();
			}
		} else {
			logger.debug("The web admin is not available");
		}
		return closed;

	}


	public static boolean closeSolutionSt(HttpHost webAdmin) {
		return doCloseSolution(webAdmin, false, getDefaultRequestor());
	}
	
	public static boolean justSendLoadSolutionRequest(String solution, HttpHost webAdmin) {
		return doJustSendLoadSolutionRequest(solution, webAdmin, getDefaultRequestor());
	}

	private static boolean doJustSendLoadSolutionRequest(String solution, HttpHost webAdmin, Requestor requestor) {
		// if the web admin is available, load the solution
		boolean loaded = false;
		if (isServerRespondingSt(webAdmin)) {
			try {
				// build the post request body
				long id = GregorianCalendar.getInstance().getTimeInMillis();
				solution = solution.replaceAll("\\\\", "/");
				String payload = "{\"jsonrpc\":\"2.0\",\"id\":"
						+ id
						+ ",\"module\":\"admin\",\"method\":\"openSolution\",\"params\":\""
						+ solution + "\"}";

				HttpPost request = buildRpcRequest(payload);
				logger.debug("POST:" + payload);
				HttpResponse response = requestor.execute(webAdmin, request);
				String content = EntityUtils.toString(response.getEntity());
				logger.debug(content);
				int statusCode = response.getStatusLine().getStatusCode();
				boolean accepted = statusCode == HttpStatus.SC_OK
						&& content.contains("\"result\":true");
				
				loaded = accepted;
			} catch (Exception e) {
				logger.debug("Unexpected exception: " + e.getMessage());
				e.printStackTrace();
			}
		} else {
			logger.debug("The web admin is not available");
		}
		return loaded;
	}

	private static boolean doLoadSolution(String solution, HttpHost webAdmin,
			HttpHost target, boolean fixedWait, Requestor requestor) {
		// if the web admin is available, load the solution
		boolean loaded = false;
		if (isServerRespondingSt(webAdmin)) {
			try {
				// build the post request body
				long id = GregorianCalendar.getInstance().getTimeInMillis();
				solution = solution.replaceAll("\\\\", "/");
				String payload = "{\"jsonrpc\":\"2.0\",\"id\":"
						+ id
						+ ",\"module\":\"admin\",\"method\":\"openSolution\",\"params\":\""
						+ solution + "\"}";

				HttpPost request = buildRpcRequest(payload);
				logger.debug("POST:" + payload);
				HttpResponse response = requestor.execute(webAdmin, request);
				String content = EntityUtils.toString(response.getEntity());
				logger.debug(content);
				int statusCode = response.getStatusLine().getStatusCode();
				boolean accepted = statusCode == HttpStatus.SC_OK
						&& content.contains("\"result\":true");
				if (!accepted) {
					logger.debug("Server has rejected open solution request");
				} else {
					logger.debug("Server has accepted open solution request");
					if (fixedWait) {
						int timeout = 15000;
						logger.debug("Waiting " + timeout
								+ " ms for the solution to be ready...");
						Thread.sleep(timeout);
						loaded = isSolutionDeployedSt(target);
					} else {
						logger.debug("Waiting for the solution to be ready...");
						int i = 0;
						long start = GregorianCalendar.getInstance()
								.getTimeInMillis();
						int ctry = 15;
						while (!loaded && i < ctry) {
							loaded = isSolutionDeployedSt(target);
							Thread.sleep((++i) * 1000);
						}
						long end = GregorianCalendar.getInstance()
								.getTimeInMillis();

						logger.debug("Solution is "
								+ (loaded ? "ready" : "not loaded")
								+ " (after " + (end - start)
								+ " sec of waiting)");

					}
				}
			} catch (Exception e) {
				logger.debug("Unexpected exception: " + e.getMessage());
				e.printStackTrace();
			}
		} else {
			logger.debug("The web admin is not available");
		}
		return loaded;
	}

	public static boolean loadSolutionSt(String solution, HttpHost webAdmin,
			HttpHost target) {
		return doLoadSolution(solution, webAdmin, target, false,
				getDefaultRequestor());
	}

	public boolean loadSolution(String solution, HttpHost webAdmin,
			HttpHost target) {
		return doLoadSolution(solution, webAdmin, target, false, getRequestor());
	}

	public boolean loadSolution(String solution) {
		return loadSolution(solution, getWebAdminTarget(), getDefaultTarget());
	}

	public boolean loadSolution() {
		return loadSolution(getSolutionPath());
	}

	public static boolean isServerRunning() {
		boolean isServerRunning = false;
		String os = getOS();
		String shell;
		String command;
		String[] shellCommand;
		if (os.contains("Mac")) {
			// Mac
			shell = System.getenv("SHELL");
			command = "ps -ef | grep -v grep | grep \"Wakanda Server\" && (exit 0) || (exit 1)";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			command = "ps -C Wakanda && (exit 0) || (exit 1)";
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			command = "tasklist /NH /FI \"imagename eq Wakanda Server.exe\" | find /i \"Wakanda Server\" && (exit 0) || (exit 1)";
			shellCommand = new String[] { shell, "/C", command };
		}
		try {
			logger.debug("Check if the server is running using: " + command);
			Process p = Runtime.getRuntime().exec(shellCommand);
			// logger.debug(IOUtils.toString(p.getInputStream()));
			isServerRunning = p.waitFor() == 0;
		} catch (Exception e) {
			logger.debug(e);
		}
		return isServerRunning;
	}

	private static boolean doIsServerResponding(HttpHost target,
			Requestor requestor) {
		boolean isServerResponding = false;
		HttpGet request = new HttpGet("/");
		try {
			HttpResponse response = requestor.execute(target, request);
			boolean is200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
			boolean isWakanda = response.getFirstHeader(HttpHeaders.SERVER)
					.getValue().contains("Wakanda");
			isServerResponding = is200Ok & isWakanda;
			// Consume reponse and release system resources
			HttpEntity entity = response.getEntity();
			EntityUtils.consume(entity);
		} catch (Exception e) {
			logger.debug("Exception: " + e.getMessage());
		} finally {
			request.abort();
		}
		return isServerResponding;
	}

	public static boolean isServerRespondingSt(HttpHost target) {
		return doIsServerResponding(target, getDefaultRequestor());
	}

	public static boolean isServerRespondingSt() {
		return doIsServerResponding(getDefaultRequestor().getSetting()
				.getWebAdminTarget(), getDefaultRequestor());
	}

	public boolean isServerResponding(HttpHost target) {
		return doIsServerResponding(target, getRequestor());
	}

	public boolean isServerResponding() {
		return isServerResponding(getWebAdminTarget());
	}

	private static boolean doIsSolutionDeployed(HttpHost target,
			Requestor requestor) {
		boolean isSolutionDeployed = false;
		HttpGet request = new HttpGet("/");
		try {
			HttpResponse response = requestor.execute(target, new HttpGet("/"));
			boolean is200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
			boolean isWakanda = response.getFirstHeader(HttpHeaders.SERVER)
					.getValue().contains("Wakanda");
			isSolutionDeployed = is200Ok & isWakanda;
			// Consume reponse and release system resources
			HttpEntity entity = response.getEntity();
			EntityUtils.consume(entity);
		} catch (Exception e) {
			logger.debug("Exception: " + e.getMessage());
		} finally {
			request.abort();
		}
		return isSolutionDeployed;
	}

	public static boolean isSolutionDeployedSt(HttpHost target) {
		return doIsSolutionDeployed(target, getDefaultRequestor());
	}

	public static boolean isSolutionDeployedSt() {
		return isSolutionDeployedSt(getDefaultRequestor().getSetting()
				.getDefaultTarget());
	}

	public boolean isSolutionDeployed(HttpHost target) {
		return doIsSolutionDeployed(target, getRequestor());
	}

	public boolean isSolutionDeployed() {
		return isSolutionDeployed(getDefaultTarget());
	}

	public Requestor getRequestor() {
		return this.requestor;
	}

	private static Requestor defaultRequestor = null;

	private static Requestor getDefaultRequestor() {
		if (defaultRequestor == null) {
			defaultRequestor = new Requestor();
		}

		return defaultRequestor;
	}

	public IBasicSettings getSetting() {
		return getRequestor().getSetting();
	}

	protected HttpHost getWebAdminTarget() {
		return getSetting().getWebAdminTarget();
	}

	protected HttpHost getDefaultTarget() {
		return getSetting().getDefaultTarget();
	}

	protected String getSolutionPath() {
		return getSetting().getSolutionPath();
	}

	protected String getServerPath() {
		return getSetting().getServerPath();
	}
}
