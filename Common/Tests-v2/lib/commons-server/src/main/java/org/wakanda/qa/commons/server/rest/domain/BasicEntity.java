/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain;

import org.apache.commons.lang3.ArrayUtils;
import org.wakanda.qa.commons.server.rest.DSUtil;

import com.google.gson.annotations.SerializedName;

public class BasicEntity implements Cloneable {

	@SerializedName(value = "__entityModel")
	private String entityModel;

	@SerializedName(value = "__ERROR")
	private RESTError[] errors;

	@SerializedName(value = "__KEY")
	private String key;

	@SerializedName(value = "__STAMP")
	private Integer stamp;

	@SerializedName(value = "ID")
	private Integer id;

	@SerializedName(value = "uri")
	private String uri;

	public BasicEntity(String key, Integer stamp) {
		this.key = key;
		this.stamp = stamp;
	}

	public BasicEntity(String key) {
		this(key, null);
	}

	public BasicEntity() {
		this(null, null);
	}

	public String getEntityModel() {
		return entityModel;
	}

	public void setEntityModel(String entityModel) {
		this.entityModel = entityModel;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Integer getStamp() {
		return stamp;
	}

	public void setStamp(Integer stamp) {
		this.stamp = stamp;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public RESTError[] getErrors() {
		return errors;
	}

	public void setErrors(RESTError[] errors) {
		this.errors = errors;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof BasicEntity) {
			BasicEntity vs = (BasicEntity) obj;
			b = true;
			b = b
					&& (getEntityModel() == null ? vs.getEntityModel() == null
							: getEntityModel().equals(vs.getEntityModel()));
			b = b
					&& (getKey() == null ? vs.getKey() == null : getKey()
							.equals(vs.getKey()));
			b = b
					&& (getStamp() == null ? vs.getStamp() == null : getStamp()
							.equals(vs.getStamp()));
			b = b
					&& (getId() == null ? vs.getId() == null : getId().equals(
							vs.getId()));

			b = b
					&& (getUri() == null ? vs.getUri() == null : getUri()
							.equals(vs.getUri()));

			b = b
					&& (getErrors() == null ? vs.getErrors() == null
							: ArrayUtils.isEquals(getErrors(), vs.getErrors()));

		}
		return b;
	}

	@Override
	public String toString() {
		return DSUtil.getGson().toJson(this);
	}

	@Override
	public Object clone() throws CloneNotSupportedException {
		return DSUtil.getGson().fromJson(toString(), this.getClass());
	}

}