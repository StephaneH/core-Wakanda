package com.wakanda.qa.http.test.messages;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.io.IOException;
import java.net.Socket;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.http.Header;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.RequestLine;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.client.methods.HttpOptions;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.DefaultHttpClientConnection;
import org.apache.http.impl.DefaultHttpRequestFactory;
import org.apache.http.impl.io.HttpRequestParser;
import org.apache.http.io.SessionInputBuffer;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicHttpRequest;
import org.apache.http.message.BasicLineParser;
import org.apache.http.message.HeaderGroup;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.ExecutionContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.protocol.HttpRequestExecutor;
import org.apache.http.util.EntityUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.wakanda.qa.http.Resources;
import com.wakanda.qa.http.test.extend.AbstractHttpTestCase;
import com.wakanda.qa.http.test.extend.SessionInputBufferMockup;

/**
 * This class manages all test cases related with the request method.
 * 
 * @author Ouissam
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class RequestMethodTest extends AbstractHttpTestCase {

	/**
	 * <b>Implements:</b> Methods01
	 * <p/>
	 * Check that GET method is supported and returns the correct response.
	 * <p/>
	 * <b>Reference:</b> SPEC694 (RFC2616) 9.3
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatGETMethodIsSupportedAndReturnsTheCorrectResponse()
			throws Exception {
		String url = "/toCheckGetMethod.tmp";
		// create resource with random content
		byte[] expecteds = RandomStringUtils.random(1024).getBytes();
		Resources.writeBytesToFile(getDefaultProjectWebFolderPath() + url,
				expecteds);
		// request & response
		HttpResponse response = executeRequest(new HttpGet(url));
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		// check content
		byte[] actuals = EntityUtils.toByteArray(response.getEntity());
		Assert.assertArrayEquals("Wrong response content", expecteds, actuals);
	}

	/**
	 * <b>Implements:</b> Methods02
	 * <p/>
	 * Check that HEAD method is supported and returns the correct response.
	 * <p/>
	 * <b>Reference:</b> SPEC694 (RFC2616) 9.4
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHEADIsSupportedAndReturnsTheCorrectResponse()
			throws Exception {
		String url = "/toCheckHeadMethod.tmp";
		// create resource with random content
		byte[] expecteds = RandomStringUtils.random(1024).getBytes();
		Resources.writeBytesToFile(getDefaultProjectWebFolderPath() + url,
				expecteds);
		// request & response
		HttpResponse responseHead = executeRequest(new HttpHead(url));
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_OK, responseHead);
		// check content
		assertNull("Response must have no body", responseHead.getEntity());

		// request get method
		HttpResponse responseGet = executeRequest(new HttpGet(url));

		assertEquals(
				"Response must have the same number of headers as the response to a GET method",
				responseGet.getAllHeaders().length,
				responseHead.getAllHeaders().length);
		
		// Get headers of the entity meta info of the response of GET
		HeaderGroup metaInfoHeaders = new HeaderGroup();
		metaInfoHeaders.addHeader(responseGet.getFirstHeader(HttpHeaders.CONTENT_LENGTH));
		metaInfoHeaders.addHeader(responseGet.getFirstHeader(HttpHeaders.CONTENT_ENCODING));
		metaInfoHeaders.addHeader(responseGet.getFirstHeader(HttpHeaders.CONTENT_TYPE));
		metaInfoHeaders.addHeader(responseGet.getFirstHeader(HttpHeaders.LAST_MODIFIED));
		
		// compare each header value with he one of received from HEAD response, they should be the same.
		HeaderIterator it = metaInfoHeaders.iterator();
		while (it.hasNext()) {
			Header headerGET = it.nextHeader();
			Header headerHEAD = responseHead
					.getFirstHeader(headerGET.getName());
			assertNotNull("Response must contain the header: " + headerHEAD);
			assertEquals(
					"Header value should be the same as a response to GET method",
					headerGET.getValue(), headerHEAD.getValue());
		}
	}

	/**
	 * <b>Implements:</b> Methods03
	 * <p/>
	 * Check that TRACE method is supported and returns the correct response.
	 * <p/>
	 * <b>Reference:</b> SPEC694 (RFC2616) 9.8
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatTRACEIsSupportedAndReturnTheCorrectResponse()
			throws Exception {

		// build the TRACE request
		BasicHttpRequest request = new BasicHttpRequest("TRACE", "/", HttpVersion.HTTP_1_0);
		HeaderGroup headers = new HeaderGroup();
		// headers.addHeader(new BasicHeader("Host", "localhost:8081"));
		for (int i = 0; i < 4; i++) {
			headers.addHeader(new BasicHeader("header" + i, "value" + i));
		}
		request.setHeaders(headers.getAllHeaders());

		// Execute the request
		

		HttpRequestExecutor httpexecutor = new HttpRequestExecutor();
		HttpContext context = new BasicHttpContext(null);

		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();

		context.setAttribute(ExecutionContext.HTTP_CONNECTION, conn);
		context.setAttribute(ExecutionContext.HTTP_TARGET_HOST,
				getDefaultTarget());
		
		//logger.debug(getRequestAsString(request));
		
		HttpParams params = new SyncBasicHttpParams();
		Socket socket = new Socket(getDefaultHostName(), getDefaultPort());
		conn.bind(socket, params);
		HttpResponse response = httpexecutor.execute(request, conn, context);

		//logger.debug(getResponseAsString(response));
		
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		// check content
		HttpEntity respEntity = response.getEntity();
		assertNotNull("Response must have a body", respEntity);
		assertEquals("Wrong Content-Type", "message/http",
				EntityUtils.getContentMimeType(respEntity));

		// parse the response content
		String respContent = EntityUtils.toString(respEntity);
		SessionInputBuffer inbuffer = new SessionInputBufferMockup(respContent,
				"US-ASCII");
		HttpRequestParser parser = new HttpRequestParser(inbuffer,
				BasicLineParser.DEFAULT, new DefaultHttpRequestFactory(),
				new BasicHttpParams());
		HttpRequest httprequest = (HttpRequest) parser.parse();

		// check the response content
		RequestLine reqline = httprequest.getRequestLine();
		assertNotNull(reqline);
		assertEquals("TRACE", reqline.getMethod());
		assertEquals("/", reqline.getUri());
		assertEquals(HttpVersion.HTTP_1_0, reqline.getProtocolVersion());
		Header[] contentheaders = httprequest.getAllHeaders();
		assertEquals(headers.getAllHeaders().length, contentheaders.length);
	}
	
	/**
	 * <b>Implements:</b> Methods04
	 * <p/>
	 * Check that server respond with 501 Not Implemented the method is unknown.
	 * <p/>
	 * <b>Reference:</b> SPEC694 (RFC2616) 5.1.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testNotImplementedMethod() throws Exception {
		HttpRequest request = new BasicHttpRequest("whatever", getDefaultUrl());
		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_NOT_IMPLEMENTED, response);
	}
	
	/**
	 * <b>Implements:</b> Methods05
	 * <p/>
	 * Check that CONNECT method is not implemented (proxy).
	 * <p/>
	 * <b>Reference:</b> SPEC694 (RFC2616) 9.9
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatCONNECTIsNotImplemented() throws IOException,
			HttpException {
		HttpRequest request = new BasicHttpRequest("CONNECT", "/");
		HttpResponse response = executeRequest(request);
		//logger.debug(response.getStatusLine());
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_NOT_IMPLEMENTED, response);
	}
	
	
	/**
	 * <b>Implements:</b> Methods06
	 * <p/>
	 * Check that POST method is not allowed with static request handler
	 * <p/>
	 * <b>Reference:</b> Functional specifications
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatPOSTIsNotAllowedWithStaticRequestHandler()
			throws Exception {
		HttpPost request = new HttpPost("/");
		ByteArrayEntity entity = new ByteArrayEntity(RandomStringUtils.random(
				256).getBytes());
		request.setEntity(entity);
		HttpResponse response = executeRequest(request);
		//logger.debug(response.getStatusLine());
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_METHOD_NOT_ALLOWED, response);
	}

	/**
	 * <b>Implements:</b> Methods07
	 * <p/>
	 * Check that POST method is allowed with dynamic request handler.
	 * <p/>
	 * <b>Reference:</b> Functional specifications
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatPOSTIsAllowedWithDynamicRequestHandler()
			throws Exception {
		//request
		HttpPost request = new HttpPost("/checkPostMethod/");
		String expected = "Hello!";
		StringEntity entity = new StringEntity(expected);
		request.setEntity(entity);
		
		//response
		HttpResponse response = executeRequest(request);

		// check status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		
		// check content
		HttpEntity respEntity = response.getEntity();
		assertNotNull("Response should enclose an entity", respEntity);
		assertEquals("Wrong response content", expected,
				EntityUtils.toString(respEntity));
	}

	/**
	 * <b>Implements:</b> Methods08
	 * <p/>
	 * Check that PUT method is not allowed.
	 * <p/>
	 * <b>Reference:</b> Functional specifications.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatPUTIsNotAllowed() throws Exception {
		HttpPut request = new HttpPut("/whatever");
		ByteArrayEntity entity = new ByteArrayEntity(RandomStringUtils.random(
				256).getBytes());
		request.setEntity(entity);
		HttpResponse response = executeRequest(request);
		//logger.debug(response.getStatusLine());
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_METHOD_NOT_ALLOWED, response);
	}

	/**
	 * <b>Implements:</b> Methods09
	 * <p/>
	 * Check that DELETE method is not allowed.
	 * <p/>
	 * <b>Reference:</b> Functional specifications.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatDELETEIsNotAllowed() throws Exception {
		String url = "/toCheckDeleteMethod.tmp";
		// create resource with random content
		byte[] expecteds = RandomStringUtils.random(1024).getBytes();
		Resources.writeBytesToFile(getDefaultProjectWebFolderPath() + url,
				expecteds);
		HttpDelete request = new HttpDelete(url);
		HttpResponse response = executeRequest(request);
		//logger.debug(response.getStatusLine());
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_METHOD_NOT_ALLOWED, response);
	}

	/**
	 * <b>Implements:</b> Methods10
	 * <p/>
	 * Check that OPTION method is not allowed.
	 * <p/>
	 * <b>Reference:</b> SPEC694 (2616) 9.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatOPTIONIsNotAllowed() throws Exception {
		HttpOptions request = new HttpOptions("/");
		HttpResponse response = executeRequest(request);
		//logger.debug(response.getStatusLine());
		// check status code
		assertEqualsStatusCode(HttpStatus.SC_METHOD_NOT_ALLOWED, response);
	}
	
	/**
	 * <b>Implements:</b> Methods11
	 * <p/>
	 * Check that the method tokens are case-sensitives
	 * <p/>
	 * <b>Reference:</b> SPEC694 (RFC2616) 5.1.1
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters({"gEt", "HeaD", "tRace", "pUt", "opTionS", "deLetE", "PoSt"})
	public void testThatMethodsAreCaseSensitive(String method) throws Exception {
		HttpRequest request =  new BasicHttpRequest(method, "/");
		HttpResponse response = executeRequest(request);
		int expected = HttpStatus.SC_NOT_IMPLEMENTED;
		int actual = response.getStatusLine().getStatusCode();
		assertEquals("[" + method + "]Method name must be case-sensitive", expected, actual);
	}


}
