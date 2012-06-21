package com.wakanda.qa.http.test.entitiy;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author Ouissam
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	ContentCodingTest.class, 
	MediaTypeTest.class,
	CharSetTest.class, 
	TransferCodingTest.class, 
	MessageLengthTest.class 
	})
public class EntitiyTestSuite {
}
