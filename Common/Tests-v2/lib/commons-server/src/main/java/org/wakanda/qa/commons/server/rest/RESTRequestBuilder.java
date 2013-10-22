/**
 * 
 */
package org.wakanda.qa.commons.server.rest;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

import org.apache.http.HttpRequest;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.hamcrest.internal.ArrayIterator;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class RESTRequestBuilder {

	// private static Logger logger =
	// Logger.getLogger(RESTRequestBuilder.class);

	public enum HttpMethod {
		GET, POST
	};

	private HttpMethod httpMethod;

	private HttpRequestBase request;

	private URIBuilder ub = null;

	public RESTRequestBuilder(String uri, HttpMethod httpMethod) {
		// HTTP method
		this.httpMethod = httpMethod;

		// HTTP Request
		switch (httpMethod) {
		case POST:
			request = new HttpPost();
			break;
		default:
			request = new HttpGet();
			break;
		}

		// URL builder
		try {
			ub = new URIBuilder(Constants.REST_RH + "/" + uri);
		} catch (URISyntaxException e) {
		}
	}

	public RESTRequestBuilder(HttpMethod httpMethod) {
		this("", httpMethod);
	}

	public RESTRequestBuilder() {
		this(HttpMethod.GET);

	}

	public RESTRequestBuilder(String uri) {
		this(uri, HttpMethod.GET);

	}

	public HttpMethod getHttpMethod() {
		return httpMethod;
	}

	public URI getURI() throws URISyntaxException {
		return ub.build();
	}

	public RESTRequestBuilder addDataClass(String dataClass) {
		ub.setPath(ub.getPath() + "/" + dataClass);
		return this;
	}

	public RESTRequestBuilder addKey(String key) {
		// key
		if (key != null) {
			ub.setPath(ub.getPath() + "(" + key + ")");
		}
		return this;
	}

	public RESTRequestBuilder addEntitySet(String entitySet) {
		if (entitySet != null) {
			ub.setPath(ub.getPath() + "/" + Constants.ENTITYSET_PARAM + "/"
					+ entitySet);
		}
		return this;
	}

	public RESTRequestBuilder addAttributes(String[] attributes) {
		if (attributes != null && attributes.length > 0) {
			ArrayIterator it = new ArrayIterator(attributes);
			ub.setPath(ub.getPath() + "/" + (String) it.next());
			while (it.hasNext()) {
				ub.setPath(ub.getPath() + "," + (String) it.next());
			}
		}
		return this;
	}

	public RESTRequestBuilder addMethod(Method method)
			throws UnsupportedEncodingException {
		if (method != null) {
			ub.setPath(ub.getPath() + "/" + method.getMethodName());
			String[] mparams = method.getParams();
			if (mparams != null) {
				ArrayIterator it = new ArrayIterator(mparams);
				if (getHttpMethod() == HttpMethod.GET) {
					ub.setPath(ub.getPath() + "(" + (String) it.next());
					while (it.hasNext()) {
						ub.setPath(ub.getPath() + "," + (String) it.next());
					}
					ub.setPath(ub.getPath() + ")");
				} else {
					String payload = "[" + (String) it.next();
					while (it.hasNext()) {
						payload += "," + (String) it.next();
					}
					payload += "]";
					StringEntity se = new StringEntity(payload);
					((HttpEntityEnclosingRequestBase) request).setEntity(se);
				}
			}
		}
		return this;
	}

	public RESTRequestBuilder addParameters(NameValuePair[] params) {
		if (params != null && params.length > 0) {
			for (NameValuePair param : params) {
				ub.addParameter(param.getName(), param.getValue());
			}
		}
		return this;
	}

	public HttpRequest buildRequest() throws URISyntaxException {
		request.setURI(getURI());
		return request;
	}

	/** 
     * Returns the embedded URI as <code>String</code> or null if there is any problem with the getURI() method.
     *
     * @return 
     * 
     */
	public String toString() {
		String toString = null;
		try {
			toString = getURI().toString();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}

		return toString;
	}

}
