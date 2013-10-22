/**
 * 
 */
package org.wakanda.qa.commons.server.rest.domain;

public class  ResquestEntities<T extends BasicEntity>{

	private T[] __ENTITIES;

	public ResquestEntities(T[] __ENTITIES) {
		super();
		this.__ENTITIES = __ENTITIES;
	}

	public T[] getEntities() {
		return __ENTITIES;
	}
	
}