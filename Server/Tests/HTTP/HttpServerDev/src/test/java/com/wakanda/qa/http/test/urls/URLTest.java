package com.wakanda.qa.http.test.urls;

import static org.junit.Assert.*;

import java.net.URLEncoder;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.junit.Assert;
import org.junit.Test;

import com.wakanda.qa.http.test.extend.AbstractHttpTestCase;

/**
 * This class manages all test cases related with the URL.
 * 
 * @author Ouissam
 * 
 */
public class URLTest extends AbstractHttpTestCase {

	/**
	 * <b>Implements:</b> URL01
	 * <p/>
	 * Check that the server can handle an URIs with length between 3-4ko
	 * (boundary test)
	 * <p/>
	 * <b>Reference:</b> SPEC 689 (Yannick) 3.2.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerHandlseURLBetween3And4ko() throws Exception {
		// This URL contains 3724 characters (3-4Ko).
		String url = getURLsProp().getProperty("longURL");
		String request = "GET " + url + " HTTP/1.1" + CRLF 
						+ "host:" + getDefaultHostHeaderValue()	+ CRLF
						+ CRLF;
		HttpResponse response = executeRequestString(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

	/**
	 * <b>Implements:</b> URL02
	 * <p/>
	 * Check that server can handle an URL greater than 4Ko
	 * <p/>
	 * <b>Reference:</b> SPEC 689 (Yannick) 3.2.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerHandlesURLGreaterThan4ko() throws Exception {
		String url = "/?param="
				+ RandomStringUtils.random(4097, 32, 127, true, true);
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

	/**
	 * <b>Implements:</b> URL03
	 * <p/>
	 * Check that server is case insensitive when dealing with URIs.
	 * <p/>
	 * <b>Reference:</b> SPEC 689 (Yannick) 3.2.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatURLIsCaseInsensitive() throws Exception {

		String url = "simple.html";

		// expected
		String request1 = "GET " + url + " HTTP/1.1" + CRLF 
						+ "Host:" + getDefaultHostHeaderValue() + CRLF
						+ CRLF;
		HttpResponse response1 = executeRequestString(request1);
		int exSC = response1.getStatusLine().getStatusCode();
		byte[] exContent = EntityUtils.toByteArray(response1.getEntity());

		// actual
		String request2 = "GET " + url.toUpperCase() + " HTTP/1.1" + CRLF
						+ "Host:" + getDefaultHostHeaderValue() + CRLF
						+ CRLF;
		HttpResponse response2 = executeRequestString(request2);
		int acSC = response2.getStatusLine().getStatusCode();
		byte[] acContent = EntityUtils.toByteArray(response2.getEntity());

		// check
		assertEquals("URLs should be case-insensitive", exSC, acSC);

		Assert.assertArrayEquals("Response content should be the same",
				exContent, acContent);
	}

	/**
	 * <b>Implements:</b> URL04
	 * <p/>
	 * Check that server can decode and interpret properly a request URI encoded
	 * with "% HEX HEX"
	 * <p/>
	 * <b>Reference:</b> SPEC 689 (RFC2616) 5.1.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHexEncodedURLIsSupported() throws Exception {

		// Encode the URL using a %HEX HEX encoding
		String urlEncoded = URLEncoder.encode(
				getURLsProp().getProperty("longURL"), "UTF-8");
		// System.out.println(urlEncoded);
		HttpGet request = new HttpGet(urlEncoded);
		HttpResponse response = executeRequest(request);

		assertEquals(
				"Server do not support URL encoded using % HEX HEX encoding",
				HttpStatus.SC_OK, response.getStatusLine().getStatusCode());

	}

}
