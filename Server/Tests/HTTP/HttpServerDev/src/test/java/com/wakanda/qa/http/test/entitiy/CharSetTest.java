package com.wakanda.qa.http.test.entitiy;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.nio.charset.Charset;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.wakanda.qa.http.CharSetUtil;
import com.wakanda.qa.http.Resources;
import com.wakanda.qa.http.test.extend.AbstractHttpTestCase;

/**
 * This class managers all test cases related with charsets.
 * 
 * @author Ouissam
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class CharSetTest extends AbstractHttpTestCase {

	/**
	 * <b>Implements:</b> CharSet01
	 * <p>
	 * Check that server sends an error response with the 406 (not acceptable)
	 * status code if an Accept-Charset header is present, and if the server
	 * cannot send a response which is acceptable according to the
	 * Accept-Charset header.
	 * <p>
	 * <b>Reference:</b> SPEC698 (RFC2616) 14.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReturns406WhenCharSetNotAcceptable()
			throws Exception {
		String charset = "Unknown";
		HttpPost request = getDefaultPostRequest();
		request.addHeader(HttpHeaders.ACCEPT_CHARSET, charset);
		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_NOT_ACCEPTABLE, response);
	}

	/**
	 * <b>Implements:</b> CharSet02
	 * <p>
	 * Check that server does not deal with charsets when it comes to static
	 * content: the content must be sent as is, and no charset parameter is
	 * specified in the "Content-type" header of the response
	 * <p>
	 * <b>Reference:</b> Yannick
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters(method = "parameters")
	public void testThatServerIgnoresCharSetWhenStaticContent(Charset charset)
			throws Exception {
		String url = "/tocompress.html";
		// Charset charset = Charset.forName("ISO-8859-5");
		String charsetName = charset.name();

		// Send request for charset
		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_CHARSET, charsetName);
		HttpResponse response = executeRequest(request);
		byte[] responseContent = EntityUtils.toByteArray(response.getEntity());

		// Read encoded content
		File file = new File(getDefaultProjectWebFolderPath() + url);
		BufferedInputStream br = new BufferedInputStream(new FileInputStream(
				file));
		byte[] bytes = new byte[(int) file.length()];
		br.read(bytes);

		// check the content validity
		String responseContentCharSet = EntityUtils.getContentCharSet(response
				.getEntity());
		assertNull(responseContentCharSet);
		Assert.assertArrayEquals(bytes, responseContent);

	}

	/**
	 * <b>Implements:</b> CharSet03
	 * <p>
	 * Check that if the "content charSet" parameter IS part of the
	 * "Accepted charSets", the response content must be encoded and the
	 * "Content-Type" header field must be set with this charset value as media
	 * type parameter.
	 * <p>
	 * <b>Reference:</b> Yannick
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters(method = "parameters")
	public void testThatServerSupportsCharSetWhenDynamicContent(Charset charset)
			throws Exception {

		//Charset charset = Charset.forName("ISO-8859-8");
		// Init variables
		String charsetName = charset.name();
		logger.debug("Testing " + charsetName + " charset...");

		// Generate unicode content that could be encoded using current
		// charset
		String unicodeContent = CharSetUtil.getSupportedCharacrtersAsString(
				charsetName, false);

		// Write unicode content in file
		String unicodeContentPath = Resources.getCharsetFolder() + "/"
				+ charsetName + "-UTF-8.txt";
		CharSetUtil.encodeUnicodeContentToFile1(unicodeContent, "UTF-8",
				unicodeContentPath);

		// Encode unicode content in target charset
		byte[] encodedContent = unicodeContent.getBytes(charsetName);

		// Send request for charset and get the response content
		HttpGet request = new HttpGet(
				"/checkCharsetWhenContentTypeIsSet/?charsetName=" + charsetName);
		request.addHeader(HttpHeaders.ACCEPT_CHARSET, charsetName);
		HttpResponse response = executeRequest(request);
		byte[] responseContent = EntityUtils.toByteArray(response.getEntity());

		// check the content validity
		String responseContentCharSet = EntityUtils.getContentCharSet(response
				.getEntity());

		assertEquals(charsetName, responseContentCharSet);
		Assert.assertArrayEquals(charsetName + " not supported",
				encodedContent, responseContent);

		// assertEquals(charsetName + " not supported",new
		// String(encodedContent, charsetName), new String(responseContent,
		// charsetName));

	}

	/**
	 * <b>Implements:</b> CharSet04
	 * <p>
	 * Check that UTF-8 is the default charset handled by the server
	 * <p>
	 * <b>Reference:</b> Yannick
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatUTF8IsTheDefaultCharset() throws Exception {
		// this test will be done using arabic charset
		String charsetName = "ISO-8859-6";
		String expectedCharset = "UTF-8";

		logger.debug("Testing " + charsetName + " charset...");

		// get the charset characters set
		String unicodeContent = CharSetUtil.getSupportedCharacrtersAsString(
				charsetName, false);

		// save it into the solution web folder
		String encodedContentPath = Resources.getCharsetFolder() + "/"
				+ charsetName + ".txt";
		CharSetUtil.encodeUnicodeContentToFile1(unicodeContent, charsetName,
				encodedContentPath);

		// send request to corresponding request handler
		HttpGet request = new HttpGet("/checkDefaultCharset/");
		request.addHeader(HttpHeaders.ACCEPT_CHARSET, "*");
		HttpResponse response = executeRequest(request);

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		// check the content type charSet
		assertEquals(EntityUtils.getContentCharSet(response.getEntity()),
				expectedCharset);
		// response content
		byte[] responseContent = EntityUtils.toByteArray(response.getEntity());

		// expected content
		byte[] expectedContent = unicodeContent.getBytes(expectedCharset);

		// check the response content validity
		Assert.assertArrayEquals(expectedCharset
				+ " is not the default charset", expectedContent,
				responseContent);
	}

	/**
	 * Implements: CharSet05
	 * <p>
	 * Check that server identify character sets case-insensitive tokens
	 * <p>
	 * Reference: SPEC689 (RFC2616) 3.4
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters(method = "parameters")
	public void testThatCharSetTokensAreCaseInsensitive(Charset charset)
			throws Exception {
		// Charset name
		String charsetName = charset.name();

		// Send request with charset name in upper case
		HttpGet request = new HttpGet(
				"/checkCharsetWhenContentTypeIsSet/?charsetName=" + charsetName);
		String acceptCharset = charsetName.toUpperCase();
		request.addHeader(HttpHeaders.ACCEPT_CHARSET, acceptCharset);
		HttpResponse response = executeRequest(request);

		// check the content validity
		String responseContentCharSet = EntityUtils.getContentCharSet(response
				.getEntity());

		assertTrue(charsetName + " charset token must be case insensitive",
				charsetName.equalsIgnoreCase(responseContentCharSet));

	}

	/**
	 * <b>Implements:</b> CharSet06
	 * <p>
	 * Check that server responds with 415 when the charset of the request
	 * entity is not supported.
	 * <p>
	 * <b>Reference:</b> SPEC695 (RFC2616) 10.4.16
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReplaysWith415WhenCharsetOfRequestEntityIsNotSupported()
			throws Exception {
		// entity
		String mt = HTTP.PLAIN_TEXT_TYPE;
		String cs = "whatever";

		StringEntity reqEntity = new StringEntity("Hello !");
		reqEntity.setContentType(mt + HTTP.CHARSET_PARAM + cs);

		// request
		HttpPost request = new HttpPost("/checkPostMethod/");
		request.setEntity(reqEntity);

		// response
		HttpResponse response = executeRequest(request);
		logger.debug(EntityUtils.toString(response.getEntity()));
		assertEqualsStatusCode(HttpStatus.SC_UNSUPPORTED_MEDIA_TYPE, response);
	}

	/**
	 * <b>Implements:</b> CharSet07
	 * <p>
	 * Check that server does not label the charset of entities encoded
	 * ISO-8859-1.
	 * <p>
	 * <b>Reference:</b> RFC2616 19.3
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDoesNotLabelTheCharsetOfEntitiesEncodedWith_ISO_8859_1()
			throws Exception {
		String acptCharset = HTTP.ISO_8859_1;

		// get the unicode character set of the specified encoding.
		char[] chars = CharSetUtil.getSupportedCharacrters(acptCharset, false);

		// create a random string from that set limited to letters
		String unicodeContent = RandomStringUtils.random(255, 0, chars.length,
				true, false, chars);

		// Write unicode content in file
		String unicodeContentPath = Resources.getCharsetFolder() + "/"
				+ acptCharset + "-UTF-8.txt";
		CharSetUtil.encodeUnicodeContentToFile1(unicodeContent, "UTF-8",
				unicodeContentPath);

		// Encode unicode content in target charset
		byte[] expecteds = unicodeContent.getBytes(acptCharset);

		// Send request for charset
		HttpGet request = new HttpGet(
				"/checkCharsetWhenContentTypeIsSet/?charsetName=" + acptCharset);
		request.addHeader(HttpHeaders.ACCEPT_CHARSET, acptCharset);

		// get the response content
		HttpResponse response = executeRequest(request);

		// check that charset is not labeled
		String resCharset = EntityUtils.getContentCharSet(response.getEntity());
		assertEquals(acptCharset + " charset should not be labeled", null,
				resCharset);

		// check content validity
		byte[] actuals = EntityUtils.toByteArray(response.getEntity());
		Assert.assertArrayEquals(acptCharset + " not supported", expecteds,
				actuals);

	}

	/**
	 * <b>Implements:</b> CharSet07
	 * <p>
	 * Check that server does not label the charset of entities encoded
	 * ISO-8859-1.
	 * <p>
	 * <b>Reference:</b> RFC2616 19.3
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDoesNotLabelTheCharsetOfEntitiesEncodedWith_US_ASCII()
			throws Exception {
		String acptCharset = HTTP.US_ASCII;

		// create a random string from that set limited to letters
		String unicodeContent = RandomStringUtils.randomAscii(255);

		// Write unicode content in file
		String unicodeContentPath = Resources.getCharsetFolder() + "/"
				+ acptCharset + "-UTF-8.txt";
		CharSetUtil.encodeUnicodeContentToFile1(unicodeContent, "UTF-8",
				unicodeContentPath);

		// Encode unicode content in target charset
		byte[] expecteds = unicodeContent.getBytes(acptCharset);

		// Send request for charset
		HttpGet request = new HttpGet(
				"/checkCharsetWhenContentTypeIsSet/?charsetName=" + acptCharset);
		request.addHeader(HttpHeaders.ACCEPT_CHARSET, acptCharset);

		// get the response content
		HttpResponse response = executeRequest(request);

		// check that charset is not labeled
		String resCharset = EntityUtils.getContentCharSet(response.getEntity());
		assertEquals(acptCharset + " charset should not be labeled", null,
				resCharset);

		// check content validity
		byte[] actuals = EntityUtils.toByteArray(response.getEntity());
		Assert.assertArrayEquals(acptCharset + " not supported", expecteds,
				actuals);

	}

	@SuppressWarnings("unused")
	private Object[] parameters() {
		return CharSetUtil.getToolBoxWebCharSetSupportedByJVM().toArray();
	}

}
