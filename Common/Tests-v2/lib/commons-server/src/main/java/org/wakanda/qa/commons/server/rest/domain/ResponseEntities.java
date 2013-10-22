/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain;

import com.google.gson.annotations.SerializedName;

public class ResponseEntities<T extends BasicEntity> {

	@SerializedName(value = "__ENTITYSET")
	private String entitySet;

	@SerializedName(value = "__entityModel")
	private String entityModel;

	@SerializedName(value = "__COUNT")
	private int count;

	@SerializedName(value = "__SENT")
	private int sent;

	@SerializedName(value = "__FIRST")
	private int first;

	@SerializedName(value = "__ENTITIES")
	private T[] entities;

	public ResponseEntities(String entityModel, int count, int sent, int first,
			T[] entities) {
		super();
		this.entityModel = entityModel;
		this.count = count;
		this.sent = sent;
		this.first = first;
		this.entities = entities;
	}

	public String getEntitySet() {
		return entitySet;
	}

	public String getEntitySetUuid() {
		String eSetUuid = null;
		String eSetUrl = getEntitySet();
		if (eSetUrl != null) {
			eSetUuid = eSetUrl.substring(eSetUrl.lastIndexOf('/') + 1,
					eSetUrl.length());
		}
		return eSetUuid;
	}

	public void setEntitySet(String entitySet) {
		this.entitySet = entitySet;
	}

	public String getEntityModel() {
		return entityModel;
	}

	public void setEntityModel(String entityModel) {
		this.entityModel = entityModel;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getSent() {
		return sent;
	}

	public void setSent(int sent) {
		this.sent = sent;
	}

	public int getFirst() {
		return first;
	}

	public void setFirst(int first) {
		this.first = first;
	}

	public T[] getEntities() {
		return entities;
	}

	public void setEntities(T[] entities) {
		this.entities = entities;
	}

	public void toString(Class<T> c) {

	}

}