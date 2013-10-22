package org.wakanda.qa.commons.server;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.GregorianCalendar;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.wakanda.qa.commons.server.http.Requestor;
import org.wakanda.qa.commons.server.settings.AbstractSettings;
import org.wakanda.qa.commons.server.settings.DefaultSettings;

public class ServerAdmin {

	protected static Logger logger = Logger.getLogger(ServerAdmin.class);
	private Requestor requestor;

	/**
	 * Creates a new ServerUtil from the given requestor.
	 */
	public ServerAdmin(Requestor requestor) {
		this.requestor = requestor;
	}

	/**
	 * Creates a new ServerUtil from the given settings and http client.
	 */
	public ServerAdmin(AbstractSettings settings, HttpClient httpClient) {
		this.requestor = new Requestor(settings, httpClient);
	}

	/**
	 * Creates a new ServerUtil from the given settings.
	 */
	public ServerAdmin(AbstractSettings settings) {
		this.requestor = new Requestor(settings);
	}

	/**
	 * Creates a new ServerUtil using the default settings.
	 */
	public ServerAdmin() {
		this(new DefaultSettings());
	}

	private static String[] buildShellCommand(final String command,
			boolean nullOutput) {
		String[] shellCommand;
		String _command = new String(command);
		String out;
		String os = Utils.getOS();
		String shell;
		String option;
		if (os.contains("Mac") || os.contains("Linux")) {
			// Mac/Linux
			shell = System.getenv("SHELL");
			option = "-c";
			out = " > /dev/null 2>&1 &";
			_command = _command + (nullOutput ? out : "");
		} else {
			// Win
			shell = "CMD";
			out = " > NUL 2>&1";
			option = "/C";
			_command = "START /B CALL " + _command + (nullOutput ? out : "");

		}
		shellCommand = new String[] { shell, option, _command };
		return shellCommand;
	}

	private static String formatParam(final String param) {
		String fparam = new String(param);
		fparam = "\"" + fparam + "\"";
		if (Utils.getOS().contains("Mac") || Utils.getOS().contains("Linux")) {
			fparam = fparam.replace("\\ ", " ");
		}
		return fparam;
	}

	private static String[] getCommandThatLaunchesServer(String pathToServer) {
		return buildShellCommand(formatParam(pathToServer), true);
	}

	private static String[] getCommandThatLaunchesServer(String pathToServer,
			String solution) {
		String command = formatParam(pathToServer) + " "
				+ formatParam(solution);
		return buildShellCommand(command, true);
	}

	private Process serverProcess = null;

	private static final long WAIT_APP_READY = 15000;

