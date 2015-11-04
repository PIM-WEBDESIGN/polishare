
function getDataFromUI(key,dataType)
{
	var id = key;
	var data = {};
	var multiValueErrorMsg="",singleValueErrorMsg="",nestedMultiValueErrorMsg="",nestedSingleValueErrorMsg="",emptyFiledErr="";
	if(dataType == "nested"){
		data = getNestedJSONData(id);
		emptyFiledErr = checkBlankFieldValidationOFNestedData(id,data);
		if(emptyFiledErr == "")
		{
			if(nestedJSON[id]["multiValueValidation"])
			{
				nestedMultiValueErrorMsg = checkMultiValueValidationForNestedKey(id,data);			
			}
			if(nestedJSON[id]["singleValueValidation"])
			{
				
				nestedSingleValueErrorMsg = checkSingleValueValidationForNestedKey(id,data);		
			}
		}	
	}
	else{
		data = getSimpleJSONData(id);
		emptyFiledErr = checkBlankFieldValidationOFSimpleData(id,data);
		if(emptyFiledErr == "")
		{
			if(simpleJSON[id]["multiValueValidation"])
			{
				multiValueErrorMsg = checkMultiValueValidation(id,data);			
			}
			if(simpleJSON[id]["singleValueValidation"])
			{
				singleValueErrorMsg = checkSingleValueValidation(id,data);		
			}
		}	
	}	


	if(emptyFiledErr != "")
	{
		alert(emptyFiledErr);
		return "error";
	}
	else if(multiValueErrorMsg != "" || singleValueErrorMsg!= "")
	{
		alert(multiValueErrorMsg+" " +singleValueErrorMsg);
		return "error";
	}
	else if(nestedMultiValueErrorMsg != "" || nestedSingleValueErrorMsg!= "")
	{
		alert(nestedMultiValueErrorMsg + " "+ nestedSingleValueErrorMsg);
		return "error";
	}
	
	var errMsg = ""
	return errMsg;
}

function getNestedJSONData(id){
		var data = {};
		for(key in nestedJSON[id])
		{	
				if(key == "multiValueValidation" || key =="nestedDataKey" || key=="singleValueValidation")
				{
					break;
				}
	
				if(nestedJSON[id][key][1]=="array")
				{
					var arr = [];
					arr= $("#"+key.replace(/ /g,'')).val();
					arr = arr.split(",");
					if(nestedJSON[id][key][2]!="string")
					{
						for(var i = 0 ; i < arr.length;i++)
						{
							arr[i] = Number(arr[i]);
						}
					}
					data[key]  = arr;
				}
				else
				{
					var str;
					str= $("#"+key.replace(/ /g,'')).val();
					if(nestedJSON[id][key][2]!="string"){
						data[key]  = Number(str);
					}
					else
					{
						data[key]  = str;
					}	
				}
		}
		var yAxisDataArray = [];
		var obj =  {};	
		for(var i=0;i<NoOfDynamicRow;i++)
		{
			obj =  {};
			for(var nestedKey in nestedJSON[id]["nestedDataKey"]) 
			{
				
				var json = nestedJSON[id]["nestedDataKey"];
				if(json[nestedKey][1]=="array")
				{
					var arr = [];
					arr= $("#"+(nestedKey+i).replace(/ /g,'')).val();
					arr = arr.split(",");
					if(json[nestedKey][2]!="string")
					{
						for(var j = 0 ; j < arr.length;j++)
						{
							arr[j] = Number(arr[j]);
						}
					}
					
					obj[nestedKey] = arr;
				}
				else
				{
					var str;
					str= $("#"+(nestedKey+i).replace(/ /g,'')).val();
					if(json[nestedKey][2] != "string"){
					
						obj[nestedKey] = Number(str);
					}
					else{
					
						obj[nestedKey] = str;
					}
				}
			}
			
			
			
			yAxisDataArray.push(obj);
		
		}
			data["nestedData"] = yAxisDataArray;
			return data;
}

function getSimpleJSONData(id){
		var data = {};
		for(key in simpleJSON[id])
		{
			if(key == "multiValueValidation" || key=="singleValueValidation")
			{
					break;
			}
			if(simpleJSON[id][key][1]=="array")
			{
				var arr = [];
				arr= $("#"+key.replace(/ /g,'')).val();
				arr = arr.split(",");
				if(simpleJSON[id][key][2]!="string")
				{
					for(var i = 0 ; i < arr.length;i++)
					{
						arr[i] = Number(arr[i]);
					}
				}
				data[key]  = arr;
			}
			else
			{
				var str;
				str= $("#"+key.replace(/ /g,'')).val();
				if(simpleJSON[id][key][2]!="string"){
					data[key]  = Number(str);
				}
				else
				{
					data[key]  = str;
				}	
			}
		}
		return data;
}
