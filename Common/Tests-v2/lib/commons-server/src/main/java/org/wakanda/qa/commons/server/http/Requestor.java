/**
 * 
 */
package org.wakanda.qa.commons.server.http;

import java.io.IOException;
import java.net.Socket;

import org.apache.http.Header;
import org.apache.http.HttpException;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthenticationException;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.MalformedChallengeException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.impl.auth.AuthSchemeBase;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.auth.DigestScheme;
import org.apache.http.io.SessionInputBuffer;
import org.apache.http.io.SessionOutputBuffer;
import org.apache.http.message.BasicHeader;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HttpContext;
import org.apache.log4j.Logger;
import org.wakanda.qa.commons.server.settings.AbstractSettings;
import org.wakanda.qa.commons.server.settings.DefaultSettings;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Requestor {

	protected static Logger logger = Logger.getLogger(Requestor.class);

	private AbstractSettings settings;

	private HttpClient httpClient;

	protected enum AuthScheme {
		BASIC, DIGEST, CUSTOM
	};

	/**
	 * Creates a new RequestUtil using the given settings and HTTP client.
	 */
	public Requestor(AbstractSettings settings, HttpClient httpClient) {
		this.settings = settings;
		this.httpClient = httpClient;
	}

	public Requestor(AbstractSettings settings) {
		this(settings, getDefaultHttpClientInstance());
	}

	public Requestor() {
		this(new DefaultSettings(), getDefaultHttpClientInstance());
	}

	public AbstractSettings getSettings() {
		return this.settings;
	}

	public HttpClient getHttpClient() {
		return this.httpClient;
	}

	private HttpResponse doExecute(HttpClient client, HttpHost target,
			HttpRequest request, HttpContext context)
			throws ClientProtocolException, IOException {
		return client.execute(target, request, context);
	}

	/**
	 * Executes an http request to the given target using the given context.
	 * 
	 * @param target
	 * @param request
	 * @param context
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 */
	public HttpResponse execute(HttpHost target, HttpRequest request,
			HttpContext context) throws ClientProtocolException, IOException {
		return doExecute(getHttpClient(), target, request, context);
	}

	/**
	 * Executes an http request to the given target.
	 * 
	 * @param target
	 * @param request
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 */
	public HttpResponse execute(HttpHost target, HttpRequest request)
			throws ClientProtocolException, IOException {
		return execute(target, request, null);
	}

	/**
	 * Executes an http request to the default target.
	 * 
	 * @param request
	 * @return
	 * @throws IOException 
	 * @throws ClientProtocolException 
	 */
	public HttpResponse execute(HttpRequest request) throws ClientProtocolException, IOException {
		return execute(getSettings().getDefaultTarget(), request);
	}

	/**
	 * Executes a request with the given url to the given target.
	 * 
	 * @param target
	 * @param url
	 * @return
	 * @throws Exception
	 */
	public HttpResponse executeURL(HttpHost target, String url)
			throws Exception {
		return execute(target, new HttpGet(url));
	}

	/**
	 * Executes a request with the given url to the default target.
	 * 
	 * @param url
	 * @return
	 * @throws Exception
	 */
	public HttpResponse executeURL(String url) throws Exception {
		return execute(new HttpGet(url));
	}

	/**
	 * Executes an http request string and returns its response as an instance
	 * of HttpResponse.
	 * 
	 * @param host
	 * @param request
	 * @return
	 * @throws IOException
	 * @throws HttpException
	 */
	public HttpSimpleBufferedResponse executeRaw(HttpHost host, String request)
			throws Exception {

		// Create an HTTP scheme
		Scheme http = new Scheme("http", host.getPort(),
				PlainSocketFactory.getSocketFactory());
		SchemeRegistry sr = new SchemeRegistry();
		sr.register(http);

		// Open the client connection
		DefaultClientConnectionOperator cnxOp = new DefaultClientConnectionOperator(
				sr);
		DefaultClientConnection cnx = cnxOp.createConnection();
		try {
			cnxOp.openConnection(cnx, host, null, null, new BasicHttpParams());

			// Send the request
			SessionOutputBuffer outBuffer = cnx.getOutbuffer();
			outBuffer.write(request.getBytes());
			outBuffer.flush();

			logger.debug(">>" + request);

			// Get the response
			HttpResponse response = cnx.receiveResponseHeader();
			cnx.receiveResponseEntity(response);

			// build the HttpRawResponse
			return new HttpSimpleBufferedResponse(response);

		} finally {
			cnx.close();
		}
	}

	/**
	 * Executes an http request string to the default target and returns its
	 * response as an instance of HttpResponse.
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public HttpSimpleBufferedResponse executeRaw(String request)
			throws Exception {
		return executeRaw(getSettings().getDefaultTarget(), request);
	}

	private HttpResponse doExecuteSecured(HttpClient client, HttpHost target,
			HttpRequest request, Credentials credentials, Header challenge,
			HttpContext context) throws MalformedChallengeException,
			AuthenticationException, ClientProtocolException, IOException {
		// build authen response header
		AuthSchemeBase authscheme = null;
		AuthScheme scheme = getAuthScheme(challenge);
		switch (scheme) {
		case BASIC:
			authscheme = new BasicScheme();
			break;
		case DIGEST:
			authscheme = new DigestScheme();
			break;
		default:
			throw new MalformedChallengeException("Invalid scheme identifier: "
					+ scheme);
		}
		authscheme.processChallenge(challenge);
		Header authResponse = authscheme.authenticate(credentials, request,
				null);
		request.addHeader(authResponse);

		// send the authenticated request
		HttpResponse response = doExecute(client, target, request, context);

		return response;
	}

	/**
	 * Executes an authenticated http request
	 * 
	 * @param target
	 * @param request
	 * @param user
	 * @param password
	 * @param challenge
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @throws AuthenticationException
	 * @throws MalformedChallengeException
	 */
	public HttpResponse executeAuthenticated(HttpHost target,
			HttpRequest request, Credentials credentials, Header challenge)
			throws MalformedChallengeException, AuthenticationException,
			ClientProtocolException, IOException {
		return doExecuteSecured(getHttpClient(), target, request, credentials,
				challenge, null);
	}

	/**
	 * Executes an authenticated http request using the default authentication
	 * challenge
	 * 
	 * @param target
	 * @param request
	 * @param user
	 * @param password
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @throws AuthenticationException
	 * @throws MalformedChallengeException
	 */
	public HttpResponse executeAuthenticated(HttpHost target,
			HttpRequest request, Credentials credentials)
			throws MalformedChallengeException, AuthenticationException,
			ClientProtocolException, IOException {
		return executeAuthenticated(target, request, credentials, getDefaultAuthChallenge());
	}

	/**
	 * Executes an authenticated http request to the default target
	 * 
	 * @param request
	 * @param user
	 * @param password
	 * @param scheme
	 * @param challenge
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @throws AuthenticationException
	 * @throws MalformedChallengeException
	 */
	public HttpResponse executeAuthenticated(HttpRequest request,
			Credentials credentials, Header challenge)
			throws MalformedChallengeException, AuthenticationException,
			ClientProtocolException, IOException {
		return executeAuthenticated(getSettings().getDefaultTarget(), request,
				credentials, challenge);
	}

	/**
	 * Executes an authenticated http request to the default target using the
	 * default authentication challenge.
	 * 
	 * @param request
	 * @param user
	 * @param password
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @throws AuthenticationException
	 * @throws MalformedChallengeException
	 */
	public HttpResponse executeAuthenticated(HttpRequest request, Credentials credentials) throws MalformedChallengeException,
			AuthenticationException, ClientProtocolException, IOException {
		return executeAuthenticated(request, credentials, getDefaultAuthChallenge());
	}

	/**
	 * @author ouissam.gouni@4d.com
	 * 
	 *         DefaultClientConnection of raw http request
	 */
	private static class DefaultClientConnection extends
			org.apache.http.impl.conn.DefaultClientConnection {

		@Override
		protected SessionInputBuffer createSessionInputBuffer(Socket socket,
				int buffersize, HttpParams params) throws IOException {
			inBuffer = super.createSessionInputBuffer(socket, buffersize,
					params);
			return inBuffer;
		}

		@Override
		protected SessionOutputBuffer createSessionOutputBuffer(Socket socket,
				int buffersize, HttpParams params) throws IOException {
			outBuffer = super.createSessionOutputBuffer(socket, buffersize,
					params);
			return outBuffer;
		}

		private SessionInputBuffer inBuffer;
		private SessionOutputBuffer outBuffer;

		@SuppressWarnings("unused")
		public SessionInputBuffer getInbuffer() throws IOException {
			return inBuffer;
		}

		public SessionOutputBuffer getOutbuffer() throws IOException {
			return outBuffer;
		}
	}

	/**
	 * @author ouissam.gouni@4d.com
	 * 
	 *         DefaultClientConnectionOperator of raw http request
	 */
	private static class DefaultClientConnectionOperator extends
			org.apache.http.impl.conn.DefaultClientConnectionOperator {

		public DefaultClientConnectionOperator(SchemeRegistry schemes) {
			super(schemes);
		}

		@Override
		public DefaultClientConnection createConnection() {
			return new DefaultClientConnection();
		}
	}
	
	public Header getDefaultAuthChallenge() {
		String defaultChallenge = "Basic " + getSettings().getRealm();
		return new BasicHeader(HttpHeaders.WWW_AUTHENTICATE, defaultChallenge);
	}

	private static AuthScheme getAuthScheme(Header hChallenge) {
		String vChallenge = hChallenge.getValue();
		String vType = vChallenge.split(" ")[0];
		if (vType.equalsIgnoreCase("basic")) {
			return AuthScheme.BASIC;
		} else if (vType.equalsIgnoreCase("digest")) {
			return AuthScheme.DIGEST;
		}
		return AuthScheme.CUSTOM;
	}

	private static HttpClient defaultHttpClient = null;

	private static HttpClient getDefaultHttpClientInstance() {
		if (defaultHttpClient == null) {
			defaultHttpClient = new DefaultHttpClient();
		}
		return defaultHttpClient;
	}

}
