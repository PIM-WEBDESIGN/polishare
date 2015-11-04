
function to_json(workbook){
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var rObjArr = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if(rObjArr.length > 0){
      result[sheetName] = rObjArr;
    }
  });
  return result;
};


function to_csv(workbook) {
  var result = [];
  var i =0;	 
  workbook.SheetNames.forEach(function(sheetName) {
    var rObjArr = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    if(rObjArr.length > 0){
		result.push(rObjArr);
	}
  });
  return result;
};

function process_xlsx(xlsx){
    var jsonData = "";
	var csvData = "";
    jsonData = to_json(xlsx);
	//console.log(jsonData);	
	output = JSON.stringify(to_json(xlsx), 2, 2);
//	console.log(output);	
	csvData = to_csv(xlsx);
//	console.log("csvData : " + csvData);
//	console.log("jsonData : "+ jsonData);
	renderData2DataCollector(jsonData,csvData);
};

function handleFiles(e) {
  
  alert('File Uploaded');
  var files = e;
  var i,f;
 
   var f= files[0];
	{
	var reader = new FileReader();
    var name = f.name;
	//console.log("name	" + name);
    reader.onload = function(e) {
     // console.log(" e : " + e);
	  var data = e.target.result;
	 // console.log("data	: " + (data));
      //var xlsx = XLSX.read(data, {type: 'binary'});
      var arr = String.fromCharCode.apply(null, new Uint8Array(data));
      var xlsx = XLSX.read(btoa(arr), {type: 'base64'});
      process_xlsx(xlsx);
    };
    //reader.readAsBinaryString(f);
     reader.readAsArrayBuffer(f);
  }
  
};

