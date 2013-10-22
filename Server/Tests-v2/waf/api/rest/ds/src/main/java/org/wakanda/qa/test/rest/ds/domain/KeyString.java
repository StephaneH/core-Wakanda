/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class KeyString extends BasicEntity {
	
	@SerializedName("ID_string")
	private String idString;

	@SerializedName("as_string")
	private String aSString;

	@SerializedName("as_number")
	private Double aSNumber;

	@SerializedName("ar_master3")
	private Master3 aRMaster3;

	public KeyString(String key) {
		super(key);
	}
	
	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}

	public String getASString() {
		return aSString;
	}

	public void setASString(String aSString) {
		this.aSString = aSString;
	}


	public Double getASNumber() {
		return aSNumber;
	}

	public void setASNumber(Double aSNumber) {
		this.aSNumber = aSNumber;
	}


	public Master3 getARMaster3() {
		return aRMaster3;
	}

	public void setARMaster3(Master3 aRMaster3) {
		this.aRMaster3 = aRMaster3;
	}


	@Override
	public boolean equals(Object obj) {
		boolean b = super.equals(obj);
		if (obj instanceof KeyString) {
			KeyString vs = (KeyString) obj;
			
			b = b && (getIdString() == null ? vs.getIdString() == null
					: getIdString().equals(vs.getIdString()));

			b = b && (getASString() == null ? vs.getASString() == null
							: getASString().equals(vs.getASString()));
			
			b = b && (getASNumber() == null ? vs.getASNumber() == null
					: getASNumber().equals(vs.getASNumber()));
			
			b = b && (getARMaster3() == null ? vs.getARMaster3() == null
					: getARMaster3().equals(vs.getARMaster3()));

		}
		return b;

	}
}
