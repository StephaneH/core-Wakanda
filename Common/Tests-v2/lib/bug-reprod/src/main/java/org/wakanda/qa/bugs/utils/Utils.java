/**
 * 
 */
package org.wakanda.qa.bugs.utils;

import static org.junit.Assert.assertTrue;

import java.net.URL;

import org.apache.commons.vfs2.FileObject;
import org.apache.commons.vfs2.FileSystemManager;
import org.apache.commons.vfs2.Selectors;
import org.apache.commons.vfs2.VFS;
import org.apache.http.Header;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.message.BasicLineFormatter;
import org.wakanda.qa.bugs.settings.Settings;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Utils{
	
	public static final String CRLF = "\r\n";
	
	
	public static String toString(HttpRequest request) {
		StringBuffer result = new StringBuffer();
		BasicLineFormatter lineFormatter = BasicLineFormatter.DEFAULT;

		result.append(lineFormatter.formatRequestLine(null,
				request.getRequestLine()));
		result.append(CRLF);

		HeaderIterator it = request.headerIterator();
		while (it.hasNext()) {
			Header header = it.nextHeader();
			result.append(lineFormatter.formatHeader(null, header));
			result.append(CRLF);
		}
		result.append(CRLF);
		return result.toString();
	}

	public static String toString(HttpResponse response) {
		StringBuffer result = new StringBuffer();
		BasicLineFormatter lineFormatter = BasicLineFormatter.DEFAULT;

		result.append(lineFormatter.formatStatusLine(null,
				response.getStatusLine()));
		result.append(CRLF);

		HeaderIterator it = response.headerIterator();
		while (it.hasNext()) {
			Header header = it.nextHeader();
			result.append(lineFormatter.formatHeader(null, header));
			result.append(CRLF);
		}
		result.append(CRLF);
		return result.toString();
	}
	
	public static FileObject extractAndOpenSolution() throws Exception{
		FileObject waSolution = null;
		String suffix = "HttpServer/HttpServer.waSolution";

		URL solutionRootURL = Settings.class.getResource("solution");

		FileSystemManager fsManager = VFS.getManager();
		FileObject solutionRootSource = fsManager.resolveFile(solutionRootURL
				.toString());
		FileObject fsRoot = solutionRootSource.getFileSystem().getRoot();

		if (fsRoot.getName().getScheme().equals("jar")) {
			// Extract the solution
			FileObject solutionRootDest = fsRoot.getParent().resolveFile(
					"http-rfc-solution");
			solutionRootDest.copyFrom(solutionRootSource, Selectors.SELECT_ALL);
			waSolution = solutionRootDest.resolveFile(suffix);
		} else {
			waSolution = solutionRootSource.resolveFile(suffix);
		}
		
		assertTrue("*.waSolution is not found", waSolution.exists());
		
		return waSolution;
	}
	
}
