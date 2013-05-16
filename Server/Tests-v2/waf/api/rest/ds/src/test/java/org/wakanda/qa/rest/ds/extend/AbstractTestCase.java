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
import org.wakanda.qa.server.utils.JsonUtil;
import org.wakanda.qa.server.utils.JsonUtil.JsonModel;
import org.wakanda.qa.server.utils.Requestor;

/**
 * Abstract class that provides common test cases utilities.
 * 
 * @author ouissam.gouni@4d.com
 * 
 */
public abstract class AbstractTestCase extends
		org.wakanda.qa.server.utils.AbstractTestCase {

	/**
	 * Returns the default target
	 * 
	 * @return
	 */
	protected HttpHost getDefaultTarget() {
		return getDefaultSettings().getDefaultTarget();
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

	protected static JsonModel model = null;

	/**
	 * Returns the Model as object.
	 * 
	 * @return
	 */
	protected JsonModel getModel() {
		if (model == null) {
			String pmodel = Settings.getSettingsInstance().getModelPath();
			File fmodel = new File(pmodel);
			try {
				model = JsonUtil.getModel(fmodel);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return model;

	}
	
	public void testStatusCode(String url, int expectedSC) throws Exception {
		HttpRequest request = new HttpGet(url);
		testStatusCode(request, expectedSC);
	}

	public void testStatusCode(HttpRequest request, int expectedSC) throws Exception {
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