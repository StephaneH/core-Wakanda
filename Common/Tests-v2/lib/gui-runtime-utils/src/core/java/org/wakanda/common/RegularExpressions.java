/**
 * @author Anas Bihi
 */
package org.wakanda.common;

/**
 * @author Anas Bihi
 */
public enum RegularExpressions {
    FLOAT_REGEX("([+-]?\\d*\\.\\d+)(?![-+0-9\\.])"),
    RGBA_FLOAT_REGEX("(rgba)(\\()(\\d+)(,)(\\s+)(\\d+)(,)(\\s+)(\\d+)(,)(\\s+)([+-]?\\d*\\.\\d+)(?![-+0-9\\.])(\\))(\\s+)(\\d+)(px)(\\s+)(\\d+)(px)(\\s+)(\\d+)(px)(\\s+)(\\d+)(px)"),
    RGBA_REGEX("(rgba)(\\()(\\d+)(,)( )(\\d+)(,)( )(\\d+)(,)(\\s+)(\\d+)(\\))(\\s+)(\\d+)(px)( )(\\d+)(px)( )(\\d+)(px)( )(\\d+)(px)"),
    GENERIC_RGBA_REGEX("(rgba)(\\()(\\d+)(,)(\\s+)(\\d+)(,)(\\s+)(\\d+)(,)(\\s+)(\\d+|[+-]?\\d*\\.\\d+)(?![-+0-9\\.])(\\))(\\s+)(\\d+)(px)(\\s+)(\\d+)(px)(\\s+)(\\d+)(px)(\\s+)(\\d+)(px)");
    
    private String value;
    /**
     * @param value
     */
    private RegularExpressions(String value) {
	this.value = value;
    }
    /**
     * @return the value
     */
    public String getValue() {
	return value;
    }
    
    
}

