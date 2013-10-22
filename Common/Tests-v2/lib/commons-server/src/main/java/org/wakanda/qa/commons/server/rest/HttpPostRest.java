/**
 * 
 */
package org.wakanda.qa.commons.server.rest;

import java.net.URI;
import java.net.URISyntaxException;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class HttpPostRest extends HttpPost {

	public HttpPostRest(String uri) {
		super("/rest/" + uri);
	}
	
	public HttpPostRest(URI uri) throws URISyntaxException {
		super();
		URIBuilder ub = new URIBuilder(uri);
		ub.setPath("/rest/" + ub.getPath()).build();
		setURI(ub.build());
	}

}
