/**
 * 
 */
package org.wakanda.qa.bugs;

import static org.junit.Assert.assertTrue;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.vfs2.FileObject;
import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.wakanda.qa.bugs.settings.Configuration;
import org.wakanda.qa.bugs.utils.Utils;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class WAK0082161 {

	private static Logger logger = Logger.getLogger(WAK0082161.class);
	
	private static String resourceName = "toCheckRange.tmp";

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

		String data = null;

		// Random content of 256 bytes
		data = RandomStringUtils.randomAscii(256);
		
		// Write it to a file
		FileObject resource = waSolution.getParent().resolveFile(
				"HttpServer\\WebFolder");

		if (!resource.exists())
			throw new Exception("Cannot find WebFolder");
		resource = resource.resolveFile(resourceName);

		FileUtils
				.writeStringToFile(new File(resource.getURL().getFile()), data);

		logger.debug("Using byte-range-spec");
		caseWithByteRangeSpec();

	}
	
	private static void caseWithByteRangeSpec() throws Exception{
		// Range
		Header hRange = new BasicHeader(HttpHeaders.RANGE, "bytes=508-510");

		// Request
		HttpRequest request = new HttpGet("/" + resourceName);
		request.addHeader(hRange);

		logger.debug(">> " + request.getRequestLine());
		logger.debug(">> " + request.getFirstHeader(HttpHeaders.RANGE));

		// Get response
		HttpResponse response = Configuration.getInstance().getSeverAdmin().getRequestor()
				.execute(request);

		// Check status-code
		logger.debug("<< " + response.getStatusLine());

		// Check entity length
		logger.debug("<< "
				+ response.getFirstHeader(HttpHeaders.CONTENT_LENGTH));

		// Check Content-Range header
		Header hContentRange = response
				.getFirstHeader(HttpHeaders.CONTENT_RANGE);
		logger.debug("<< " + hContentRange);

		// Check entity content
		String acContent = EntityUtils.toString(response.getEntity());
		logger.debug("<< Entity-body: " + acContent);
	}
	
}
