/**
 * 
 */
package org.wakanda.qa.commons.server.rest;

import java.net.URI;
import java.net.URISyntaxException;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class HttpGetRest extends HttpGet {

	public HttpGetRest(String uri) {
		super("/rest/" + uri);
	}

	public HttpGetRest(URI uri) throws URISyntaxException {
		super();
		URIBuilder ub = new URIBuilder(uri);
		ub.setPath("/rest/" + ub.getPath()).build();
		setURI(ub.build());
	}
	
	
	
}
