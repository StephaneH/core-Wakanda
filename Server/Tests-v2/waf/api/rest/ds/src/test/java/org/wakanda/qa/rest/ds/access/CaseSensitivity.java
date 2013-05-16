/**
 * 
 */
package org.wakanda.qa.rest.ds.access;

import static org.junit.Assert.assertEquals;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.rest.ds.extend.AbstractTestCase;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class CaseSensitivity extends AbstractTestCase {
	
	@Test
	public void testDataClassNameIsCaseSensitive() throws Exception{
		
		String url = "/rest/caSeSeNsItIve/";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
		
		url = "/rest/CaSeSeNsItIvE/a_string_1";
		testStatusCode(url, HttpStatus.SC_OK);
		
		url = "/rest/CaSeSeNsItIvE/a_string_2";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
		
		url = "/rest/CAsEsEnSiTiVe/a_string_2";
		testStatusCode(url, HttpStatus.SC_OK);
		
		url = "/rest/CAsEsEnSiTiVe/a_string_1";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}
	
	@Test
	public void testDataClassMethodNameIsCaseSensitive() throws Exception{
		
		String url = "/rest/MethodCaseSensitive/M_cAsEsEnSiTivE/";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
		
		url = "/rest/MethodCaseSensitive/m_cAsEsEnSiTivE/";
		HttpRequest request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertEquals("m_cAsEsEnSiTivE",  getJsonResult(response));
		
		url = "/rest/MethodCaseSensitive/m_CaSeSeNsItIvE/";
		request = new HttpGet(url);
		response = executeRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertEquals("m_CaSeSeNsItIvE",  getJsonResult(response));
	}
	
	@Test
	public void testDataClassAttributeNameIsCaseSensitive() throws Exception{
		String url = "/rest/AttributeCaseSensitive/a_string/";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
		
		url = "/rest/AttributeCaseSensitive/a_StRiNg/";
		testStatusCode(url, HttpStatus.SC_OK);
		
		url = "/rest/AttributeCaseSensitive/a_sTrInG/";
		testStatusCode(url, HttpStatus.SC_OK);
	}
	
	@Test
	@Ignore
	public void testDataInQueriesIsCaseInsensitive() throws Exception{
		
	}
}
