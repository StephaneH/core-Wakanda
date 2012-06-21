package com.wakanda.qa.dataperm.test.inherit;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import com.wakanda.qa.dataperm.test.inherit.method.Execute;
import com.wakanda.qa.dataperm.test.inherit.method.Promote;


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
	Promote.class,
	Force.class,
	OverridePerm.class
	})
public class InheritedPermTestSuite {
	
}
