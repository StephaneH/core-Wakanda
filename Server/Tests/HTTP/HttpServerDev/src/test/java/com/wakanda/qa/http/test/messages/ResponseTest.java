package com.wakanda.qa.http.test.messages;

import static org.junit.Assert.fail;

import org.apache.http.ConnectionClosedException;
import org.apache.http.Header;
import org.apache.http.HttpException;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.ParseException;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.impl.DefaultHttpResponseFactory;
import org.apache.http.impl.conn.DefaultResponseParser;
import org.apache.http.io.HttpMessageParser;
import org.apache.http.io.SessionInputBuffer;
import org.apache.http.message.BasicHttpRequest;
import org.apache.http.message.BasicLineParser;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.CharArrayBuffer;
import org.junit.Assert;
import org.junit.Test;

import com.wakanda.qa.http.DefaultClientConnection;
import com.wakanda.qa.http.DefaultClientConnectionOperator;
import com.wakanda.qa.http.test.extend.AbstractHttpTestCase;

/**
 * This class manages all tests related with the response message.
 * 
 * @author Ouissam
 * 
 */
public class ResponseTest extends AbstractHttpTestCase {

	/**
	 * Implements: ResponseFormat01
	 * <p/>
	 * Check that the status line format is correct.
	 * <p/>
	 * Reference: SPEC691 (RFC2616)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testStatusLineFormat() throws Exception {
		SessionInputBuffer in = getResponseSessionInputBuffer();
		CharArrayBuffer lineBuf = new CharArrayBuffer(128);
		int i = in.readLine(lineBuf);
		if (i == -1) {
			throw new ConnectionClosedException("Client closed connection");
		}
		try {
			BasicLineParser.parseStatusLine(lineBuf.toString(), null);
		} catch (ParseException e) {
			fail("Malformed status line: " + e.getMessage());
		}
	}

	/**
	 * Implements: ResponseFormat02
	 * <p/>
	 * Check that the HTTP protocol version format is correct.
	 * <p/>
	 * Reference: SPEC691 (RFC2616) 6.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testProtocolVersionFormat() throws Exception {
		SessionInputBuffer in = getResponseSessionInputBuffer();
		CharArrayBuffer lineBuf = new CharArrayBuffer(128);
		int i = in.readLine(lineBuf);
		if (i == -1) {
			throw new ConnectionClosedException("Client closed connection");
		}
		try {
			BasicLineParser.parseProtocolVersion(lineBuf.toString(), null);
		} catch (ParseException e) {
			fail("Malformed protocol version: " + e.getMessage());
		}
	}

	/**
	 * Implements: ResponseFormat03
	 * <p/>
	 * Check the response headers format.
	 * <p/>
	 * Reference : SPEC691 (RFC2616) 6.1
	 * 
	 * @throws HttpException
	 * 
	 * @throws Exception
	 */
	@Test
	public void testResponseHeadersFormat() throws Exception {
		SessionInputBuffer in = getResponseSessionInputBuffer();
		CharArrayBuffer lineBuf = new CharArrayBuffer(128);
		try {
			// Skip status line
			int i = in.readLine(lineBuf);
			if (i == -1) {
				throw new ConnectionClosedException("Client closed connection");
			}
			// parse headers
			DefaultResponseParser.parseHeaders(in, -1, -1,
					BasicLineParser.DEFAULT);
		} catch (HttpException e) {
			fail("Malformed header: " + e.getMessage());
		}
	}

	/**
	 * Implements: ResponseFormat04
	 * <p/>
	 * Check the entire response format.
	 * <p/>
	 * Reference : SPEC691 (RFC2616) 6.1
	 * 
	 * @throws Exception
	 * 
	 * @throws Exception
	 */
	@Test
	public void testResponseFormat() throws Exception {
		SessionInputBuffer in = getResponseSessionInputBuffer();
		try {
			HttpMessageParser parser = new DefaultResponseParser(in,
					BasicLineParser.DEFAULT, new DefaultHttpResponseFactory(),
					new BasicHttpParams());

			HttpResponse response = (HttpResponse) parser.parse();
			Assert.assertNotNull(response);

			Header[] headers = response.getAllHeaders();
			Assert.assertNotNull(headers);
		} catch (HttpException e) {
			fail("Malformed response: " + e.getMessage());
		}

	}

	/**
	 * Private method that sends basic request and return the corresponding session inupt buffer.
	 * @return
	 * @throws Exception
	 */
	private SessionInputBuffer getResponseSessionInputBuffer() throws Exception {

		HttpHost target = getDefaultTarget();

		SchemeRegistry supportedSchemes = new SchemeRegistry();
		supportedSchemes.register(new Scheme("http", getDefaultPort(),
				PlainSocketFactory.getSocketFactory()));

		HttpParams params = new SyncBasicHttpParams();
		HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
		HttpProtocolParams.setUseExpectContinue(params, false);

		// one operator can be used for many connections
		DefaultClientConnectionOperator scop = new DefaultClientConnectionOperator(
				supportedSchemes);

		HttpRequest req = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1);
		req.addHeader(HttpHeaders.HOST, target.getHostName());

		HttpContext ctx = new BasicHttpContext();

		try {
			DefaultClientConnection conn = scop.createConnection();
			scop.openConnection(conn, target, null, ctx, params);
			conn.sendRequestHeader(req);
			conn.flush();
			return conn.getInbuffer();
		} catch (Exception e) {
			return null;
		}
	}
}
