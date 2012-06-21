package com.wakanda.qa.http;

import java.io.IOException;
import java.net.Socket;

import org.apache.http.io.SessionInputBuffer;
import org.apache.http.io.SessionOutputBuffer;
import org.apache.http.params.HttpParams;

/**
 * @author Ouissam
 *
 */
public class DefaultClientConnection extends org.apache.http.impl.conn.DefaultClientConnection{
	
	@Override
	protected SessionInputBuffer createSessionInputBuffer(Socket socket,
			int buffersize, HttpParams params) throws IOException {
		inBuffer = super.createSessionInputBuffer(socket, buffersize, params);
		return inBuffer ;
	}
	
	@Override
	protected SessionOutputBuffer createSessionOutputBuffer(Socket socket,
			int buffersize, HttpParams params) throws IOException {
		outBuffer = super.createSessionOutputBuffer(socket, buffersize, params);
		return outBuffer;
	}
	
	private SessionInputBuffer inBuffer ;
	private SessionOutputBuffer outBuffer ;
	
	public SessionInputBuffer getInbuffer() throws IOException {
		return inBuffer;
	}
	
	public SessionOutputBuffer getOutbuffer() throws IOException {
		return outBuffer;
	}
	
	
}