/**
 * 
 */
package org.wakanda.qa.commons.server.rest;


public class Model {

	private boolean toJSON;
	private Model.DataClass[] dataClasses;

	public boolean isToJSON() {
		return toJSON;
	}

	public Model.DataClass[] getDataClasses() {
		return dataClasses;
	}

	public static class Attribute {

		private String name;
		private String kind;
		private String scope;
		private boolean unique;
		private boolean autosequence;
		private String type;
		private boolean primKey;

		public String getName() {
			return name;
		}

		public String getKind() {
			return kind;
		}

		public boolean isUnique() {
			return unique;
		}

		public String getScope() {
			return scope;
		}

		public boolean isAutosequence() {
			return autosequence;
		}

		public String getType() {
			return type;
		}

		public boolean isPrimKey() {
			return primKey;
		}
	}

	public static class Method {

		private String name;
		private String applyTo;
		private String scope;
		private String from;

		public String getName() {
			return name;
		}

		public String getApplyTo() {
			return applyTo;
		}

		public String getScope() {
			return scope;
		}

		public String getFrom() {
			return from;
		}
	}

	public static class DataClass {

		private String name;
		private String className;
		private String collectionName;
		private String scope;
		private Model.Attribute[] attributes;
		private Model.Method[] methods;

		public Model.Attribute[] getAttributes() {
			return attributes;
		}

		public Model.Method[] getMethods() {
			return methods;
		}

		public String getName() {
			return name;
		}

		public String getClassName() {
			return className;
		}

		public String getCollectionName() {
			return collectionName;
		}

		public String getScope() {
			return scope;
		}
	}

}