/**
 * 
 */
package org.wakanda.qa.bugs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.net.Socket;

import org.apache.commons.vfs2.FileObject;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.DefaultHttpClientConnection;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.log4j.Logger;
import org.wakanda.qa.bugs.settings.Configuration;
import org.wakanda.qa.bugs.utils.Utils;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class WAK0082512 {
	private static Logger logger = Logger.getLogger(WAK0082512.class);

	/**
	 * @param args
	 * @throws Exception
	 */
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
		HttpHost target = Configuration.getInstance().getSeverAdmin().getSetting()
				.getDefaultTarget();

		String url = "/createFileWithAuthBasic/";

		HttpPost req = new HttpPost(url);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		req.addHeader(HTTP.CONTENT_LEN,
				Long.toString(reqEntity.getContentLength()));

		// wrong credentials
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				"wrong", "wrong");
		BasicScheme authscheme = new BasicScheme();
		Header authResponse = authscheme.authenticate(creds, req, null);
		req.addHeader(authResponse);

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();
			logger.debug(">> " + Utils.toString(req));
			// read the response...we should get a 401 Unauthorized
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug("<< " + response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_UNAUTHORIZED, actual);

		} finally {
			conn.close();
		}
	}

}
