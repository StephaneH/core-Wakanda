/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicRelatedEntity;
import org.wakanda.qa.commons.server.rest.domain.deferred.OneToNLink;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Master2 extends BasicRelatedEntity {

	@SerializedName("as_string")
	private String aSString;

	@SerializedName("as_number")
	private Double aSNumber;

	@SerializedName("ar_master1")
	private Master1 aRMaster1;
	
	@SerializedName("ars_attributes")
	private OneToNLink aRSAttributes;

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

	public Master1 getARMaster1() {
		return aRMaster1;
	}

	public void setARMaster1(Master1 aRMaster1) {
		this.aRMaster1 = aRMaster1;
	}

	public OneToNLink getARSAttributes() {
		return aRSAttributes;
	}

	public void setaRSAttributes(OneToNLink aRSAttributes) {
		this.aRSAttributes = aRSAttributes;
	}

	@Override
	public boolean equals(Object obj) {
		boolean b = super.equals(obj);
		if (obj instanceof Master2) {
			Master2 vs = (Master2) obj;

			b = b && (getASString() == null ? vs.getASString() == null
							: getASString().equals(vs.getASString()));
			
			b = b && (getASNumber() == null ? vs.getASNumber() == null
					: getASNumber().equals(vs.getASNumber()));
			
			b = b && (getARMaster1() == null ? vs.getARMaster1() == null
					: getARMaster1().equals(vs.getARMaster1()));
			
			b = b && (getARSAttributes() == null ? vs.getARSAttributes() == null
					: getARSAttributes().equals(vs.getARSAttributes()));
			
		}
		return b;

	}
}
