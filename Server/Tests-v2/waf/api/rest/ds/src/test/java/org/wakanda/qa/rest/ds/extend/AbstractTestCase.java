package org.wakanda.qa.rest.ds.extend;

import java.io.File;
import java.io.IOException;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.wakanda.qa.rest.ds.Settings;
import org.wakanda.qa.server.utils.IBasicSettings;
import org.wakanda.qa.server.utils.Requestor;
import org.wakanda.qa.server.utils.rest.MethodResult;
import org.wakanda.qa.server.utils.rest.Model;
import org.wakanda.qa.server.utils.rest.DataStoreUtil;

import com.google.gson.Gson;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractTestCase extends
		org.wakanda.qa.server.utils.AbstractTestCase {

	protected static Model model = null;

	/**
	 * Returns the default target
	 * 
	 * @return
	 */
	protected HttpHost getDefaultTarget() {
		return getDefaultSettings().getDefaultTarget();
	}

	/**
	 * Returns the data model
	 * 
	 * @return
	 */
	protected Model getModel() {
		if (model == null) {
			String pmodel = Settings.getSettingsInstance().getModelPath();
			File fmodel = new File(pmodel);
			try {
				model = DataStoreUtil.getModel(fmodel);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return model;

	}

	/**
	 * Returns the result of a dataclass method execution.
	 * 
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String getJsonResult(HttpResponse response) throws Exception {
		String content = EntityUtils.toString(response.getEntity());
		String result = (new Gson().fromJson(content, MethodResult.class))
				.getResult();
		return result;
	}

	/**
	 * Executes an http request to the given target.
	 * 
	 * @param request
	 * @param target
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request, HttpHost target)
			throws Exception {
		HttpResponse response = getRequestor().execute(target, request);
		return response;
	}

	/**
	 * Sends the request to the default target.
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected HttpResponse executeRequest(HttpRequest request) throws Exception {
		HttpResponse response = executeRequest(request, getDefaultTarget());
		return response;
	}

	/**
	 * Checks the response status-code to the given URL.
	 * 
	 * @param url
	 * @param expectedSC
	 * @throws Exception
	 */
	public void testStatusCode(String url, int expectedSC) throws Exception {
		HttpRequest request = new HttpGet(url);
		testStatusCode(request, expectedSC);
	}

	/**
	 * Checks the response status-code to the given request.
	 * 
	 * @param request
	 * @param expectedSC
	 * @throws Exception
	 */
	public void testStatusCode(HttpRequest request, int expectedSC)
			throws Exception {
		HttpResponse response = executeRequest(request);
		EntityUtils.consume(response.getEntity());
		assertEqualsStatusCode(expectedSC, response);
	}

	@Override
	protected IBasicSettings getDefaultSettings() {
		return Settings.getSettingsInstance();
	}

	@Override
	protected Requestor getRequestor() {
		return Settings.getRequestorInstance();
	}

}