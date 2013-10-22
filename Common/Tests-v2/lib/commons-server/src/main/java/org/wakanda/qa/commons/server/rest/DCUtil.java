/**
 * 
 */
package org.wakanda.qa.commons.server.rest;

import java.io.IOException;
import java.lang.reflect.Array;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.net.URISyntaxException;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.wakanda.qa.commons.server.http.Requestor;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder.HttpMethod;
import org.wakanda.qa.commons.server.rest.domain.BasicEntity;
import org.wakanda.qa.commons.server.rest.domain.DeleteResponse;
import org.wakanda.qa.commons.server.rest.domain.ResponseEntities;
import org.wakanda.qa.commons.server.rest.domain.ResquestEntities;

import com.google.gson.reflect.TypeToken;

/**
 * Provides classes and methods that handle wakanda rest request/response
 * 
 * @author ouissam.gouni@4d.com
 * 
 * @param <T>
 */
public abstract class DCUtil<T extends BasicEntity> {

	public static Logger logger = Logger.getLogger(DCUtil.class);

	private String dcName;
	private Class<T> entityType;
	private Requestor requestor;

	private DCUtil(Class<T> entityType, String dcName, Requestor requestor) {
		this.entityType = entityType;
		this.dcName = dcName;
		this.requestor = requestor;
	}

	private DCUtil(Class<T> entityType, String dcName) {
		this(entityType, dcName, new Requestor());
	}

	private DCUtil(Class<T> entityType) {
		this(entityType, entityType.getSimpleName());
	}

	private DCUtil(Class<T> entityType, Requestor requestor) {
		this(entityType, entityType.getSimpleName(), requestor);
	}

	/**
	 * Build a REST request payload for the given entity.
	 * 
	 * @param e
	 * @return
	 */
	public String toString(T e) {
		String result = DSUtil.getGson().toJson(e, getEntityType());
		return result;
	}

	/**
	 * Build a REST request payload for the given entities.
	 * 
	 * @param jEntities
	 * @return
	 */
	public String toString(T[] jEntities) {
		ResquestEntities<T> jer = new ResquestEntities<T>(jEntities);
		Type ptype = DSUtil.getParamaeterizedType(ResquestEntities.class, null,
				getEntityType());
		Type gtype = TypeToken.get(ptype).getType();
		String result = DSUtil.getGson().toJson(jer, gtype);
		return result;
	}

	/**
	 * Return an instance of ResponseEntities class for the given json source
	 * 
	 * @param source
	 * @return
	 */
	public ResponseEntities<T> getResponseEntities(String source) {
		Type ptype = DSUtil.getParamaeterizedType(ResponseEntities.class, null,
				getEntityType());
		Type gtype = TypeToken.get(ptype).getType();
		ResponseEntities<T> r = DSUtil.getGson().fromJson(source, gtype);
		return r;
	}

	/**
	 * Return an instance of ResponseEntities class for the given http response
	 * object.
	 * 
	 * @param source
	 * @return
	 * @throws IOException
	 * @throws ParseException
	 */
	public ResponseEntities<T> getResponseEntities(HttpResponse response)
			throws ParseException, IOException {
		String source = EntityUtils.toString(response.getEntity());
		return getResponseEntities(source);
	}

