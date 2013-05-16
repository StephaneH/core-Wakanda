/**
 * 
 */
package org.wakanda.qa.server.utils.rest;

public class ResponseEntities<T extends BasicEntity> {

	private String __entityModel;
	private int __COUNT;
	private int __SENT;
	private int __FIRST;
	private T[] __ENTITIES;

	public String getEntityModel() {
		return __entityModel;
	}

	public int getCount() {
		return __COUNT;
	}

	public int getSent() {
		return __SENT;
	}

	public int getFirst() {
		return __FIRST;
	}

	public T[] getEntities() {
		return __ENTITIES;
	}
}