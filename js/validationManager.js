
 function checkBlankFieldValidationOFSimpleData(id,data)
 {
	var errMsg = "";
	for(var key in simpleJSON[id])
	{
		if(key == "multiValueValidation" || key=="singleValueValidation")
		{
			return errMsg;
		}
		if(data[key] == "")
		{
			errMsg = "Pls Enter "+key+ " Field"; 
			return errMsg;
		}
		if(simpleJSON[id][key][2] == "int")
		{
			if(simpleJSON[id][key][1] == "string")
			{
				if(isNaN(data[key]))
				{
					return "Pls Enter integer value in "+key+ " Field";
				}
			}
			else
			{
				for(var i = 0; i<data[key].length ; i++)
				{
					if(isNaN(data[key][i]))
					{
						return "Pls Enter integer value in "+key+ " Field";
					}
				}
			}
		}
	}
	return errMsg;
 }

 function checkBlankFieldValidationOFNestedData(id,data)
 {
	var errMsg = ""
	for(var key in nestedJSON[id])
	{
		if(key == "multiValueValidation" || key=="singleValueValidation")
		{
			return errMsg;
		}
		if(key =="nestedDataKey")
		{
			for(var label in nestedJSON[id]["nestedDataKey"])
			{
					for(var i = 0 ;i<data["nestedData"].length ; i++)
					{
						if(data["nestedData"][i][label] == "")// || (isNaN(data["nestedData"][i][label]) && nestedJSON[id][key][label][2]=="int"))
						{
							errMsg = "Pls Enter "+label+ " Field"; 
							return errMsg;
						}
					}
			}
			for(var label in nestedJSON[id]["nestedDataKey"])
			{
				for(var i = 0 ;i<data["nestedData"].length ; i++)
				{
					if(nestedJSON[id]["nestedDataKey"][label][2] == "int")
					{
						if(nestedJSON[id]["nestedDataKey"][label][1] == "string")
						{
							if(isNaN(data["nestedData"][i][label]))
							{
								return "Pls Enter integer value in "+label+ " Field";
							}
						}
						else
						{
							for(var j = 0; j<data["nestedData"][i][label].length ; j++)
							{
								if(isNaN(data["nestedData"][i][label][j]))
								{
									return "Pls Enter integer value in "+label+ " Field";
								}
							}
						}
					}
				}
			}
			
		}
		if(data[key] == "")
		{
			errMsg = "Pls Enter "+key+ " Field"; 
			return errMsg;
		}		
		if(nestedJSON[id][key][2] == "int")
		{
			if(nestedJSON[id][key][1] == "string")
			{
				if(isNaN(data[key]))
				{
					return "Pls Enter integer value in "+key+ " Field";
				}
			}
			else
			{
				for(var i = 0; i<data[key].length ; i++)
				{
					if(isNaN(data[key][i]))
					{
						return "Pls Enter integer value in "+key+ " Field";
					}
				}
			}
		}
	}
	return errMsg;
 }
 function checkMultiValueValidation(id,data)
   {
		var validatorArray = simpleJSON[id]["multiValueValidation"];
		var lengthOfFieldValue1 = data[validatorArray[0]].length;
		var lengthOfFieldValue2;
		var errorMsg = "";
		for(var counter = 1 ;counter<validatorArray.length ; counter++)
		{
			lengthOfFieldValue2 = data[validatorArray[counter]].length;
			if(lengthOfFieldValue2 != lengthOfFieldValue1)
			{
				errorMsg = "Length of "+ validatorArray +" Field's Must be Same.";
				return errorMsg;
			}
		}
		return errorMsg;
		
   }
   
   function checkSingleValueValidation(id,data)
   {
	
		var validatorArray = simpleJSON[id]["singleValueValidation"];
		var lengthOfFieldValue;
		var errorMsg = "";
		for(var counter = 0 ;counter<validatorArray.length ; counter++)
		{
			lengthOfFieldValue = data[validatorArray[counter]];
			var arr = lengthOfFieldValue.split(",");
			if(arr.length>1)
			{
				errorMsg = validatorArray[counter] +" Field is Must be single value.";
				return errorMsg;
			}
		}
		return errorMsg;
		
   }
   function checkSingleValueValidationForNestedKey(id,data)
   {
	
		var validatorArray = nestedJSON[id]["singleValueValidation"];
		var lengthOfFieldValue;
		var errorMsg = "";
		for(var counter = 0 ;counter<validatorArray.length ; counter++)
		{
			if(nestedJSON[id][validatorArray[counter]])
			{
				lengthOfFieldValue = data[validatorArray[counter]];
				var arr = lengthOfFieldValue.split(",");
				if(arr.length>1)
				{
					errorMsg = validatorArray[counter] +" Field is Must be single value.";
					return errorMsg;
				}
			}
			else
			{
				for(var j = 0 ;j<data["nestedData"].length ; j++)
				{
					lengthOfFieldValue = data["nestedData"][j][validatorArray[counter]];
					if(isNaN(lengthOfFieldValue))
					{
						var arr = lengthOfFieldValue.split(",");
						if(arr.length>1)
						{
							errorMsg = validatorArray[counter] +" Field is Must be single value.";
							return errorMsg;
						}
					}	
				}
			}
		}
		return errorMsg;
		
   }
   function checkMultiValueValidationForNestedKey(id,data)
   {
		var validatorArray = nestedJSON[id]["multiValueValidation"];
	//	if(nestedJSON[id][validatorArray[0]])
		var lengthOfFieldValue1 = data[validatorArray[0]].length;
		var lengthOfFieldValue2;
		var errorMsg = "";
		for(var counter = 1 ;counter<validatorArray.length ; counter++)
		{
			if(nestedJSON[id][validatorArray[counter]])
			{
				lengthOfFieldValue2 = data[validatorArray[counter]].length;
				if(lengthOfFieldValue2 != lengthOfFieldValue1)
				{
					errorMsg = "Length of "+ validatorArray +" Field's Must be Same.";
					return errorMsg;
				}
			}
			else
			{
				for(var j = 0 ;j<data["nestedData"].length ; j++)
				{		
					lengthOfFieldValue2 = data["nestedData"][j][validatorArray[counter]].length;
					if(lengthOfFieldValue2 != lengthOfFieldValue1)
					{
						errorMsg = "Length of "+ validatorArray +" Field's Must be Same.";
						return errorMsg;
					}
				}
			}
		}
		return errorMsg;
		
   }
   



   