function renderData2DataCollector(jsonData,csvData){
	console.log(chartName);
	var sheetsCount = xlsx2Json[chartName]["sheets"];
	//console.log(csvData[0].split('\n'));
	//console.log(sheetsCount);
	
	if(sheetsCount == 1){
		var key  = Object.keys(jsonData)[0];
		var csv = csvData[0].split('\n');
		csv 	= csv[0].split(',');  
		console.log(csv);
		var key0 =csv[0];
		
		if(key0 == "" || key0 === undefined){
			console.log("COLUMN 1 key not defined");
			key0 = "undefined";
		}
		
		var key1 =csv[1];
		if(key1 == "" || key1 === undefined){
			console.log("COLUMN 2 key not defined");
			key1 = "undefined";
		}
		
		var key2 =csv[2];	
		if(key2 == "" || key2 === undefined){
			console.log("COLUMN 3 key not defined");
			key2 = "undefined";
		}
		
		var xData = "";
		var yData = "";
		var color = "";
		var flag = 0;
		for(var i=0; i!= jsonData[key].length ; i++){
				
				///// column 1
				if(jsonData[key][i][key0] == "" || jsonData[key][i][key0] === undefined){
					console.log("ROW[ "+ (i+2) + " ]Column[1] data Insufficient");
					flag = 1; 
				}
				else if(!isNaN(jsonData[key][i][key0])){
					console.log("ROW[ "+ (i+2) + " ] Column[1] data Insufficient STRING IS REQUIRED");
					flag = 1;	
				}
				else{
					xData +=  jsonData[key][i][key0] + ",";
				}
				
				/////// column 2
				if(jsonData[key][i][key1] == "" || jsonData[key][i][key1] === undefined){
					console.log("ROW[ "+ (i+2) + " ] Column[2] data Insufficient");
					flag = 1 ;
				}				
				else if(isNaN(jsonData[key][i][key1])){
					console.log("ROW[ "+ (i+2) + " ] Column[1] data Insufficient INTEGER IS REQUIRED");
					flag = 1 ;					
				}
				else{
					yData +=  jsonData[key][i][key1] + ",";
				}
				
				/////// column3
				if(jsonData[key][i][key2] == "" || jsonData[key][i][key2] === undefined){
					console.log("ROW[ "+ (i+2) + " ]Column[1] data Insufficient");
					//	flag = 1; 
				}
				else if(!isNaN(jsonData[key][i][key2])){
					console.log("ROW[ "+ (i+2) + " ] Column[1] data Insufficient STRING IS REQUIRED");
					//flag = 1;	
				}
				else{
					color +=  jsonData[key][i][key2] + ",";
				}
				
				
		}
		xData = xData.substr(0,xData.length-1);
		yData = yData.substr(0,yData.length-1);
		color = color.substr(0,color.length-1);
		console.log(xData);
		console.log(yData);
		console.log(color);
		var xId 		= xlsx2Json[chartName]["xData"];
		var yId 		= xlsx2Json[chartName]["yData"];
		var colorId 	= xlsx2Json[chartName]["color"];
		if(flag == 1){
		
		}
		else{
			$(xId).val(xData);
			$(yId).val(yData);
			if(color.length < 1){
				$(colorId).val("red");		
			}
			else{
				$(colorId).val(color);	
			}
			
			
		}
		//console.log("file value : "  + $('#fileSelect').val());
		$('#fileSelect').val("");
		//console.log("file value : "  + $('#fileSelect').val());
		
	}
	else if(sheetsCount == 2){
		var yd = [],y=[];
		for(var j = 0 ; j!=sheetsCount ; j++){
		
			var key  = Object.keys(jsonData)[j];
			console.log(key);
			console.log(csvData[j]);
			var csv = csvData[j].split('\n');
			console.log(csv);
			csv 	= csv[0].split(',');  
			console.log(csv);
			
			var key0 =csv[0];
			if(key0 == "" || key0 === undefined){
				console.log("COLUMN 1 key not defined");
				key0 = "undefined";
			}
			
			var key1 =csv[1];
			if(key1 == "" || key1 === undefined){
				console.log("COLUMN 2 key not defined");
				key1 = "undefined";
			}
			
			var key2 =csv[2];	
			if(key2 == "" || key2 === undefined){
				console.log("COLUMN 3 key not defined");
				key2 = "undefined";
			}
			
			var xData = "";
			var yData = "";
			var color = "";
			
			var flag = 0;
			for(var i=0; i!= jsonData[key].length ; i++){
					
					///// column 1
					if(jsonData[key][i][key0] == "" || jsonData[key][i][key0] === undefined){
						console.log(jsonData["MAR"][i][key0]);
						console.log("SheetName " + key + " ROW[ "+ (i+2) + " ]Column[1] data Insufficient");
						flag = 1; 
					}
					else if(!isNaN(jsonData[key][i][key0])){
						console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[1] data Insufficient STRING IS REQUIRED");
						flag = 1;	
					}
					else{
						xData +=  jsonData[key][i][key0] + ",";
					}
					
					/////// column 2
					if(jsonData[key][i][key1] == "" || jsonData[key][i][key1] === undefined){
						console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[2] data Insufficient");
						flag = 1 ;
					}				
					else if(isNaN(jsonData[key][i][key1])){
						console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[1] data Insufficient INTEGER IS REQUIRED");
						flag = 1 ;					
					}
					else{
						yData +=  jsonData[key][i][key1] + ",";
					}
					
					/////// column3
					if(jsonData[key][i][key2] == "" || jsonData[key][i][key2] === undefined){
						console.log("SheetName " + key + " ROW[ "+ (i+2) + " ]Column[1] data Insufficient");
						//flag = 1; 
					}
					else if(!isNaN(jsonData[key][i][key2])){
						console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[1] data Insufficient STRING IS REQUIRED");
						//flag = 1;	
					}
					else{
						color +=  jsonData[key][i][key2] + ",";
					}
			}
			xData = xData.substr(0,xData.length-1);
			yData = yData.substr(0,yData.length-1);
			color = color.substr(0,color.length-1);	
			yd.push(yData);
			console.log(xData);
			console.log(yData);
			console.log(color);

			var xId 		= xlsx2Json[chartName]["xData"];
			y.push(xlsx2Json[chartName]["y"+j+"Data"]);
			var colorId 	= xlsx2Json[chartName]["color"];
			
		}
		if(flag == 1){
				
			}
		else{
				$(xId).val(xData);
				$(y[0]).val(yd[0]);
				$(y[1]).val(yd[1]);
				$(colorId).val(color);	
		}
	}
	else{
		//if(chartName == "multiAxisChart"){
				var yd = [],y=[],name=[];
				for(var j = 0 ; j!=sheetsCount ; j++){
				
					var key  = Object.keys(jsonData)[j];
					console.log(key);
					console.log(csvData[j]);
					var csv = csvData[j].split('\n');
					console.log(csv);
					csv 	= csv[0].split(',');  
					console.log(csv);
					
					var key0 =csv[0];
					if(key0 == "" || key0 === undefined){
						console.log("COLUMN 1 key not defined");
						key0 = "undefined";
					}
					
					var key1 =csv[1];
					if(key1 == "" || key1 === undefined){
						console.log("COLUMN 2 key not defined");
						key1 = "undefined";
					}
					
					var key2 =csv[2];	
					if(key2 == "" || key2 === undefined){
						console.log("COLUMN 3 key not defined");
						key2 = "undefined";
					}
					
					var xData = "";
					var yData = "";
					var color = "";
					
					var flag = 0;
					for(var i=0; i!= jsonData[key].length ; i++){
							
							///// column 1
							if(jsonData[key][i][key0] == "" || jsonData[key][i][key0] === undefined){
								console.log(jsonData["MAR"][i][key0]);
								console.log("SheetName " + key + " ROW[ "+ (i+2) + " ]Column[1] data Insufficient");
								flag = 1; 
							}
							else if(!isNaN(jsonData[key][i][key0])){
								console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[1] data Insufficient STRING IS REQUIRED");
								flag = 1;	
							}
							else{
								xData +=  jsonData[key][i][key0] + ",";
							}
							
							/////// column 2
							if(jsonData[key][i][key1] == "" || jsonData[key][i][key1] === undefined){
								console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[2] data Insufficient");
								flag = 1 ;
							}				
							else if(isNaN(jsonData[key][i][key1])){
								console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[1] data Insufficient INTEGER IS REQUIRED");
								flag = 1 ;					
							}
							else{
								yData +=  jsonData[key][i][key1] + ",";
							}
							
							/////// column3
							if(jsonData[key][i][key2] == "" || jsonData[key][i][key2] === undefined){
								console.log("SheetName " + key + " ROW[ "+ (i+2) + " ]Column[1] data Insufficient");
								//flag = 1; 
							}
							else if(!isNaN(jsonData[key][i][key2])){
								console.log("SheetName " + key + " ROW[ "+ (i+2) + " ] Column[1] data Insufficient STRING IS REQUIRED");
								//flag = 1;	
							}
							else{
								color +=  jsonData[key][i][key2] + ",";
							}
					}
					xData = xData.substr(0,xData.length-1);
					yData = yData.substr(0,yData.length-1);
					color = color.substr(0,color.length-1);	
					yd.push(yData);
					console.log(xData);
					console.log(yData);
					console.log(color);

					var xId 		= xlsx2Json[chartName]["xData"];
					y.push(xlsx2Json[chartName]["Data"] + j);
					var colorId 	= xlsx2Json[chartName]["color"];
					var nameId =  xlsx2Json[chartName]["Name"];
					name.push(key);
				}
				if(flag == 1){
						
					}
				else{
						$(xId).val(xData);
						for (k=0;k<y.length;k++){
							
							drawMultipleField(chartName,k);
							
							$(nameId+k).val(name[k]);
							$(y[k]).val(yd[k]);				
							console.log(y[k]);
							$(colorId+k).val(color);
						}
						console.log("file value : "  + $('#fileSelect').val());
				}
		//}
		/*
		else if(chartName == "threeDStackBar"){
			
		}
		else{
			
		}*/
	}
	$('#fileSelect').val("");

}

