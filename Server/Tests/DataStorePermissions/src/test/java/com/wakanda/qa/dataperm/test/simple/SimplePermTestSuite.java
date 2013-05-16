package com.wakanda.qa.dataperm.test.simple;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import com.wakanda.qa.dataperm.test.simple.method.Execute;
import com.wakanda.qa.dataperm.test.simple.method.Promote;


/**
 * @author ouissam.gouni@4d.com
 *
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	Read.class,
	Create.class,
	Update.class,
	Remove.class,
	Execute.class,
	Promote.class
	})
public class SimplePermTestSuite {

}
