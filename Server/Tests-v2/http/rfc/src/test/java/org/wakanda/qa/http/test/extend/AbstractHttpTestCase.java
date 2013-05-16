package org.wakanda.qa.http.test.extend;

import static org.junit.Assert.assertEquals;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.ProtocolVersion;
import org.wakanda.qa.http.Settings;
import org.wakanda.qa.http.Utils;

import org.wakanda.qa.server.utils.AbstractTestCase;
import org.wakanda.qa.server.utils.IBasicSettings;
import org.wakanda.qa.server.utils.Requestor;
import org.wakanda.qa.server.utils.Requestor.HttpSimpleBufferedResponse;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author Ouissam
 * 
 */

public class AbstractHttpTestCase extends AbstractTestCase {

	public static final String CR = "\r";
	public static final String LF = "\n";
	public static final String CRLF = CR + LF;

	protected HttpHost getDefaultTarget() {
		return getSettings().getDefaultTarget();
	}

	protected String getDefaultHostHeaderValue() {
		return getDefaultTarget().toHostString();
	}

	protected String[] getSupportedMethods() {
		return Settings.getSupportedMethods();
	}

	/**
	 * Executes a request and discards the response entity in order to release
	 * system resources.
	 * 
	 * @param target
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpHost target, HttpRequest request)
			throws Exception {
		return executeRequest(target, request, true);
	}

	/**
	 * Executes a request to the default target.
	 * 
	 * @param request
	 * @param discardEntity
	 *            when true, discards the response entity and so releases the
	 *            system resources.
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request,
			boolean discardEntity) throws Exception {
		return executeRequest(getDefaultTarget(), request, discardEntity);
	}

	/**
	 * Executes a request to the default target and discards the response entity
	 * in order to release system resources.
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request) throws Exception {
		return executeRequest(request, true);
	}

	/**
	 * Executes a raw request to the default target
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpSimpleBufferedResponse executeRawRequest(String request) throws Exception {
		return executeRawRequest(getDefaultTarget(), request);
	}

	/**
	 * Executes an authenticated request to the default target using the admin user.
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeAuthenticated(HttpRequest request)
			throws Exception {
		return getRequestor().executeAuthenticated(request, "admin", "");
	}
	
	protected void assertEqualsReasonPhrase(String expectedReasonPhrase,
			HttpResponse response) {
		String actualReasonPhrase = response.getStatusLine().getReasonPhrase();
		assertEquals("Wrong Reason Phrase", expectedReasonPhrase,
				actualReasonPhrase);
	}
	
	protected void assertEqualsReasonPhrase(String expectedReasonPhrase,
			HttpSimpleBufferedResponse response) {
		String actualReasonPhrase = response.getStatusLine().getReasonPhrase();
		assertEquals("Wrong Reason Phrase", expectedReasonPhrase,
				actualReasonPhrase);
	}

	protected void assertEqualsProtocolVersion(
			ProtocolVersion expectedProtocolVersion, HttpResponse response) {
		ProtocolVersion actualProtocolVersion = response.getProtocolVersion();
		assertEquals("Wrong Protocol Version", expectedProtocolVersion,
				actualProtocolVersion);
	}

	protected Settings getSettings() {
		return Utils.getSettingsInstance();
	}

	@Override
	protected IBasicSettings getDefaultSettings() {
		return getSettings();
	}

	@Override
	protected Requestor getRequestor() {
		Requestor requestor;
		//requestor = Utils.getRequestorInstance();
		requestor = new Requestor(getSettings(), Utils.getHttpClientInstance());
		return requestor;
	}

}