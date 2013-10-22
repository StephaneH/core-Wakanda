/**
 * 
 */
package org.wakanda.qa.test.rest.ds.access;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.DCUtil;
import org.wakanda.qa.commons.server.rest.DSUtil;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.domain.ResponseEntities;
import org.wakanda.qa.commons.server.ut.ResponseHandler;
import org.wakanda.qa.test.rest.ds.domain.Complex;
import org.wakanda.qa.test.rest.ds.domain.Simple;
import org.wakanda.qa.test.rest.ds.domain.Stamp;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class DataClass extends AbstractTestCase {

	@Test
	public void testEntityModelPropertyIsSentWithRightValue() throws Throwable {
		final String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DCUtil<Simple> dsu = DCUtil.getInstance(Simple.class);
				// Get Response entities
				ResponseEntities<Simple> actual = dsu
						.getResponseEntities(response);
				// Check property existance and value
				assertEquals(dataClass, actual.getEntityModel());
			}
		});
	}

	@Test
	public void testCountPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DCUtil<Simple> dsu = DCUtil.getInstance(Simple.class);
				// Get Response entities
				ResponseEntities<Simple> actual = dsu
						.getResponseEntities(response);
				// Check property existance and value
				assertEquals(5, actual.getCount());
			}
		});
	}

	@Test
	public void testSentPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DCUtil<Simple> dsu = DCUtil.getInstance(Simple.class);
				// Get Response entities
				ResponseEntities<Simple> actual = dsu
						.getResponseEntities(response);
				// Check property existance and value
				assertEquals(5, actual.getSent());
			}
		});
	}

	@Test
	public void testFirstPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get DataClass utility
				DCUtil<Simple> dsu = DCUtil.getInstance(Simple.class);
				// Get Response entities
				ResponseEntities<Simple> actual = dsu
						.getResponseEntities(response);
				// Check property existance and value
				assertEquals(0, actual.getFirst());
			}
		});
	}

	@Test
	public void testEntitiesPropertyIsSentWithAllEntitiesWhenDataClassIsSample()
			throws Throwable {
		// Parameters
		String dataClass = "Simple";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntitiesEquals("01", response, Simple.class);
			}
		});
	}

	@Test
	public void testEntitiesPropertyIsSentWithAllEntitiesWhenDataClassIsComplex()
			throws Throwable {
		// Parameters
		String dataClass = "Complex";
		// Request
		HttpRequest request = new RESTRequestBuilder(dataClass).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				assertEntitiesEquals("02", response, Complex.class);
			}
		});
	}

	@Test
	public void testEntityKeyPropertyIsSentWithRightValue() throws Throwable {
		String dataClass = "Simple";
		String key = "1";
		// Request
		RESTRequestBuilder rb = new RESTRequestBuilder();
		HttpRequest request = rb.addDataClass(dataClass).addKey(key).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get result entitiy
				Simple e = DSUtil.fromJson(response, Simple.class);
				// Check status code
				assertEqualsStatusCode(HttpStatus.SC_OK, response);
				// Check property existance and value
				assertEquals("1", e.getKey());
			}
		});
	}

	@Test
	public void testEntityStampPropertyIsSentWithRightValue() throws Throwable {
		final String dataClass = "Stamp";
		String key = "1";
		// Request
		RESTRequestBuilder rb = new RESTRequestBuilder();
		final HttpRequest request = rb.addDataClass(dataClass).addKey(key).buildRequest();

		check(request, new ResponseHandler() {

			public void handleResponse(HttpResponse response) throws Throwable {
				// Get result entitiy
				final Stamp e = DSUtil.fromJson(response, Stamp.class);
				// Check property existance and value
				assertTrue(e.getStamp() > 0);

				// Update the entity
				e.setASLong(e.getASLong() + 1);
				HttpRequest reqUpdate = DSUtil
						.getUpdateRequest(dataClass, e, Stamp.class);
				assertEqualsStatusCode(HttpStatus.SC_OK, reqUpdate);

				// Get the entity again
				check(request, new ResponseHandler() {

					public void handleResponse(HttpResponse response)
							throws Throwable {
						// Get result entitiy
						Stamp ne = DSUtil.fromJson(response, Stamp.class);
						// Check status code
						assertEqualsStatusCode(HttpStatus.SC_OK, response);
						// Check property existance and value
						assertEquals(Integer.valueOf(e.getStamp() + 1),
								ne.getStamp());

					}
				});

			}
		});
	}

}