function drawMultipleField(key,indexOfLine)
	{
			
			$("#textFieldContainer").append('<div class="row"></div>');
			for(var label in nestedJSON[key]["nestedDataKey"])
			{
				var textFieldID = label+""+indexOfLine;
				var template ="";
				if(nestedJSON[key]["nestedDataKey"][label][3] !="colorTag")
				{
/*					template = '<div class=" col-md-2">'+
									'<label for="disabledSelect"  class="control-label"> '+label+' </label>'+
										'<input class="form-control" type="text"  id='+textFieldID.replace(/ /g,'')+' placeholder='+nestedJSON[key]["nestedDataKey"][label][0]+'></input>'+
								'</div>'*/
					template = "<div class='form-group  col-sm-3 col-md-3'>"+
									"<div class='row'>"+
										"<div class='col-md-12 col-sm-12'>"+
											"<label class='control-label'>"+label+"</label>"+
											"<input class='form-control' id="+textFieldID.replace(/ /g,'')+" type='text' placeholder="+nestedJSON[key]["nestedDataKey"][label][0]+"></input>"+
										"</div>"+
									"</div>"+
							   "</div>";				
				}	
				else
				{
					template =   "<div class='form-group  col-sm-3 col-md-3'>"+
									"<div class='row'>"+
										"<div class='col-md-12 col-sm-12'>"+
											"<label class='control-label'>"+label+"</label>"+
											"<label><input type='color' value='#51ac6f' style='height:0px; width:0px;margin-left:7px' class='background-color'><img id = 'colorPickerIcon' src='img/colorpicker.png' alt='img' style='margin-left:-7px' > </label>"+
											"<input class='form-control' id="+textFieldID.replace(/ /g,'')+" type='text'   placeholder="+nestedJSON[key]["nestedDataKey"][label][0]+"></input>"+
										"</div>"+
									"</div>"+
								"</div>";
				}
				$("#textFieldContainer").append(template);				
			}
			$("#textFieldContainer").append('<div class="row"></div>');
	//		$("#textFieldContainer").append("<br>");
	}
		
/**
	
	 //  result.push("SHEET: " + sheetName);
    //  result.push("");
	  var tempSplit = rObjArr.split('\n');
	  //tempSplit = tempSplit.split('\n');
      result["s" + i] = {
	                 "c1" : tempSplit[0],
					 "c2" : tempSplit[1],		
					 "c3" : tempSplit[2]
		}
	//  result.push(rObjArr);
	  console.log(tempSplit);
		
	}
	i++;
	  

*/