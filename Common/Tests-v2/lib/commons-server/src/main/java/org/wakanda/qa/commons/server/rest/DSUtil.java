/**
 * 
 */
package org.wakanda.qa.commons.server.rest;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.net.URISyntaxException;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder.HttpMethod;
import org.wakanda.qa.commons.server.rest.domain.BasicEntity;
import org.wakanda.qa.commons.server.rest.domain.MethodResult;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class DSUtil {

	/**
	 * Returns the REST request that updates or add an entity to the given
	 * dataclass.
	 * 
	 * @param dataClass
	 * @param target
	 * @param entity
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws URISyntaxException
	 */
	public static <T extends BasicEntity> HttpRequest getUpdateRequest(String dataClass,
			T entity, Class<T> type) throws UnsupportedEncodingException,
			URISyntaxException {

		RESTRequestBuilder rb = new RESTRequestBuilder(HttpMethod.POST);
		rb.addDataClass(dataClass).addParameters(
				ArrayUtils.toArray(new BasicNameValuePair(Constants.METHOD,
						Constants.UPDATE)));
		HttpRequest request = rb.buildRequest();

		DCUtil<T> ru = DCUtil.getInstance(type);

		String c = ru.toString(entity);
		StringEntity reqEntity = new StringEntity(c);

		((HttpPost) request).setEntity(reqEntity);
		return request;

	}

	/**
	 * Returns the result of REST method call.
	 * 
	 * @param response
	 * @return
	 * @throws IOException
	 * @throws ParseException
	 */
	public static String getMethodStringResult(HttpResponse response)
			throws ParseException, IOException {
		String source = EntityUtils.toString(response.getEntity());
		return getMethodStringResult(source);
	}

	public static String getMethodStringResult(String source) {
		String result = getGson().fromJson(source, MethodResult.class)
				.getResult();
		return result;
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
		omodel = getGson().fromJson(jmodel, Model.class);
		return omodel;
	}

	/**
	 * Deserializes the Json string into an object of the specified class.
	 * 
	 * @param source
	 * @param classOfT
	 * @return
	 * @throws Exception
	 */
	public static <T> T fromJson(String source, Class<T> classOfT) {
		return getGson().fromJson(source, classOfT);
	}

	/**
	 * Deserializes the Json http response into an object of the specified
	 * class.
	 * 
	 * @param httpResponse
	 * @param classOfT
	 * @return
	 * @throws IOException
	 * @throws ParseException
	 */
	public static <T> T fromJson(HttpResponse httpResponse, Class<T> classOfT)
			throws ParseException, IOException {
		String source = EntityUtils.toString(httpResponse.getEntity());
		return fromJson(source, classOfT);
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

	/**
	 * Constructs a Gson object with default configuration
	 * 
	 * @return
	 */
	public static Gson getGson() {
		GsonBuilder gb = new GsonBuilder();
		gb.registerTypeAdapter(Date.class, new DateTypeConverter());
		return gb.create();
	}

	public static class DateTypeConverter implements JsonSerializer<Date>,
			JsonDeserializer<Date> {
		
		private static final String PARSE_PATTERN = "yyyy-MM-dd'T'HH:mm:ss'Z'";

		@Override
		public Date deserialize(JsonElement json, Type typeOfT,
				JsonDeserializationContext context) throws JsonParseException {
			Date odate = null;
			try {
				odate = DateUtils.parseDate(json.getAsString(), PARSE_PATTERN);
			} catch (java.text.ParseException e) {
				e.printStackTrace();
			}
			return odate ;
		}

		@Override
		public JsonElement serialize(Date src, Type typeOfSrc,
				JsonSerializationContext context) {
			String sdate = DateFormatUtils.format(src, PARSE_PATTERN);
			return new JsonPrimitive(sdate);
		}

	}

}
