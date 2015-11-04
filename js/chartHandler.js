  $(document).on('click', "#makeChart" , function() 
   {
		
		var id = $(this).attr("value");
	//	alert(id);
		$('.btn-strip-container').show();
		$('#chartScreenList').show();
		$('.presenation-module').show();
		var li = $(".progressContainor").find(".progress-bar");
		li.css('width', 60 + '%');
		var imageBlue = $(".progressContainor").find("li");
		$((imageBlue)[2]).addClass("completed");
		$((imageBlue)[3]).addClass("current");
		
		var dataType = $(this).attr("dataType");
		var data = {};
		if(dataType == "nested"){
			data = getNestedJSONData(id);
		}
		else{
			data = getSimpleJSONData(id);
		}
		
		data["fontFamily"] = $("#selectedFontFamily").val();
		
		drawD3Chart(id,data);
		//$("#chartArea").append("<br><br><button value ="+id+" id='nextToDownload'> Next </button>");
	//	$("#chartArea").append("<br><div class='form-group'> <label for='disabledSelect'  class='col-sm-2  col-md-2'> </label><div class='col-sm-10 col-md-5 text-right'><button  id='nextBtnToDownload' value="+id+" class='btn btn-submit' > Next </button></div></div>");
		
		$("#editor").show();
		 
	
	
   });
   
   
   function drawD3Chart(id,data)
   {
		$(".page").hide();
		$("#downloadChart").hide();
		$("#backToEditor").hide();
		$("#selectedImageType").hide();
		$("#tweeterShare").hide();
		var container = $("#chartArea");
		$(container).empty();
		$("#chartArea").show();
		$("#editerTab").addClass("done");
		if(id=="donutChart")
		{
			drawDountChart("chartArea",data);
		}
		else if(id=="pieChart")
		{		
			var svgElement = drawPieChart("chartArea",data);
			editor(svgElement);
		}
		else if(id=="barChart")
		{
			var svgElement = drawBarChart("chartArea",data);
			editor(svgElement);
		}
		else if(id=="comparisonChart")
		{
			var svgElement = drawComparisonChart("chartArea",data);
			editor(svgElement);
		}
		else if(id=="threeDPieChart")
		{
			var svgElement = draw3DPieChart("chartArea",data);
			editor(svgElement);
		}
		else if(id=="threeDDountChart")
		{
			var svgElement = draw3DDountChart("chartArea",data);
			editor(svgElement);
		}
		else if(id=="funnelChart")
		{
			var svgElement = draw3DFunnelChart("chartArea",data);
			editor(svgElement);
		}
		else if(id == "threeDBarChart")
		{
			var svgElement = draw3DBarChart("chartArea",data);
			editor(svgElement);
		}
		else if(id=="threeDComparisonChart")
		{
			var svgElement = draw3DComparisonChart("chartArea",data);
			editor(svgElement);
		}
		else if(id=="threeDPyramidSliceChart")
		{
			var config={"data":data["Pyramid Data"],"colorArray":data["Color"],"labels":data["Pyramid Key"],"unit":data["Unit"]};
			var svgElement = draw3DPyramidSliceChart("chartArea",config,data);
			editor(svgElement);
		}
		else if(id == "basicLineChart")
		{
			var svgElement = drawBasicLineChart("chartArea",data);
			editor(svgElement);
		}
		else if(id == "roundedThreeDBarChart")
		{
			var svgElement = drawRoundedBarChart("chartArea",data);
			editor(svgElement);
		}
		else if(id == "multiAxisChart")
		{
			var svgElement = drawMultiAxisChart("chartArea",data);
			editor(svgElement);
		}
		else if(id == "threeDStackBar")
		{
			var options ={};
			options["Title"] = data["Title"];
			options["X Label"] = data["X Label"];
			options["Y Label"] = data["Y Label"];
			var svgElement = drawThreeDStackedBarChart("chartArea",data["nestedData"],options,data["X AxisData"],data["fontFamily"]);
			editor(svgElement);
		}
		else if(id == "bulletBarChart")
		{
			var svgElement = drawBulletBarChart("chartArea",data);
			editor(svgElement);
		}		
   }
	
    $(document).on('click',".row #downloadChart",function(){
		downloadImage();
   });   
  
    $(document).on('click',".row #tweeterShare",function(){
		copyChartToCanvas("chartArea","canvasContainer",function(imageData){
			postImage(imageData);
		});	
		//copyChartToCanvas("chartArea","canvasContainer")		
   });   

  
	function downloadImage()
	{
		var imageType = $("#selectedImageType").val();
		copyChartToCanvas("chartArea","canvasContainer",function(imageData){
		
			
				//Initialize file format you want csv or xls
		   var uri = imageData;
		   var fileName = "chart";
		   console.log("url "+uri);
		   // Now the little tricky part.
		   // you can use either>> window.open(uri);
		   // but this will not work in some browsers
		   // or you will not get the correct file extension    
		  // alert(imageData);
		   //this trick will generate a temp <a /> tag
		   var link = document.createElement("a");    
		   link.href = uri;
		   
		   //set the visibility hidden so it will not effect on your web-layout
		  link.style = "visibility:hidden";
		   link.download = fileName+"."+imageType;
		   
		   //this part will append the anchor tag and remove it after automatic click
		   document.body.appendChild(link);
		   link.click();
		   document.body.removeChild(link);
		   $("#canvasContainer").hide();

		});
	

	}

