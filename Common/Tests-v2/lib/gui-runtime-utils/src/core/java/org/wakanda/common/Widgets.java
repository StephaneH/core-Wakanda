/**
 * @author AnasBihi
 */
package org.wakanda.common;

/**
 * @author AnasBihi
 */
public enum Widgets {
    textInput("Text Input","textField"),
    button("Button","button"),
    checkbox("Checkbox","checkbox"),
    image("Image","image"),
    slider("Slider","slider"),
    container("Container","container");
    
    private String name;
    private String desc;
    
    /**
     * @param name
     * @param desc
     */
    private Widgets(String name, String desc) {
	this.name = name;
	this.desc = desc;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the desc
     */
    public String getDesc() {
        return desc;
    }

    /**
     * @param desc the desc to set
     */
    public void setDesc(String desc) {
        this.desc = desc;
    }
}

