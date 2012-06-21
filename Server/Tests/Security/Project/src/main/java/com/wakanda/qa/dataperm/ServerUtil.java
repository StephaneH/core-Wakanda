package com.wakanda.qa.dataperm;

import static com.wakanda.qa.dataperm.RequestUtil.executeRequest;
import static com.wakanda.qa.dataperm.Resources.getDefaultTarget;
import static com.wakanda.qa.dataperm.Resources.getSolutionPath;
import static com.wakanda.qa.dataperm.Resources.getWakandaServerPathEVName;
import static com.wakanda.qa.dataperm.Resources.getWebAdminTarget;

import java.io.UnsupportedEncodingException;
import java.util.GregorianCalendar;

import org.apache.commons.io.IOUtils;
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

	private static Logger logger = Logger.getLogger(ServerUtil.class);

	private static String getOS() {
		return System.getProperty("os.name");
	}

	private static String getServerPath() {
		String wakSrvEVName = getWakandaServerPathEVName();
		String env = System.getenv(wakSrvEVName);
		String os = getOS();
		String serverPath = null;
		if (env != null) {
			// When Jenkins environement
			serverPath = env;
		} else {
			// otherwise use the server located within the project directory
			serverPath = System.getProperty("user.dir") + "/Wakanda Server";
			if (os.contains("Mac")) {
				// Mac
				serverPath += ".app/Contents/MacOS/Wakanda Server";
			} else if (os.contains("Linux")) {
				// Linux
				serverPath += "/Wakanda";
			} else {
				// Win
				serverPath += "/Wakanda Server.exe";
			}

		}
		// serverPath =
		// "C:\\Users\\Post 4\\Desktop\\19122011\\Matin\\Wak1\\Wakanda Server\\Wakanda Server.exe";
		return serverPath;
	}

	private static String[] getCommandThatLaunchesSerever() {
		String command;
		String[] shellCommand;
		String serverPath = "\"" + getServerPath() + "\"";
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

	private static Process serverProcess = null;

	public static boolean killServerViaInnerProcess() {
		if (serverProcess != null) {
			serverProcess.destroy();
			// serverProcess = null;
			return true;
		} else {
			logger.debug("No inner process attached to the server (Not started or already killed)");
			return false;
		}
	}

	public static boolean runTheServer() {
		String[] command = getCommandThatLaunchesSerever();
		// String[] command = new String[]{"sh", "-c",
		// "\"/home/wakanda/Bureau/HTTP_RFC_PROJECT/Wakanda Server/Wakanda\"",
		// ">", " /dev/null", "2>&1", "&"};
		try {
			logger.debug("Starting the server using: " + command[2]);
			serverProcess = Runtime.getRuntime().exec(command);
			return serverProcess != null;
		} catch (Exception e) {
			logger.debug(e);
		}
		return false;
	}

	public static boolean runTheServerAndCheckIt() {
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
			command = "sudo killall 'Wakanda Server'";
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
		String[] command = getCommandThatKillsSerever();
		try {
			logger.debug("Killing the server using: " + command[2]);
			Process p = Runtime.getRuntime().exec(command);
			logger.debug(IOUtils.toString(p.getInputStream()));
			logger.debug(IOUtils.toString(p.getErrorStream()));
			return true;
		} catch (Exception e) {
			logger.debug(e);
		}
		return false;
	}

	public static boolean loadSolutionAndRunOrRestartServer() {
		if (!isServerRunning()) {
			logger.debug("Server is not running");

		} else {
			logger.debug("Server is already running");
			logger.debug("Trying to restart server...");
			logger.debug("Trying to kill the server...");
			if (!killServerViaCommandLine() || isServerRunning()) {
				logger.debug("Could not kill the server");
				return false;
			}
			logger.debug("Server is killed");
		}

		// The server is not running or killed so we launch it
		logger.debug("Trying to start server...");
		if (!runTheServer() || !isServerRunning()) {
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
				ready = isServerResponding();
				// Thread.sleep((++i) * 1000);
			} catch (Exception e) {
				logger.debug("Exception: " + e.getMessage());
			}
		}

		if (!ready) {
			logger.debug("Server is not responding (after " + i + " sec)");
			return false;
		}
		long end = GregorianCalendar.getInstance().getTimeInMillis();
		logger.debug("Web admin is ready (after " + (end - start) + " ms)");

		// Server is launched & Server is responding
		// so lets load the solution
		logger.debug("Loading the solution...");
		return loadSolution();
	}

	private static boolean loadSolution(HttpHost target, String solution,
			boolean fixedWait) {
			// if the web admin is available, load the solution
			boolean loaded = false;
			if (isServerResponding()) {
				try {
					// build the post request body
					long id = GregorianCalendar.getInstance().getTimeInMillis();
					solution = solution.replaceAll("\\\\", "/");
					String postData = "{\"jsonrpc\":\"2.0\",\"id\":"
							+ id
							+ ",\"module\":\"admin\",\"method\":\"openSolution\",\"params\":\""
							+ solution + "\"}";

					HttpPost request = buildPostRequest(postData);
					logger.debug("POST:" + postData);
					HttpResponse response = executeRequest(request, target);
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
							loaded = isSolutionDeployed();
						} else {
							logger.debug("Waiting for the solution to be ready...");
							int i = 0;
							while (!loaded && i < 10) {
								loaded = isSolutionDeployed();
								Thread.sleep((++i) * 1000);
							}
							if (loaded) {
								logger.debug("Solution is ready (after " + i
										+ " sec)");
							}
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

	public static HttpPost buildPostRequest(String body)
			throws UnsupportedEncodingException {
		HttpPost request = new HttpPost("/rpc/");
		request.addHeader(HttpHeaders.CONTENT_TYPE,
				"application/json-rpc; charset=utf-8");
		StringEntity entity = new StringEntity(body);
		request.setEntity(entity);
		return request;
	}

	public static boolean loadSolution(String solution) {
		return loadSolution(getWebAdminTarget(), solution, false);
	}

	public static boolean loadSolution() {
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
			command = "ps -aux | grep -v grep | grep Wakanda\\ Server/Wakanda && (exit 0) || (exit 1)";
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

	public static boolean isServerResponding() {
		boolean isServerResponding = false;
		try {
			HttpResponse response = executeRequest(
					new HttpGet("/"), getWebAdminTarget());
			boolean is200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
			boolean isWakanda = response.getFirstHeader(HttpHeaders.SERVER)
					.getValue().contains("Wakanda");
			isServerResponding = is200Ok & isWakanda;
			EntityUtils.consume(response.getEntity());

		} catch (Exception e) {
			logger.debug(e.getMessage());
		} 
		return isServerResponding;
	}

	public static boolean isSolutionDeployed(HttpHost target) {
		boolean isSolutionDeployed = false;
		try {
			HttpResponse response = executeRequest(
					new HttpGet("/"), target);
			boolean is200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
			boolean isWakanda = response.getFirstHeader(HttpHeaders.SERVER)
					.getValue().contains("Wakanda");
			isSolutionDeployed = is200Ok & isWakanda;
			EntityUtils.consume(response.getEntity());
		} catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return isSolutionDeployed;
	}

	public static boolean isSolutionDeployed() {
		return isSolutionDeployed(getDefaultTarget());
	}
}
