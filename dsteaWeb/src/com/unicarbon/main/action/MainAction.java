package com.unicarbon.main.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import com.unicarbon.enums.ActionMapping;
import com.unicarbon.enums.ResultMapping;

@Results({@Result(type="tiles",name=ResultMapping.MAIN,location=ResultMapping.MAIN1),
})
public class MainAction {
	
	@Action(value=ActionMapping.MAIN)
	public String createDinary(){
		return ResultMapping.MAIN;
	}
}
