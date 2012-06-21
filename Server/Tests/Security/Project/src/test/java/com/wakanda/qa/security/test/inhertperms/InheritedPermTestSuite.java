package com.wakanda.qa.security.test.inhertperms;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;


@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	Read.class,
	Create.class
	})
public class InheritedPermTestSuite {
	
}
