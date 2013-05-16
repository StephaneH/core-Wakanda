/**
 * 
 */
package org.wakanda.qa.server.utils.rest;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import org.apache.commons.io.FileUtils;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * @author ouissam.gouni@4d.com Provides classes and methods that handle wakanda
 *         rest request/response
 * 
 */
public abstract class DataStoreUtil<T extends BasicEntity> {

	public static Logger logger = Logger.getLogger(DataStoreUtil.class);

	private Class<T> entityType;

	/**
	 * 
	 */
	public DataStoreUtil() {
	}

	public DataStoreUtil(Class<T> entityType) {
		this.entityType = entityType;
	}



	/**
	 * Build a REST request payload for the given entity.
	 * 
	 * @param e
	 * @return
	 */
	public String getRequestEntities(T e) {
		@SuppressWarnings("unchecked")
		T[] jEntities = (T[]) new BasicEntity[] { e };
		return getRequestEntities(jEntities);
	}

	/**
	 * Build a REST request payload for the given entities.
	 * 
	 * @param jEntities
	 * @return
	 */
	public String getRequestEntities(T[] jEntities) {
		ResquestEntities<T> jer = new ResquestEntities<T>(jEntities);
		Type ptype = getParamaeterizedType(ResquestEntities.class, null,
				getEntityType());
		Type gtype = TypeToken.get(ptype).getType();
		String result = new Gson().toJson(jer, gtype);
		return result;
	}

	/**
	 * Return an instance of ResponseEntities class for the given json source
	 * 
	 * @param source
	 * @return
	 */
	public ResponseEntities<T> getResponseEntities(String source) {
		Type ptype = getParamaeterizedType(ResponseEntities.class, null,
				getEntityType());
		Type gtype = TypeToken.get(ptype).getType();
		ResponseEntities<T> r = new Gson().fromJson(source, gtype);
		return r;
	}
	
	/**
	 * Return an instance of ResponseEntities class for the given http response object.
	 * 
	 * @param source
	 * @return
	 * @throws Exception 
	 */
	public ResponseEntities<T> getResponseEntities(HttpResponse response) throws Exception {
		String source = EntityUtils.toString(response.getEntity());
		return getResponseEntities(source);
	}

	/**
	 * Returns the REST request that gets all dataclass entities.
	 * 
	 * @param dataClass
	 * @return
	 */
	public static HttpRequest getRestRequestForRead(String dataClass) {
		String dataClassUrl = "/rest/" + dataClass;
		String url = dataClassUrl + "/";
		HttpRequest request = new HttpGet(url);
		return request;
	}

	/**
	 * Returns the REST request that updates or add an entity to the given
	 * dataclass.
	 * 
	 * @param dataClass
	 * @param target
	 * @param entity
	 * @return
	 */
	public static <T extends BasicEntity> HttpRequest getRestRequestForUpdate(
			String dataClass, T entity, Class<T> type) {
		String dataClassUrl = "/rest/" + dataClass;
		String url = dataClassUrl + "/?$method=update";
		HttpRequest request = new HttpPost(url);
		try {

			DataStoreUtil<T> ru = new DataStoreUtil<T>(type) {
			};

			logger.debug(ru.getEntityType());

			String c = ru.getRequestEntities(entity);
			StringEntity reqEntity = new StringEntity(c);

			((HttpPost) request).setEntity(reqEntity);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
		return request;

	}

	/**
	 * Returns the REST request that deletes an entity from the given dataclass.
	 * 
	 * @param dataClass
	 * @param entity
	 * @return
	 */
	public static HttpRequest getRestRequestForDelete(String dataClass,
			BasicEntity entity) {
		String dataClassUrl = "/rest/" + dataClass;
		String url = dataClassUrl + "(" + entity.getKey() + ")/?$method=delete";
		HttpRequest request = new HttpGet(url);
		return request;
	}

	/**
	 * Returns the REST request that execute a dataclass method.
	 * 
	 * @param dataClass
	 * @param method
	 * @return
	 */
	public static HttpRequest getRestRequestForDataClassMethod(
			String dataClass, String method) {
		String url = "/rest/" + dataClass + "/" + method;
		HttpGet request = new HttpGet(url);
		return request;
	}

	/**
	 * Returns the Data Model.
	 * 
	 * @param modelFile
	 * @return
	 * @throws IOException
	 */
	public static Model getModel(File modelFile) throws IOException {
		Model omodel = null;
		String jmodel = FileUtils.readFileToString(modelFile);
		omodel = new Gson().fromJson(jmodel, Model.class);
		return omodel;
	}
	
	
	public Class<?> getEntityType() {
		ParameterizedType pt = (ParameterizedType) getClass()
				.getGenericSuperclass();
		 
		Class<?> t = this.entityType != null ? this.entityType
				: (Class<?>) pt.getActualTypeArguments()[0];
		
		return t;
	}

	public static <X, Z, Y> Type getParamaeterizedType(final Class<X> rawType,
			final Class<Z> ownerType, final Class<Y> typeArgument) {
		ParameterizedType p = new ParameterizedType() {

			@Override
			public Type getRawType() {
				return rawType;
			}

			@Override
			public Type getOwnerType() {
				return ownerType;
			}

			@Override
			public Type[] getActualTypeArguments() {
				Type[] types = new Type[1];
				types[0] = typeArgument;
				return types;
			}
		};
		return p;
	}

	public static <T extends BasicEntity> DataStoreUtil<T> getInstance(Class<T> c) {
		return new DataStoreUtil<T>(c) {
		};
	}

}
