/**
 * 
 */
package org.wakanda.qa.rest.ds.access;

import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.rest.ds.extend.AbstractTestCase;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Scope extends AbstractTestCase {

	@Test
	public void testDataClassWithScopePublicOnServerIsUnreachable()
			throws Exception {
		String url = "/rest/DCScopePublicOnServer/";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}

	@Test
	public void testDataClassWithScopePublicIsReachable() throws Exception {
		String url = "/rest/DCScopePublic/";
		testStatusCode(url, HttpStatus.SC_OK);
	}

	@Test
	public void testDataClassMethodWithScopePrivateIsUnreachable()
			throws Exception {
		String url = "/rest/DCScopePublic/m_scope_private";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}

	@Test
	public void testDataClassMethodWithScopeProtectedIsUnreachable()
			throws Exception {
		String url = "/rest/DCScopePublic/m_scope_protected";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}

	@Test
	public void testDataClassMethodWithScopePublicOnServerIsUnreachable()
			throws Exception {
		String url = "/rest/DCScopePublic/m_scope_public_on_server";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}

	@Test
	public void testDataClassMethodWithScopePublicIsReachable()
			throws Exception {
		String url = "/rest/DCScopePublic/m_scope_public";
		testStatusCode(url, HttpStatus.SC_OK);
	}

	@Test
	public void testDataClassAttributeWithScopePrivateIsUnreachable()
			throws Exception {
		String url = "/rest/DCScopePublic/a_scope_private";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}

	@Test
	public void testDataClassAttributeWithScopeProtectedIsUnreachable()
			throws Exception {
		String url = "/rest/DCScopePublic/a_scope_protected";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}

	@Test
	public void testDataClassAttributeWithScopePublicOnServerIsUnreachable()
			throws Exception {
		String url = "/rest/DCScopePublic/a_scope_public_on_server";
		testStatusCode(url, HttpStatus.SC_NOT_FOUND);
	}

	@Test
	public void testDataClassAttributeWithScopePublicIsReachable()
			throws Exception {
		String url = "/rest/DCScopePublic/a_scope_public";
		testStatusCode(url, HttpStatus.SC_OK);
	}

}
