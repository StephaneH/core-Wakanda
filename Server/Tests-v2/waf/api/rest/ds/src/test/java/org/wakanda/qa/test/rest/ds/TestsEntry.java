package org.wakanda.qa.test.rest.ds;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.test.rest.ds.access.CaseSensitivity;
import org.wakanda.qa.test.rest.ds.access.DataClass;
import org.wakanda.qa.test.rest.ds.access.DataClassKey;
import org.wakanda.qa.test.rest.ds.access.DataClassMethod;
import org.wakanda.qa.test.rest.ds.access.FilterByAttributes;
import org.wakanda.qa.test.rest.ds.access.Scope;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ CaseSensitivity.class, Scope.class, DataClass.class,
		FilterByAttributes.class, DataClassKey.class, DataClassMethod.class })
public class TestsEntry {

}
