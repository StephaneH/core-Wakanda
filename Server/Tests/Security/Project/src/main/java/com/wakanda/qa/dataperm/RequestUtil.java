package com.wakanda.qa.dataperm;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AUTH;
import org.apache.http.auth.MalformedChallengeException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.auth.AuthSchemeBase;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.auth.DigestScheme;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

public class RequestUtil {

	@SuppressWarnings("unused")
	private static Logger logger = Logger.getLogger(RequestUtil.class);
	
	private static DefaultHttpClient defaultHttpClient = null;
	
	public enum AuthType {
		BASIC, DIGEST, CUSTOM
	};

	
	public static DefaultHttpClient getDefaultHttpClient(){
		if(defaultHttpClient==null){
			defaultHttpClient = new DefaultHttpClient();
		}
		return defaultHttpClient;
	}
	
	public static void main(String[] args) throws Exception {

	}

	public static HttpResponse executeRequest(HttpRequest request,
			HttpHost target) throws Exception {
		HttpResponse response = getDefaultHttpClient().execute(target, request);
		return response;
	}

	public static Header getAuthChallenge(HttpRequest request, HttpHost target)
			throws Exception {
		HttpResponse response = executeRequest(request, target);
		Header challenge = response.getFirstHeader(AUTH.WWW_AUTH);
		return challenge;
	}

	public static HttpResponse executeAuthenticatedRequest(final HttpRequest request,
			HttpHost target, String user, String password, AuthType scheme,
			Header challenge) throws Exception {

		// set credentials
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				user, password);
		// build authen response header
		AuthSchemeBase authscheme = null;
		switch (scheme) {
		case BASIC:
			authscheme = new BasicScheme();
			break;
		case DIGEST:
			authscheme = new DigestScheme();
			break;
		case CUSTOM:
			String loginUrl = "/rest/$directory/login(" + user + "," + password
					+ ")";
			HttpResponse respLogin = executeRequest(new HttpGet(loginUrl), target);
			EntityUtils.consume(respLogin.getEntity());

			break;
		default:
			throw new MalformedChallengeException("Invalid scheme identifier: "
					+ scheme);
		}
		
		if (scheme == AuthType.BASIC || scheme == AuthType.DIGEST) {
			authscheme.processChallenge(challenge);
			Header authResponse = authscheme.authenticate(creds, request, null);
			request.addHeader(authResponse);
		}

		// send the authenticated request
		HttpResponse response = executeRequest(request, target);

		return response;
	}
}
