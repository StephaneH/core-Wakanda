/**
 * 
 */
package org.wakanda.qa.server.utils.rest;

public class BasicEntity {

	private String __KEY;
	private String __STAMP;
	private String ID;

	public BasicEntity(String __KEY, String __STAMP, String ID) {
		this.__KEY = __KEY;
		this.__STAMP = __STAMP;
		this.ID = ID;
	}

	public BasicEntity(String ID) {
		this.__KEY = null;
		this.__STAMP = null;
		this.ID = ID;
	}

	public String getKey() {
		return __KEY;
	}

	public String getStamp() {
		return __STAMP;
	}

	public String getID() {
		return ID;
	}

	@Override
	public boolean equals(Object obj) {
		boolean b = false;
		if (obj instanceof BasicEntity) {
			BasicEntity vs = (BasicEntity) obj;
			b = getKey().equals(vs.getKey());
			b = b && getStamp().equals(vs.getStamp());
			b = b && getID().equals(vs.getID());
		}
		return b;

	}

}