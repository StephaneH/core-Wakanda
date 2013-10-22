/**
 * 
 */
package org.wakanda.qa.bugs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.net.Socket;

import org.apache.commons.vfs2.FileObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.DefaultHttpClientConnection;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.wakanda.qa.bugs.settings.Configuration;
import org.wakanda.qa.bugs.utils.Utils;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class WAK0079087_V1 {

	private static Logger logger = Logger.getLogger(WAK0079087_V1.class);
	
	private static enum Server {
		APACHE, WAKANDA, IIS
	};

	private static Server getDefaultServer() {
		return Server.WAKANDA;
	}

	private static HttpHost getDefaultTarget() {
		if (getDefaultServer() == Server.WAKANDA)
			return Configuration.getInstance().getSettings().getDefaultTarget();
		else
			return new HttpHost("localhost", 80);
	}

	private static boolean useChunked() {
		if (getDefaultServer() == Server.WAKANDA)
			return false;
		else
			return true;
	}

	private static String getDefaultUrl() {
		if (getDefaultServer() == Server.WAKANDA)
			return "/checkPostMethod/";
		else
			return "/";
	}

	public static void main(String[] args) throws Exception {

		if (args.length < 1) {
			throw new IllegalArgumentException(
					"You need to pass the server path as argument");
		}

		FileObject waSolution = Utils.extractAndOpenSolution();
		String waSolutionPath = new File(waSolution.getURL().getFile())
				.getCanonicalPath();

		boolean serverOk = Configuration.getInstance().getSeverAdmin().runServer(args[0],
				waSolutionPath);

		assertTrue("Server not started of solution not opened", serverOk);

		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, Configuration.getInstance().getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			logger.debug("Creating and binding the socket...");
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			logger.debug("Sending the request header..");
			logger.debug(">> " + Utils.toString(req));
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response...we should get a 100-Continue
			logger.debug("Receiving the response...");
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug("<< " + response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_CONTINUE, actual);

			// the server should continue to read from the input stream so we
			// send the request entity
			logger.debug("Sending the request entity...");
			logger.debug(">> " + EntityUtils.toString(req.getEntity()));
			conn.sendRequestEntity(req);
			conn.flush();

			// read the response...we should get a 200 OK
			response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_OK, actual);

		} finally {
			conn.close();
		}
	}

}
