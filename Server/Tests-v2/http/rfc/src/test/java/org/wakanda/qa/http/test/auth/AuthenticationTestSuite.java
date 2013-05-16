package org.wakanda.qa.http.test.auth;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author Ouissam
 *
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	BasicAuthenticationTest.class,
	DigestAuthenticationTest.class
	})
	
public class AuthenticationTestSuite {
	
}
