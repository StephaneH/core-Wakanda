package org.wakanda.qa.test.rest.ds.extend;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.util.EntityUtils;
import org.wakanda.qa.commons.server.rest.DataClass;
import org.wakanda.qa.commons.server.rest.DSClient;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder.HttpMethod;
import org.wakanda.qa.commons.server.rest.domain.BasicEntity;
import org.wakanda.qa.commons.server.rest.domain.EntitiesResult;
import org.wakanda.qa.commons.server.rest.util.MyGson;
import org.wakanda.qa.commons.server.settings.IConfiguration;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.settings.Configuration;
import org.wakanda.qa.test.rest.ds.settings.Settings;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author soufiane.tigrioui@4d.com
 * 
 */
public abstract class AbstractTestCase extends
		org.wakanda.qa.commons.server.ut.AbstractTestCase {
	
	protected void check(HttpRequest request, int expectedSC,
			ResponseHandler responseHandler) throws Throwable {
		check(request, null, expectedSC, responseHandler);
	}
	
	protected void check(HttpRequest request,
			ResponseHandler responseHandler) throws Throwable {
		check(request, null, HttpStatus.SC_OK, responseHandler);
	}

	/**
	 * Asserts that two ResponseEntities objects are equals.
	 * 
	 * @param expected
	 * @param actual
	 */
	protected void assertEntitiesEquals(EntitiesResult<?> expected,
			EntitiesResult<?> actual) {
		assertEquals(expected.getEntitySet(), actual.getEntitySet());
		assertEquals(expected.getEntityModel(), actual.getEntityModel());
		assertEquals(expected.getCount(), actual.getCount());
		assertEquals(expected.getSent(), actual.getSent());
		assertEquals(expected.getFirst(), actual.getFirst());
		assertNotNull(actual.getEntities());
		assertEquals(expected.getEntities().length, actual.getEntities().length);
		assertArrayEquals(expected.getEntities(), actual.getEntities());
	}

	/**
	 * Asserts that entites returned by an http response equal the given expected entities.
	 * 
	 * @param expected
	 * @param httpResponse
	 * @throws Exception
	 */
	protected <T extends BasicEntity> void assertEntitiesEquals(
			EntitiesResult<T> expected, HttpResponse httpResponse, Class<T> entityType)
			throws Exception {
		// Get response entities and release system resources.
		DataClass<T> dsu = getDSClient().getDataClass(entityType);
		EntitiesResult<T> actual = dsu.getEntitiesResult(httpResponse);
		// Check the status-code
		assertEqualsStatusCode(HttpStatus.SC_OK, httpResponse);
		// Check the response
		assertEntitiesEquals(expected, actual);
	}
	
	/**
	 * Asserts that entites returned by an http response equal the content related to the given test ressource.
	 * 
	 * @param expected
	 * @param httpResponse
	 * @throws Exception
	 */
	protected <T extends BasicEntity> void assertEntitiesEquals(
			String testResource, HttpResponse httpResponse, Class<T> entityType)
			throws Exception {
		DataClass<T> dsu = getDSClient().getDataClass(entityType);
		
		// Calculate expected repsonse
		String source = Settings.getExpectedContent(testResource);
		EntitiesResult<T> expected = dsu
				.getEntitiesResult(source);
		
		// Get response entities and release system resources.
		EntitiesResult<T> actual = dsu.getEntitiesResult(httpResponse);
		
		// Check the status-code
		assertEqualsStatusCode(HttpStatus.SC_OK, httpResponse);
		// Check the response
		assertEntitiesEquals(expected, actual);
	}
	
	
	@SuppressWarnings("deprecation")
	protected <T extends BasicEntity> void assertEntitiesEquals2(
			String testResource, HttpResponse httpResponse, Class<T> entityType)
			throws Exception {
		DataClass<T> dsu = getDSClient().getDataClass(entityType);
		
		// Calculate expected repsonse
		String source = Settings.getExpectedContent(testResource);
		T[] expected = dsu
				.getEntitiesResult(source).getEntities();
		
		// Get response entities and release system resources.
		T[] actual = dsu.getEntitiesResult(httpResponse).getEntities();
		
		// Check the status-code
		assertEqualsStatusCode(HttpStatus.SC_OK, httpResponse);
		// Check the response
		assertEquals(expected, actual);
	}
	
	protected <T extends BasicEntity> void assertEntitiesEquals(
			String testResource, HttpResponse httpResponse)
			throws Exception {
		//DataClass<T> dsu = getDSClient().getDataClass(entityType);
		
		// Calculate expected repsonse
		String expected = Settings.getExpectedContent(testResource);

		
		// Get response entities and release system resources.
		String actual = EntityUtils.toString(httpResponse.getEntity())
				.toString();
		
		// Check the status-code
		assertEqualsStatusCode(HttpStatus.SC_OK, httpResponse);
		// Check the response
		assertEquals(expected, actual);
	}
	
	/**
	 * @param testResource
	 * @param actual
	 * @param entityType
	 * @throws Exception
	 */
	protected <T extends BasicEntity> void assertEntityEquals(
			String testResource,  T actual, Class<T> entityType)
			throws Exception {
		String source = Settings.getExpectedContent(testResource);
		T expected = MyGson.getGson().fromJson(source,
				entityType);
		assertEquals(expected, actual);
	}
	
	/**
	 * @param testResource
	 * @param httpResponse
	 * @param entityType
	 * @throws Exception
	 */
	protected <T extends BasicEntity> void assertEntityEquals(
			String testResource,  HttpResponse httpResponse, Class<T> entityType)
			throws Exception {
		T actual = MyGson.fromJson(httpResponse, entityType);
		assertEntityEquals(testResource, actual, entityType);
	}
	

	protected <T extends BasicEntity> RESTRequestBuilder getRESTRequestBuilder(
			String dc, Class<T> entityType, HttpMethod httpMethod) {
		RESTRequestBuilder rb = new RESTRequestBuilder(httpMethod);
		rb.addTable(dc);
		rb.setEntityType(entityType);
		return rb;
	}
	
	protected <T extends BasicEntity> RESTRequestBuilder getRESTRequestBuilder(
			String dc, Class<T> entityType) {
		return getRESTRequestBuilder(dc, entityType, HttpMethod.GET);
	}
	
	protected void checkEntities(final RESTRequestBuilder rb,
			final String testResource) throws Throwable {
		HttpRequest request = rb.buildRequest();
		logger.debug(request.getRequestLine());
		check(request, new ResponseHandler() {
			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntitiesEquals(testResource, response, rb.getEntityType());

			}
		});
	}

	protected void checkEntities(final String testResource,final RESTRequestBuilder rb)
			throws Throwable {
	HttpRequest request = rb.buildRequest();
	logger.debug(request.getRequestLine());
	check(request, new ResponseHandler() {
		public void handleResponse(HttpResponse response) throws Throwable {
			assertEntitiesEquals(testResource, response);

		}
	});
	}
	
	@Override
	protected int getDefaultTimeout() {
		return 60000000;
	}

	@Override
	protected IConfiguration getConfiguration() {
		return Configuration.getInstance();
	}
	
	protected DSClient getDSClient(){
		return new DSClient(getSettings());
	}

}