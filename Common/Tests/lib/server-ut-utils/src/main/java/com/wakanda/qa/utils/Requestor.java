/**
 * 
 */
package com.wakanda.qa.utils;

import java.io.IOException;
import java.net.Socket;

import org.apache.http.Header;
import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.StatusLine;
import org.apache.http.auth.MalformedChallengeException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.RequestAddCookies;
import org.apache.http.client.protocol.RequestAuthCache;
import org.apache.http.client.protocol.RequestClientConnControl;
import org.apache.http.client.protocol.RequestDefaultHeaders;
import org.apache.http.client.protocol.RequestProxyAuthentication;
import org.apache.http.client.protocol.RequestTargetAuthentication;
import org.apache.http.client.protocol.ResponseAuthCache;
import org.apache.http.client.protocol.ResponseProcessCookies;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.impl.auth.AuthSchemeBase;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.auth.DigestScheme;
import org.apache.http.io.SessionInputBuffer;
import org.apache.http.io.SessionOutputBuffer;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.BasicHttpProcessor;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;
import org.apache.http.protocol.RequestContent;
import org.apache.http.protocol.RequestExpectContinue;
import org.apache.http.protocol.RequestTargetHost;
import org.apache.http.protocol.RequestUserAgent;
import org.apache.http.util.EntityUtils;
import org.apache.http.util.VersionInfo;
import org.apache.log4j.Logger;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Requestor {

	/**
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {

		Requestor requestUtil = new Requestor();
		HttpHost target = new HttpHost("www.google.com", 80);

		HttpContext ctx = new BasicHttpContext();
		HttpGet request = new HttpGet("/");
		HttpResponse response = requestUtil.execute(target, request, ctx);
		EntityUtils.toString(response.getEntity());

		// request.abort();
		// ManagedClientConnection cnx = (ManagedClientConnection)
		// ctx.getAttribute(ExecutionContext.HTTP_CONNECTION);
		// cnx.releaseConnection();

		response = requestUtil.execute(target, new HttpGet("/"));
		EntityUtils.toString(response.getEntity());

	}

	protected static Logger logger = Logger.getLogger(Requestor.class);

	private IBasicSettings settings;

	private HttpClient httpClient;

	protected enum AuthScheme {
		BASIC, DIGEST, CUSTOM
	};

	/**
	 * Creates a new RequestUtil from settings and http client.
	 */
	public Requestor(IBasicSettings settings, HttpClient httpClient) {
		this.settings = settings;
		this.httpClient = httpClient;
	}

	/**
	 * 
	 */
	public Requestor(IBasicSettings settings) {
		this(settings, getDefaultHttpClientInstance());
	}

	/**
	 * 
	 */
	public Requestor() {
		this(new BasicSettings(), getDefaultHttpClientInstance());
	}

	private static HttpResponse doExecute(HttpClient client, HttpHost target,
			HttpRequest request, HttpContext context) throws Exception {
		return client.execute(target, request, context);
	}

	/**
	 * Executes an http request to the given target using the given context.
	 * 
	 * @param target
	 * @param request
	 * @param context
	 * @return
	 * @throws Exception
	 */
	public HttpResponse execute(HttpHost target, HttpRequest request,
			HttpContext context) throws Exception {
		return doExecute(getHttpClient(), target, request, context);
	}

	/**
	 * Static method that executes an http request to the given target using the
	 * given context using the default client.
	 * 
	 * @param target
	 * @param request
	 * @param context
	 * @return
	 * @throws Exception
	 */
	public static HttpResponse executeSt(HttpHost target, HttpRequest request,
			HttpContext context) throws Exception {
		return doExecute(getDefaultHttpClientInstance(), target, request, context);
	}

	/**
	 * Executes an http request to the given target.
	 * 
	 * @param target
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public HttpResponse execute(HttpHost target, HttpRequest request)
			throws Exception {
		return execute(target, request, null);
	}

	/**
	 * Static method that executes an http request to the given target using the
	 * default client.
	 * 
	 * @param target
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public static HttpResponse executeSt(HttpHost target, HttpRequest request)
			throws Exception {
		return executeSt(target, request, null);
	}

	/**
	 * Executes an http request to the default target.
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public HttpResponse execute(HttpRequest request) throws Exception {
		return execute(getSetting().getDefaultTarget(), request);
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
	
	public static class HttpSimpleBufferedResponse{

		private HttpResponse originalResponse;
		private BufferedHttpEntity entity;
		
		public HttpSimpleBufferedResponse(HttpResponse response){
			this.originalResponse = response;
			try {
				this.entity = new BufferedHttpEntity(response.getEntity());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		public BufferedHttpEntity getEntity() {
			return entity;
		}

		public HttpResponse getOriginalResponse() {
			return originalResponse;
		}

		public int getStatusCode() {
			return getStatusLine().getStatusCode();
		}
		
		public StatusLine getStatusLine() {
			return originalResponse.getStatusLine();
		}
		
		
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
	public static HttpSimpleBufferedResponse executeRaw(HttpHost host, String request)
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
	public HttpSimpleBufferedResponse executeRaw(String request) throws Exception {
		return executeRaw(getSetting().getDefaultTarget(), request);
	}

	private static HttpResponse doExecuteAuthenticatedRequest(
			HttpClient client, HttpHost target, HttpRequest request,
			String user, String password, Header challenge, HttpContext context)
			throws Exception {
		// set credentials
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, password);
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
		Header authResponse = authscheme.authenticate(creds, request, null);
		request.addHeader(authResponse);

		// send the authenticated request
		HttpResponse response = doExecute(client, target, request, context);

		return response;
	}

	/**
	 * Static method that executes an authenticated http request
	 * 
	 * @param target
	 * @param request
	 * @param user
	 * @param password
	 * @param challenge
	 * @return
	 * @throws Exception
	 */
	public static HttpResponse executeAuthenticatedSt(HttpHost target,
			HttpRequest request, String user, String password, Header challenge)
			throws Exception {
		return doExecuteAuthenticatedRequest(getDefaultHttpClientInstance(), target,
				request, user, password, challenge, null);
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
	 * @throws Exception
	 */
	public HttpResponse executeAuthenticated(HttpHost target,
			HttpRequest request, String user, String password, Header challenge)
			throws Exception {
		return doExecuteAuthenticatedRequest(getHttpClient(), target, request,
				user, password, challenge, null);
	}

	/**
	 * Static method that executes an authenticated http request using the
	 * default authentication challenge
	 * 
	 * @param target
	 * @param request
	 * @param user
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static HttpResponse executeAuthenticatedSt(HttpHost target,
			HttpRequest request, String user, String password) throws Exception {
		return executeAuthenticatedSt(target, request, user, password,
				getDefaultSetting().getDefaultAuthChallenge());
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
	 * @throws Exception
	 */
	public HttpResponse executeAuthenticated(HttpHost target,
			HttpRequest request, String user, String password) throws Exception {
		return executeAuthenticatedSt(target, request, user, password,
				getSetting().getDefaultAuthChallenge());
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
	 * @throws Exception
	 */
	public HttpResponse executeAuthenticated(HttpRequest request, String user,
			String password, Header challenge) throws Exception {
		return executeAuthenticated(getSetting().getDefaultTarget(), request,
				user, password, challenge);
	}

	/**
	 * Executes an authenticated http request to the default target using the
	 * default authentication challenge.
	 * 
	 * @param request
	 * @param user
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public HttpResponse executeAuthenticated(HttpRequest request, String user,
			String password) throws Exception {
		return executeAuthenticated(request, user, password, getSetting()
				.getDefaultAuthChallenge());
	}

	/**
	 * @author ouissam.gouni@4d.com
	 * 
	 *         DefaultClientConnection of raw http request
	 */
	public static class DefaultClientConnection extends
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
	public static class DefaultClientConnectionOperator extends
			org.apache.http.impl.conn.DefaultClientConnectionOperator {

		public DefaultClientConnectionOperator(SchemeRegistry schemes) {
			super(schemes);
		}

		@Override
		public DefaultClientConnection createConnection() {
			return new DefaultClientConnection();
		}
	}
	
	public static class DefaultHttpClient extends org.apache.http.impl.client.DefaultHttpClient{
		@Override
		protected HttpParams createHttpParams() {
			HttpParams params = new SyncBasicHttpParams();
			HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
			HttpProtocolParams.setContentCharset(params,
					HTTP.DEFAULT_CONTENT_CHARSET);
			HttpConnectionParams.setTcpNoDelay(params, true);
			HttpConnectionParams.setSocketBufferSize(params, 8192);

			// determine the release version from packaged version info
			final VersionInfo vi = VersionInfo.loadVersionInfo(
					"org.apache.http.client",
					DefaultHttpClient.class.getClassLoader());
			final String release = (vi != null) ? vi.getRelease()
					: VersionInfo.UNAVAILABLE;
			HttpProtocolParams.setUserAgent(params,
					"ouissam.gouni@4d.com (via Apache-HttpClient/"
							+ release + ")");
			return params;
		}

		@Override
		protected BasicHttpProcessor createHttpProcessor() {
			BasicHttpProcessor httpproc = new BasicHttpProcessor();
			httpproc.addInterceptor(new RequestDefaultHeaders());
			// Required protocol interceptors
			httpproc.addInterceptor(new RequestContent());
			httpproc.addInterceptor(new RequestTargetHost());
			// Recommended protocol interceptors
			httpproc.addInterceptor(new RequestClientConnControl());
			httpproc.addInterceptor(new RequestUserAgent());
			httpproc.addInterceptor(new RequestExpectContinue());

			// HTTP state management interceptors
			httpproc.addInterceptor(new RequestAddCookies());
			httpproc.addInterceptor(new ResponseProcessCookies());
			// HTTP authentication interceptors
			httpproc.addInterceptor(new RequestAuthCache());
			httpproc.addInterceptor(new ResponseAuthCache());
			httpproc.addInterceptor(new RequestTargetAuthentication());
			httpproc.addInterceptor(new RequestProxyAuthentication());

			return httpproc;
		}
	}

	public IBasicSettings getSetting() {
		return this.settings;
	}

	public HttpClient getHttpClient() {
		return this.httpClient;
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

	private static IBasicSettings getDefaultSetting() {
		return new BasicSettings();
	}

	private static HttpClient defaultHttpClient = null;
	private static HttpClient getDefaultHttpClientInstance() {
		if(defaultHttpClient == null){
			defaultHttpClient = new DefaultHttpClient();
		}
		return defaultHttpClient;
	}

}
