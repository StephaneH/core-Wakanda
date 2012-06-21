package com.wakanda.qa.http;

import java.io.IOException;

import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.io.SessionOutputBuffer;
import org.apache.http.params.BasicHttpParams;
import org.apache.log4j.Logger;

/**
 * @author Ouissam
 *
 */
public class HttpRequestExecutor {

	private static Logger logger = Logger.getLogger(HttpRequestExecutor.class);
	
	public HttpRequestExecutor() {

	}
	
	
	/**
	 * Execute an HTTP request string and returns its response as an instance of HttpResponse.
	 * @param host
	 * @param request
	 * @return
	 * @throws IOException
	 * @throws HttpException
	 */
	public static HttpResponse execute(HttpHost host, String request) throws IOException, HttpException{
		
		//Create an HTTP scheme
		Scheme http = new Scheme("http", host.getPort(), PlainSocketFactory.getSocketFactory());
		SchemeRegistry sr = new SchemeRegistry();
		sr.register(http);
		
		//Open the client connection
		DefaultClientConnectionOperator cnxOp = new DefaultClientConnectionOperator(sr);		
		DefaultClientConnection cnx = cnxOp.createConnection();
		cnxOp.openConnection(cnx, host, null, null, new BasicHttpParams());
		
		//Send the request
		SessionOutputBuffer outBuffer = cnx.getOutbuffer();		
		outBuffer.write(request.getBytes());
		outBuffer.flush();
		
		logger.debug(">>" + request);
		
		//Get the response
		HttpResponse response = cnx.receiveResponseHeader();
		cnx.receiveResponseEntity(response);
		
		return response;
	}

}
