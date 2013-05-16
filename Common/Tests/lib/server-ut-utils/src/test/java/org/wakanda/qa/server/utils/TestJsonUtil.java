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

import org.junit.Test;
import org.wakanda.qa.server.utils.JsonUtil.JsonModel;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class TestJsonUtil {

	private static JsonModel model = null;

	private static JsonModel getJsonModel() throws URISyntaxException,
			IOException {
		if (model == null) {
			URL murl = TestJsonUtil.class.getResource("simple-model.waModel");
			File modelFile = new File(murl.toURI());
			model = JsonUtil.getModel(modelFile);
		}
		return model;
	}

	@Test
	public void testModelFromJson() throws Exception {
		JsonUtil.JsonModel model = getJsonModel();
		assertTrue(model.isToJSON());
		assertNotNull(model.getDataClasses());
		assertEquals(model.getDataClasses().length, 1);
		assertEquals(model.getDataClasses()[0].getClassName(), "Foo");
		assertEquals(model.getDataClasses()[0].getScope(), "public");
		assertNotNull(model.getDataClasses()[0].getAttributes());
		assertEquals(model.getDataClasses()[0].getAttributes().length, 3);
		assertEquals(model.getDataClasses()[0].getAttributes()[2].getKind(), "storage");
		assertNotNull(model.getDataClasses()[0].getMethods());
		assertEquals(model.getDataClasses()[0].getMethods().length, 2);
		assertEquals(model.getDataClasses()[0].getMethods()[1].getName(),
				"m_entity_private");
	}

}