	/**
	 * Returns the entity with the given key.
	 * 
	 * @param key
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @throws URISyntaxException
	 * @throws Exception
	 */
	public T get(String key) throws ClientProtocolException, IOException,
			URISyntaxException {
		RESTRequestBuilder rb = new RESTRequestBuilder();
		HttpRequest request = rb.addDataClass(dcName).addKey(key).buildRequest();
		HttpResponse httpResponse = requestor.execute(request);
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			T entity = DSUtil.fromJson(httpResponse, entityType);
			return entity;
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}

	}

	/**
	 * Returns all the entities.
	 * 
	 * @return
	 * @throws URISyntaxException
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	public T[] getAll() throws URISyntaxException, ClientProtocolException,
			IOException {
		HttpRequest request = new RESTRequestBuilder(dcName).buildRequest();
		HttpResponse httpResponse = requestor.execute(request);
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			ResponseEntities<T> re = getResponseEntities(httpResponse);
			T[] entities = re.getEntities();
			return entities;
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}

	}

	/**
	 * Filter the entities using the given filterString.
	 * 
	 * @param filterString
	 * @return
	 * @throws URISyntaxException
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	public T[] filterBy(String filterString) throws URISyntaxException,
			ClientProtocolException, IOException {
		NameValuePair param = new BasicNameValuePair(Constants.FILTER, "\""
				+ filterString + "\"");
		NameValuePair[] params = ArrayUtils.toArray(param);

		HttpRequest request = new RESTRequestBuilder().addDataClass(dcName)
				.addParameters(params).buildRequest();
		HttpResponse httpResponse = requestor.execute(request);
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			ResponseEntities<T> re = getResponseEntities(httpResponse);
			T[] entities = re.getEntities();
			return entities;
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}

	}

	public long count() throws URISyntaxException, ClientProtocolException,
			IOException {

		NameValuePair param = new BasicNameValuePair(Constants.COMPUTE, "count");
		NameValuePair[] params = ArrayUtils.toArray(param);

		HttpRequest request = new RESTRequestBuilder().addDataClass(dcName)
				.addParameters(params).buildRequest();
		HttpResponse httpResponse = requestor.execute(request);
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			String content = EntityUtils.toString(httpResponse.getEntity());
			return Long.valueOf(content);
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}
	}

	/**
	 * Updates an entity.
	 * 
	 * @param entity
	 * @return
	 * @throws URISyntaxException
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	public T update(T entity) throws URISyntaxException,
			ClientProtocolException, IOException {
		// Build the request uri
		RESTRequestBuilder rb = new RESTRequestBuilder(HttpMethod.POST);
		rb.addDataClass(dcName).addParameters(
				ArrayUtils.toArray(new BasicNameValuePair(Constants.METHOD,
						Constants.UPDATE)));
		HttpRequest request = rb.buildRequest();

		// Set the payload
		String c = toString(entity);
		StringEntity reqEntity = new StringEntity(c);
		((HttpPost) request).setEntity(reqEntity);

		// Execute the request and return the received entity
		HttpResponse httpResponse = requestor.execute(request);
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			T result = (T) DSUtil.fromJson(httpResponse, entityType);
			return result;
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}

	}

	/**
	 * Updates all the entities in the given array.
	 * 
	 * @param entities
	 * @return
	 * @throws URISyntaxException
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	public T[] update(T[] entities) throws URISyntaxException,
			ClientProtocolException, IOException {

		// Build the request uri
		RESTRequestBuilder rb = new RESTRequestBuilder(HttpMethod.POST);
		rb.addDataClass(dcName).addParameters(
				ArrayUtils.toArray(new BasicNameValuePair(Constants.METHOD,
						Constants.UPDATE)));
		HttpRequest request = rb.buildRequest();

		// Set the payload
		String c = toString(entities);
		StringEntity reqEntity = new StringEntity(c);
		((HttpPost) request).setEntity(reqEntity);

		// Execute the request and return the received entities
		HttpResponse httpResponse = requestor.execute(request);
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			T[] result = getResponseEntities(httpResponse).getEntities();
			return result;
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}

	}

	public T[] update(List<T> entities) throws URISyntaxException,
			ClientProtocolException, IOException {
		@SuppressWarnings("unchecked")
		T[] array = (T[]) Array.newInstance(entityType, 0);
		return update(entities.toArray(array));
	}

	public boolean delete(BasicEntity entity) throws URISyntaxException,
			ClientProtocolException, IOException {
		RESTRequestBuilder rb = new RESTRequestBuilder();
		rb.addDataClass(dcName)
				.addKey(entity.getKey())
				.addParameters(
						ArrayUtils.toArray(new BasicNameValuePair(
								Constants.METHOD, Constants.DELETE)));
		// Execute the request and return the received entities
		HttpResponse httpResponse = requestor.execute(rb.buildRequest());
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			String content = EntityUtils.toString(httpResponse.getEntity());
			DeleteResponse dr = DSUtil.getGson().fromJson(content,
					DeleteResponse.class);
			return dr.isOk();
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}

	}

	public String createEntitySet() throws URISyntaxException,
			ClientProtocolException, IOException {
		RESTRequestBuilder rb = new RESTRequestBuilder();
		rb.addDataClass(dcName).addParameters(
				ArrayUtils.toArray(new BasicNameValuePair(Constants.METHOD,
						Constants.ENTITYSET_METHOD)));
		HttpRequest request = rb.buildRequest();

		// Create an entitySet
		HttpResponse httpResponse = requestor.execute(request);
		try {
			assertStatusCodeEquals_200_OK(httpResponse);
			ResponseEntities<T> temp = getResponseEntities(httpResponse);
			// Get entitySet id
			String eSetUuid = temp.getEntitySetUuid();
			return eSetUuid;
		} finally {
			HttpClientUtils.closeQuietly(httpResponse);
		}

	}

	public Class<?> getEntityType() {
		ParameterizedType pt = (ParameterizedType) getClass()
				.getGenericSuperclass();

		Class<?> t = this.entityType != null ? this.entityType : (Class<?>) pt
				.getActualTypeArguments()[0];

		return t;
	}

	public static <T extends BasicEntity> DCUtil<T> getInstance(
			Class<T> entityType) {
		return new DCUtil<T>(entityType) {
		};
	}

	public static <T extends BasicEntity> DCUtil<T> getInstance(
			Class<T> entityType, String dcName) {
		return new DCUtil<T>(entityType, dcName) {
		};
	}

	public static <T extends BasicEntity> DCUtil<T> getInstance(
			Class<T> entityType, String dcName, Requestor requestor) {
		return new DCUtil<T>(entityType, dcName, requestor) {
		};
	}

	public static <T extends BasicEntity> DCUtil<T> getInstance(
			Class<T> entityType, Requestor requestor) {
		return new DCUtil<T>(entityType, requestor) {
		};
	}

	private void assertStatusCodeEquals_200_OK(HttpResponse response)
			throws HttpResponseException {
		int expected = HttpStatus.SC_OK;
		int actual = response.getStatusLine().getStatusCode();
		if (actual != HttpStatus.SC_OK) {
			throw new HttpResponseException(actual,
					"Unexpected status-code expected:" + expected + " but was:"
							+ actual);
		}
	}
}
