/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;
import org.wakanda.qa.commons.server.rest.domain.deferred.Blob;
import org.wakanda.qa.commons.server.rest.domain.deferred.Image;
import org.wakanda.qa.commons.server.rest.domain.deferred.NToOneLink;
import org.wakanda.qa.commons.server.rest.domain.deferred.OneToNLink;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Complex extends BasicEntity {
	
	@SerializedName("as_string")
	private String aSString;
	
	@SerializedName("as_bool")
	private Boolean aSBool;
	
	@SerializedName("as_byte")
	private Byte aSByte;
	
	@SerializedName("as_word")
	private Short aSWord;
	
	@SerializedName("as_long")
	private Integer aSLong;
	
	@SerializedName("as_long64")
	private Long aSLong64;
	
	@SerializedName("as_number")
	private Double aSNumber;
	
	@SerializedName("as_duration")
	private Integer aSDuration;
	
	@SerializedName("as_uuid")
	private String aSUuid;
	
	@SerializedName("as_date")
	private String aSDate;
	
	@SerializedName("as_blob")
	private Blob aSBlob;
	
	@SerializedName("as_image")
	private Image aSImage;
	
	@SerializedName("ac_string")
	private String aCString;
	
	@SerializedName("ac_bool")
	private Boolean aCBool;
	
	@SerializedName("ac_bye")
	private Byte aCByte;
	
	@SerializedName("ac_word")
	private Short aCWord;
	
	@SerializedName("ac_long")
	private Integer aCLong;
	
	@SerializedName("ac_long64")
	private Long aCLong64;
	
	@SerializedName("ac_number")
	private Double aCNumber;
	
	@SerializedName("as_duration")
	private Integer aCDuration;
	
	@SerializedName("ac_uuid")
	private String aCUuid;
	
	@SerializedName("ac_date")
	private String aCDate;
	
	@SerializedName("ac_blob")
	private Blob aCBlob;
	
	@SerializedName("ac_image")
	private Image aCImage;
	
	@SerializedName("ar_masterComplex")
	private NToOneLink aRMasterComplex;
	
	@SerializedName("ars_slave1")
	private OneToNLink aRSSlave1;
	
	@SerializedName("aa_masterComplex__as_string")
	private String aAMasterComplexASString;
	
	
	public Complex(String key) {
		super(key);
	}

	

	public String getASString() {
		return aSString;
	}



	public void setASString(String aSString) {
		this.aSString = aSString;
	}



	public Boolean getASBool() {
		return aSBool;
	}



	public void setASBool(Boolean aSBool) {
		this.aSBool = aSBool;
	}



	public Byte getASByte() {
		return aSByte;
	}



	public void setASByte(Byte aSByte) {
		this.aSByte = aSByte;
	}



	public Short getASWord() {
		return aSWord;
	}



	public void setASWord(Short aSWord) {
		this.aSWord = aSWord;
	}



	public Integer getASLong() {
		return aSLong;
	}



	public void setASLong(Integer aSLong) {
		this.aSLong = aSLong;
	}



	public Long getASLong64() {
		return aSLong64;
	}



	public void setASLong64(Long aSLong64) {
		this.aSLong64 = aSLong64;
	}



	public Double getASNumber() {
		return aSNumber;
	}



	public void setASNumber(Double aSNumber) {
		this.aSNumber = aSNumber;
	}



	public Integer getASDuration() {
		return aSDuration;
	}



	public void setASDuration(Integer aSDuration) {
		this.aSDuration = aSDuration;
	}



	public String getASUuid() {
		return aSUuid;
	}



	public void setASUuid(String aSUuid) {
		this.aSUuid = aSUuid;
	}



	public String getASDate() {
		return aSDate;
	}



	public void setASDate(String aSDate) {
		this.aSDate = aSDate;
	}



	public Blob getASBlob() {
		return aSBlob;
	}



	public void setASBlob(Blob aSBlob) {
		this.aSBlob = aSBlob;
	}



	public Image getASImage() {
		return aSImage;
	}



	public void setASImage(Image aSImage) {
		this.aSImage = aSImage;
	}



	public String getACString() {
		return aCString;
	}



	public void setACString(String aCString) {
		this.aCString = aCString;
	}



	public Boolean getACBool() {
		return aCBool;
	}



	public void setACBool(Boolean aCBool) {
		this.aCBool = aCBool;
	}



	public Byte getACByte() {
		return aCByte;
	}



	public void setACByte(Byte aCByte) {
		this.aCByte = aCByte;
	}



	public Short getACWord() {
		return aCWord;
	}



	public void setACWord(Short aCWord) {
		this.aCWord = aCWord;
	}



	public Integer getACLong() {
		return aCLong;
	}



	public void setACLong(Integer aCLong) {
		this.aCLong = aCLong;
	}



	public Long getACLong64() {
		return aCLong64;
	}



	public void setACLong64(Long aCLong64) {
		this.aCLong64 = aCLong64;
	}



	public Double getACNumber() {
		return aCNumber;
	}



	public void setACNumber(Double aCNumber) {
		this.aCNumber = aCNumber;
	}



	public Integer getACDuration() {
		return aCDuration;
	}



	public void setACDuration(Integer aCDuration) {
		this.aCDuration = aCDuration;
	}



	public String getACUuid() {
		return aCUuid;
	}



	public void setACSUuid(String aCUuid) {
		this.aCUuid = aCUuid;
	}



	public String getACDate() {
		return aCDate;
	}



	public void setACDate(String aCDate) {
		this.aCDate = aCDate;
	}



	public Blob getACBlob() {
		return aCBlob;
	}



	public void setACBlob(Blob aCBlob) {
		this.aCBlob = aCBlob;
	}



	public Image getACImage() {
		return aCImage;
	}



	public void setACImage(Image aCImage) {
		this.aCImage = aCImage;
	}



	public NToOneLink getARMasterComplex() {
		return aRMasterComplex;
	}



	public void setARMasterComplex(NToOneLink aRMasterComplex) {
		this.aRMasterComplex = aRMasterComplex;
	}



	public OneToNLink getARSSlave1() {
		return aRSSlave1;
	}



	public void setARSSlave1(OneToNLink aRSSlave1) {
		this.aRSSlave1 = aRSSlave1;
	}


	public String getAAMasterComplexASString() {
		return aAMasterComplexASString;
	}


	public void setAAMasterComplexASString(String aAMasterComplexASString) {
		this.aAMasterComplexASString = aAMasterComplexASString;
	}



	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof Complex) {
			
			Complex vs = (Complex) obj;
			b = super.equals(obj);
			
			b = b && (getASString() == null ? vs.getASString() == null
					: getASString().equals(vs.getASString()));
			
			b = b && (getASBool() == null ? vs.getASBool() == null
					: getASBool().equals(vs.getASBool()));
			
			b = b && (getASByte() == null ? vs.getASByte() == null
					: getASByte().equals(vs.getASByte()));
			
			b = b && (getASWord() == null ? vs.getASWord() == null
					: getASWord().equals(vs.getASWord()));
			
			b = b && (getASLong() == null ? vs.getASLong() == null
					: getASLong().equals(vs.getASLong()));
			
			b = b && (getASLong64() == null ? vs.getASLong64() == null
					: getASLong64().equals(vs.getASLong64()));
			
			b = b && (getASNumber() == null ? vs.getASNumber() == null
					: getASNumber().equals(vs.getASNumber()));
			
			b = b && (getASDuration() == null ? vs.getASDuration() == null
					: getASDuration().equals(vs.getASDuration()));
			
			b = b && (getASUuid() == null ? vs.getASUuid() == null
					: getASUuid().equals(vs.getASUuid()));
			
			b = b && (getASDate()== null ? vs.getASDate() == null
					: getASDate().equals(vs.getASDate()));
			
			b = b && (getASBlob()== null ? vs.getASBlob() == null
					: getASBlob().equals(vs.getASBlob()));
			
			b = b && (getASImage()== null ? vs.getASImage() == null
					: getASImage().equals(vs.getASImage()));
			
			
			
			
			b = b && (getACString() == null ? vs.getACString() == null
					: getACString().equals(vs.getACString()));
			
			b = b && (getACBool() == null ? vs.getACBool() == null
					: getACBool().equals(vs.getACBool()));
			
			b = b && (getACByte() == null ? vs.getACByte() == null
					: getACByte().equals(vs.getACByte()));
			
			b = b && (getACWord() == null ? vs.getACWord() == null
					: getACWord().equals(vs.getACWord()));
			
			b = b && (getACLong() == null ? vs.getACLong() == null
					: getACLong().equals(vs.getACLong()));
			
			b = b && (getACLong64() == null ? vs.getACLong64() == null
					: getACLong64().equals(vs.getACLong64()));
			
			b = b && (getACNumber() == null ? vs.getACNumber() == null
					: getACNumber().equals(vs.getACNumber()));
			
			b = b && (getACDuration() == null ? vs.getACDuration() == null
					: getACDuration().equals(vs.getACDuration()));
			
			b = b && (getACUuid() == null ? vs.getACUuid() == null
					: getACUuid().equals(vs.getACUuid()));
			
			b = b && (getACDate()== null ? vs.getACDate() == null
					: getACDate().equals(vs.getACDate()));
			
			b = b && (getACBlob()== null ? vs.getACBlob() == null
					: getACBlob().equals(vs.getACBlob()));
			
			b = b && (getACImage()== null ? vs.getACImage() == null
					: getACImage().equals(vs.getACImage()));
			
			b = b && (getARMasterComplex()== null ? vs.getARMasterComplex() == null
					: getARMasterComplex().equals(vs.getARMasterComplex()));
			
			b = b && (getARSSlave1()== null ? vs.getARSSlave1() == null
					: getARSSlave1().equals(vs.getARSSlave1()));
			
			b = b && (getAAMasterComplexASString()== null ? vs.getAAMasterComplexASString() == null
					: getAAMasterComplexASString().equals(vs.getAAMasterComplexASString()));

		}
		return b;

	}


}
