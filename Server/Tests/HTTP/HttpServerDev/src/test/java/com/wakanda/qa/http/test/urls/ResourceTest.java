package com.wakanda.qa.http.test.urls;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import com.wakanda.qa.http.Resources;
import com.wakanda.qa.http.test.extend.AbstractHttpTestCase;

/**
 * This class manages all test cases related with resource identifing.
 * 
 * @author Ouissam
 * 
 */
public class ResourceTest extends AbstractHttpTestCase {
	
	/**
	 * <b>Implements:</b> Resource01
	 * <p/>
	 * Servers MUST report a 400 (Bad Request) error if an HTTP/1.1 request does
	 * not include a Host request-header.
	 * <p/>
	 * <b>Reference:</b> RFC2616 19.6.1.1 + 14.23
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReports400BadRequestWhenHostHeaderIsMissing()
			throws Exception {

		String request = "GET / HTTP/1.1" + CRLF + CRLF;
		HttpResponse response = executeRequestString(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);

		request = "GET / HTTP/1.1" + CRLF + "Host:"
				+ getDefaultHostHeaderValue() + CRLF + CRLF;
		response = executeRequestString(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

	/**
	 * <b>Implements:</b> Resource02
	 * <p/>
	 * Check that host header is optional in HTTP/1.0 requests.
	 * <p/>
	 * <b>Reference:</b> RFC2616 19.6.1.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHostHeaderIsOptionalIn_HTTP_1_0_Request()
			throws Exception {
		String request = "GET / HTTP/1.0" + CRLF + CRLF;
		HttpResponse response = executeRequestString(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

	/**
	 * <b>Implements:</b> Resource03
	 * <p/>
	 * Check that server accepts absolute URIs.
	 * <p/>
	 * <b>Reference:</b> RFC2616 19.6.1.1 + 5.1.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerAcceptsAbsoluteURI() throws Exception {
		// generate a resource with random content
		String expected = RandomStringUtils.randomAlphanumeric(256);
		String resource = "checkAbsUri.txt";
		String path = getDefaultProjectWebFolderPath() + "/" + resource;
		Resources.writeStringToFile(path, expected);

		// request with absolute path
		String uri = "http://" + getDefaultHostName() + ":" + getDefaultPort()
				+ "/" + resource;
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host:"
				+ getDefaultHostHeaderValue() + CRLF + CRLF;

		// response
		HttpResponse response = executeRequestString(request);

		// delete resource
		FileUtils.forceDelete(new File(path));

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		HttpEntity entity = response.getEntity();
		assertNotNull("Response has no content", entity);
		String actual = EntityUtils.toString(entity);
		assertEquals("Wrong content", expected, actual);

	}

	/**
	 * <b>Implements:</b> Resource04
	 * <p/>
	 * Check that if Request-URI is an absoluteURI, the host is part of the
	 * Request-URI. Any Host header field value in the request MUST be ignored.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	
	public void testThatHostHeaderValueIsIgnoredWhenRequestURIIsAbsolute()
			throws Exception {
		// params
		int port = Integer.parseInt(getGlobalProp().getProperty("port2"));
		
		String relative = getGlobalProp()
				.getProperty("project2WebFolder");
		String webFolderPath = getAbsPathFromResourcesDir(relative);
		
		// generate a resource with random content
		String expected = RandomStringUtils.randomAlphanumeric(256);
		String resource = "checkResourceUri.txt";
		String path = webFolderPath + "/" + resource;
		Resources.writeStringToFile(path, expected);
		
		// request with absolute path
		HttpHost host = new HttpHost(getDefaultHostName(), port, "http");
		String uri = host.toURI() + "/" + resource;
		String request = "GET " + uri + " HTTP/1.1" + CRLF 
						+ "Host: whatever" + CRLF 
						+ CRLF;

		// response
		HttpHost target = getWebAdminTarget();
		HttpResponse response = executeRequestString(request, target);

		// delete resource
		FileUtils.forceDelete(new File(path));

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		HttpEntity entity = response.getEntity();
		assertNotNull("Response has no content", entity);
		String actual = EntityUtils.toString(entity);
		assertEquals("Wrong content", expected, actual);
	}

	/**
	 * <b>Implements:</b> Resource05
	 * <p/>
	 * Check that server reports 400 (Bad Request) if the Request-URI is an
	 * absoluteURI and the determined host is not valid.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReports400BadRequestWhenRequestURIIsAbsoluteAndTheDeterminedHostIsNotvalid()
			throws Exception {
		
		// request with absolute path & invalid host
		HttpHost host = new HttpHost("whatever", 6666, "http");
		String uri = host.toURI() + "/";
		String request = "GET " + uri + " HTTP/1.1" + CRLF 
						+ "Host: whatever" + CRLF 
						+ CRLF;
		
		logger.debug(request);
		// response
		HttpHost target = getWebAdminTarget();
		HttpResponse response = executeRequestString(request, target);

		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}

	/**
	 * <b>Implements:</b> Resource06
	 * <p/>
	 * Check that if the Request-URI is not an absoluteURI, and the request
	 * includes a Host header field, the host is determined by the Host header
	 * field value.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHostHeaderValueIsUsedWhenRequestURIIsNotAbsolute()
			throws Exception {
		// params
		String relative = getGlobalProp().getProperty("project3WebFolder");
		String webFolderPath = getAbsPathFromResourcesDir(relative);
		
		int port = Integer.parseInt(getGlobalProp().getProperty("port3"));

		// generate a resource with random content
		String expected = RandomStringUtils.randomAlphanumeric(256);
		String resource = "checkResourceUri.txt";
		String path = webFolderPath + "/" + resource;
		Resources.writeStringToFile(path, expected);

		// request with non absolute path
		HttpHost host = new HttpHost(getDefaultHostName(), port, "http");
		String uri = "/" + resource;
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host: "
				+ host.toHostString() + CRLF + CRLF;

		// response
		HttpHost target = getWebAdminTarget();
		HttpResponse response = executeRequestString(request, target);

		// delete resource
		FileUtils.forceDelete(new File(path));

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		HttpEntity entity = response.getEntity();
		assertNotNull("Response has no content", entity);
		String actual = EntityUtils.toString(entity);
		assertEquals("Wrong content", expected, actual);
	}

	/**
	 * <b>Implements:</b> Resource07
	 * <p/>
	 * Check that server reports 400 (Bad Request) if the Request-URI is not an
	 * absoluteURI, and the request includes an undefined host header value.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReports400BadRequestWhenTheRequestURIIsNotAbsoluteAndHostHeaderValueIsNotValid()
			throws Exception {
		// params
		String relative = getGlobalProp().getProperty("project3WebFolder");
		String webFolderPath = getAbsPathFromResourcesDir(relative);

		// generate a resource with random content
		String expected = RandomStringUtils.randomAlphanumeric(256);
		String resource = "checkResourceUri.txt";
		String path = webFolderPath + "/" + resource;
		Resources.writeStringToFile(path, expected);

		// request with absolute path
		String uri = "/" + resource;
		String host = "whatever:6666";
		String request = "GET " + uri + " HTTP/1.1" + CRLF 
						+ "Host: " + host + CRLF 
						+ CRLF;
		
		//logger.debug(request);

		// response
		HttpHost target = getWebAdminTarget();
		HttpResponse response = executeRequestString(request, target);

		// delete resource
		FileUtils.forceDelete(new File(path));

		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}
	
	/**
	 * <b>Implements:</b> Resource08
	 * <p/>
	 * Check that the host header value is case insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHostHeaderValueIsCaseInsensitive()	throws Exception {
		// params
		String relative = getGlobalProp().getProperty("project3WebFolder");
		String webFolderPath = getAbsPathFromResourcesDir(relative);
		
		int port = Integer.parseInt(getGlobalProp().getProperty("port3"));

		// generate a resource with random content
		String expected = RandomStringUtils.randomAlphanumeric(256);
		String resource = "checkResourceUri.txt";
		String path = webFolderPath + "/" + resource;
		Resources.writeStringToFile(path, expected);
		
		logger.debug(path);

		// request with non absolute path
		HttpHost host = new HttpHost(getDefaultHostName(), port, "http");
		String uri = "/" + resource;
		//host value to upper case
		String hostHeaderValue = host.toHostString().toUpperCase();
		String request = "GET " + uri + " HTTP/1.1" + CRLF 
						+ "Host: " + hostHeaderValue + CRLF 
						+ CRLF;

		// response
		HttpHost target = getWebAdminTarget();
		HttpResponse response = executeRequestString(request, target);

		// delete resource
		FileUtils.forceDelete(new File(path));

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		HttpEntity entity = response.getEntity();
		assertNotNull("Response has no content", entity);
		String actual = EntityUtils.toString(entity);
		assertEquals("Wrong content", expected, actual);
	}
}
