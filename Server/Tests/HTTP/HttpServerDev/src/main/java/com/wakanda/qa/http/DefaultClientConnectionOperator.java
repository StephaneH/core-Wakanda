package com.wakanda.qa.http;

import org.apache.http.conn.scheme.SchemeRegistry;

/**
 * @author Ouissam
 *
 */
public class DefaultClientConnectionOperator extends org.apache.http.impl.conn.DefaultClientConnectionOperator{

	public DefaultClientConnectionOperator(SchemeRegistry schemes) {
		super(schemes);
	}
	
	@Override
	public DefaultClientConnection createConnection() {
		return new DefaultClientConnection();
	}
}