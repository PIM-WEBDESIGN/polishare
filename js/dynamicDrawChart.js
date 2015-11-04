
//var selectedChartId;
//var setColorFieldFlag;   
var NoOfDynamicRow=0;
var chartName = "";
var current = "0";
var completed = "-1";
var showPopUp = 0;
var svgArray = [];
var saveStateArray = [];
var count = -1;
var i = -1 ;
$(document).ready(function(){
	
	$(".page").hide();
	$(".progress-bar-list-outer").hide();
	$("#helpImportButtons").hide();
	$('.btn-strip-container').hide();
	
	$('#login').on('click',function(){
		
		$("#loginView").hide();
		var username = $('#username').val();	
		var password = $('#password').val();	
		i = 0;
		svgArray = [];
				
		if(username == "paxcel" && password == "paxcel"){
			$(".login-body-style").hide();
			$(".progress-bar-list-outer").show();
			$("#chartGridView").show();
			$('.presenation-module').hide();
			$("#startTour").show();
			var setInitDemoPhoto = 1;
			var indexOfLine = -1;
			var li = $(".progressContainor").find(".progress-bar");
			li.css('width', 0 + '%');
			var imageBlue = $(".progressContainor").find("li");
			$((imageBlue)[0]).addClass("current");
			
			$("#helpImportButtons").hide();
			$("#donutChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				console.log(chartName);
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});  
			$("#pieChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});  
			$("#threeDPieChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				console.log(chartName);
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});
			$("#threeDDountChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});
			$("#barChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});
			$("#threeDBarChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});  	
			$("#comparisonChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});
			$("#threeDComparisonChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});
			$("#funnelChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});
			
			$("#threeDPyramidSliceChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});	
			
			$("#basicLineChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});
			
			$("#roundedThreeDBarChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});	
			
			$("#multiAxisChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});	
			
			$("#threeDStackBar").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});		
			
			$("#bulletBarChart").click(function() 
			{
				var key = $(this).attr("value");
				chartName = key;
				var dataType = $(this).attr("dataType");
				genrateDataCollector(key,dataType);
			});		
			
			
			$('i').tooltip(); 
			
			
			
			$('#helpIcon').on('click',function(event){
				
				$('#showPopup').addClass('fade-popup');
				$('#showPopup').show();
				$('#helpImport').show();
				$('#helpImport').removeClass('topset');
				$('body').addClass('popup-open');
				
				
				$('#helpImport').find(".chart-img img").remove();
				console.log('help image button clicked');
				console.log(chartName);
				$('#myModalLabel').text(chartName);
				$('#helpImport').find(".chart-img").append('<img id="theImg" src="img/'+ chartName+"Help.jpg"+'"/>');
				
				
			});
			
			$('#showPopup').on('click',function(event){
				
				$('#showPopup').hide();
				$('#helpImport').addClass('topset');
				//	$('#helpImport').hide();
				$('body').removeClass('popup-open');
			});
			
			$("#helpCloseButton").on('click',function(){
				
				$('#helpImport').addClass('topset');
				$('#showPopup').hide();
				//  $('#helpImport').hide();
				
				$('body').removeClass('popup-open');
			});
			
			
			function genrateDataCollector(key,dataType)
			{
				$(".page").hide();
				var li = $(".progressContainor").find(".progress-bar");
				$(".progressContainor").addClass('add-width');
				li.css('width', 20 + '%');
				$('#chartScreenList').hide();
				var imageBlue = $(".progressContainor").find("li");
				$((imageBlue)[0]).addClass("completed");
				$((imageBlue)[1]).addClass("current");
				
				//$(li).attr("data-toggle");
				
				//li.attr('aria-valuenow', 60);
				
				//li.text(60 + '% Complete');
				/*
					for(i=0;i<5;i++){
					
					if( $($(".progressContainor").find("li")[i]).attr("data-value") == "60")
					{
					$($(".progressContainor").find("li")[i]).data("toggle");
					console.log($($(".progressContainor").find("li")[i]).data("toggle"));
					}	
					
					}
				*/
				$("#dataCollector").show();
				$("#startTour").hide();
				$("#dataCollectorTab").addClass("done");
				$("#chartHeading").show();
				$("#chartHeading").html(key);
				$('#helpImportButtons').show();
				indexOfLine = -1;
				if(dataType=="nested")
				{
					drawNestedDataFields(key);
				}
				else
				{
					drawSimpleDataFields(key);
				}	
			}
			
			function drawNestedDataFields(key){
				var container = $("#dataCollector");
				$(container).empty();
				for(nestedKey in nestedJSON[key])
				{
					
					if(nestedKey !="multiValueValidation" && nestedKey !="singleValueValidation" && nestedKey!="nestedDataKey")
					{
						var templateOfTextField="";
						if(nestedJSON[key][nestedKey][3] !="colorTag")
						{
							/*	templateOfTextField = "<br><div class='form-group'>"+
								"<label class='col-sm-3 col-md-2 control-label'>"+nestedKey+"</label>"+
								"<div class='col-sm-9 col-md-5'>"+
								"<input type='text' class='form-control' id="+nestedKey.replace(/ /g,'')+" placeholder="+nestedJSON[key][nestedKey][0]+"></input>"+
								"</div>"+
								"</div>";
							*/
							templateOfTextField = "<div class='form-group  col-sm-6 col-md-6'>"+
							"<div class='row'>"+
							"<div class='col-md-12 col-sm-12'>"+
							"<label class='control-label'>"+nestedKey+"</label>"+
							"<input class='form-control' id="+nestedKey.replace(/ /g,'')+" type='text' placeholder="+nestedJSON[key][nestedKey][0]+"></input>"+
							"</div>"+
							"</div>"+
							"</div>";												  
						}
						else
						{
							/*	templateOfTextField = "<br><div class='form-group'>"+
								"<label class='col-sm-3 col-md-2 col-lg-2 control-label'>"+nestedKey+"</label>"+
								"<div class='col-sm-6 col-md-5 col-lg-5 col-xs-9'>"+
								"<input type='text' class='form-control' id="+nestedKey.replace(/ /g,'')+" placeholder="+nestedJSON[key][nestedKey][0]+"></input>"+
								"</div>"+
								"<div class='col-sm-2 col-md-2 col-lg-1 col-xs-3'>"+
								"<input  class='form-control' type='color' value='#b59d4a' id='background-color' />"+
								"</div>"+
							"</div>";*/
							templateOfTextField =   "<div class='form-group  col-sm-6 col-md-6'>"+
							"<div class='row'>"+
							"<div class='col-md-12 col-sm-12'>"+
							"<label class='control-label'>"+nestedKey+"</label>"+
							"<label><input type='color' value='#51ac6f' style='height:0px; width:0px; opacity:0;' class='background-color'><img id = 'colorPickerIcon' src='img/colorpicker.png' alt='img' style='margin-left:-7px' > </label>"+
							"<input class='form-control' id="+nestedKey.replace(/ /g,'')+" type='text'   placeholder="+nestedJSON[key][nestedKey][0]+"></input>"+
							"</div>"+
							"</div>"+
							"</div>";											
							
							
							
						}
						$(container).append(templateOfTextField);
						//		$(container).append("<br>")
					}	
				}
				$(container).append('<div class="row"></div>');
				var temp = "<br><div class='form-group'>"+
				"<label class='col-sm-3 col-md-2 control-label'>Add Multiple Lines :</label>"+
				"<div class='col-sm-9 col-md-5'>"+
				"<button value ="+key+" id='multipleField' class='btn btn-submit'> ADD </button>"+
				"</div>"+
				"</div>";
				
				$(container).append(temp);
				$(container).append("<div id = 'textFieldContainer'> </div");
				$(container).append('<div class="row"></div><br>');
				var template = 	"<div class='form-group'>"+
				"<label for='disabledSelect'  > </label>"+
				"<div class='col-sm-12 col-md-11 text-right pull-left'>"+
				"<button value ="+key+" id='backTOHomePage' class='btn btn-submit' dataType='nested' > Back </button>"+
				"</div>"+
				"<div class='col-sm-12 col-md-1 text-right pull-right'>"+
				"<button value ="+key+" id='nextToThemeManager' class='btn btn-submit' dataType='nested' > Next </button>"+
				"</div>"+
				"</div>";
				$(container).append(template);				
				//	$(container).append("<br><div class='form-group'> <label for='disabledSelect'  class='col-sm-2  col-md-2'> </label><div class='col-sm-10 col-md-10 text-right'><button value ="+key+" id='nextToThemeManager' class='btn btn-submit' dataType='nested' > Next </button></div></div>");
				//	$(container).append("<div class='form-group'> <label for='disabledSelect'  class='col-sm-2  col-md-1'> </label><div class='col-sm-10 col-md-2 text-right'><button value ="+key+" id='backTOHomePage' class='btn btn-submit' dataType='nested' > Back </button></div></div>");
			}
			function drawSimpleDataFields(key){
				
				var container = $("#dataCollector");
				$(container).empty();
				
				for(nestedKey in simpleJSON[key])
				{
					if(nestedKey !="multiValueValidation" && nestedKey !="singleValueValidation")
					{
						var templateOfTextField="";
						if(simpleJSON[key][nestedKey][3] !="colorTag")
						{
							templateOfTextField = "<div class='form-group  col-sm-6 col-md-6'>"+
							"<div class='row'>"+
							"<div class='col-md-12 col-sm-12'>"+
							"<label class='control-label'>"+nestedKey+"</label>"+
							"<input class='form-control' id="+nestedKey.replace(/ /g,'')+" type='text' placeholder="+simpleJSON[key][nestedKey][0]+"></input>"+
							"</div>"+
							"</div>"+
							"</div>";		
						}
						else
						{
							templateOfTextField =   "<div class='form-group  col-sm-6 col-md-6'>"+
							"<div class='row'>"+
							"<div class='col-md-12 col-sm-12'>"+
							"<label class='control-label'>"+nestedKey+"</label>"+
							"<label><input type='color' value='#51ac6f' style='height:0px; width:0px; opacity:0' class='background-color'><img id = 'colorPickerIcon' src='img/colorpicker.png' alt='img' style='margin-left:-7px' > </label>"+
							"<input class='form-control' id="+nestedKey.replace(/ /g,'')+" type='text'   placeholder="+simpleJSON[key][nestedKey][0]+"></input>"+
							"</div>"+
							"</div>"+
							"</div>";											
							
							
						}
						$(container).append(templateOfTextField);								
						
						//	$(container).append("<br>");
					}	
				}
				$(container).append('<div class="row"></div><br>');
				var template = 	"<div class='form-group'>"+
				"<label for='disabledSelect' > </label>"+
				"<div class='col-sm-12 col-md-11 text-right pull-left'>"+
				"<button value ="+key+" id='backTOHomePage' class='btn btn-submit' dataType='simple' > Back </button>"+
				"</div>"+
				"<div class='col-sm-12 col-md-1 text-right pull-right'>"+
				"<button value ="+key+" id='nextToThemeManager' class='btn btn-submit' dataType='simple' > Next </button>"+
				"</div>"+
				"</div>";
				$(container).append(template);				
				//	$(container).append("<br><div class='form-group'> <label for='disabledSelect'  class='col-sm-2  col-md-1'> </label><div class='col-sm-10 col-md-2 text-right'><button value ="+key+" id='backTOHomePage' class='btn btn-submit' dataType='nested' > Back </button></div></div>");
				//	$(container).append("<div class='form-group'> <label for='disabledSelect'  class='col-sm-2  col-md-2'> </label><div class='col-sm-10 col-md-5 text-right'><button value ="+key+" id='nextToThemeManager' class='btn btn-submit' dataType='simple' > Next </button></div></div>");
				
				
				
			};
			
			
			
			$(document).on('change','.background-color',function()
			{   
				var temp = $(this).val();
				var colorArray = $(this).parent().next().val();
				
				if(colorArray == ""){
					colorArray = temp;
				}
				else{
					colorArray = colorArray + "," + temp;
				}
				$(this).parent().next().val(colorArray);
			});
			
			$(document).on('click','#multipleField',function(){
				indexOfLine++;
				NoOfDynamicRow = indexOfLine+1;
				var key = $(this).attr("value");
				drawMultipleField(key,indexOfLine);
				//	alert('okkk'+"    "+$(this).attr("value") + "     " +$("#"+nestedKey.replace(/ /g,'')).val());
				
			});
			
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
						"<label><input type='color' value='#51ac6f' style='height:0px; width:0px;opacity:0;' class='background-color'><img id = 'colorPickerIcon' src='img/colorpicker.png' alt='img' style='margin-left:-7px' > </label>"+
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
			
			
			
			$(document).on('click', "#nextToThemeManager" , function() 
			{
				var key = $(this).attr("value");	
				var dataType =$(this).attr("dataType");
				$('#chartScreenList').hide();
				var errMsg = "";
				errMsg = getDataFromUI(key,dataType);
				if(errMsg == "")
				{
					$("#themeManagerTab").addClass("done");
					$("#helpImportButtons").hide();
					var li = $(".progressContainor").find(".progress-bar");
					li.css('width', 40 + '%');
					var imageBlue = $(".progressContainor").find("li");
					$((imageBlue)[1]).addClass("completed");
					$((imageBlue)[2]).addClass("current");
					
					$(".page").hide();
					$("#themeManager").show();
					$("#themeManager").html("");
					$("#chartHeading").show();
					var template = "<div class='col-lg-12'>"+
					"<form class='form-horizontal' role='form'>"+
					"<div class='form-group'>"+
					"<label for='disabledSelect'  class='col-sm-33  col-md-2 control-label'> Choose Font Family : </label>"+
					"<div class='col-sm-9 col-md-5'>"+
					"<select id='selectedFontFamily' class='form-control'>"+
					"<option value='Open Sans'>Open Sans</option>"+
					"<option value='Roboto'>Roboto</option>"+
					"<option value='Calibri'>Calibri</option>"+
					"<option value='Arial'>Arial</option>"+
					"<option value='sans-serif'>sans-serif</option>"+
					"<option value='Slabo'>Slabo </option>"+
					"<option value='Lato'>Lato </option>"+
					"<option value='Oswald'>Oswald </option>"+
					"<option value='Lora'>Lora </option>"+
					"<option value='Roboto Condensed'>Roboto Condensed </option>"+
					"<option value='Raleway'>Raleway </option>"+
					"<option value='Montserrat'>Montserrat </option>"+
					"<option value='Merriweather'>Merriweather </option>"+
					"<option value='Arimo'>Arimo </option>"+
					"</select>"+
					"</div>"+
					"</div>"+
					"</form>"+
					"</div>";
					$("#themeManager").append(template);    
					$("#themeManager").append("<br><div class='form-group'> <label for='disabledSelect'  class='col-sm-2  col-md-2'> </label><div class='col-sm-10 col-md-1 text-right'><button value ="+key+" id='backToDataCollector' class='btn btn-submit' dataType="+dataType+" > Back </button></div></div>");
					$("#themeManager").append("<br><div class='form-group'> <label for='disabledSelect'  class='col-sm-2  col-md-2'> </label><div class='col-sm-10 col-md-2 text-right'><button value ="+key+" id='makeChart' class='btn btn-submit' dataType="+dataType+" > Make Chart </button></div></div>");
				}
			})
			
			$(document).on('click', "#backToDataCollector" , function() 
			{
				i = 0;
				svgArray = [];
				
				$(".page").hide();
				var li = $(".progressContainor").find(".progress-bar");
				li.css('width', 20 + '%');
				var imageBlue = $(".progressContainor").find("li");
				$((imageBlue)[1]).removeClass("completed");
				$((imageBlue)[1]).addClass("current");
				$((imageBlue)[2]).removeClass("current");
				
				
				$("#p1").trigger("click");
				$("#dataCollector").show();
				$("#startTour").hide();
				$('#chartScreenList').hide();
				$("#dataCollectorTab").addClass("done");
				$("#chartHeading").show();
				$("#chartHeading").html(chartName);
				$('#helpImportButtons').show();	
			})
			$(document).on('click', "#backTOHomePage" , function() 
			{
				
				i = 0;
				svgArray = [];
				$('.presenation-module').hide();
				$('.btn-strip-container').hide();
				$(".page").hide();
				$('#chartScreenList').hide();
				$(".progressContainor").removeClass('add-width');
				$("#chartGridView").show();
				var li = $(".progressContainor").find(".progress-bar");
				li.css('width', 0 + '%');
				var imageBlue = $(".progressContainor").find("li");
				$((imageBlue)).removeClass("completed");
				$((imageBlue)).removeClass("current");
				$((imageBlue)[0]).addClass("current");
				
				
				$("#helpImportButtons").hide();
				$(".tab").removeClass("done");
				$("#dataCollectorTab").removeClass("done");
				$('#startTour').show();
				
			})
			
			$("#showListButton").on('click',function(){
				$("ul.chart-screen-list").toggleClass("show-hide");
			}); 
			
			$('#saveState').on('click',function(event){
				//$("ul.chart-screen-list").niceScroll({cursorborder:"",cursorcolor:"grey"});
				event.preventDefault();
			
				
			
				++count;
				var name  =	 $('#saveStateName').val();
				var text  =  $('#saveStateDesc').val();
				var date  =   new Date();
				//var day   =  date.getDate();
				var time  = date.toLocaleTimeString();
				var dateString = date.toDateString();
				
				//	console.log(day  + " " + time  + " " + dateString);
				var template = '<li class="stateSvgList"><div class="row"><div class="col-xs-5 time-and-date"><span >' + time + 			
				'</span><span>'+ dateString +'</span></div> <div class="col-xs-7"><div class="heading" ><span >'+ name +'</span> </div><span class="content" >'+ text + 
				'</span></div></div></li>';
				
				
				$("ul.chart-screen-list").append(template);
				
				var svgHtml = $('#chartArea').html();
				
			//	var copyHtml = svgHtml;

				var json = {				
											"time" 		: time,	 
											"date": dateString,	
											"name"		: name,
											"text"		: text,
											"svg"		: svgHtml
				}				
				
				saveStateArray.push(json);
				console.log(saveStateArray);
			
			//	$('#saveImagePresenation').hide();
				$('#saveStateName').val("");
				$('#saveStateDesc').val("");
			});
			
			$(document).on('click','.stateSvgList',function(){
				
				console.log($(this));
				console.log($($(this).find('span')[0]).text());
				console.log($($(this).find('span')[1]).text());
				console.log($($(this).find('span')[2]).text());
				console.log($($(this).find('span')[3]).text());
				
			});
			
			$('#playPresentation').on('click',function(){
				i = -1 ;
				++i;
				$($('#chartSlides').find('#time')).text(saveStateArray[i]["time"]);
				$($('#chartSlides').find('#date')).text(saveStateArray[i]["date"]);
				$($('#chartSlides').find('#svgHeading')).text(saveStateArray[i]["name"]);
				$($('#chartSlides').find('#imageDiv')).html(saveStateArray[i]["svg"]);
				
				
				
			});
			
			$('#nextPresentation').on('click',function(){
				
				if(saveStateArray.length == i){
					
				}
				else{
					++i;
					$($('#chartSlides').find('#time')).text(saveStateArray[i]["time"]);
					$($('#chartSlides').find('#date')).text(saveStateArray[i]["date"]);
					$($('#chartSlides').find('#svgHeading')).text(saveStateArray[i]["name"]);
					$($('#chartSlides').find('#imageDiv')).html(saveStateArray[i]["svg"]);					
				}
				
			});
			
			$('#prevPresentation').on('click',function(){
				
				if( i == 0){
					
				}
				else{
					--i;
					$($('#chartSlides').find('#time')).text(saveStateArray[i]["time"]);
					$($('#chartSlides').find('#date')).text(saveStateArray[i]["date"]);
					$($('#chartSlides').find('#svgHeading')).text(saveStateArray[i]["name"]);
					$($('#chartSlides').find('#imageDiv')).html(saveStateArray[i]["svg"]);						
				}
			
				
			});
			
			
			
			$("#backToThemeManager").click(function() 
			{
				$(".page").hide();
				$('#chartScreenList').hide();
				$('.btn-strip-container').hide();
				$('.presenation-module').hide();
				var li = $(".progressContainor").find(".progress-bar");
				li.css('width', 40 + '%');
				var imageBlue = $(".progressContainor").find("li");
				$((imageBlue)[2]).removeClass("completed");
				$((imageBlue)[2]).addClass("current");
				$((imageBlue)[3]).removeClass("current");
				
				$("#p2").trigger("click");
				$("#themeManager").show();
				$("#helpImportButtons").hide();
				$("#chartHeading").show();
				$("#chartHeading").html(chartName);
				$("#editerTab").removeClass("done");
				
			})
			$("#nextBtnToDownload").click(function() 
			{
				$("#downloadManagerTab").addClass("done");
				$('.btn-strip-container').hide();
				$('#chartScreenList').hide();
				$('.presenation-module').hide();
				$("#helpImportButtons").hide();
				var li = $(".progressContainor").find(".progress-bar");
				li.css('width', 80 + '%');
				var imageBlue = $(".progressContainor").find("li");
				$((imageBlue)[3]).addClass("completed");
				$((imageBlue)[4]).addClass("current");
				
				$("#downloadChart").show();
				$("#p4").trigger("click");
				$("#backToEditor").show();
				$("#nextBtnToDownload").hide();
				$("#backToThemeManager").hide();
				$("#selectedImageType").show();
				$("#tweeterShare").show();
				$(".editorList").hide();
				
			});
			
			$("#backToEditor").click(function() 
			{
				$(".page").hide();
				$('.btn-strip-container').show();
				$('#chartScreenList').show();
				$('.presenation-module').show();
				var li = $(".progressContainor").find(".progress-bar");
				li.css('width', 60 + '%');
				var imageBlue = $(".progressContainor").find("li");
				$((imageBlue)[3]).removeClass("completed");
				$((imageBlue)[4]).removeClass("current");
				$((imageBlue)[3]).addClass("current");
				
				$("#helpImportButtons").hide();
				$("#chartArea").show();
				$("#p3").trigger("click");
				$("#editor").show();
				$(".editorList").show();
				$("#downloadChart").hide();
				$("#backToEditor").hide();
				$("#nextBtnToDownload").show();
				$("#backToThemeManager").show();
				$("#selectedImageType").hide();
				$("#tweeterShare").hide();
				$("#downloadManagerTab").removeClass("done");
				
			})
			
			$("#homePage").click(function(){
				i = 0;
				svgArray = [];
				$(".page").hide();
				$('.btn-strip-container').hide();
				$('#chartScreenList').hide();
				$(".progressContainor").removeClass('add-width');
				var li = $(".progressContainor").find(".progress-bar");
				li.css('width', 0 + '%');
				var imageBlue = $(".progressContainor").find("li");
				$((imageBlue)).removeClass("completed");
				$((imageBlue)).removeClass("current");
				$((imageBlue)[0]).addClass("current");
				
				$("#helpImportButtons").hide();
				$("#chartGridView").show();
				$(".tab").removeClass("done");
				$("#chartPickerTab").addClass("done");
				$('#startTour').show();
			})
			
		}
		
	})
})

