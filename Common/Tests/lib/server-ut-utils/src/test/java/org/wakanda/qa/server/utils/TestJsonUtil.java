/**
 * 
 */
package org.wakanda.qa.server.utils;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.wakanda.qa.server.utils.rest.BasicEntity;
import org.wakanda.qa.server.utils.rest.Model;
import org.wakanda.qa.server.utils.rest.ResponseEntities;
import org.wakanda.qa.server.utils.rest.DataStoreUtil;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class TestJsonUtil {

	private static Logger logger = Logger.getLogger(TestJsonUtil.class);
	private static Model model = null;
	
	public class SampleEntity extends BasicEntity {

		private String name;

		public SampleEntity(String __KEY, String __STAMP, String ID,
				String name) {
			super(__KEY, __STAMP, ID);
			this.name = name;
		}

		public SampleEntity(String ID) {
			super(ID);
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	}
	private final static DataStoreUtil<SampleEntity> REST_UTIL = new DataStoreUtil<TestJsonUtil.SampleEntity>() {
	};

	private static Model getJsonModel() throws URISyntaxException,
			IOException {
		if (model == null) {
			URL murl = TestJsonUtil.class.getResource("simple-model.waModel");
			File modelFile = new File(murl.toURI());
			model = DataStoreUtil.getModel(modelFile);
		}
		return model;
	}

	@Test
	public void testModelFromJson() throws Exception {
		Model model = getJsonModel();
		assertTrue(model.isToJSON());
		assertNotNull(model.getDataClasses());
		assertEquals(model.getDataClasses().length, 1);
		assertEquals(model.getDataClasses()[0].getClassName(), "Foo");
		assertEquals(model.getDataClasses()[0].getScope(), "public");
		assertNotNull(model.getDataClasses()[0].getAttributes());
		assertEquals(model.getDataClasses()[0].getAttributes().length, 3);
		assertEquals(model.getDataClasses()[0].getAttributes()[2].getKind(),
				"storage");
		assertNotNull(model.getDataClasses()[0].getMethods());
		assertEquals(model.getDataClasses()[0].getMethods().length, 2);
		assertEquals(model.getDataClasses()[0].getMethods()[1].getName(),
				"m_entity_private");
	}

	@Test
	public void testGetRestDSRequest() throws Exception {
		SampleEntity e = new SampleEntity("1", "1", "1", "hey");
		logger.debug(REST_UTIL.getRequestEntities(e));
	}


	@Test
	public void testGetRestDSResponse(){
		String c = "{\"__ENTITIES\":[{\"name\":\"Hello\",\"__KEY\":\"1\",\"__STAMP\":\"1\",\"ID\":\"1\"}]}";
		ResponseEntities<SampleEntity> r = REST_UTIL.getResponseEntities(c);
		logger.debug(r.getEntities()[0].getName());
	}
	
	
	@Test
	public void testGetRestRequestForUpdate() throws Exception{
		SampleEntity e = new SampleEntity("1", "1", "1", "hey");
		HttpPost request = (HttpPost) DataStoreUtil.getRestRequestForUpdate("Sample", e, SampleEntity.class);
		logger.debug(EntityUtils.toString(request.getEntity()));
	}
	

}
