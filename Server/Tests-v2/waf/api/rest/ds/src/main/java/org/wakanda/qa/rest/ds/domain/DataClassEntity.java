/**
 * 
 */
package org.wakanda.qa.rest.ds.domain;

import org.wakanda.qa.server.utils.rest.BasicEntity;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class DataClassEntity extends BasicEntity {
	
	@SerializedName("a_string")
	private String aString;
	
	@SerializedName("a_string")
	private String aNumber;
	
	/**
	 * @param ID
	 */
	public DataClassEntity(String ID) {
		super(ID);
	}
	
	protected String getAString() {
		return aString;
	}


	protected void setAString(String aString) {
		this.aString = aString;
	}


	protected String getANumber() {
		return aNumber;
	}


	protected void setANumber(String aNumber) {
		this.aNumber = aNumber;
	}

}
