/**
 * 
 */
package org.wakanda.qa.dataperm.domain;

import org.wakanda.qa.server.utils.rest.BasicEntity;


/**
 * @author ouissam.gouni@4d.com
 *
 */
public class SampleEntity extends BasicEntity{
	
	private String name;

	public SampleEntity(String __KEY, String __STAMP, String ID, String name) {
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
