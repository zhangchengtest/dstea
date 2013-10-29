package com.unicarbon.enums;

public enum Account {
	TOTAL_ALL("total_money");
	private String name;
	private Account(String name){
		this.name=name;
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
	
}