	private boolean doWaitUntilApplicationIsReady(HttpHost target,
			boolean fixedTimeout, Requestor requestor) {
		boolean isReady = false;
		try {
			if (fixedTimeout) {
				long timeout = WAIT_APP_READY;
				logger.debug("Waiting " + timeout + " ms for " + target
						+ " to be ready...");
				Thread.sleep(timeout);
				isReady = doIsSolutionDeployed(target, requestor);
			} else {
				logger.debug("Waiting for the solution to be ready...");
				int i = 0;
				long start = GregorianCalendar.getInstance().getTimeInMillis();
				int ctry = 10;
				while (!isReady && i < ctry) {
					isReady = doIsSolutionDeployed(target, requestor);
					Thread.sleep((++i) * 1000);
				}
				long end = GregorianCalendar.getInstance().getTimeInMillis();

				logger.debug(target + " is "
						+ (isReady ? "reachable" : "unreachable") + " (after "
						+ (end - start) + " ms of waiting)");
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return isReady;
	}

	private boolean doRunServer(String[] cmdArray, HttpHost target,
			Requestor requestor) {
		boolean result = false;
		try {
			logger.debug("Starting the server using: " + cmdArray[2]);
			Process p = Runtime.getRuntime().exec(cmdArray);
			result = p != null;
			result = result
					&& doWaitUntilApplicationIsReady(target, false, requestor);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	private boolean doRunServer(String pathToServer, HttpHost webAdmin,
			Requestor requestor) {
		return doRunServer(getCommandThatLaunchesServer(pathToServer),
				webAdmin, requestor);
	}

	private boolean doRunServer(String pathToServer, String solution,
			HttpHost target, Requestor requestor) {
		return doRunServer(
				getCommandThatLaunchesServer(pathToServer, solution), target,
				requestor);
	}

	public boolean runServer() {
		return doRunServer(getServerPath(), getWebAdminTarget(), getRequestor());
	}
	
	public boolean runServer(String pathToServer) {
		return doRunServer(pathToServer, getWebAdminTarget(), getRequestor());
	}
	
	public boolean runServer(String pathToServer, String solution) {
		return doRunServer(pathToServer, solution, getWebAdminTarget(), getRequestor());
	}
	
	public boolean runServerWithSolution(String solution) {
		return doRunServer(getServerPath(), solution,
				getDefaultTarget(), getRequestor());
	}

	public boolean runServerWithSolution() {
		return runServerWithSolution(getSolutionPath());
	}
	

	private String[] getCommandThatKillsSerever() {
		String command;
		String[] shellCommand;
		String os = Utils.getOS();
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
	

	public boolean killServerViaCommandLine() {
		boolean killed = false;
		String[] command = getCommandThatKillsSerever();
		try {
			logger.debug("Killing the server using: " + command[2]);
			Process p = Runtime.getRuntime().exec(command);
			// logger.debug(IOUtils.toString(p.getInputStream()));
			// logger.debug(IOUtils.toString(p.getErrorStream()));
			killed = p != null;
			boolean isResponding = true;
			int i = 0;
			long start = GregorianCalendar.getInstance().getTimeInMillis();
			while (isResponding && (i < 10)) {
				try {
					isResponding = isServerRunning();
					Thread.sleep((++i) * 1000);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			long duration = GregorianCalendar.getInstance().getTimeInMillis()
					- start;

			killed = killed && !isResponding;

			logger.debug("Server is " + (isResponding ? "not" : "")
					+ " killed after " + duration + " ms of waiting");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return killed;
	}

	private static HttpPost buildRpcRequest(String body) {
		HttpPost request = new HttpPost("/rpc/");
		request.addHeader(HttpHeaders.CONTENT_TYPE,
				"application/json-rpc; charset=utf-8");
		StringEntity entity;
		try {
			entity = new StringEntity(body);
			request.setEntity(entity);
			return request;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static HttpPost getOpenSolutionRequest(String solution) {
		long id = GregorianCalendar.getInstance().getTimeInMillis();
		solution = solution.replaceAll("\\\\", "/");
		String payload = "{\"jsonrpc\":\"2.0\",\"id\":"
				+ id
				+ ",\"module\":\"admin\",\"method\":\"openSolution\",\"params\":\""
				+ solution + "\"}";

		return buildRpcRequest(payload);
	}

	public static HttpPost getCloseSolutionRequest() {
		long id = GregorianCalendar.getInstance().getTimeInMillis();
		String payload = "{\"jsonrpc\":\"2.0\",\"id\":"
				+ id
				+ ",\"module\":\"admin\",\"method\":\"closeSolution\",\"params\":[]}";
		return buildRpcRequest(payload);
	}

	private boolean doLoadSolutionAndRunOrRestartServer(
			String pathToServer, String solution, HttpHost webAdmin,
			HttpHost target, Requestor requestor) {
		if (!isServerRunning()) {
			logger.debug("Server is not running");

		} else {
			logger.debug("Server is already running");
			logger.debug("Trying to restart server...");
			logger.debug("Trying to kill the server...");
			if (!killServerViaCommandLine()) {
				return false;
			}
		}

		// The server is not running or killed so we launch it
		logger.debug("Trying to start server...");
		if (!doRunServer(pathToServer, webAdmin, requestor)) {
			logger.debug("Could not start server");
			return false;
		}
		// Now that server is launched and responding lets open the solution
		logger.debug("Opening the solution...");
		return doLoadSolution(solution, webAdmin, target, false, requestor);
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

	private static boolean doCloseSolution(HttpHost webAdmin,
			boolean fixedWait, Requestor requestor) {
		// if the web admin is available, close the solution
		boolean closed = false;
		if (doIsServerResponding(webAdmin, requestor)) {
			try {
				HttpPost request = getCloseSolutionRequest();
				logger.debug("POST:"
						+ EntityUtils.toString(request.getEntity()));
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
				e.printStackTrace();
			}
		} else {
			logger.debug("The web admin is not available");
		}
		return closed;

	}

	public boolean closeSolution() {
		return doCloseSolution(getWebAdminTarget(), false, getRequestor());
	}

	private boolean doLoadSolution(String solution, HttpHost webAdmin,
			HttpHost target, boolean fixedWait, Requestor requestor) {
		// if the web admin is available, load the solution
		boolean opened = false;
		if (doIsServerResponding(webAdmin, requestor)) {
			try {
				// Send open solution request
				HttpPost request = getOpenSolutionRequest(solution);
				logger.debug("POST:"
						+ EntityUtils.toString(request.getEntity()));
				HttpResponse response = requestor.execute(webAdmin, request);

				// deal with response
				String content = EntityUtils.toString(response.getEntity());
				logger.debug(content);
				int statusCode = response.getStatusLine().getStatusCode();
				boolean accepted = statusCode == HttpStatus.SC_OK
						&& content.contains("\"result\":true");
				logger.debug("Server has "
						+ (accepted ? "accepted" : "rejected")
						+ " open solution request");
				opened = accepted
						&& doWaitUntilApplicationIsReady(target, false,
								requestor);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			logger.debug("The web admin is not available");
		}
		return opened;
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

	public boolean isServerRunning() {
		boolean isServerRunning = false;
		String os = Utils.getOS();
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
			Requestor requestor){
		boolean isServerResponding = false;
		HttpGet request = new HttpGet("/");
		try {
			HttpResponse response = requestor.execute(target, request);
			boolean is200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
			boolean isWakanda = response.getFirstHeader(HttpHeaders.SERVER)
					.getValue().contains("Wakanda");
			isServerResponding = is200Ok & isWakanda;
			// Consume reponse and release system resources
			EntityUtils.consume(response.getEntity());
		} catch (IOException e) {
			logger.debug(e.getMessage());
			//e.printStackTrace();
		} finally {
			request.abort();
		}
		return isServerResponding;
	}

	public boolean isServerResponding(HttpHost target) {
		return doIsServerResponding(target, getRequestor());
	}

	public boolean isServerResponding() {
		return isServerResponding(getWebAdminTarget());
	}

	private boolean doIsSolutionDeployed(HttpHost target,
			Requestor requestor) {
		return doIsServerResponding(target, requestor);
	}

	public boolean isSolutionDeployed() {
		return isServerResponding(getDefaultTarget());
	}

	public AbstractSettings getSetting() {
		return getRequestor().getSettings();
	}

	public Requestor getRequestor() {
		return this.requestor;
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
