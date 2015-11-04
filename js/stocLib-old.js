
	var legendController={
     getLegendPositionArray:function(legendArray,width,height){
   
    var pixcelPerChar=6,widthLimit=width*0.7,textSeparator=10,nextLineSeparator=(height*0.05),endPos=0,legendPositionArray=[],legendWidth=10,nextLineCounter=0,yPos=0;
    for(var i=0;i<legendArray.length;i++){
     var legendObj=legendArray[i].toString();
     var obj={"x":0,"y":0,"endPos":0};
     
     var xPos=0;//(width*0.05);
     var initPos=(width*0.08);
     var legendSeparator=(width*0.05);
     if(initPos<30){
    initPos=30;
     }
     
     if(legendSeparator<20){
    legendSeparator=20;
     }
     
     if(i == 0){
      xPos=initPos;
     }
     else{
      xPos=legendPositionArray[i-1].endPos;
     }
     //yPos=0;
     var xEndPos=xPos+legendWidth+(legendObj.length*pixcelPerChar)+textSeparator+legendSeparator;
     if(xEndPos>widthLimit){
      //means shift the legend to new line
      nextLineCounter++;
      xPos=initPos;
      xEndPos=xPos+legendWidth+(legendObj.length*pixcelPerChar)+textSeparator+legendSeparator;
      yPos=nextLineCounter*nextLineSeparator;
     }
     
     obj.x=xPos;
     obj.y=yPos;
     obj.endPos=xEndPos;
     obj.textPos=xPos+legendWidth+textSeparator;
     
     legendPositionArray.push(obj);
    }
    return legendPositionArray;
     },

	showHorizontalLegend:function(scaleWidth,yPositionOfLegend,legendArray,legendSize)
	{			
		
			var largestStringLngth=0;
				
					for(var counter =0 ;counter<legendArray.length;counter++)
					{
						if(largestStringLngth<(legendArray[counter].toString()).length)
						{
							largestStringLngth = (legendArray[counter].toString()).length;
						}
					}		
			largestStringLngth = largestStringLngth * 8.5;
			var legendPositionArray = [];
			var obj={"x":0,"y":0,"textXPos":0};
			var seprator = 5;	
			var xPositionOfLegend = scaleWidth*.1;
			var temp,flag = scaleWidth*.1;
			var legendRow = Math.round((scaleWidth*.8)/(seprator+legendSize+largestStringLngth));
			
			for(var counter = 0 ; counter<legendArray.length ; counter++)
			{
				var obj={};
				if(counter%legendRow == 0)
				{
					xPositionOfLegend = scaleWidth*.1;
				}
				else
				{
					xPositionOfLegend = xPositionOfLegend+seprator+legendSize+largestStringLngth;
				}
				obj.x = xPositionOfLegend;
				
				if(counter%legendRow == 0  && counter!=0)
				{
					yPositionOfLegend = (yPositionOfLegend)+(2*legendSize);
				}
				obj.y = yPositionOfLegend;
				
				obj.textXPos = xPositionOfLegend+seprator + legendSize;
				
				legendPositionArray.push(obj);
					
			}	
			return legendPositionArray;
	} 
  };

var DataConverter={
		 getValueToPercentageArray:function(valueArray){
				var perArray=[];
				var sumEle=0;
				for(var d=0;d<valueArray.length;d++){			
					   sumEle+=valueArray[d];				
				}				
				for(var d=0;d<valueArray.length;d++){	
					   perArray.push((valueArray[d]/sumEle)*100);	
				}
				
				return perArray;
			 
		 }
			
		};
		
	var marginController = {
			leftMarginController: function (array)
			{
				var largestStringLength=0;
				for(var counter =0 ;counter<array.length;counter++)
				{
					if(largestStringLength<(array[counter].toString()).length)
					{
						largestStringLength = (array[counter].toString()).length;
					}
				}
				var pixelPerChar = 10;
				largestStringLength = (largestStringLength+1) * pixelPerChar;
				largestStringLength = largestStringLength + 20;
				return largestStringLength;
			},

	  }		
		
var tickController = {
            getTickArray: function (minVal, maxVal, noOfTicksRequired) {
                var tickArray = [];
                var factor = Math.round((maxVal - minVal) / (noOfTicksRequired - 1));
                var curval = minVal;
                tickArray.push(curval);
                noOfTicksRequired--;
                for (var i = 1; i < noOfTicksRequired; i++) {
                    curval += factor;
                    tickArray.push(curval);
                    if (i == noOfTicksRequired - 1) tickArray.push(maxVal);
                }
                return tickArray;
            },
            getXTickArray: function (minVal, maxVal, maxCharacterLength, svgWidth) {
                var tickArray = [];
                var maxTickWidth = 2 * 6.5 * maxCharacterLength;
                var totalTicks = Math.round(svgWidth / maxTickWidth);

                var curval = minVal;
                tickArray.push(curval);
                var factor = (maxVal - minVal) / totalTicks;
				
                while (curval < maxVal) {
					//alert(curval+"::"+maxVal+"::"+factor);
                    curval = Math.floor(curval + factor);
                    if (tickArray.indexOf(curval) == -1 && curval <= maxVal) 
					tickArray.push(curval);
					else
					curval++;
					
                }
				
                return tickArray;
            }
    };
 var gridManager = {
            init: function (svg, height, width, left, top) {
                var hfactor = Math.ceil(height * .15);
                var vfactor = Math.ceil(height * .5);
                var hRange = Math.ceil(height / hfactor);

                var vRange = Math.ceil(width / vfactor);

                svg.selectAll(".hline").data(d3.range(hRange)).enter()
                    .append("line")
                    .attr("y1", function (d) {
                    return d * hfactor + 6;
                })
                    .attr("y2", function (d) {
                    return d * hfactor + 6;
                })
                    .attr("x1", function (d) {
                    return 0;
                })
                    .attr("x2", function (d) {
                    return width;
                })
                    .style("stroke", "#353b37")
					.style("stroke-width",.3)
                    .attr("transform", "translate(" + left + "," + top + ")");



                svg.selectAll(".vline").data(d3.range(vRange)).enter()
                    .append("line")
                    .attr("x1", function (d) {
                    return d * vfactor;
                })
                    .attr("x2", function (d) {
                    return d * vfactor;
                })
                    .attr("y1", function (d) {
                    return 0;
                })
                    .attr("y2", function (d) {
                    return height;
                })
                    .style("stroke", "#353b37")
					.style("stroke-width",.1)
                    .attr("transform", "translate(" + left + "," + top + ")");
            }

        };

 
 var axisLabelController={
	   //appendLabel:function(labelName,labelPos,svgElement,width,height){
	   appendLabel:function(labelName,labelXPos,labelYPos,rotateDeg,targetElem,labelColorArg,fontWeightArg,fontFamily){
		
		var labelColor="black",fontWeight=300;
		
		if(!isNaN(labelColorArg) || !(labelColorArg === undefined)){
			labelColor=labelColorArg;
		}
		
		if(!isNaN(fontWeightArg) || !(fontWeightArg === undefined)){
			fontWeight=fontWeightArg;
		}
		
		
		var textElem=targetElem
					.append("text");
		
		textElem.text(labelName)
		.attr("transform","translate("+labelXPos+","+labelYPos+") rotate("+rotateDeg+")")
		//.style("font-family","italic","important")
		.style("fill",labelColor,"important")
		.attr("font-size",15)
		.style("font-family",fontFamily,"important")
		.style("font-weight",fontWeightArg,"important")
		//.style("font-size",14,"important");
		
		
	   }
  }

 function drawPieChart(divId,data)
 {
			
				var key = data["Pie key"];
				var value = data["Pie Data"];
				var label = data["Factor"];
				var color = data["Color"];
				var legendOrient = data["Legend Orient"];
				var fontFamily = data["fontFamily"];
					
				var width =parseInt(d3.select("#"+divId).style("width"));
				var height=parseInt(d3.select("#"+divId).style("height")); 
				
				var divSelection = d3.select("#"+divId);
			    var svgElement = divSelection.append('svg')
									.attr('id',"pieChart")
									.attr("width", width)
									.attr("height", height);
				
				var grad = Math.PI/180;
				var legendSize = width * 0.016;
				var legendAndTextSize;
				var pixcelPerChar=7;
				var largestStringLength=0;
				var seprator = 4;
				for(var counter =0 ;counter<key.length;counter++)
				{
					if(largestStringLength<(key[counter].toString()).length)
					{
						largestStringLength = (key[counter].toString()).length;
					}
				}
				var radius ,innerRadius=0;
				largestStringLength = largestStringLength * pixcelPerChar;
				legendAndTextSize = largestStringLength + legendSize + seprator;
				var dountPieGroup;
				if(legendOrient == "left")
				{
					console.log('left');
					dountPieGroup = svgElement.append("g")
										.attr('class','dountPie')
										.attr("transform", "translate(" + ((width/2)+legendAndTextSize) + "," + (height/2) + ")");
					
					radius = (height/2) < ((width/2)-legendAndTextSize) ? (height/2) : ((width/2)-legendAndTextSize);
					radius = radius * .9;
				}
				else if(legendOrient == "right")
				{
					console.log('right');
					dountPieGroup = svgElement.append("g")
										.attr('class','dountPie')
										.attr("transform", "translate(" + ((width/2)-legendAndTextSize) + "," + (height/2) + ")");
					radius = (height/2) < ((width/2)-legendAndTextSize) ? (height/2) : ((width/2)-legendAndTextSize);
					radius = radius * .9;
				}
				else if(legendOrient == "top")
				{
					console.log('top');
					dountPieGroup = svgElement.append("g")
										.attr('class','dountPie')
										.attr("transform", "translate(" + ((width/2)) + "," + ((height/2)+(legendSize*2)) + ")");
					radius = (height-(legendSize*4)) < (width) ? ((height-(legendSize*4))) : (width);
					radius = radius * .45;					
				}
				else
				{
					console.log('bottom');
					dountPieGroup = svgElement.append("g")
										.attr('class','dountPie')
										.attr("transform", "translate(" + ((width/2)) + "," + ((height/2)-(legendSize*2)) + ")");
					radius = (height-(legendSize*4)) < (width) ? ((height-(legendSize*4))) : (width);
					radius = radius * .45;					
				}
				
				
				var arc = d3.svg.arc()
						.innerRadius(0)
						.outerRadius(radius);
				
			
				var pie = d3.layout.pie()
								.sort(null)
								.value(function(d) { return d;});
				
				var pieRef = dountPieGroup.selectAll(".arc")
								.data(pie(value))
								.enter()
								.append("g")
								.attr('value',function(d,i) {return i;})
								.attr("fill",function(d,i){return color[i];} )
								.on("mouseover", function()
								{
									var index= d3.select(this).attr('value');
									d3.select(this).transition().duration(500).ease('bounce')
									.attr('transform', function (d) 
									 {
										var dist = 15;
										d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
										var x = Math.sin(d.midAngle) * dist;
										var y = -Math.cos(d.midAngle) * dist;
										return 'translate(' + x + ',' + y + ')';
									 })
									 .attr('stroke','white');
									var x = parseInt(d3.select("#text"+index).attr('xPosition'));
									 d3.select("#text"+index).transition().duration(500).attr('x',function(){ return x+10;})
								//		 return tooltip.style("visibility", "visible");
								})
								.on("mousemove",function(){
									var index= d3.select(this).attr('value');
									var heading=key[index];
									var pieValue = value[index];
									var yHeadingValueMap=[{"headingName":label,"headingVal":pieValue}							
														];
												
								//	toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.96);	
								})
								.on("mouseleave", function()
								{	
									d3.select(this).transition().duration(500).ease('bounce')
												  .attr('transform', 'translate(0,0)')
												  .attr('stroke','none');
									//	toolTipManager.hideTooTip();
									var index= d3.select(this).attr('value');
									var x = parseInt(d3.select("#text"+index).attr('xPosition'));
									d3.select("#text"+index).transition().duration(500).attr('x',function(){ return x;})
								//     	return tooltip.style("visibility", "hidden");
								});
								
				pieRef.append("path")
				.attr("d",arc)
				.transition().duration(1500).attrTween("d", sweep);
				 
			/*	dountPieGroup.selectAll('.text')
							 .data(pie(value))
							 .enter()
							 .append("text")
							 .attr('x',function(d,i){ return (radius*.9) * (Math.sin((d.startAngle+d.endAngle)*.5))})
							 .attr('y',function(d,i){ return -(radius*.9) * (Math.cos((d.startAngle+d.endAngle)*.5))})
							 .text(function(d,i){ return key[i]+" " +label})
				*/
				
				var legendGroup;
				var xPosition;
				var yPosition;
				if(legendOrient=="left")
				{
					xPosition = ((width/2)+legendAndTextSize)-(legendAndTextSize+(radius*1.5));
					yPosition = (height/2)-((key.length/2)*legendSize*2);
					legendGroup = svgElement.append("g")
										.attr('class','legend')
										.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");
					drawLegendLeftOrRight(key,color,legendSize,legendGroup);
					
				}else if(legendOrient=="right")
				{
					xPosition = ((width/2)-legendAndTextSize)+(radius*1.5);
					yPosition = (height/2)-((key.length/2)*legendSize*2);
					legendGroup = svgElement.append("g")
										.attr('class','legend')
										.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");
					
					drawLegendLeftOrRight(key,color,legendSize,legendGroup);
				}else if(legendOrient=="top")
				{
					xPosition = width*.2;
					yPosition = 5;
					legendGroup = svgElement.append("g")
										.attr('class','legend')
										.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");
					
					
					var legendPositionArray = showHorizontalLegend(width*.7,0,key,legendSize)
					var legendRef = legendGroup.selectAll('.rect')
														.data(legendPositionArray)
														.enter()
														.append('rect')
														.attr('width',legendSize)
														.attr('height',legendSize)
														.attr('x',function(d,i){ return legendPositionArray[i].x;})
														.attr('y',function(d,i){return legendPositionArray[i].y;})
														.attr('fill',function(d,i){return color[i]});
							
							var legendTextRef = legendGroup.selectAll('.text')
														.data(legendPositionArray)
														.enter()
														.append('text')
														.attr('id',function(d,i){ return 'text'+i})
														.attr('x',function(d,i){return legendPositionArray[i].textXPos;})
														.attr('y',function(d,i){return legendPositionArray[i].y + legendSize;})
														.attr('xPosition',function(d,i){return legendPositionArray[i].textXPos;})
														.attr("font-family",fontFamily)
														.text(function(d,i){return key[i];});
					
				}
				else
				{
							xPosition = width*.2;
							yPosition = ((height/2)-(legendSize*2))+radius+4;
							legendGroup = svgElement.append("g")
										.attr('class','legend')
										.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");						
					
							var legendPositionArray = showHorizontalLegend(width*.7,0,key,legendSize)
							var legendRef = legendGroup.selectAll('.rect')
																.data(legendPositionArray)
																.enter()
																.append('rect')
																.attr('width',legendSize)
																.attr('height',legendSize)
																.attr('x',function(d,i){ return legendPositionArray[i].x;})
																.attr('y',function(d,i){return legendPositionArray[i].y;})
																.attr('fill',function(d,i){return color[i]});
							
							var legendTextRef = legendGroup.selectAll('.text')
														.data(legendPositionArray)
														.enter()
														.append('text')
														.attr('id',function(d,i){ return 'text'+i})
														.attr('x',function(d,i){return legendPositionArray[i].textXPos;})
														.attr('y',function(d,i){return legendPositionArray[i].y + legendSize;})
														.attr('xPosition',function(d,i){return legendPositionArray[i].textXPos;})
														.attr("font-family",fontFamily)
														.text(function(d,i){return key[i];});
					

				}

				function drawLegendLeftOrRight(key,color,legendSize,legendGroup)
				{
					legendGroup.selectAll('.rect')
							   .data(key)
							   .enter()
							   .append('rect')
							   .attr('y',function(d,i){ return i*2*legendSize})
							   .attr('width',legendSize)
							   .attr('height',legendSize)
							   .attr('fill',function(d,i){ return color[i]});
							 
					legendGroup.selectAll('.text')
							   .data(key)
							   .enter()
							   .append('text')
							   .attr('id',function(d,i){ return 'text'+i})
							   .attr('x',legendSize+4)
							   .attr('y',function(d,i){return (i*2*legendSize)+(legendSize)})
							   .attr('xPosition',legendSize+4)
							   .attr("font-family",fontFamily)
							   .text(function(d,i){return d;})
				}
				
				function showHorizontalLegend(scaleWidth,yPositionOfLegend,legendArray,legendSize)
				{			
						var largestStringLngth=0;
								for(var counter =0 ;counter<legendArray.length;counter++)
								{
									if(largestStringLngth<(legendArray[counter].toString()).length)
									{
										largestStringLngth = (legendArray[counter].toString()).length;
									}
								}		
						largestStringLngth = largestStringLngth * 8;
						var legendPositionArray = [];
						var obj={"x":0,"y":0,"textXPos":0};
						var seprator = 5;	
						var xPositionOfLegend = scaleWidth*.1;
						var temp,flag = scaleWidth*.1;
						var legendRow = Math.round((scaleWidth*.8)/(seprator+legendSize+largestStringLngth));
						
						for(var counter = 0 ; counter<legendArray.length ; counter++)
						{
							var obj={};
							if(counter%legendRow == 0)
							{
								xPositionOfLegend = scaleWidth*.1;
							}
							else
							{
								xPositionOfLegend = xPositionOfLegend+seprator+legendSize+largestStringLngth;
							}
							obj.x = xPositionOfLegend;
							
							if(counter%legendRow == 0  && counter!=0)
							{
								yPositionOfLegend = (yPositionOfLegend)+(2*legendSize);
							}
							obj.y = yPositionOfLegend;
							
							obj.textXPos = xPositionOfLegend+seprator + legendSize;
							
							legendPositionArray.push(obj);
								
						}	
						return legendPositionArray;
				} 
				
				function sweep(d) {
				   var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
				 return function (call) {
				  //console.log(call);
				  return arc(i(call));
				 };
				}
 
		return svgElement;
		//alert(JSON.stringify(data))
 }
 function drawDountChart(divId,data)
 {
 
		var key = data["Dount key"];
		var value = data["Dount Data"];
		var label = data["Factor"];
		var color = data["Color"];
		var legendOrient = data["Legend Orient"];
		var fontFamily = data["fontFamily"];

			
			
		var width =parseInt(d3.select("#"+divId).style("width"));
		var height=parseInt(d3.select("#"+divId).style("height")); 
		var divSelection = d3.select("#"+divId);
		var svgElement = divSelection.append('svg')
							.attr('id',"dountChart")
							.attr("width", width)
							.attr("height", height);
		
		var grad = Math.PI/180;
		var legendSize = width * 0.016;
		
		var legendAndTextSize;
		var pixcelPerChar=7;
		var largestStringLength=0;
		var seprator = 4;
		var totalValue = 0; 
		for(var counter =0 ;counter<value.length;counter++)
		{
			totalValue = totalValue + value[counter];
		}
		
		for(var counter =0 ;counter<key.length;counter++)
		{
			if(largestStringLength<(key[counter].toString()).length)
			{
				largestStringLength = (key[counter].toString()).length;
			}
		}
		var radius ,innerRadius=0;
		largestStringLength = largestStringLength * pixcelPerChar;
		legendAndTextSize = largestStringLength + legendSize + seprator;
		var dountPieGroup;
		if(legendOrient == "left")
		{
			console.log('left');
			dountPieGroup = svgElement.append("g")
								.attr('class','dountPie')
								.attr("transform", "translate(" + ((width/2)+legendAndTextSize) + "," + (height/2) + ")");
			
			radius = (height/2) < ((width/2)-legendAndTextSize) ? (height/2) : ((width/2)-legendAndTextSize);
			radius = radius * .9;
		}
		else if(legendOrient == "right")
		{
			console.log('right');
			dountPieGroup = svgElement.append("g")
								.attr('class','dountPie')
								.attr("transform", "translate(" + ((width/2)-legendAndTextSize) + "," + (height/2) + ")");
			radius = (height/2) < ((width/2)-legendAndTextSize) ? (height/2) : ((width/2)-legendAndTextSize);
			radius = radius * .9;
		}
		else if(legendOrient == "top")
		{
			console.log('top');
			dountPieGroup = svgElement.append("g")
								.attr('class','dountPie')
								.attr("transform", "translate(" + ((width/2)) + "," + ((height/2)+(legendSize*2)) + ")");
			radius = (height-(legendSize*4)) < (width) ? ((height-(legendSize*4))) : (width);
			radius = radius * .45;					
		}
		else
		{
			console.log('bottom');
			dountPieGroup = svgElement.append("g")
								.attr('class','dountPie')
								.attr("transform", "translate(" + ((width/2)) + "," + ((height/2)-(legendSize*2)) + ")");
			radius = (height-(legendSize*4)) < (width) ? ((height-(legendSize*4))) : (width);
			radius = radius * .45;					
		}
		
		var innerRadius = radius * .75;
		var arc = d3.svg.arc()
				.innerRadius(innerRadius)
				.outerRadius(radius);
	
		
		var pie = d3.layout.pie()
						.sort(null)
						.value(function(d) { return d;});
		
		var pieRef = dountPieGroup.selectAll(".arc")
						.data(pie(value))
						.enter()
						.append("g")
						.attr('value',function(d,i) {return i;})
						.attr("fill",function(d,i){return color[i];} )
						.on("mouseover", function()
						{
							var index= d3.select(this).attr('value');
							d3.select(this).transition().duration(500).ease('bounce')
							.attr('transform', function (d) 
							 {
								var dist = 15;
								d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
								var x = Math.sin(d.midAngle) * dist;
								var y = -Math.cos(d.midAngle) * dist;
								return 'translate(' + x + ',' + y + ')';
							 })
							 .attr('stroke','white');
							var x = parseInt(d3.select("#text"+index).attr('xPosition'));
							 d3.select("#text"+index).transition().duration(500).attr('x',function(){ return x+10;})
						//		 return tooltip.style("visibility", "visible");
						})
						.on("mousemove",function(){
							var index= d3.select(this).attr('value');
							var heading=key[index];
							var pieValue = value[index];
							var yHeadingValueMap=[{"headingName":label,"headingVal":pieValue}							
												];
										
						//	toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.96);	
						})
						.on("mouseleave", function()
						{	
							d3.select(this).transition().duration(500).ease('bounce')
										  .attr('transform', 'translate(0,0)')
										  .attr('stroke','none');
							var index= d3.select(this).attr('value');
							var x = parseInt(d3.select("#text"+index).attr('xPosition'));
							d3.select("#text"+index).transition().duration(500).attr('x',function(){ return x;})
						
						});
						
		pieRef.append("path")
		.attr("d",arc)
		.transition().duration(1500).attrTween("d", sweep);
		
	/*	dountPieGroup.selectAll('.text')
					 .data(pie(value))
					 .enter()
					 .append("text")
					 .attr('x',function(d,i){ return (radius*.9) * (Math.sin((d.startAngle+d.endAngle)*.5))})
					 .attr('y',function(d,i){ return -(radius*.9) * (Math.cos((d.startAngle+d.endAngle)*.5))})
					 .text(function(d,i){ return Math.round((value[i]/totalValue)*100)+"% "+label })
		*/
		
		
		var legendGroup;
		var xPosition;
		var yPosition;
		if(legendOrient=="left")
		{
			xPosition = ((width/2)+legendAndTextSize)-(legendAndTextSize+(radius*1.5));
			yPosition = (height/2)-((key.length/2)*legendSize*2);
			legendGroup = svgElement.append("g")
								.attr('class','legend')
								.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");
			drawLegendLeftOrRight(key,color,legendSize,legendGroup);
			
		}else if(legendOrient=="right")
		{
			xPosition = ((width/2)-legendAndTextSize)+(radius*1.5);
			yPosition = (height/2)-((key.length/2)*legendSize*2);
			legendGroup = svgElement.append("g")
								.attr('class','legend')
								.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");
			
			drawLegendLeftOrRight(key,color,legendSize,legendGroup);
		}else if(legendOrient=="top")
		{
			xPosition = width*.15;
			yPosition = 5;
			legendGroup = svgElement.append("g")
								.attr('class','legend')
								.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");
			
			
			var legendPositionArray = showHorizontalLegend(width*.7,0,key,legendSize)
			var legendRef = legendGroup.selectAll('.rect')
												.data(legendPositionArray)
												.enter()
												.append('rect')
												.attr('width',legendSize)
												.attr('height',legendSize)
												.attr('x',function(d,i){ return legendPositionArray[i].x;})
												.attr('y',function(d,i){return legendPositionArray[i].y;})
												.attr('fill',function(d,i){return color[i]});
					
					var legendTextRef = legendGroup.selectAll('.text')
												.data(legendPositionArray)
												.enter()
												.append('text')
												.attr('id',function(d,i){ return 'text'+i})
												.attr('x',function(d,i){return legendPositionArray[i].textXPos;})
												.attr('y',function(d,i){return legendPositionArray[i].y + legendSize;})
												.attr('xPosition',function(d,i){return legendPositionArray[i].textXPos;})
												.attr("font-family",fontFamily)
												.attr("font-size",16)
												.text(function(d,i){return key[i];});
												
			
		}
		else
		{
					xPosition = width*.15;
					yPosition = ((height/2)-(legendSize*2))+radius+4;
					legendGroup = svgElement.append("g")
								.attr('class','legend')
								.attr("transform", "translate(" + (xPosition) + "," + (yPosition) + ")");						
			
					var legendPositionArray = showHorizontalLegend(width*.7,0,key,legendSize)
					var legendRef = legendGroup.selectAll('.rect')
														.data(legendPositionArray)
														.enter()
														.append('rect')
														.attr('width',legendSize)
														.attr('height',legendSize)
														.attr('x',function(d,i){ return legendPositionArray[i].x;})
														.attr('y',function(d,i){return legendPositionArray[i].y;})
														.attr('fill',function(d,i){return color[i]});
					
					var legendTextRef = legendGroup.selectAll('.text')
												.data(legendPositionArray)
												.enter()
												.append('text')
												.attr('id',function(d,i){ return 'text'+i})
												.attr('x',function(d,i){return legendPositionArray[i].textXPos;})
												.attr('y',function(d,i){return legendPositionArray[i].y + legendSize;})
												.attr('xPosition',function(d,i){return legendPositionArray[i].textXPos;})
												.attr("font-family",fontFamily)
												.attr("font-size",16)
												.text(function(d,i){return key[i];});
			

		}

		function drawLegendLeftOrRight(key,color,legendSize,legendGroup)
		{
			legendGroup.selectAll('.rect')
					   .data(key)
					   .enter()
					   .append('rect')
					   .attr('y',function(d,i){ return i*2*legendSize})
					   .attr('width',legendSize)
					   .attr('height',legendSize)
					   .attr('fill',function(d,i){ return color[i]});
					 
			legendGroup.selectAll('.text')
					   .data(key)
					   .enter()
					   .append('text')
					   .attr('id',function(d,i){ return 'text'+i})
					   .attr('x',legendSize+4)
					   .attr('y',function(d,i){return (i*2*legendSize)+(legendSize)})
					   .attr('xPosition',legendSize+4)
					   .attr("font-family",fontFamily)
					   .attr("font-size",16)
					   .text(function(d,i){return d;})
		}
		
		function showHorizontalLegend(scaleWidth,yPositionOfLegend,legendArray,legendSize)
		{			
				var largestStringLngth=0;
						for(var counter =0 ;counter<legendArray.length;counter++)
						{
							if(largestStringLngth<(legendArray[counter].toString()).length)
							{
								largestStringLngth = (legendArray[counter].toString()).length;
							}
						}		
				largestStringLngth = largestStringLngth * 9;
				var legendPositionArray = [];
				var obj={"x":0,"y":0,"textXPos":0};
				var seprator = 5;	
				var xPositionOfLegend = scaleWidth*.1;
				var temp,flag = scaleWidth*.1;
				var legendRow = Math.round((scaleWidth*.8)/(seprator+legendSize+largestStringLngth));
				
				for(var counter = 0 ; counter<legendArray.length ; counter++)
				{
					var obj={};
					if(counter%legendRow == 0)
					{
						xPositionOfLegend = scaleWidth*.1;
					}
					else
					{
						xPositionOfLegend = xPositionOfLegend+seprator+legendSize+largestStringLngth;
					}
					obj.x = xPositionOfLegend;
					
					if(counter%legendRow == 0  && counter!=0)
					{
						yPositionOfLegend = (yPositionOfLegend)+(2*legendSize);
					}
					obj.y = yPositionOfLegend;
					
					obj.textXPos = xPositionOfLegend+seprator + legendSize;
					
					legendPositionArray.push(obj);
						
				}	
				return legendPositionArray;
		} 
		
		function sweep(d) {
		   var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
		 return function (call) {
		  //console.log(call);
		  return arc(i(call));
		 };
		}

		return svgElement;	
 }
 
 function drawBarChart(divId,data)
 {
	var yAxisData = data["Y Axis Data"];
	var xAxisData = data["X Axis Data"];
	var yAxisUnit = data["Y Axis Unit"];
	var yAxisLabel = data["Y Axis Label"];
	var xAxisLabel = data["X Axis Label"];
	var title = data["Title"];
	var barColor = data["Color"];
	var fontFamily = data["fontFamily"];
	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr('id',"barChartContainer")
						.attr("width", width)
						.attr("height", height);
	
	
	var leftMargin = marginController.leftMarginController(yAxisData);
	
	var compareAnalChart={left:leftMargin,right:width*0.04,bottom:50,top:height*0.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	var scaleWidth=width-compareAnalChart.left-compareAnalChart.right;
	var scaleHeight=height-compareAnalChart.top-compareAnalChart.bottom;
		
	var estimateDataBarWidth =  (scaleWidth/(2.5*xAxisData.length));
	
	var fontSize =12;	
	var xAxisTimeIndex = [];
	for(var counter = 0;counter<xAxisData.length ;counter++)
	{
		xAxisTimeIndex[counter] = counter;
	}

	gridManager.init(svgElement, scaleHeight, scaleWidth, compareAnalChart.left, compareAnalChart.top);
	
//	var leftMarginOfSvg = $(selectorElement).offset().left;
	
	var compareChartMainGroup = svgElement.append("g")
					   .attr('class','main-group')
					   .attr("transform", "translate(" + compareAnalChart.left + "," + compareAnalChart.top + ")")
					   
	

	//title here
	var pixcelPerChar = 8;
	var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
	var titleGroup = svgElement.append("g")
							   .attr('class','title')
	axisLabelController.appendLabel(title,leftIndicator,compareAnalChart.top/2,0,titleGroup,"black",500,fontFamily);

	//	titleRef.text(textWrapper.wrapText(title,30));						   
	
	var xScale = d3.scale.linear()
						 .domain([0,xAxisData.length-1])
						 .range([estimateDataBarWidth*.5,scaleWidth-(estimateDataBarWidth*.5)]); 
						 
	var yMin = d3.min(yAxisData);
	var yMax = d3.max(yAxisData);
	yMin = yMin*.3;
	yMax = yMax * 1.3;
	
	var yScale = d3.scale.linear()
					.domain([yMin,yMax])
					.range([scaleHeight,0]);
			
	//x axis

	var largestStringLngth=0;
	for(var counter =0 ;counter<xAxisData.length;counter++)
	{
		if(largestStringLngth<(xAxisData[counter].toString()).length)
		{
			largestStringLngth = (xAxisData[counter].toString()).length;
		}
	}
		
	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.tickValues(tickController.getXTickArray(0,(xAxisData.length),largestStringLngth, (scaleWidth)));
	
	var xAxisTextRef = compareChartMainGroup.append("g")
							.attr('id','xAxis')
							.attr("class", "x axis")
							.attr('fill',"none")
							.attr("transform", "translate("+0+"," + scaleHeight + ")")
							.call(xAxis);
	xAxisTextRef.selectAll('text')
					 .text(function(d){return xAxisData[d];})
					 .style('font-size',fontSize)
					 .attr('font-family',fontFamily)
					 .attr('fill','black');

	   
	//xAxis label here	

	var pixcelPerChar=6;
	var totalXLabelPixcel=xAxisLabel.toString().length*pixcelPerChar;
	var xIndicationLabelTop=scaleHeight+(compareAnalChart.bottom-5);
	var xIndicationLabelLeft=scaleWidth/2-totalXLabelPixcel/2;
	axisLabelController.appendLabel(xAxisLabel,xIndicationLabelLeft,xIndicationLabelTop,0,compareChartMainGroup,'black',350,fontFamily);			   							
										
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.tickValues(tickController.getTickArray(yMin,yMax,8));
	
	compareChartMainGroup.append("g")
					.attr('id','yAxis')
					.attr("class", "y axis")
					.attr('fill',"none")
					.attr("transform", "translate("+(0)+"," + 0 + ")")
					.call(yAxis)
					.selectAll('text')
					.style('font-size',fontSize)
					.style('font-family',fontFamily)
					.attr('fill','black');
	

	//yAxis label here					
	var totalYLabelPixcel=yAxisLabel.toString().length*pixcelPerChar;			
	var yIndicationLabelTop=scaleHeight/2+totalYLabelPixcel/2;
	var yIndicationLabelLeft=(-compareAnalChart.left+15);
	axisLabelController.appendLabel(yAxisLabel,yIndicationLabelLeft,yIndicationLabelTop,-90,compareChartMainGroup,'black',350,fontFamily);			   													   
		
	var estimateRectGroupRef = compareChartMainGroup
								.selectAll('.rect')
								.data(yAxisData)
								.enter()
								.append('rect')
								.attr('width',estimateDataBarWidth)
								.attr('height',0)
								.attr('x',function(d,i){return xScale(i)-(estimateDataBarWidth/2)})
								.attr('y',scaleHeight)
								.attr('fill',barColor)
								.on("mousemove",function()
								{
							/*		var x = d3.event.pageX;
									var y = d3.event.pageY;
								//	x=x-(leftMarginOfSvg+compareAnalChart.left);
									x = Math.round(xScale.invert(x));
									
									var heading=xAxisData[x];
									var yAxisEstimateVal = yAxisEstimateData[x] + " "+yAxisUnit;
									var yAxisActualVal = yAxisActualData[x] + " "+yAxisUnit;
									var yHeadingValueMap=[{"headingName":yAxisEstimateDataUnit+" "+yAxisLabel,"headingVal":yAxisEstimateVal},
														  {"headingName":yAxisActualDataUnit+" "+yAxisLabel,"headingVal":yAxisActualVal}
														  ];
								*/	
								//	toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.90);	
									
								})
								.on("mouseleave",function(){
								//	toolTipManager.hideTooTip();
								});
			estimateRectGroupRef
					.transition()
					.duration(1500)
					.attr('height',function(d,i){return yScale(yMin)-yScale(d)})
					.attr('y',function(d,i){return yScale(d)});
					
			compareChartMainGroup.selectAll(".text")
						 .data(yAxisData)
						 .enter()
						 .append("text")
						 .attr("x",function(d,i){ return xScale(i)-(((d.toString().length)*4.5));})
						 .attr("y",function(d,i){ return yScale(d)-3;})
						 .attr("font-family",fontFamily)
						 .attr("font-size",14)
						 .text(function(d,i){return d;});
									
			return svgElement;		
			
 }
 
 function drawComparisonChart(divId,data)
 {
	var yAxisEstimateData = data["Y Axis EstimateData"];
	var yAxisActualData = data["Y Axis ActualData"];
	var xAxisData = data["X Axis Data"];
	var yAxisUnit = data["Y Axis Unit"];
	var yAxisLabel = data["Y Axis Label"];
	var xAxisLabel = data["X Axis Label"];
	var title = data["Title"];
	var yAxisEstimateDataUnit = data["Y Axis EstimateData Unit"];
	var yAxisActualDataUnit = data["Y Axis ActualData Unit"];
	var fontFamily = data["fontFamily"];
	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr('id',"comparosionChartContainer")
						.attr("width", width)
						.attr("height", height);
	
	var leftMargin = marginController.leftMarginController(yAxisEstimateData);
	var compareAnalChart={left:leftMargin,right:width*0.05,bottom:50,top:height*0.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	var scaleWidth=width-compareAnalChart.left-compareAnalChart.right;
	var scaleHeight=height-compareAnalChart.top-compareAnalChart.bottom;
		
	var estimateDataBarWidth =  (scaleWidth/(2*xAxisData.length));

	var fontSize =12;
	var xAxisTimeIndex = [];
	for(var counter = 0;counter<xAxisData.length ;counter++)
	{
		xAxisTimeIndex[counter] = counter;
	}

	gridManager.init(svgElement, scaleHeight, scaleWidth, compareAnalChart.left, compareAnalChart.top);
	
//	var leftMarginOfSvg = $(selectorElement).offset().left;
	
	var compareChartMainGroup = svgElement.append("g")
					   .attr('class','main-group')
					   .attr("transform", "translate(" + compareAnalChart.left + "," + compareAnalChart.top + ")")
					   
	

//title here
var pixcelPerChar = 8;
var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
var titleGroup = svgElement.append("g")
						   .attr('class','title')
axisLabelController.appendLabel(title,leftIndicator,compareAnalChart.top/2,0,titleGroup,"black",500,fontFamily);

//	titleRef.text(textWrapper.wrapText(title,30));						   
	
	var xScale = d3.scale.linear()
						 .domain([0,xAxisData.length-1])
						 .range([estimateDataBarWidth*.5,scaleWidth-(estimateDataBarWidth*.5)]); 
						 
	var yMin = d3.min(yAxisEstimateData)<d3.min(yAxisActualData)?d3.min(yAxisEstimateData):d3.min(yAxisActualData);
	var yMax = d3.max(yAxisEstimateData)>d3.max(yAxisActualData)?d3.max(yAxisEstimateData):d3.max(yAxisActualData);
	yMin = yMin*.3;
	yMax = yMax * 1.3;
	
	var yScale = d3.scale.linear()
					.domain([yMin,yMax])
					.range([scaleHeight,0]);
			
//x axis

		var largestStringLngth=0;
		for(var counter =0 ;counter<xAxisData.length;counter++)
		{
			if(largestStringLngth<(xAxisData[counter].toString()).length)
			{
				largestStringLngth = (xAxisData[counter].toString()).length;
			}
		}
		
	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.tickValues(tickController.getXTickArray(0,(xAxisData.length),largestStringLngth, (scaleWidth)));
	
	var xAxisTextRef = compareChartMainGroup.append("g")
							.attr('id','xAxis')
							.attr("class", "x axis")
							.attr('fill',"none")
							.attr("transform", "translate("+0+"," + scaleHeight + ")")
							.call(xAxis);
			xAxisTextRef.selectAll('text')
							 .text(function(d){return xAxisData[d];})
							 .style('font-size',fontSize)
							 .attr('font-family',fontFamily)
							 .attr('fill','black');

	   
//xAxis label here	

var pixcelPerChar=6;
var totalXLabelPixcel=xAxisLabel.toString().length*pixcelPerChar;
var xIndicationLabelTop=scaleHeight+(compareAnalChart.bottom - 5);
var xIndicationLabelLeft=scaleWidth/2-totalXLabelPixcel/2;
axisLabelController.appendLabel(xAxisLabel,xIndicationLabelLeft,xIndicationLabelTop,0,compareChartMainGroup,"black",350,fontFamily);			   							
										
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.tickValues(tickController.getTickArray(yMin,yMax,8));
	
	compareChartMainGroup.append("g")
					.attr('id','yAxis')
					.attr("class", "y axis")
					.attr('fill',"none")
					.attr("transform", "translate("+(0)+"," + 0 + ")")
					.call(yAxis)
					.selectAll('text')
					.style('font-size',fontSize)
					.style('font-family',fontFamily)
					.attr('fill','black');
	

//yAxis label here					
var totalYLabelPixcel=yAxisLabel.toString().length*pixcelPerChar;			
var yIndicationLabelTop=scaleHeight/2+totalYLabelPixcel/2;
var yIndicationLabelLeft=(-compareAnalChart.left + 15);
axisLabelController.appendLabel(yAxisLabel,yIndicationLabelLeft,yIndicationLabelTop,-90,compareChartMainGroup,"black",350,fontFamily);			   													   
		
	var estimateRectGroupRef = compareChartMainGroup
								.selectAll('.rect')
								.data(yAxisEstimateData)
								.enter()
								.append('rect')
								.attr('width',estimateDataBarWidth)
								.attr('height',0)
								.attr('x',function(d,i){return xScale(i)-(estimateDataBarWidth/2)})
								.attr('y',scaleHeight)
								.attr('fill','#000000')
								.attr("opacity",0.2)
								.on("mousemove",function()
								{
									var x = d3.event.pageX;
									var y = d3.event.pageY;
								//	x=x-(leftMarginOfSvg+compareAnalChart.left);
									x = Math.round(xScale.invert(x));
									
									var heading=xAxisData[x];
									var yAxisEstimateVal = yAxisEstimateData[x] + " "+yAxisUnit;
									var yAxisActualVal = yAxisActualData[x] + " "+yAxisUnit;
									var yHeadingValueMap=[{"headingName":yAxisEstimateDataUnit+" "+yAxisLabel,"headingVal":yAxisEstimateVal},
														  {"headingName":yAxisActualDataUnit+" "+yAxisLabel,"headingVal":yAxisActualVal}
														  ];
									
							//		toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.90);	
									
								})
								.on("mouseleave",function(){
								//	toolTipManager.hideTooTip();
								});
			estimateRectGroupRef
					.transition()
					.duration(1500)
					.attr('height',function(d,i){return yScale(yMin)-yScale(d)})
					.attr('y',function(d,i){return yScale(d)});
					
var gradient = compareChartMainGroup.append("svg:defs")
			.append("svg:linearGradient")
			.attr("id", "gradient")
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

			gradient.append("svg:stop")
			.attr("offset", "0%")
			.attr("stop-color", "#bfefee")
			.attr("stop-opacity", 1);

			gradient.append("svg:stop")
			.attr("offset", "50%")
			.attr("stop-color", "#79d1cf")
			.attr("stop-opacity", 1);
			
			 gradient.append("svg:stop")
			.attr("offset", "100%")
			.attr("stop-color", "#bfefee")
			.attr("stop-opacity", 1);

	
	var actualDataBarWidth =  (scaleWidth/(3.5*xAxisData.length));
	
	var actualRectGroupRef = compareChartMainGroup
								.selectAll('.rect')
								.data(yAxisActualData)
								.enter()
								.append('rect')
								.attr('width',actualDataBarWidth)
								.attr('height',0)
								.attr('x',function(d,i){return xScale(i)-(actualDataBarWidth/2)})                               
								.attr('y',scaleHeight)
							//	.attr('fill','#ff7f0e');
								.attr('fill',"url(#gradient)")
								.on("mouseover",function()
								{
									d3.select(this).attr('fill',"#3e9ad9");
								})
								.on("mousemove",function()
								{
									var x = d3.event.pageX;
									var y = d3.event.pageY;
						//			x=x-(leftMarginOfSvg+compareAnalChart.left);
									x = Math.round(xScale.invert(x));
									
									var heading=xAxisData[x];
									var yAxisEstimateVal = yAxisEstimateData[x] + " "+yAxisUnit;
									var yAxisActualVal = yAxisActualData[x] + " "+yAxisUnit;
									var yHeadingValueMap=[{"headingName":yAxisEstimateDataUnit+" "+yAxisLabel,"headingVal":yAxisEstimateVal},
														  {"headingName":yAxisActualDataUnit+" "+yAxisLabel,"headingVal":yAxisActualVal}
														  ];
									
						//			toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.90);	
									
								})
								.on("mouseleave",function()
								{
							//		toolTipManager.hideTooTip();
									d3.select(this).attr('fill',"url(#gradient)");
								});
								
			actualRectGroupRef
					.transition()
					.duration(1500)
					.attr('height',function(d,i){return yScale(yMin)-yScale(d)})
					.attr('y',function(d,i){return yScale(d)});
					
			return svgElement;		
 }
 
 function draw3DPieChart(divId,data)
 {
	var dountData = data["Pie Data"];
	var dountKey = data["Pie Key"];
	var colorArray = data["Color"];
	var unit = data["Unit"];
	var factor = data["Factor"];
	var fontFamily = data["fontFamily"];
	var pieAnalChart;
	var fontSize;
	var pixcelPerChar;


	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr('id',"pieChartContainer")
						.attr("width", width)
						.attr("height", height);			
	
	if(width<500)
	{
		pixcelPerChar = 5.5;
		fontSize = 10;
		pieAnalChart={left:60,right:60,bottom:35,top:35,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	}
	else
	{
		pixcelPerChar = 7;
		fontSize = 12;
		pieAnalChart={left:width*0.1,right:width*0.1,bottom:height*0.15,top:height*0.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	}	
	var scaleWidth=width-pieAnalChart.left-pieAnalChart.right;
	var scaleHeight=height-pieAnalChart.top-pieAnalChart.bottom;
	
	var  pieMainGroup = svgElement.append("g")
							   .attr('class','main-group')
							   .attr("transform", "translate(" + pieAnalChart.left + "," + pieAnalChart.top + ")");
							   
	var dountPieGroup = 	pieMainGroup.append("g")
								.attr('class','dountPie')
								.attr("transform", "translate(" + (scaleWidth/2) + "," + (scaleHeight/2) + ")");

	var grad = Math.PI/180;							
	var dist = 0;
	
	var dountDataSum = 0
	for(var index = 0;index<dountData.length;index++)
	{
		dountDataSum = dountDataSum+parseInt(dountData[index]);
	}
			
	var radiusX = scaleHeight < scaleWidth ? scaleHeight : scaleWidth;
				 radiusX = radiusX *.45;
	
	var radiusY = radiusX*.75;
	
	var h=25,innerRadius=0;
								
	var pie = d3.layout.pie().sort(null).value(function(d) {return d;})	
				
	dountPieGroup.selectAll(".innerSlice").data(pie(dountData)).enter().append("path").attr("class", "innerSlice")
		.style("fill", function(d,i) { return colorArray[i]; })
		.attr("d",function(d){ return pieInner(d, radiusX,radiusY, h, innerRadius);})
		.attr('transform', function (d,i) 
		{
			d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
			var x = Math.cos(d.midAngle) * dist;
			var y = Math.sin(d.midAngle) * dist;
			return 'translate(' + x + ',' + y + ')';
		})
		.transition().duration(1500).attrTween("d",arcTweenInner)
		
	dountPieGroup.selectAll(".topSlice").data(pie(dountData)).enter().append("g").attr("class", "topSlice")  
		.style("fill", function(d,i) { return colorArray[i]; })
		.style("stroke", function(d,i) {return colorArray[i]; })
		.append('path')
		.attr('value',function(d,i){return i})
		.attr("d",function(d){return pieTop(d, radiusX, radiusY, innerRadius);})
		.attr('transform', function (d,i) 
		{
			d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
			var x = Math.cos(d.midAngle) * dist;
			var y = Math.sin(d.midAngle) * dist;
			return 'translate(' + x + ',' + y + ')';
		})
		.on("mouseover",function()
		{
			var index = d3.select(this).attr('value');
			var xPosition = d3.select("#text"+index).attr('x');
			d3.select("#text"+index).attr('x',function(){
				if(xPosition>0){ return xPosition-10+20}
				else{ return xPosition-10}	
			})
			.style('font-weight',600)
		})
		.on("mouseout",function()
		{
			var index = d3.select(this).attr('value');
			var xPosition = d3.select("#text"+index).attr('x');
			d3.select("#text"+index).attr('x',function(){
				if(xPosition>0){ return xPosition-10}
				else{ return xPosition-10+20}	
			})
			.style('font-weight','normal')
		})
		.on("mousemove",function(d,i)
		{
			
			var index = d3.select(this).attr('value');
			var heading=dountKey[index];
			var dountValue = getpercentageForToolTip(index);
			var yHeadingValueMap=[{"headingName":factor,"headingVal":dountValue}
								  
								  ];
			
		//	toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.96);	
			
		})
		.on("mouseleave",function(){
		//	toolTipManager.hideTooTip();
		})
		.transition().duration(1500).attrTween("d",arcTweenTop);	
		
	dountPieGroup.selectAll(".outerSlice").data(pie(dountData)).enter().append("path").attr("class", "outerSlice")
		.style("fill", function(d,i) { return colorArray[i]; })
		.attr("d",function(d){ return pieOuter(d, radiusX,radiusY, h);})
		.attr('transform', function (d,i) 
		{
			
			d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
			var x = Math.cos(d.midAngle) * dist;
			var y = Math.sin(d.midAngle) * dist;
			return 'translate(' + x + ',' + y + ')';
		})
		.transition().duration(1500).attrTween("d",arcTweenOuter);

				
	dountPieGroup.selectAll(".percent").data(pie(dountData)).enter().append("text").attr("class", "percent")
		.attr("x",function(d){ return 0.6*radiusX*Math.cos(0.5*(d.startAngle+d.endAngle));})
		.attr("y",function(d){ return 0.6*radiusY*Math.sin(0.5*(d.startAngle+d.endAngle));})
		.text(function(d,i){ return getpercentage(d,i)});		
		
	var x1,y1;
	//	text here
	
	var lineFunction = d3.svg.line()
						.x(function(d,i) {return xCoordinate[i]; })
						.y(function(d,i) {return yCoordinate[i]; })
				
	
	var xCoordinate = [];
	var yCoordinate = [];
	

	var theta , totalTheta = 0 , tempTheta;
	for(var index = 0 ; index<dountData.length;index++)
	{
								
		theta = ((dountData[index])/dountDataSum)*360;
		tempTheta = totalTheta;
		totalTheta = totalTheta + theta;
		tempTheta = (tempTheta + totalTheta)/2;
		
		
		xCoordinate[0] = ((radiusX*.98) * (Math.cos(tempTheta * (Math.PI / 180))));		
		yCoordinate[0] = ((radiusY*.98) * (Math.sin(tempTheta * (Math.PI / 180))));
	
		xCoordinate[1] = ((radiusX*1.35) * (Math.cos(tempTheta * (Math.PI / 180))));
		yCoordinate[1] = ((radiusY*1.35) * (Math.sin(tempTheta * (Math.PI / 180))));
		
		xCoordinate[2] = xCoordinate[1] + ((radiusX*.2) * (Math.cos(tempTheta * (Math.PI / 180))));
		yCoordinate[2] = yCoordinate[1];
	
		dountPieGroup.selectAll(".path")
						 .data([xCoordinate])
						 .enter()
						 .append("path")
						 .attr("d", lineFunction)	  
						 .attr("stroke-width", 1)
						 .attr("fill",'none')
						 .attr('stroke',colorArray[index])
	
		dountPieGroup.append('text')
					 .attr('id',function(){return "text"+index})
					 .attr('x',function()
					 { if(xCoordinate[2]>0){return xCoordinate[2]}
						else{return xCoordinate[2]-(dountKey[index].length*pixcelPerChar)}
					 })
					 .attr('y',yCoordinate[2]+3)
					 .attr('fill',colorArray[index])
					 .style('font-size',fontSize+'px')
					 .attr("font-family",fontFamily)
					 .text(function(){ return dountKey[index];})
		
	}
	
		function pieTop(d, rx, ry, ir )
		{
		//	alert(JSON.stringify(d))
		//	alert("top  "+ d +"   "+ rx+"   " +ry+"   "+ ir)
		
		if(d.endAngle - d.startAngle == 0 )
		{	
			return "M 0 0";
		}
	//	alert(d.startAngle)
		var sx = rx*Math.cos(d.startAngle),
			sy = ry*Math.sin(d.startAngle),
			ex = rx*Math.cos(d.endAngle),
			ey = ry*Math.sin(d.endAngle);
			
//		alert(sx + "   " + sy+"  " + ex+"  "+ey)	
			
		var ret =[];
		ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
		ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
		return ret.join(" ");

	}

	function pieOuter(d, rx, ry, h ){
		var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
		
		var sx = rx*Math.cos(startAngle),
			sy = ry*Math.sin(startAngle),
			ex = rx*Math.cos(endAngle),
			ey = ry*Math.sin(endAngle);
			
			var ret =[];
			ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
			return ret.join(" ");
	}

	function pieInner(d, rx, ry, h, ir ){
		var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
		
		var sx = ir*rx*Math.cos(startAngle),
			sy = ir*ry*Math.sin(startAngle),
			ex = ir*rx*Math.cos(endAngle),
			ey = ir*ry*Math.sin(endAngle);

			var ret =[];
			ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
			return ret.join(" ");
	}
	
	function getpercentage(d,index)
	{
		
		return (d.endAngle-d.startAngle > 0.2 ? 
			Math.round((dountData[index]/dountDataSum)*100)+unit : '');
	}
			
			
	function getpercentageForToolTip(index)
	{
		return  Math.round((dountData[index]/dountDataSum)*100)+unit;
	}
	
	function arcTweenInner(d) 
	{
		 var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
		 return function (call) {
		  return pieInner(i(call),radiusX,radiusY,h,innerRadius);
	 };
	}		
	
	function arcTweenTop(d) 
	{
		var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
		return function (call) {
		return pieTop(i(call),radiusX,radiusY,innerRadius);
	 };
	}		
	
	function arcTweenOuter(d) 
	{
	   var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
	   return function (call) 
	 {
	  return pieOuter(i(call),radiusX,radiusY,h);
	 };
	}

	return svgElement;	
 }
 
 function draw3DDountChart(divId,data)
 {
	
	var dountData = data["Dount Data"];
	var dountKey = data["Dount key"];
	var colorArray = data["Color"];
	var unit = data["Unit"];
	var factor = data["Factor"];
	var fontFamily = data["fontFamily"];
	var pieAnalChart;
	var fontSize;
	var pixcelPerChar;
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr('id',"dountChartContainer")
						.attr("width", width)
						.attr("height", height);	
	
	if(width<500)
	{
		pixcelPerChar = 5.5;
		fontSize = 10;
		pieAnalChart={left:60,right:60,bottom:35,top:35,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	}
	else
	{
		pixcelPerChar = 7;
		fontSize = 12;
		pieAnalChart={left:width*0.1,right:width*0.1,bottom:height*0.15,top:height*0.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	}
	var scaleWidth=width-pieAnalChart.left-pieAnalChart.right;
	var scaleHeight=height-pieAnalChart.top-pieAnalChart.bottom;
	
	var  pieMainGroup = svgElement.append("g")
							   .attr('class','main-group')
							   .attr("transform", "translate(" + pieAnalChart.left + "," + pieAnalChart.top + ")");
							   
	var dountPieGroup = 	pieMainGroup.append("g")
								.attr('class','dountPie')
								.attr("transform", "translate(" + (scaleWidth/2) + "," + (scaleHeight/2) + ")");

	
	var grad = Math.PI/180;							
	var dist = 0;
	
	var dountDataSum = 0
	for(var index = 0;index<dountData.length;index++)
	{
		dountDataSum = dountDataSum+parseInt(dountData[index]);
	}
			
	var radiusX = scaleHeight < scaleWidth ? scaleHeight : scaleWidth;
				 radiusX = radiusX *.45;
	
	var radiusY = radiusX*.75;
	
	var h=25,innerRadius=0.75;
								
	var pie = d3.layout.pie().sort(null).value(function(d) {return d;})
							
	
	
	dountPieGroup.selectAll(".innerSlice").data(pie(dountData)).enter().append("path").attr("class", "innerSlice")
		.style("fill", function(d,i) { return colorArray[i]; })
		.attr("d",function(d){ return pieInner(d, radiusX,radiusY, h, innerRadius);})
		.attr('transform', function (d,i) 
		{
			d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
			var x = Math.cos(d.midAngle) * dist;
			var y = Math.sin(d.midAngle) * dist;
			return 'translate(' + x + ',' + y + ')';
		})
		.transition().duration(1500).attrTween("d",arcTweenInner)
		
	dountPieGroup.selectAll(".topSlice").data(pie(dountData)).enter().append("g").attr("class", "topSlice")  
		.style("fill", function(d,i) { return colorArray[i]; })
		.style("stroke", function(d,i) {return colorArray[i]; })
		.append('path')
		.attr('value',function(d,i){return i})
		.attr("d",function(d){return pieTop(d, radiusX, radiusY, innerRadius);})
		.attr('transform', function (d,i) 
		{
			d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
			var x = Math.cos(d.midAngle) * dist;
			var y = Math.sin(d.midAngle) * dist;
			return 'translate(' + x + ',' + y + ')';
		})
		.on("mouseover",function()
		{
			var index = d3.select(this).attr('value');
			var xPosition = d3.select("#text"+index).attr('x');
			d3.select("#text"+index).attr('x',function(){
				if(xPosition>0){ return xPosition-10+20}
				else{ return xPosition-10}	
			})
			.style('font-weight',600)
			
		})
		.on("mouseout",function()
		{
			var index = d3.select(this).attr('value');
			var xPosition = d3.select("#text"+index).attr('x');
			d3.select("#text"+index).attr('x',function(){
				if(xPosition>0){ return xPosition-10}
				else{ return xPosition-10+20}	
			})
			.style('font-weight','normal')
		})
		.on("mousemove",function()
		{
			var index = d3.select(this).attr('value');
			var heading=dountKey[index];
			var dountValue = getpercentage(index);
			var yHeadingValueMap=[{"headingName":factor,"headingVal":dountValue}
								  
								  ];
			
		//	toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.96);	
			
		})
		.on("mouseleave",function(){
		//	toolTipManager.hideTooTip();
		})
		.transition().duration(1500).attrTween("d",arcTweenTop);	
		
	dountPieGroup.selectAll(".outerSlice").data(pie(dountData)).enter().append("path").attr("class", "outerSlice")
		.style("fill", function(d,i) { return colorArray[i]; })
		.attr("d",function(d){ return pieOuter(d, radiusX,radiusY, h);})
		.attr('transform', function (d,i) 
		{
			
			d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
			var x = Math.cos(d.midAngle) * dist;
			var y = Math.sin(d.midAngle) * dist;
			return 'translate(' + x + ',' + y + ')';
		})
		.transition().duration(1500).attrTween("d",arcTweenOuter);

		/*		
	dountPieGroup.selectAll(".percent").data(pie(dountData)).enter().append("text").attr("class", "percent")
		.attr("x",function(d){ return 0.6*radiusX*Math.cos(0.5*(d.startAngle+d.endAngle));})
		.attr("y",function(d){ return 0.6*radiusY*Math.sin(0.5*(d.startAngle+d.endAngle));})
		.text(function(d,i){ return getpercentage(d,i)});		
		*/
	var x1,y1;
	//	text here
	
	var lineFunction = d3.svg.line()
						.x(function(d,i) {return xCoordinate[i]; })
						.y(function(d,i) {return yCoordinate[i]; })
				
	
	var xCoordinate = [];
	var yCoordinate = [];
	

	var theta , totalTheta = 0 , tempTheta;
	for(var index = 0 ; index<dountData.length;index++)
	{
								
		theta = ((dountData[index])/dountDataSum)*360;
		tempTheta = totalTheta;
		totalTheta = totalTheta + theta;
		tempTheta = (tempTheta + totalTheta)/2;
		
		
		xCoordinate[0] = ((radiusX*.98) * (Math.cos(tempTheta * (Math.PI / 180))));		
		yCoordinate[0] = ((radiusY*.98) * (Math.sin(tempTheta * (Math.PI / 180))));
	
		xCoordinate[1] = ((radiusX*1.35) * (Math.cos(tempTheta * (Math.PI / 180))));
		yCoordinate[1] = ((radiusY*1.35) * (Math.sin(tempTheta * (Math.PI / 180))));
		
		xCoordinate[2] = xCoordinate[1] + ((radiusX*.2) * (Math.cos(tempTheta * (Math.PI / 180))));
		yCoordinate[2] = yCoordinate[1];
	
		dountPieGroup.selectAll(".path")
						 .data([xCoordinate])
						 .enter()
						 .append("path")
						 .attr("d", lineFunction)	  
						 .attr("stroke-width", 1)
						 .attr("fill",'none')
						 .attr('stroke',colorArray[index])
	
		dountPieGroup.append('text')
					 .attr('id',function(){return "text"+index})
					 .attr('x',function()
					 { if(xCoordinate[2]>0){return xCoordinate[2]}
						else{return xCoordinate[2]-((dountKey[index].length+getpercentage(index).length+1)*pixcelPerChar)}
					 })
					 .attr('y',yCoordinate[2]+3)
					 .attr('fill',colorArray[index])
					 .style('font-size',fontSize+'px')
					 .attr("font-family",fontFamily)
					 .text(function(){ return getpercentage(index)+" "+dountKey[index];})
		
	}
	
	function pieTop(d, rx, ry, ir )
	{
	//	alert(JSON.stringify(d))
	//	alert("top  "+ d +"   "+ rx+"   " +ry+"   "+ ir)
	
	if(d.endAngle - d.startAngle == 0 )
	{	
		return "M 0 0";
	}
//	alert(d.startAngle)
	var sx = rx*Math.cos(d.startAngle),
		sy = ry*Math.sin(d.startAngle),
		ex = rx*Math.cos(d.endAngle),
		ey = ry*Math.sin(d.endAngle);
		
//		alert(sx + "   " + sy+"  " + ex+"  "+ey)	
		
	var ret =[];
	ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
	ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
	return ret.join(" ");

}

	function pieOuter(d, rx, ry, h ){
		var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
		
		var sx = rx*Math.cos(startAngle),
			sy = ry*Math.sin(startAngle),
			ex = rx*Math.cos(endAngle),
			ey = ry*Math.sin(endAngle);
			
			var ret =[];
			ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
			return ret.join(" ");
	}

	function pieInner(d, rx, ry, h, ir ){
		var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
		
		var sx = ir*rx*Math.cos(startAngle),
			sy = ir*ry*Math.sin(startAngle),
			ex = ir*rx*Math.cos(endAngle),
			ey = ir*ry*Math.sin(endAngle);

			var ret =[];
			ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
			return ret.join(" ");
	}

	function getpercentage(index)
	{
		return Math.round((dountData[index]/dountDataSum)*100)+unit;
	}

	function arcTweenInner(d) 
	{
		 var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
		 return function (call) {
		  return pieInner(i(call),radiusX,radiusY,h,innerRadius);
	 };
	}		

	function arcTweenTop(d) 
	{
		var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
		return function (call) {
		return pieTop(i(call),radiusX,radiusY,innerRadius);
	 };
	}		

	function arcTweenOuter(d) {
	   var i = d3.interpolate({startAngle: -180*grad, endAngle: -180*grad},d);
	 return function (call) 
	 {
	  return pieOuter(i(call),radiusX,radiusY,h);
	 };
	}
	
	return svgElement;
}

function draw3DFunnelChart(divId,data)
{
	var funnelData = data["Funnel Data"];
	var funnelKey = data["Funnel Key"];
	var colorArray = data["Color"];
	var unit=data["Unit"];
	var label=data["label"];
	var fontFamily = data["fontFamily"];
	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr("id","threeDFunnelContaner")
						.attr("width", width)
						.attr("height", height);	
	
	var FunnelAnalChart={left:width*0.1,right:width*0.1,bottom:height*0.15,top:height*0.1,chartSeparator:10,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	var scaleWidth=width-FunnelAnalChart.left-FunnelAnalChart.right;
	var scaleHeight=height-FunnelAnalChart.top-FunnelAnalChart.bottom;
		
	
	var funnelChartMainGroup = svgElement.append("g")
					   .attr('class','main-group')
					   .attr("transform", "translate(" + FunnelAnalChart.left + "," + FunnelAnalChart.top + ")")

	var funnelClosedPath = d3.svg.line()
							 .x(function(d,i) {return funnelPathXCoordinate[i]; })
							 .y(function(d,i) {return funnelPathYCoordinate[i]; })                         
							 .interpolate("basis-closed");
			 
	var funnelPath = d3.svg.line()
						 .x(function(d,i) {return funnelPathXCoordinate[i]; })
						 .y(function(d,i) {return funnelPathYCoordinate[i]; }) 									 
			//			 .interpolate("basis-closed");
			
	var transitionPath = d3.svg.line()
						 .x(function(d,i) {return transitionXData[i]; })
						 .y(function(d,i) {return transitionYData[i]; }) 

	var funnelLowerClosedPath = d3.svg.line()
						 .x(function(d,i) {return funnelXCoordinateOfBelowPath[i]; })
						 .y(function(d,i) {return funnelYCoordinateOfBelowPath[i]; }) 
						 .interpolate("basis-closed");
			 
	var transitionXData = [scaleWidth/2,scaleWidth/2,scaleWidth/2,scaleWidth/2];
	var transitionYData = [scaleHeight+40,scaleHeight+40,scaleHeight+40,scaleHeight+40];
	var ProductSum = 0;
	var heightOfProduct = 0;
	var rectXPosition; 
	var rectYPosition;
	var rectWidth; 
	var funnelPathXCoordinate = [];
	var funnelPathYCoordinate = [];

	var funnelXCoordinateOfBelowPath = [];
	var funnelYCoordinateOfBelowPath = [];
	var scaleWidthForFunnel = (scaleWidth*.6);
	var x1 = ((scaleWidth/2)-(scaleWidthForFunnel/2));
	var y1 = 0;
	var x4;
	for(var i = 0 ; i<funnelData.length; i++)
	{
		ProductSum = ProductSum + parseInt(funnelData[i]);
	}
	var scaleHeightWithSeparator = (scaleHeight+(funnelData.length*FunnelAnalChart.chartSeparator));
	var rad = (scaleHeightWithSeparator/(scaleWidthForFunnel/2));
	var degree = Math.atan(rad) * (180 / Math.PI);		

	var angleValue = Math.tan(toRadians(degree));

	function toRadians (angle) 
	{
	  return angle * (Math.PI / 180);
	}			

	var JsonXArray = {};
	var JsonYArray = {};				
	for(var index = 0 ; index<funnelData.length; index++)
	{
		
		funnelPathXCoordinate = [];      
		funnelPathYCoordinate = []; 
		funnelXCoordinateOfBelowPath = [];
		funnelYCoordinateOfBelowPath = [];
		heightOfProduct = (funnelData[index]/ProductSum);
	  
		var x2;
		 if(index!=funnelData.length-1)
		 {
			x2 = Math.abs(((scaleHeightWithSeparator*heightOfProduct)/angleValue));
		 }
		 else
		 {
			x2 = Math.abs(((scaleHeightWithSeparator*heightOfProduct)/2)/angleValue);
		 }
		 x4 = (((scaleWidth/2)-x1)*2)+x1;
		 
		 //set Coordinate of linear path
		 funnelPathXCoordinate.push(x1);
		 funnelPathXCoordinate.push(x1+x2);
		 funnelPathXCoordinate.push(x4-(funnelPathXCoordinate[1]-x1));
		 funnelPathXCoordinate.push(x4); 
		 
		 funnelPathYCoordinate.push(y1);
		 if(index!=funnelData.length-1)
		 {
			funnelPathYCoordinate.push(y1+(scaleHeight*heightOfProduct));
			funnelPathYCoordinate.push(y1+(scaleHeight*heightOfProduct));
		 }
		 else
		 {
			funnelPathYCoordinate.push(y1+((scaleHeight*heightOfProduct)/2));
			funnelPathYCoordinate.push(y1+((scaleHeight*heightOfProduct)/2));
		 }
		 funnelPathYCoordinate.push(y1);
		 
		 funnelChartMainGroup.append("linearGradient")				
			.attr("id", "gradient")			
			.attr("gradientUnits", "userSpaceOnUse")	
			.attr("x1",funnelPathXCoordinate[0])
			.attr("y1",funnelPathYCoordinate[0])			
			.attr("x2",funnelPathXCoordinate[3])
			.attr("y2", funnelPathYCoordinate[2])		
			.selectAll("stop")						
			.data([								
				{offset: "15%", color: colorArray[index]},		
			//    {offset: "40%", color: colorArrayLinearPath[index]},	
		   //     {offset: "40%", color: "#ffffff"},		
				{offset: "62%", color: "#eaeaea"},		
		   //     {offset: "62%", color: colorArrayLinearPath[index]},	
				{offset: "85%", color: colorArray[index]}	
			])					
			.enter().append("stop")			
			.attr("offset", function(d) { return d.offset; })	
			.attr("stop-color", function(d) { return d.color; });

		 var lineGraph1 = funnelChartMainGroup.selectAll(".path")
							 .data([transitionXData])
							 .enter()   
							 .append("path")
							 .attr("d", transitionPath)
							 .attr("value",index)
							 .attr("stroke-width", 1)
							 .attr("fill","url(#gradient)")
							 .on("mouseover",function(){
								 
								   var keyIndex = d3.select(this).attr('value');
								   var sum = 0;
								   for(var index = 0;index<funnelData.length;index++)
								   {
									sum = sum + funnelData[index];
								   }
								   var percentage = Math.round(((funnelData[keyIndex])/sum)*100);
								   var yHeadingValueMap=[{"headingName":label,"headingVal":percentage + " " +unit}];
									  
								//	toolTipManager.showToolTip(d3.event,"",(funnelKey[keyIndex]), false,yHeadingValueMap,d3.event.pageY*.90); 
							   })
							  .on("mouseleave",function(){
									//  toolTipManager.hideTooTip();
							   });
							   
			lineGraph1.transition().duration(1000).ease("linear")
							 .attr("d", funnelPath(funnelPathXCoordinate))
							  
							 
							 
		// set horizontal Line here
			funnelChartMainGroup.append('line')
								.attr('class','horizontalLine')
								.attr('x1',function(){return ((funnelPathXCoordinate[3]+funnelPathXCoordinate[2])/2)+5})
								.attr('y1',function(){
								if(index!=funnelData.length-1)
								{return ((funnelPathYCoordinate[3]+funnelPathYCoordinate[2])/2)}
								else
								{
									return funnelPathYCoordinate[2];
								}})
								.attr('x2',function(){return ((scaleWidth/2)+(scaleWidthForFunnel/2))})
								.attr('y2',function(){
								if(index!=funnelData.length-1)
								{return ((funnelPathYCoordinate[3]+funnelPathYCoordinate[2])/2)}
								else
								{
									return funnelPathYCoordinate[2];
								}})
								.style("stroke","#a7a7a7");
			
		// set text here
		 funnelChartMainGroup.append('text')
								.attr('class','text')
								.attr('x',function(){return ((scaleWidth/2)+(scaleWidthForFunnel/2))+5})
								.attr('y',function(){
								if(index!=funnelData.length-1)
								{return ((funnelPathYCoordinate[3]+funnelPathYCoordinate[2])/2)+3}
								else
								{
									return funnelPathYCoordinate[2]+3;
								}})
								.text(funnelKey[index])
								.attr("font-size",15)
								.style("font-family",fontFamily);
								
		x1 = funnelPathXCoordinate[1]+2;  
		y1 = funnelPathYCoordinate[1]+FunnelAnalChart.chartSeparator;
		
		//set cordinate for lower closed path
		funnelXCoordinateOfBelowPath[0] = funnelPathXCoordinate[1];
		funnelXCoordinateOfBelowPath[2] = funnelPathXCoordinate[2]; 
		funnelXCoordinateOfBelowPath[1] = (funnelPathXCoordinate[1] + funnelPathXCoordinate[2])/2;
		funnelXCoordinateOfBelowPath[3]= funnelXCoordinateOfBelowPath[1];
		var closedPathSharinkValue1 = (funnelXCoordinateOfBelowPath[1]-funnelXCoordinateOfBelowPath[0])/2;
		funnelXCoordinateOfBelowPath[0] = funnelXCoordinateOfBelowPath[0] - closedPathSharinkValue1;
		funnelXCoordinateOfBelowPath[2] = funnelXCoordinateOfBelowPath[2] + closedPathSharinkValue1;
		
		funnelYCoordinateOfBelowPath[0] = funnelPathYCoordinate[1];
		funnelYCoordinateOfBelowPath[1] = funnelYCoordinateOfBelowPath[0]-10;
		funnelYCoordinateOfBelowPath[2] = funnelPathYCoordinate[1];
		funnelYCoordinateOfBelowPath[3] = funnelYCoordinateOfBelowPath[0]+10;
		
		//store Value of Lower closed path
		JsonXArray[index] = funnelXCoordinateOfBelowPath;
		JsonYArray[index] = funnelYCoordinateOfBelowPath;

		rectXPosition = funnelPathXCoordinate[1];
		rectYPosition = funnelPathYCoordinate[1]
		rectWidth = funnelPathXCoordinate[2]-funnelPathXCoordinate[1];
		//set cordinate for upper closed path
		funnelPathXCoordinate[2] = funnelPathXCoordinate[3];
		funnelPathXCoordinate[1] = (funnelPathXCoordinate[0] + funnelPathXCoordinate[2])/2;  
		funnelPathXCoordinate[3] = funnelPathXCoordinate[1];
		var closedPathSharinkValue2 = (funnelPathXCoordinate[1]-funnelPathXCoordinate[0])/2;
		funnelPathXCoordinate[0] = funnelPathXCoordinate[0] - closedPathSharinkValue2;
		funnelPathXCoordinate[2] = funnelPathXCoordinate[2] + closedPathSharinkValue2;
		
		funnelPathYCoordinate[1] = funnelPathYCoordinate[0]-10;
		funnelPathYCoordinate[2] = funnelPathYCoordinate[0];
		funnelPathYCoordinate[3] = funnelPathYCoordinate[0]+10; 

		var lineGraph3 = funnelChartMainGroup.selectAll(".path")
							 .data([funnelPathXCoordinate])
							 .enter()
							 .append("path")
							 .attr("d", funnelClosedPath)	  
							 .attr("stroke-width", 1)
							 .attr("fill", function(){return colorArray[index]});
	//		lineGraph3.transition().duration(1000).ease("linear")
		//					 .attr("d", funnelClosedPath(funnelPathXCoordinate));			
		 

		 
	}

	for(var index = 0;index<funnelData.length;index++)
	{
		funnelXCoordinateOfBelowPath = JsonXArray[index];
		funnelYCoordinateOfBelowPath = JsonYArray[index];
		
	 funnelChartMainGroup.append("linearGradient")				
			.attr("id", "gradient1")	
			.attr("gradientUnits", "userSpaceOnUse")	
			.attr("x1",funnelXCoordinateOfBelowPath[0])
			.attr("y1",funnelYCoordinateOfBelowPath[1])			
			.attr("x2",funnelXCoordinateOfBelowPath[2])
			.attr("y2", funnelYCoordinateOfBelowPath[3])		
			.selectAll("stop")						
			.data([								
				{offset: "15%", color: colorArray[index]},		
			//    {offset: "40%", color: colorArrayLinearPath[index]},	
		   //     {offset: "40%", color: "#ffffff"},		
				{offset: "62%", color: "#eaeaea"},		
		   //     {offset: "62%", color: colorArrayLinearPath[index]},	
				{offset: "85%", color: colorArray[index]}	
			])					
			.enter().append("stop")			
			.attr("offset", function(d) { return d.offset; })	
			.attr("stop-color", function(d) { return d.color; });
		
		if(index!=funnelData.length-1)
		{
			var lineGraph2 = funnelChartMainGroup.selectAll(".path")
							 .data([funnelXCoordinateOfBelowPath])
							 .enter()
							 .append("path")
							 .attr("d", funnelLowerClosedPath)	  
							 .attr("stroke-width", 0)
							 .attr("fill","url(#gradient1)");
						//	 .attr("fill", function(){return colorArrayLinearPath[index]})
						//	 .attr("opacity",0.8);
		}
	}

		funnelChartMainGroup.append('rect')
							.attr('x',rectXPosition)
							.attr('y',rectYPosition)
							.attr('width',rectWidth)
							.attr('height',((scaleHeightWithSeparator*heightOfProduct)/2))
							.attr('fill',colorArray[index-1])
							
		return svgElement;					
}


function draw3DBarChart(divId,data)
{
	var yAxisData = data["Y Axis Data"];
	var xAxisData = data["X Axis Data"];
	var yAxisUnit = data["Y Axis Unit"];
	var yAxisLabel = data["Y Axis Label"];
	var xAxisLabel = data["X Axis Label"];
	var title = data["Title"];
	var barColor = data["Color"];
	var fontFamily = data["fontFamily"];
	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr('id',"threeDBarChartContainer")
						.attr("width", width)
						.attr("height", height);	
	
	var leftMargin = marginController.leftMarginController(yAxisData);
	var	compareAnalChart={left:leftMargin,right:width*.05,bottom:50,top:height*.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};

	var scaleWidth=width-compareAnalChart.left-compareAnalChart.right;
	var scaleHeight=height-compareAnalChart.top-compareAnalChart.bottom;
//	var leftMarginOfSvg = $(selectorElement).offset().left;	
	var barWidth =  (scaleWidth/(1.8*xAxisData.length));
	var upperPath;
	if(barWidth>60)
	{upperPath = barWidth*.3}
	else{upperPath = barWidth*.4};
	var xCoordinate = [];
	var yCoordinate = [];
	var fontSize =12;
	var xAxisTimeIndex = [];
	for(var counter = 0;counter<xAxisData.length ;counter++)
	{
		xAxisTimeIndex[counter] = counter;
	}

//		var svgElement = d3.select('body').append('svg').attr('width',980).attr('height',450);			
	
	var compareChartMainGroup = svgElement.append("g")
					   .attr('class','main-group')
					   .attr("transform", "translate(" + compareAnalChart.left + "," + compareAnalChart.top + ")")

	// title label here
	var pixcelPerChar = 8;
	var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
	var titleGroup = svgElement.append("g")
							   .attr('class','title')
	axisLabelController.appendLabel(title,leftIndicator,compareAnalChart.top/2,0,titleGroup,"black",500,fontFamily);
	
//	axisLabelController.appendLabel(title,compareAnalChart.left,-compareAnalChart.top/1.5,0,titleGroup,textStyleConfg.chartTitleColor,700);
	
	var pixcelPerChar = 7;
	// YAxis Label here
	var totalYLabelPixcel=yAxisLabel.toString().length*pixcelPerChar;
	var yIndicationLabelTop=scaleHeight/2+totalYLabelPixcel/2;
	var yIndicationLabelLeft=(-compareAnalChart.left+15);
	axisLabelController.appendLabel(yAxisLabel,yIndicationLabelLeft,yIndicationLabelTop,-90,compareChartMainGroup,"black",350,fontFamily);			   

	// xAxis label here
	var totalXLabelPixcel=xAxisLabel.toString().length*pixcelPerChar;
	var xIndicationLabelTop=scaleHeight+(compareAnalChart.bottom - 5);
	var xIndicationLabelLeft=scaleWidth/2-totalXLabelPixcel/2;
	axisLabelController.appendLabel(xAxisLabel,xIndicationLabelLeft,xIndicationLabelTop,0,compareChartMainGroup,"black",350,fontFamily);

	var horizontalLine = parseInt(scaleHeight/barWidth);
	
	var xScale = d3.scale.linear()
						 .domain([0,xAxisData.length-1])
						 .range([barWidth*.5,scaleWidth-(barWidth*.5)]); 
	var yMin = d3.min(yAxisData);
	var yMax = d3.max(yAxisData);
	
	if(yMax == 0){
		yMax =yMax +  2;
	}
	else{
		if(yMax>0){
			yMax =yMax* 1.2;
		}else{
			yMax =yMax * 0.8;
		}
	}
		
	if(yMin == 0){
		yMin =yMin - 2;
	}
	else{
		if(yMin<0){
			yMin =yMin* 1.5;
		}else{
			yMin =yMin * 0;
		}
	}
	
	var yScale = d3.scale.linear()
					.domain([yMin,yMax])
					.range([scaleHeight,0]);
			
//x axis
	var largestStringLngth=0;
		for(var counter =0 ;counter<xAxisData.length;counter++)
		{
			if(largestStringLngth<(xAxisData[counter].toString()).length)
			{
				largestStringLngth = (xAxisData[counter].toString()).length;
			}
		}
		
	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
			//	.tickValues(xAxisTimeIndex);
				.tickValues(tickController.getXTickArray(0,(xAxisData.length),largestStringLngth, (scaleWidth)));
	
	var xAxisTextRef = compareChartMainGroup.append("g")
							.attr('id','xAxis')
							.attr("class", "xAxis")
							.attr('fill',"none")
							.attr("transform", "translate("+0+"," + scaleHeight + ")")
							.call(xAxis);
				 xAxisTextRef.selectAll('text')
							 .text(function(d){return xAxisData[d];})
							 .style('font-size',fontSize)
							 .attr('font-family',fontFamily)
							 .attr('fill','black');
					
							 

	var yTickArray = tickController.getTickArray(yMin,yMax,8);							
									
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.tickValues(yTickArray);
	
	compareChartMainGroup.append("g")
					.attr('id','yAxis')
					.attr("class", "yAxis")
					.attr('fill',"none")
					.attr("transform", "translate("+0+"," + 0 + ")")
					.call(yAxis)
					.selectAll('text')
					.style('font-size',fontSize)
					.attr('font-family',fontFamily)
					.attr('fill','black');
					
	var lineFunction = d3.svg.line()
				.x(function(d,i) {return d; })
				.y(function(d,i) {return yCoordinate[i]; })
	
	var temp = d3.svg.line()
				.x(function(d,i) {return d; })
				.y(function(d,i) {return scaleHeight; })
	
	// grid line here
	var pathRef;
	
	for(var i = 0;i<yTickArray.length;i++)
	{
		xCoordinate[0] = 0;
		yCoordinate[0] =yScale(yTickArray[i]);
		
		xCoordinate[1] = upperPath;
		yCoordinate[1] =yScale(yTickArray[i])-20;
		
		xCoordinate[2] = scaleWidth;
		yCoordinate[2] =yCoordinate[1];
		
	pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr("d", lineFunction)	  
				 .attr("fill",'none')
				 .attr("stroke","gray")
/*				 
		//transition
	var totalLength = pathRef.node().getTotalLength();

	pathRef.attr("stroke-dasharray", function (d) {
	
		
			return totalLength + "," + totalLength;
	})
		.attr("stroke-dashoffset", totalLength)
		.transition()
		.duration(1000)
		.ease("linear")
		.attr("stroke-dashoffset", 0);		 */
	}
				
	
	for(var counter = 0;counter<yAxisData.length ; counter++)
	{
		
		//set coordinate for upper path
		xCoordinate[0] = xScale(counter)-(barWidth*.5);
		yCoordinate[0] = yScale(yAxisData[counter])+upperPath;
		
		xCoordinate[1] = xCoordinate[0] + (barWidth*.25);
		yCoordinate[1] = yCoordinate[0] - upperPath;
		
	
		
		xCoordinate[2] = xCoordinate[1]+barWidth;
		yCoordinate[2] = yCoordinate[1];
		
		xCoordinate[3] = xCoordinate[0]+barWidth;
		yCoordinate[3] = yCoordinate[0];
				
		pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",barColor)
		//		 .attr('opacity',0.7)
				 .attr('stroke',"lightsteelblue");
		
		//set coordinate for side path
		
		xCoordinate[0] = xCoordinate[3]; 
		yCoordinate[0] = yScale(yMin);
		
		xCoordinate[1] = xCoordinate[3]+(barWidth*.25); 
		yCoordinate[1] = yScale(yMin)-upperPath;
		
//		xCoordinate[4] = xCoordinate[0];
//		yCoordinate[4] = yCoordinate[0];
		
		pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",barColor)
		//		 .attr('opacity',0.7)
				 .attr('stroke',"lightsteelblue");
			   	 
				 
		xCoordinate[0] = xScale(counter)-(barWidth*.5);
		yCoordinate[0] = yScale(yMin);
		
		xCoordinate[1] = xCoordinate[0];
		yCoordinate[1] = yScale(yAxisData[counter])+upperPath;
		
		xCoordinate[2] = xCoordinate[1]+barWidth;
		yCoordinate[2] = yCoordinate[1];
		
		xCoordinate[3] = xCoordinate[2];
		yCoordinate[3] = yCoordinate[0];
		
	pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",barColor)
	//			 .attr('opacity',0.7)
				 .attr('stroke',"lightsteelblue");
					   
				
	}
	
	compareChartMainGroup.selectAll(".text")
						 .data(yAxisData)
						 .enter()
						 .append("text")
						 .attr("x",function(d,i){ return xScale(i)-(((d.toString().length)*4.5));})
						 .attr("y",function(d,i){ return yScale(d)-3;})
						 .attr("font-family",fontFamily)
						 .attr("font-size",14)
						 .text(function(d,i){return d;});

	return svgElement;					 
	
				
}

function draw3DComparisonChart(divId,data)
{
	var yAxisEstimateData = data["Y Axis EstimateData"];
	var yAxisActualData = data["Y Axis ActualData"];
	var xAxisData = data["X Axis Data"];
	var yAxisUnit = data["Y Axis Unit"];
	var yAxisLabel = data["Y Axis Label"];
	var xAxisLabel = data["X Axis Label"];
	var title = data["Title"];
	var yAxisActualDataUnit = data["Y Axis ActualData Unit"];
	var yAxisEstimateDataUnit = data["yAxisEstimateDataUnit"];
	var legendArray = data["Legend Array"];
	var fontFamily = data["fontFamily"];
	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr('id','threeDComparisionChart')
						.attr("width", width)
						.attr("height", height);
				
	var leftMargin = marginController.leftMarginController(yAxisEstimateData);
	var compareAnalChart = compareAnalChart={left:leftMargin,right:width*.05,bottom:50,top:height*.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	
	var scaleWidth=width-compareAnalChart.left-compareAnalChart.right;
	var scaleHeight=height-compareAnalChart.top-compareAnalChart.bottom;
//		var leftMarginOfSvg = $(selectorElement).offset().left;	
	var barWidth =  (scaleWidth/(2*xAxisData.length));
	var upperPath;
	if(barWidth>60)
	{upperPath = barWidth*.3}
	else{upperPath = barWidth*.4};
	var xCoordinate = [];
	var yCoordinate = [];
	var fontSize =12;
	var xAxisTimeIndex = [];
	for(var counter = 0;counter<xAxisData.length ;counter++)
	{
		xAxisTimeIndex[counter] = counter;
	}
//		var svgElement = d3.select('body').append('svg').attr('width',980).attr('height',450);			
	
	var compareChartMainGroup = svgElement.append("g")
					   .attr('class','main-group')
					   .attr("transform", "translate(" + compareAnalChart.left + "," + compareAnalChart.top + ")")

	// title label here
	var pixcelPerChar = 8;
	var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
	var titleGroup = svgElement.append("g")
							   .attr('class','title')
	axisLabelController.appendLabel(title,leftIndicator,compareAnalChart.top/2,0,titleGroup,"black",500,fontFamily);
	
//	axisLabelController.appendLabel(title,compareAnalChart.left,-compareAnalChart.top/1.5,0,titleGroup,textStyleConfg.chartTitleColor,700);
	
	var pixcelPerChar = 7;
	// YAxis Label here
	var totalYLabelPixcel=yAxisLabel.toString().length*pixcelPerChar;
	var yIndicationLabelTop=scaleHeight/2+totalYLabelPixcel/2;
	var yIndicationLabelLeft=(-compareAnalChart.left + 15);
	axisLabelController.appendLabel(yAxisLabel,yIndicationLabelLeft,yIndicationLabelTop,-90,compareChartMainGroup,"black",350,fontFamily);			   

	// xAxis label here
	var totalXLabelPixcel=xAxisLabel.toString().length*pixcelPerChar;
	var xIndicationLabelTop=scaleHeight+(compareAnalChart.bottom -5);
	var xIndicationLabelLeft=scaleWidth/2-totalXLabelPixcel/2;
	axisLabelController.appendLabel(xAxisLabel,xIndicationLabelLeft,xIndicationLabelTop,0,compareChartMainGroup,"black",350,fontFamily);

	var horizontalLine = parseInt(scaleHeight/barWidth);
	
	var xScale = d3.scale.linear()
						 .domain([0,xAxisData.length-1])
						 .range([barWidth*.8,scaleWidth-(barWidth*.8)]); 
						 
	var yMin = d3.min(yAxisEstimateData)<d3.min(yAxisActualData)?d3.min(yAxisEstimateData):d3.min(yAxisActualData);
	var yMax = d3.max(yAxisEstimateData)>d3.max(yAxisActualData)?d3.max(yAxisEstimateData):d3.max(yAxisActualData);
	
	if(yMax == 0){
		yMax =yMax +  2;
	}
	else{
		if(yMax>0){
			yMax =yMax* 1.2;
		}else{
			yMax =yMax * 0.8;
		}
	}
		
	if(yMin == 0){
		yMin =yMin - 2;
	}
	else{
		if(yMin<0){
			yMin =yMin* 1.5;
		}else{
			yMin =yMin * 0;
		}
	}
	
	var yScale = d3.scale.linear()
					.domain([yMin,yMax])
					.range([scaleHeight,0]);
			
//x axis
	var largestStringLngth=0;
		for(var counter =0 ;counter<xAxisData.length;counter++)
		{
			if(largestStringLngth<(xAxisData[counter].toString()).length)
			{
				largestStringLngth = (xAxisData[counter].toString()).length;
			}
		}
		
	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
			//	.tickValues()
				.tickValues(tickController.getXTickArray(0,(xAxisData.length),largestStringLngth, (scaleWidth)));
	
	var xAxisTextRef = compareChartMainGroup.append("g")
							.attr('id','xAxis')
							.attr("class", "xAxis")
							.attr('fill',"none")
							.attr("transform", "translate("+0+"," + scaleHeight + ")")
							.call(xAxis);
				 xAxisTextRef.selectAll('text')
							 .attr('fill','black')
							 .style('font-size',fontSize)
							 .style('font-family',fontFamily)
							 .text(function(d){return xAxisData[d];});
							 

	var yTickArray = tickController.getTickArray(yMin,yMax,8);							
									
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.tickValues(yTickArray);
	
	compareChartMainGroup.append("g")
					.attr('id','yAxis')
					.attr("class", "yAxis")
					.attr('fill',"none")
					.attr("transform", "translate("+(0)+"," + 0 + ")")
					.call(yAxis)
					.selectAll('text')
					.style('font-size',fontSize)
					.style('font-family',fontFamily)
					.attr('fill','black');
					
	var lineFunction = d3.svg.line()
				.x(function(d,i) {return d; })
				.y(function(d,i) {return yCoordinate[i]; })
	
	var temp = d3.svg.line()
				.x(function(d,i) {  return d; })
				.y(function(d,i) {return scaleHeight; })
	
	// grid line here
	var pathRef;
	
	for(var i = 0;i<yTickArray.length;i++)
	{
		xCoordinate[0] = 0;
		yCoordinate[0] =yScale(yTickArray[i]);
		
		xCoordinate[1] = upperPath;
		yCoordinate[1] =yScale(yTickArray[i])-20;
		
		xCoordinate[2] = scaleWidth;
		yCoordinate[2] =yCoordinate[1];
		
	pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr("d", lineFunction)	  
				 .attr("fill",'none')
				 .attr("stroke","gray")
				 
		//transition
	var totalLength = pathRef.node().getTotalLength();

	pathRef.attr("stroke-dasharray", function (d) {
	
		
			return totalLength + "," + totalLength;
	})
		.attr("stroke-dashoffset", totalLength)
		.transition()
		.duration(1500)
		.ease("linear")
		.attr("stroke-dashoffset", 0);		 
	}
				

	for(var counter = 0;counter<yAxisEstimateData.length ; counter++)
	{
		
		xCoordinate[0] = xScale(counter)-(barWidth*.55);
		yCoordinate[0] = yScale(yMin)-upperPath;
		
		xCoordinate[1] = xCoordinate[0];
		yCoordinate[1] = yScale(yAxisEstimateData[counter])+upperPath;
		
		xCoordinate[2] = xCoordinate[1]+barWidth;
		yCoordinate[2] = yCoordinate[1];
		
		xCoordinate[3] = xCoordinate[2];
		yCoordinate[3] = yCoordinate[0];
		
	pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",'#f6cd03')

		/*	 pathRef.transition()
					.duration(2000)
					.ease('elastic')
					.attr("d", lineFunction)	*/   	 
		//set coordinate for upper path
		xCoordinate[0] = xScale(counter)-(barWidth*.55);
		yCoordinate[0] = yScale(yAxisEstimateData[counter])+upperPath;
		
		xCoordinate[1] = xCoordinate[0] + (barWidth*.25);
		yCoordinate[1] = yCoordinate[0] - upperPath;
		
		xCoordinate[2] = xCoordinate[1]+barWidth;
		yCoordinate[2] = yCoordinate[1];
		
		xCoordinate[3] = xCoordinate[0]+barWidth;
		yCoordinate[3] = yCoordinate[0];
		
		
		
	pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr("d", lineFunction)	 
				 .attr('class','pathClass')
				 .attr("fill",'#f9f303')
				 
		/*		pathRef.transition()
					.duration(2000)
					.ease('elastic')
					.attr("d", lineFunction)	  */ 	 
		//set coordinate for side path
		
		
		xCoordinate[0] = xCoordinate[3]; 
		yCoordinate[0] = yScale(yMin)-upperPath;
		
		xCoordinate[1] = xCoordinate[3]+(barWidth*.25); 
		yCoordinate[1] = yScale(yMin)-(2*upperPath);
		
		
		pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",'#c9a703')
				 
		/*		 pathRef.transition()
					.duration(2000)
					.ease('elastic')
					.attr("d", lineFunction)	*/   	 
	
	}
	
	for(var counter = 0;counter<yAxisActualData.length ; counter++)
	{
		
		//set coordinate for upper path
		xCoordinate[0] = xScale(counter)-(barWidth*.8);
		yCoordinate[0] = yScale(yAxisActualData[counter])+upperPath;
		
		xCoordinate[1] = xCoordinate[0] + (barWidth*.25);
		yCoordinate[1] = yCoordinate[0] - upperPath;
		
	
		
		xCoordinate[2] = xCoordinate[1]+barWidth;
		yCoordinate[2] = yCoordinate[1];
		
		xCoordinate[3] = xCoordinate[0]+barWidth;
		yCoordinate[3] = yCoordinate[0];
				
		pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",'#fa7600');
	/*	pathRef.transition()
					.duration(2000)
					.ease('elastic')
					.attr("d", lineFunction)*/
		//set coordinate for side path
		
		xCoordinate[0] = xCoordinate[3]; 
		yCoordinate[0] = yScale(yMin);
		
		xCoordinate[1] = xCoordinate[3]+(barWidth*.25); 
		yCoordinate[1] = yScale(yMin)-upperPath;
		
//		xCoordinate[4] = xCoordinate[0];
//		yCoordinate[4] = yCoordinate[0];
		
		pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",'#cc5200')
		/*	pathRef.transition()
					.duration(2000)
					.ease('elastic')
					.attr("d", lineFunction)	*/   	 
				 
		xCoordinate[0] = xScale(counter)-(barWidth*.8);
		yCoordinate[0] = yScale(yMin);
		
		xCoordinate[1] = xCoordinate[0];
		yCoordinate[1] = yScale(yAxisActualData[counter])+upperPath;
		
		xCoordinate[2] = xCoordinate[1]+barWidth;
		yCoordinate[2] = yCoordinate[1];
		
		xCoordinate[3] = xCoordinate[2];
		yCoordinate[3] = yCoordinate[0];
		
	pathRef = compareChartMainGroup.selectAll(".path")
				 .data([xCoordinate])
				 .enter()
				 .append("path")
				 .attr('class','pathClass')
				 .attr("d", lineFunction)	  
				 .attr("fill",'#fa6400');	   
					   
			/*	pathRef.transition()
					.duration(2000)
					.ease('elastic')
					.attr("d", lineFunction)	*/   
	}
	
d3.selectAll('.pathClass')
	.on("mousemove",function()
	{
		var x = event.pageX;
		var y = event.pageY;
	//	x=x-(leftMarginOfSvg+compareAnalChart.left);
		x = Math.round(xScale.invert(x));

		var heading=xAxisData[x];
		var yAxisEstimateVal = yAxisEstimateData[x] + " "+yAxisUnit;
		var yAxisActualVal = yAxisActualData[x] + " "+yAxisUnit;
		var yHeadingValueMap=[{"headingName":yAxisEstimateDataUnit+" "+yAxisLabel,"headingVal":yAxisEstimateVal},
							  {"headingName":yAxisActualDataUnit+" "+yAxisLabel,"headingVal":yAxisActualVal}
							  ];
		
//		toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.90);	
		
	})
	.on("mouseleave",function(){
//		toolTipManager.hideTooTip();
	});
				 
		
	
	// draw legend here
		var legendSize = 10;
		var yPositionOfLegend = -5;

		var legendPositionArray = legendController.showHorizontalLegend(scaleWidth,yPositionOfLegend,legendArray,legendSize);
		
	var legendGroup = svgElement.append("g")
					   .attr('class','legend')
					   .attr("transform", "translate(" + compareAnalChart.left + "," + compareAnalChart.top + ")")
	
	var legendRef = legendGroup.selectAll('.rect')
								.data(legendPositionArray)
								.enter()
								.append('rect')
								.attr('width',legendSize)
								.attr('height',legendSize)
								.attr('x',function(d,i){ return legendPositionArray[i].x;})
								.attr('y',function(d,i){return legendPositionArray[i].y;})
								.attr('fill',function(d,i){if(i==0){return '#f6cd03'}else{return '#fa6400'}});
	
	var legendTextRef = legendGroup.selectAll('.text')
								.data(legendPositionArray)
								.enter()
								.append('text')
								.attr('x',function(d,i){return legendPositionArray[i].textXPos;})
								.attr('y',function(d,i){return legendPositionArray[i].y + legendSize;})
								.attr('font-family',fontFamily)
								.attr('font-size',15)
								.text(function(d,i){return legendArray[i];}); 
								
	return svgElement;							
}

function draw3DPyramidSliceChart(divId,cfg,data)
{
	var fontFamily = data["fontFamily"];
	var jsonData = DataConverter.getValueToPercentageArray(cfg.data);
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
						.attr("id","threeDPyramidSliceContainer")
						.attr("width", width)
						.attr("height", height);				
	
	var outFactorInitial = ( width < height ? width : height);
	outFactor=outFactorInitial*0.60;
	
	var spaceInPyramid = 10;
	var sortedJsonData = [];
	var heightArray = getHeightArrayForData(jsonData);
	var angle = getNewAngle();
	var sideUpFactor = 30;
	var latentHeightArray = getLatentHeightArray(angle, heightArray, 0, sideUpFactor);
	var leftCoordinateX;
	var leftCoordinateY;
	var rightCoordinateX;
	var rightCoordinateY;
	var angleIncrement = 0;
	var colorArray=cfg.colorArray//["#8c564b", "#2ca02c","#d62728","#bcbd22","#1f77b4","#9467bd","#e377c2", "#7f7f7f", "#bcbd22","#1f77b4","#ff7f0e",];	
	var lowerData2 = [ { "x": 0, "y": 400},  { "x":0,  "y": 400}, { "x": 0,  "y": 400}, { "x": 0,  "y": 400}, { "x": 0,  "y": 400}]
	
	
	var lowerData = [ { "x": 200, "y": 400},  { "x": 200,  "y": 200},
					 { "x": 55,  "y": 150}, { "x": 35,  "y": 350}, { "x": 200,  "y": 400}]		
		
	var labelXPoints = [];
	var labelYPoints = [];
	var xNew=0;
	var yNew=0;
	if(width>height){
		xNew=(width-outFactor)/2;
		yNew=(0);
	}
	else{
		xNew=0;
		yNew=(height-outFactor)/2.1;
	}
	//else{}
	var transitionFator={"x":(outFactorInitial-getWidthOfPyramid())/2,"y":(outFactorInitial-getWidthOfPyramid())/2};
	
	
	var lineFunction = d3.svg.line()
							  .x(function(d) { return d.x; })
							  .y(function(d) { return d.y; })
							 .interpolate("linear");
	
	 
	 
	var svgContainer = svgElement
								.append("g")
								.attr("transform", "translate(" + (xNew-outFactor*.4) + "," + (yNew-outFactor*.15) + ")");

	//var transitionFator={"x":(width-getWidthOfPyramid())/2,"y":0};			

	var x = (outFactorInitial*.3) +(outFactorInitial *.1);
	var y = outFactorInitial;		
	var intialX = x;
	var intialY = y;
	var heightY = heightArray[0];
	
	var color20 = d3.scale.category20c();
	var newY = y;
	var prevY = 0;
	
	var spacingFactor = spaceInPyramid;
	var flag = 0;
	var setColorIndex1 = colorArray.length-1;
	var setColorIndex2 = colorArray.length-1;
	var setColorIndex3 = colorArray.length-1;
	
	for(var k = 0 ; k < heightArray.length  ; k++)
	{				
		if(k == (heightArray.length - 1))
			flag = 1;
			
		var lineGraph = svgContainer.append("path")
								.attr("d", lineFunction(lowerData2))
								.style("opacity", 0.0)
								
								.attr('fill', function (d, i) {
									return "white";
								})
								.transition().duration(2000).ease("linear")
								.attr("d", lineFunction(getCoordinatesForPyramid(x, newY, heightArray[k], jsonData, 1, sideUpFactor, latentHeightArray, latentHeightArray[k], angle, heightArray, prevY, k, spacingFactor, flag, sortedJsonData[k])))
								
								.style("opacity", 0.7)

								.attr("stroke",	"white")
								.attr("stroke-width", 1)
								
								.attr('fill', function (d, i) {
									return colorArray[setColorIndex1--];
									//return color20(+i + +100)
								});
								
		var lineGraph = svgContainer.append("path")
								.attr("d", lineFunction(lowerData2))
								.style("opacity", 0.0)
								.attr('fill', function (d, i) {
									return "white";
								})
								.transition().duration(1500).ease("linear")
								.attr("d", lineFunction(getCoordinatesForPyramid(x, newY, heightArray[k], jsonData, 2, sideUpFactor, latentHeightArray, latentHeightArray[k], angle, heightArray, prevY, k, spacingFactor, flag, sortedJsonData[k])))
								.attr("stroke", "white")
								.style("opacity", 0.5)
								.attr("stroke-width", 0.5)
								.attr('fill', function (d, i) {
									return colorArray[setColorIndex2--]
									//return color20(i)
								});
		
		
			
		var lineGraph = svgContainer.append("path")
								.attr("d", lineFunction(lowerData2))
								.style("opacity", 0.0)
								.attr('fill', function (d, i) {
									return "white";
								})
								.transition().duration(1000).ease("linear")
								.attr("d", lineFunction(getCoordinatesForPyramid(x, newY, heightArray[k], jsonData, 3, sideUpFactor, latentHeightArray, latentHeightArray[k], angle, heightArray, prevY, k, spacingFactor, flag, sortedJsonData[k])))
								.style("opacity", 0.3)
								.attr("stroke", "white")
								.attr("stroke-width", 0.3)
								.attr('fill', function (d, i) {
										return colorArray[setColorIndex3--];
								});
		
		
		
			newY = y - heightArray[k] - spaceInPyramid;
			y = newY;
			prevY = heightArray[k];
		
		}
	
	var fontSize=outFactor<200?'10px':'12px';

	var setColorOfLinePath = 0;
	for(var j = 0; j < labelXPoints.length ; j++)
	{
		
		svgContainer.append("path")
								.attr("x", outFactor)
								.attr("y", outFactor)										
								.transition().delay( function(d, i){return 600 *j}).ease("bounce")
								.attr("d", lineFunction(getCoordinatesForLine(labelXPoints[j], labelYPoints[j], heightArray[j], sortedJsonData[j])))
								.attr("stroke", function (d, i) {
										return colorArray[setColorOfLinePath++];
								})
								.attr("stroke-width", 1)
								.attr('fill',"none");			
								
		svgContainer.append("text")						
								.attr("x", outFactor)
								.attr("y", outFactor)
								.transition().delay( function(d, i){return 600 *j}).ease("bounce")
								.attr("x", labelXPoints[j] + 0.15* outFactor)
								.attr("y", labelYPoints[j] + (0.1*outFactor) + heightArray[j]/2)
								.text( cfg.labels[j]+":" + cfg.data[j]+" "+cfg.unit)										
								.attr("font-family",fontFamily)
								.attr("font-size", fontSize)
								.attr("fill", colorArray[j]);
	}
	
	function getWidthOfPyramid(){
		return ((0.6 * outFactor)*2);
	}
	
	function getNewAngle()
	{
		var degrees = Math.atan( (outFactor / (0.6 * outFactor)) ) * 180/Math.PI;
		return degrees ;			
	}			
			
	//working
	function sortNumber(data) 
	{
		//alert(data);
		var heightArr = [];
		var num = data.sort(function (a, b) {
			return parseInt(a) < parseInt(b);
		})			
		return heightArr;
	}
	
	//working
	function getArraySum(arrayVal)
	{	
		var sum = 0 ;
		for(var j = 0 ; j < arrayVal.length ; j++)
		{
			sum = sum + arrayVal[j];				
		}
		return sum;				
	}
			
	//working
	function getHeightArrayForData(jsonData)
	{								
		var totalHeight = outFactor;
		var heightArrayValue = [];
		for(var j = 0 ; j < jsonData.length ; j++)
		{
			heightArrayValue.push(totalHeight*jsonData[j]/100); 
			sortedJsonData.push(jsonData[j]);
		}
		sortedJsonData.sort(function (a, b) {
			return parseInt(a) < parseInt(b);
		});
		heightArrayValue.sort(function (a, b) {
			return parseInt(a) < parseInt(b);
		});
		
		
		return heightArrayValue;
				
	}
	
	//working
	function getTotalWidth()
	{
		return outFactor * 0.6 ;
	}			
	
	function getLatentHeightArray(angle, heightArrayVal, prevY1, sideUpFactor)
	{

		
		var totalLatentHeight = getArraySum(heightArrayVal) / (Math.sin(angle * (Math.PI / 180.0))) ;
					
		var latentHeightArray = [];
		
		for( var j = 0 ; j < heightArrayVal.length ; j++)
		{
			latentHeightArray.push(totalLatentHeight * heightArrayVal[j] / totalLatentHeight - 
											sideUpFactor * heightArrayVal[j] / totalLatentHeight);					
		}				
//				
		
		return latentHeightArray;						
	}		
	
	
	
	
	function getYForFourthCoordinate(latentHeight, angle, prevY, heightY)
	{
		//alert(angle);
		var x = (latentHeight * (Math.cos(angle * (Math.PI / 180))));				
		return x;
	}		
	
	function getAngleAfterApplyingSideUp(sideUpFactor, heightArray, latentHeightArray)
	{
		var heightArraySum = getArraySum(heightArray);
		
		var latentHeightArraySum = getArraySum(latentHeightArray);	
					
		var radians = Math.sin(heightArraySum / (latentHeightArraySum - sideUpFactor));
		
		
		var angle = radians * 180/ Math.PI;
		
		return angle ;	
	}			
	
	function getHeightForTop(angle, bottomWidth)
	{	
	//	console.log("  Angle : " + angle + " bottomWidth : " + bottomWidth);
		var radians = angle * (Math.PI / 180);
		var h =  Math.tan(radians) * bottomWidth;
		return h;
	
	}
	
	function getCoordinatesForPyramid(x, y, heightY, jsonData, sideno, sideUpFactor, latentHeightArray, latentHeight, angle, heightArray, prevY, l, spacingFactor, flag, value)
	{
		
		var startX = x;
		var startY = y;			
		var lineData = [];						
		
			if(flag != 1)
			{
				if(sideno==1){						
						
						for(var i=0;i<5;i++){
								
													
						   if(i==0)
						   {						   
								y = y - heightY ;																		
						   }
						   else if(i==1)
						   {						   
								y = y + heightY ;										
						   }
						   else if(i==2)
						   {
								if(l==0)
								{
									x = x - getTotalWidth();
									y = y - sideUpFactor;
								}
								else
								{
									x = leftCoordinateX;
									y = leftCoordinateY - spacingFactor;									
								}								
						   }
						   else if(i==3)
						   {		
						
								//x = x + latentHeight;
								//y = y -  getYForFourthCoordinate(latentHeight, getAngleAfterApplyingSideUp(sideUpFactor, heightArray, latentHeightArray), prevY);
								
								//y = y - latentHeight ;
									x = x + getYForFourthCoordinate(latentHeight, getAngleAfterApplyingSideUp(sideUpFactor, heightArray, latentHeightArray) + angleIncrement, prevY, heightY) ;
									y = y - latentHeight ;
									leftCoordinateX = x;
									leftCoordinateY = y;
								
								
						   }     
							else if(i==4)
						   {						   
								x = startX;
								y = startY - heightY;								
						   }
							
							var nextY = y;
							var nextX = x;
											
							lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+ ',"value":'+value+'}'));                      
						}                               
				}	
				else if(sideno==2){						
						
						for(var i=0;i<5;i++){
									
						   if(i==0)
						   {						   
								y = y - heightY;	
								
						   }
						   else if(i==1)
						   {						   
								y = y + heightY ;
								
						   }
						   else if(i==2)
						   {
						
								if(l==0)
								{
									
									x = x + getTotalWidth();
									y = y - sideUpFactor;
									
								}
								else
								{
									x = rightCoordinateX;
									y = rightCoordinateY - spacingFactor;
								}
								
								
						   }
						   else if(i==3)
						   {		
							
								
								x = x - getYForFourthCoordinate(latentHeight, getAngleAfterApplyingSideUp(sideUpFactor, heightArray, latentHeightArray) + angleIncrement, prevY, heightY);
								
								y = y - latentHeight;
								
								labelXPoints.push(x);
								labelYPoints.push(y);
								
								rightCoordinateX = x;
								rightCoordinateY = y;
								
						   }     
							else if(i==4)
						   {						   
								x = startX;
								y = startY - heightY;
								
						   }
							
							var nextY = y;
							var nextX = x;							   
						 
							lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+ ',"value":'+value+'}'));                      
						}   
					}
					
				else if(sideno==3){		
				
						if(flag != 1)
						{
							var startXVal;
							var startYVal;
							for(var i=0;i<5;i++){
									
								
							   if(i==0)
							   {			
									startXVal = x;
									y = y - heightY;
									startYVal = y;								
							   }
							   else if(i==1)
							   {						   
									x = leftCoordinateX;
									y = leftCoordinateY;							 
							   }
							   else if(i==2)
							   {
									x = x + (startX - leftCoordinateX);  
									y = y - (startYVal - leftCoordinateY);
									
							   }
							   else if(i==3)
							   {		
									x = rightCoordinateX;
									y = rightCoordinateY;
									
							   }   
								
								else if(i==4)
								{						   
									x = startX;
									y = startY - heightY;
								
								}
								
								var nextY = y;
								var nextX = x;
							   
						 
							lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+ ',"value":'+value+'}'));                      
							}
							
						}							
					}
			}
			else
			{
				var margin = x - leftCoordinateX;
						var c = getHeightForTop(angle, margin);
						
				if(sideno==1){						
						
						for(var i=0;i<5;i++){
								
													
						   if(i==0)
						   {				
								y = y - c;	
								startX = x;
								startY = y;
						   }
						   else if(i==1)
						   {						   
								y = y + c;										
						   }
						   else if(i==2)
						   {
								if(l==0)
								{
									x = x - getTotalWidth();
									y = y - sideUpFactor;
								}
								else
								{
									x = leftCoordinateX;
									y = leftCoordinateY - spacingFactor;									
								}								
						   }
						   else if(i==3)
						   {										
								x = startX;
								y = startY;	
								
						   }     									
							
							var nextY = y;
							var nextX = x;
											
							lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+ ',"value":'+value+'}'));                      
						}                               
				}	
				else if(sideno==2){						
						
						for(var i=0;i<4;i++){
									
						   if(i==0)
						   {						   
								y = y - c ;		
								startX = x;
								startY = y;
						   }
						   else if(i==1)
						   {						   
								y = y + c ;										
						   }
						   else if(i==2)
						   {
						
									x = rightCoordinateX;
									y = rightCoordinateY - spacingFactor;		
								
						   }
						   else if(i==3)
						   {		
							
								x = startX;
								y = startY;
								labelXPoints.push(x);
								labelYPoints.push(y);
								rightCoordinateY = y;
								
								
						   }     
																
							var nextY = y;
							var nextX = x;							   
						 
							lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+ ',"value":'+value+'}'));                      
						}   
					}
					
				else if(sideno==3){		
				
						if(flag != 1)
						{
							var startXVal;
							var startYVal;
							for(var i=0;i<5;i++){
									
								
							   if(i==0)
							   {			
									
									startXVal = x;
									y = y - heightY;
									startYVal = y;								
							   }
							   else if(i==1)
							   {						   
									x = leftCoordinateX;
									y = leftCoordinateY;							 
							   }
							   else if(i==2)
							   {
									x = x + (startX - leftCoordinateX);  
									y = y - (startYVal - leftCoordinateY);
									
							   }
							   else if(i==3)
							   {		
									x = rightCoordinateX;
									y = rightCoordinateY;
									
							   }   
								
								else if(i==4)
								{						   
									x = startX;
									y = startY - heightY;
								
								}
								
								var nextY = y;
								var nextX = x;
							   
						 
							lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+ ',"value":'+value+'}'));                      
							}
							
						}							
					}
			}
		return lineData;			
	} 
	
	
	
	
	function getCoordinatesForLine(x, y, height, value)
	{
		//alert(" X : " + x + " Y : " + y);
		var lineDataPoint = [];
		
			for(var m=0;m<3;m++){											
										
							   if(m==0)
							   {		
									
									x = x;	
									y = y + height/2;
							   }
							   else if(m==1)
							   {	
							   
									x = x + (0.3*outFactor)/2;										
							   }
							   else if(m==2)
							   {
									x = x + (.025*outFactor);
									y = y + (.025*outFactor);
							   }							   
								
								var nextY = y;
								var nextX = x;
												
								//alert(" X : " + x + " Y : " + y);
								//lineDataPoint.push(JSON.parse('{"x":'+x+',"y":'+y+'}'))	
								lineDataPoint.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+ ',"value":'+value+'}'));                      

			}             
				return lineDataPoint;
	}		
	return svgElement;	
}

function drawBasicLineChart(divId,data)
{
	var fontFamily = data["fontFamily"];
	  var cfg = {
					yAxisfactor : data["Y Axis Factor"],
					yLabelColor:data["Y LabelColor"],
					xAxisfactor : data["X Axis Factor"],
					xLabelColor:data["X LabelColor"]
                };
				
				var title = data["Title"];
				/*
                if ('undefined' !== typeof options) {
                    for (var i in options) {
                        if ('undefined' !== typeof options[i]) {
                            cfg[i] = options[i];
                        }
                    }
                }
				*/
				var xScaleTicksArray=data["X Axis Data"];
				
				var margin = {
                    top: 30,
                    right: 30,
                    bottom: 40,
                    left: 70
                };
				var width =parseInt(d3.select("#"+divId).style("width"));
				var height=parseInt(d3.select("#"+divId).style("height")); 
	
				var divSelection = d3.select("#"+divId);
				var svgElement = divSelection.append('svg')
						.attr('id','threeDComparisionChart')
						.attr("width", width)
						.attr("height", height);
                
				width = width - margin.left - margin.right,
                height = height - margin.top - margin.bottom;


                var maxValue = 0;
                var currMaxValue;
                var actualData = data["nestedData"];

                for (i = 0; i < actualData.length; i++) {
                    currMaxValue = d3.max(actualData[i].Data, function (d,k) {
									d["xVal"]=xScaleTicksArray[k];
					
									d["timeIndex"]=k;
									d["shape"]=actualData[i].shape;
                        return d;
                    });

                    if (currMaxValue > maxValue){
						maxValue = currMaxValue;
					}
					
					actualData[i].legendName="legend-"+i;	
					
                }
				var maxXScale = xScaleTicksArray.length;//d3.max(data, function(d, i){return data[i].Values.length;});
				
                var x = d3.scale.linear().domain([0, (maxXScale)]).range([width*0.02, width]),
                    y = d3.scale.linear().domain([0, 1.5 * maxValue]).range([height, 0]);
        	
				xAxis = d3.svg.axis()
							  .scale(x)
							  .orient("bottom");
	
                yAxis = d3.svg.axis().scale(y).ticks(10).orient("left");

                var factor = cfg.yAxisfactor;
                var svg = svgElement.append("g")
						  .attr("transform", "translate(" + (width*0.06) + "," + 0 + ")");
						  
				// title label here
				var pixcelPerChar = 10;
				var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
				var titleGroup = svgElement.append("g")
										   .attr('class','title')
		
				
				axisLabelController.appendLabel(title,leftIndicator+margin.left,margin.top*.4,0,titleGroup,"black",500);			   
				
				gridManager.init(svg, height, width, margin.left, margin.top);


				var line = d3.svg.line()
                    .x(function (d, i) {
                    return x(i);
                })
                    .y(function (d) {
                    return y(d);
                }).interpolate("cardinal");

                var rectOrder = d3.svg.line()
                    .x(function (d, i) {
                    return x(i) - 3;
                })
                .y(function (d) {
                    return y(d) - 3;
                }).interpolate("cardinal");

                var triangleOrder = d3.svg.line()
                    .x(function (d, i) {
                    return x(i) - 3;
                })
                    .y(function (d) {
                    return y(d) - 3;
                }).interpolate("cardinal");

                var area = d3.svg.area()
                    .x(line.x())
                    .y1(line.y())
                    .y0(y(0));


                for (iVal = 0; iVal < actualData.length; iVal++) {
					
					drawLineWithShape(svg, actualData[iVal], actualData[iVal].Color, actualData[iVal].Name);
					
                }

                function drawLineWithShape(svg, data, color, name) {

                    if (data.Shape == 'circle') {
						drawCircle(svg, data, color, data.legendName);
					}
					else if (data.Shape == 'square') {

                        drawSquare(svg, data, color, data.legendName);
                    } else {

                        drawTriangle(svg, data, color,data.legendName);
                    }
					
                }


                function drawCircle(svg, data, color, name) {
                    var circleData = [data.Data];
					
					var aLineContainer = svg.selectAll("svg")
                        .data(circleData)
                        .enter().append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                    var path = aLineContainer.append("path")
                        .attr("class", name + "line" +" "+data.legendName)
                        .attr("d", line)
                        .attr("fill", "none")
                        .style("stroke", color);


                    var lineLen = path.node().getTotalLength();

                    path.attr("stroke-dasharray",
                    lineLen + ", " + lineLen)
                        .attr("stroke-dashoffset", lineLen);

                    path.transition()
                        .duration(2000)
                        .attr("stroke-dashoffset", 0);

                    aLineContainer.selectAll("." + name + "dot")
                        .data(function (d, i) {
                        return d;
                    })
                        .enter()
                        .append("circle")
						.attr('xVal',function(d,i){ return xScaleTicksArray[i];})
						.attr('yVal',function(d,i){ return d;})
                        .on("mouseover", function (d, i) {

						d3.select(this)
						.attr('stroke','white')
						.attr('stroke-width','2px');
						
						
						var yHeadingValueMap=[{"headingName":data.Name,"headingVal":d}];
						
						toolTipManager.showToolTip(d3.event, d["yVal"],(xScaleTicksArray[i]), false,yHeadingValueMap);
                    })
                        .on("mouseout", function (d, i) {
							
						d3.select(this)
						.attr('stroke','white')
						.attr('stroke-width','0px');
                        var targetElement = d3.select(this);


                        toolTipManager.hideTooTip();
                    })
                        .attr("class", name + "dot circle")
                        .attr('x', 0)
                        .attr("cx", function (d, i) {

                        return 0;
                    })
                        .attr("cy", function (d, i) {

                        return 0;
                    })
                        .attr('y', 0)
                        .transition()
                        .duration(2000)
                        .attr("cx", line.x())
                        .attr("cy", line.y())
                        .attr("r", 3.0)
                        .attr("fill", color);

                }

                function drawSquare(svg, data, color, name) {

                    var data2 = [data.Data];

                    var aLineContainer = svg.
                    selectAll("svg")
                        .data(data2)
                        .enter().append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                    var path = aLineContainer.append("path")
                        .attr("class", function (d) {
                        return name + "line" +" "+data.legendName;
                    })
                        .attr("d", line)
                        .attr("fill", "none")
                        .style("stroke", color);


                    var lineLen = path.node().getTotalLength();

                    path.attr("stroke-dasharray",
                    lineLen + ", " + lineLen)
                        .attr("stroke-dashoffset", lineLen);

                    path.transition()
                        .duration(2000)
                        .attr("stroke-dashoffset", 0);

                    aLineContainer.selectAll("." + name + "dot")
                        .data(function (d, i) {
                        return d;
                    })
                        .enter()
                        .append("rect")
						.attr('xVal',function(d,i){ return xScaleTicksArray[i];})
						.attr('yVal',function(d,i){ return d;})
                        .on("mouseover", function (d, i) {
						d3.select(this)
						.attr('stroke','white')
						.attr('stroke-width','2px');

                        //toolTipManager.showToolTip(d3.event, d["yVal"], d["xVal"], false, name + " :- " + d);
						
						var yHeadingValueMap=[{"headingName":data.Name,"headingVal":d}];
						toolTipManager.showToolTip(d3.event, d["yVal"],((xScaleTicksArray[i])), false,yHeadingValueMap);	
                    })
                        .on("mouseout", function (d, i) {


						d3.select(this)
						.attr('stroke','white')
						.attr('stroke-width','0px');

                        toolTipManager.hideTooTip();
                    })
                        .attr("class", name + "dot square")
                        .attr('x', 0)
                        .attr("width", function (d, i) {

                        return 0;
                    })
                        .attr("height", function (d, i) {

                        return 0;
                    })
                        .attr('y', 0)
                        .transition()
                        .duration(2000)
                        .attr("x", rectOrder.x())
                        .attr("y", rectOrder.y())
                        .attr("width", 6)
                        .attr("height", 6)
                        .attr("fill", color);

                }

                function drawTriangle(svg, data, color, name) {
                    var triangleData = [data.Data];

                    var aLineContainer = svg.
                    selectAll("svg")
                        .data(triangleData)
                        .enter().append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                    var path = aLineContainer.append("path")
                        .attr("class", name + "line" +" "+data.legendName)
                        .attr("d", line)
                        .attr("fill", "none")
                        .style("stroke", color);

                    var lineLen = path.node().getTotalLength();

                    path.attr("stroke-dasharray",
                    lineLen + ", " + lineLen)
                        .attr("stroke-dashoffset", lineLen);

                    path.transition()
                        .duration(2000)
                        .attr("stroke-dashoffset", 0);

                    aLineContainer.selectAll(name + "dot")
                        .data(function (d, i) {
                        return d;
                    })
                        .enter()
                        .append("path")
						.attr('xVal',function(d,i){ return xScaleTicksArray[i];})
						.attr('yVal',function(d,i){ return d;})
						.on("mouseover", function (d, i) {

						d3.select(this)
						.attr('stroke','white')
						.attr('stroke-width','2px');

						var yHeadingValueMap=[{"headingName":data.Name,"headingVal":d}];
						toolTipManager.showToolTip(d3.event, d["yVal"],(xScaleTicksArray[i]), false,yHeadingValueMap);	
                        //toolTipManager.showToolTip(d3.event, d["yVal"], d["xVal"], false, name + " :- " + d);
                    })
                        .on("mouseout", function (d, i) {

						
						d3.select(this)
						.attr('stroke','white')
						.attr('stroke-width','0px');

                        var targetElement = d3.select(this);


                        toolTipManager.hideTooTip();
                    })
                        .attr("class", name + "dot triangle")
                        .attr('x', 0)
                        .attr("width", function (d, i) {

                        return 0;
                    })
                        .attr("height", function (d, i) {

                        return 0;
                    })
                        .attr('y', 0)
                        .transition()
                        .duration(2000)
                        .attr("d", d3.svg.symbol().type("triangle-up"))
                        .attr("transform", function (d, i) {
                        return "translate(" + x(i) + "," + y(d) + ")";
                    })
                        .attr("fill", color);


                }

                function getValueFromArray(data) {
                    var dataSet = [];

                    for (i = 0; i < data.length; i++) {
                        dataSet.push(data[i].value);
                    }

                    return dataSet;
                }
			// legend here
			var legendGroup = svg.append('g')
									 .attr('class','legend')
									 .attr("transform", "translate(" + margin.left + "," +0+ ")")

			var legendSize = 10;
			var yPositionOfLegend = margin.top;
			var legendNameArray=[];
			for(var i=0;i<actualData.length;i++){
				legendNameArray.push(actualData[i].Name);
			}
			
			var legendPositionArray = legendController.showHorizontalLegend(width,yPositionOfLegend,legendNameArray,legendSize);

			var legendRef = legendGroup.selectAll('.rect')
										.data(actualData)
										.enter()
										.append("rect")
										.attr("width",legendSize)
										.attr("height",legendSize)
										.attr('x',function(d,i){ return legendPositionArray[i].x;})
										.attr('y',function(d,i){return legendPositionArray[i].y;})
										.style("fill", function (d, i) {return d.Color;})
										.on("click", function (d) {
											var state = d3.selectAll("." +d.legendName+"dot").style("display");
											if (state == "none") {

												var selectedPath = svgElement.selectAll("." + d.legendName + "line");
												selectedPath.transition()
													.duration(1000)
													.ease("linear")
													.attr("stroke-dashoffset", 0);
												d3.selectAll("." + d.legendName+"dot."+d.Shape).style("display", "block");
												console.log(d.legendName+"dot"+d.Shape);
												d3.select("#" + d.legendName + "text").style("text-decoration", "none");
											} else {


												var selectedPath = svgElement.selectAll("." + d.legendName + "line");
												var lineLen = selectedPath.node().getTotalLength();
												selectedPath.transition()
													.duration(1000)
													.ease("linear")
													.attr("stroke-dashoffset", lineLen);
													
													
												d3.selectAll("." + d.legendName+"dot."+d.Shape).style("display", "none");
												console.log(d.legendName+"dot"+d.Shape);
												
												d3.select("#" + d.legendName + "text").style("text-decoration", "line-through");
											}


										});
								
									
				
					
					
				var legendTextRef = legendGroup.selectAll('.text')
											.data(actualData)
											.enter()
											.append("text")
											.attr('id', function (d) { return d.legendName + "text";})
											.attr('x',function(d,i){return legendPositionArray[i].textXPos;})
											.attr('y',function(d,i){return legendPositionArray[i].y + legendSize;})
											.attr('font-family',fontFamily)
											.attr('font-size',14)
											.text(function (d, i) { return d.Name; });
											//.style("fill",textStyleConfg["legendTextColor"]);				

				var largestStringLngth=((xScaleTicksArray[0].toString()).length);
				for(var charCountr=0;charCountr<xScaleTicksArray.length;charCountr++){
					var currentStringLngth=(xScaleTicksArray[charCountr].toString()).length;
					
					if(largestStringLngth<currentStringLngth){
							largestStringLngth=currentStringLngth;
					}
				}
				
				
				var xAxisTickArr=tickController.getXTickArray(0,(xScaleTicksArray.length),largestStringLngth, (width-width*0.02));
				xAxis.tickValues(xAxisTickArr);
				
                var xAxisEle = svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(" + (margin.left) + "," + (height + margin.top) + ")")
					.attr('fill','none')
                    .call(xAxis);
					
				xAxisEle.selectAll("text")
					.attr('fill','black')
					.attr("font-family",fontFamily)
					.attr("font-size",12)
					.text(function(d,i){
						var xTextVal="";
						//retrived text index
						
						xTextVal=xScaleTicksArray[d];
						return xTextVal;
					});
					
				var yAxisElem = svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.attr("fill","none")
                    .call(yAxis);
					
                var yLabelTop = ((height / 2) + (cfg.yAxisfactor.length / 2) * 5);
                var yLabelLeft = margin.left * .20 - margin.left;
				
                yAxisElem.selectAll("text")
					.attr('fill','black')
					.attr("font-family",fontFamily)
					.attr("font-size",12);
			
				
				axisLabelController.appendLabel(cfg.yAxisfactor,yLabelLeft,yLabelTop,-90,yAxisElem,cfg.yLabelColor,350);
				
                var xLabelTop = margin.top + 5;
                var xLabelLeft = ((width / 2) - (cfg.xAxisfactor.length / 2) * 5);
				/*
                xAxisEle.append("text")
                    .text(function () {
                    return cfg.xAxisfactor + " ";
                })
                    .style('font-style', 'italic')
                    .attr('transform', "translate(" + (xLabelLeft) + "," + (xLabelTop) + ") ")
                    .style('fill', cfg.xLabelColor);
				*/	
					
				axisLabelController.appendLabel(cfg.xAxisfactor,xLabelLeft,xLabelTop,0,xAxisEle,cfg.xLabelColor,350);	
	
		return svgElement;
}


function drawRoundedBarChart(divId,data)
{
	var barData = data["nestedData"];
	var xAxisLabel = data["X AxisLabel"];
	var yAxisLabel = data["Y AxisLabel"];
	var title = data["Title"];
	var unit = data["Unit"];
	var fontFamily = data["fontFamily"];
	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
			.attr('id','roundedBarChart')
			.attr("width", width)
			.attr("height", height);
	
	var yAxisValues = [];
	var xAxisTimeIndex = [];
	for(var counter = 0;counter<barData.length ;counter++)
	{
		xAxisTimeIndex[counter] = counter;
		yAxisValues[counter] = barData[counter].Data;
	}

	var leftMargin = marginController.leftMarginController(yAxisValues);
	var threeDAnalChart={left:leftMargin,right:width*0.05,bottom:50,top:height*0.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	var scaleWidth=width-threeDAnalChart.left-threeDAnalChart.right;
	var scaleHeight=height-threeDAnalChart.top-threeDAnalChart.bottom;
		
	var estimateDataBarWidth =  (scaleWidth/(1.5*barData.length));
	var radiusY = 7;
	var gradient;
            
	var threeDBarMainGroup = svgElement.append("g")
					   .attr('class','main-group')
					   .attr("transform", "translate(" + threeDAnalChart.left + "," + threeDAnalChart.top + ")")

	//title here
	var pixcelPerChar = 8;
	var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
	var titleGroup = svgElement.append("g")
							   .attr('class','title')
	axisLabelController.appendLabel(title,leftIndicator,threeDAnalChart.top/2,0,titleGroup,"black",500,fontFamily);
	
	//xAxis label here			
	var pixcelPerChar=7;
	var totalXLabelPixcel=xAxisLabel.toString().length*pixcelPerChar;
	var xIndicationLabelTop=scaleHeight+(threeDAnalChart.bottom -5);
	var xIndicationLabelLeft=scaleWidth/2-totalXLabelPixcel/2;
	axisLabelController.appendLabel(xAxisLabel,xIndicationLabelLeft,xIndicationLabelTop,0,threeDBarMainGroup,"black",350,fontFamily);			   							
				
	//yAxis label here					
	var totalYLabelPixcel=yAxisLabel.toString().length*pixcelPerChar;			
	var yIndicationLabelTop=scaleHeight/2+totalYLabelPixcel/2;
	var yIndicationLabelLeft=(-threeDAnalChart.left + 15);
	axisLabelController.appendLabel(yAxisLabel,yIndicationLabelLeft,yIndicationLabelTop,-90,threeDBarMainGroup,"black",350,fontFamily);			   													   
	
	
	
	var xScale = d3.scale.linear()
						 .domain([0,barData.length-1])
						 .range([estimateDataBarWidth*.5,scaleWidth-(estimateDataBarWidth*.5)]); 
	var yMin = d3.min(yAxisValues);
	var yMax = d3.max(yAxisValues);
	
	if(yMax == 0){
		yMax =yMax +  2;
	}
	else{
		if(yMax>0){
			yMax =yMax* 1.2;
		}else{
			yMax =yMax * 0.8;
		}
	}
		
	if(yMin == 0){
		yMin =yMin - 2;
	}
	else{
		if(yMin<0){
			yMin =yMin* 1.5;
		}else{
			yMin =yMin * 0.1;
		}
	}
	
	var yScale = d3.scale.linear()
					.domain([yMin,yMax])
					.range([scaleHeight,0]);
			
//x axis
	var largestStringLngth=0;
		for(var counter =0 ;counter<barData.length;counter++)
		{
			if(largestStringLngth<(barData[counter]["X Axis Tick"].toString()).length)
			{
				largestStringLngth = (barData[counter]["X Axis Tick"].toString()).length;
			}
		}
		
	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
			//	.tickValues()
				.tickValues(tickController.getXTickArray(0,(barData.length),largestStringLngth, (scaleWidth)));
	
	var xAxisTextRef = threeDBarMainGroup.append("g")
							.attr('id','xAxis')
							.attr("class", "x axis")
							.attr('fill',"none")
							.attr("transform", "translate("+0+"," + scaleHeight + ")")
							.call(xAxis);
			 xAxisTextRef.selectAll('text')
							 .attr("fill","black")
							 .attr('font-size',12)
							 .text(function(d){return barData[d]["X Axis Tick"];});
							
			
			
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.tickValues(tickController.getTickArray(yMin,yMax,9));
	
	
	
	
	threeDBarMainGroup.append("g")
					.attr('id','yAxis')
					.attr("class", "y axis")
					.attr('fill',"none")
					.attr("transform", "translate("+(0)+"," + 0 + ")")
					.call(yAxis)
					.selectAll('text')
					.attr("fill","black")
					.attr('font-size',12);
					
					
//	var leftMarginOfSvg = $(selectorElement).offset().left;
					
	var rectGroupRef = threeDBarMainGroup
								.selectAll('.rect')
								.data(yAxisValues)
								.enter()
								.append('rect')
								.attr('width',estimateDataBarWidth)
								.attr('height',0)
								.attr('x',function(d,i){return xScale(i)-(estimateDataBarWidth/2)})
								.attr('y',scaleHeight  - radiusY)
						//		.attr('fill',function(d,i){getGradient(barData[i].color,xScale(i)-(estimateDataBarWidth/2),yScale(d) + radiusY,xScale(i)-(estimateDataBarWidth/2),yScale(yMin)-yScale(d) - (2*radiusY)); return "url(#gradient)"})
								.attr('fill',function(d,i){ return barData[i].Color})
								.attr("opacity",0.6)
								.on("mousemove",function()
								{
							/*		var x = d3.event.pageX;
									var y = d3.event.pageY;
									x=x-(leftMarginOfSvg+threeDAnalChart.left);
									x = Math.round(xScale.invert(x));
									var heading=barData[x]["X Axis Tick"];
									var yAxisVal = yAxisValues[x];
									var yHeadingValueMap=[{"headingName":yAxisLabel,"headingVal":yAxisVal+" "+unit}
														  ];
									
									toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY*.96);	
									*/
								})
								.on("mouseleave",function(){
								//	toolTipManager.hideTooTip();
								});
			rectGroupRef
					.transition()
					.duration(1500)
					.ease('bounce')
					.attr('height',function(d,i){return yScale(yMin)-yScale(d) - (2*radiusY)})
					.attr('y',function(d,i){return yScale(d) + radiusY});
					
	var upperEllipseRef = threeDBarMainGroup
								.selectAll('.ellipse')
								.data(yAxisValues)
								.enter()
								.append("ellipse")      
								.attr("cx", function(d,i){return xScale(i)})           
								.attr("cy",scaleHeight - radiusY)         
								.attr("rx",	estimateDataBarWidth/2 )           
								.attr("ry", radiusY)
								.attr('fill',function(d,i){ return barData[i].Color});  
						
				upperEllipseRef.transition()
							   .duration(1500)
							   .ease('bounce')
							   .attr("cy",function(d,i){return yScale(d) + radiusY})         
	
	var lowerEllipseRef = threeDBarMainGroup
								.selectAll('.ellipse')
								.data(yAxisValues)
								.enter()
								.append("ellipse")      
								.attr("cx", function(d,i){return xScale(i)})           
								.attr("cy", scaleHeight - radiusY)         
								.attr("rx",	estimateDataBarWidth/2 )           
								.attr("ry", radiusY)
								.attr('fill',function(d,i){ return barData[i].Color});				
	
		function getGradient(color,x1,y1,x2,y2)
		{
		//	alert(color)
		gradient = threeDBarMainGroup.append("svg:defs")
				.append("svg:linearGradient")
				.attr("gradientUnits", "userSpaceOnUse")
				.attr("id", "gradient")
				.attr("x1", x1)
				.attr("y1", y1)
				.attr("x2", x2)
				.attr("y2", y2)
				.attr("spreadMethod", "pad")
				.attr("gradientTransform","rotate(0)");

				gradient.append("svg:stop")
				.attr("offset", "0%")
				.attr("stop-color", color)
				.attr("stop-opacity", .9);

				gradient.append("svg:stop")
				.attr("offset", "100%")
				.attr("stop-color", color)
				.attr("stop-opacity", 0.5);
		}
	
	return svgElement;
}

function drawMultiAxisChart(divId,data){
		var yObject = data["nestedData"];
		var xAxisData = data["X AxisData"];
		var title = data["Title"];
		var fontFamily = data["fontFamily"];
		var unit = data["Unit"];
		var width =parseInt(d3.select("#"+divId).style("width"));
		var height=parseInt(d3.select("#"+divId).style("height")); 
		
		var divSelection = d3.select("#"+divId);
		var svgElement = divSelection.append('svg')
				.attr('id','multiAxisChartContainer')
				.attr("width", width)
				.attr("height", height);
		
		var multiAxisAnalChart={left:width*0.05,right:width*0.05,bottom:50,top:height*0.1,chartSeparator:5,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
		var scaleWidth=(width)-multiAxisAnalChart.left-multiAxisAnalChart.right;
		var scaleHeight=height-multiAxisAnalChart.top-multiAxisAnalChart.bottom;
		
		//title here
		var pixcelPerChar = 8;
		var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
		var titleGroup = svgElement.append("g")
								   .attr('class','title')
		axisLabelController.appendLabel(title,leftIndicator,multiAxisAnalChart.top/2,0,titleGroup,"black",500,fontFamily);

		
//		var leftMarginOfSvg = $(selectorElement).offset().left;
		
		var multiAxisMAinGroup = svgElement.append("g")
			.attr('class','scoredMainGroup')
			.attr("transform", "translate(" + multiAxisAnalChart.left + "," + multiAxisAnalChart.top + ")")
			.on("mouseover",function()
							{
								var x = d3.event.pageX;
								var y = d3.event.pageY;
								x=x-(leftMarginOfSvg+multiAxisAnalChart.left);
								x = Math.round(xScale.invert(x));
								if(x>=0 && x<xAxisData.length)
								{
							/*	console.log(x);
								var heading=xAxisData[x];
								var yHeadingValueMap=[{"headingName":legend[0],"headingVal":yObject[0].yAxisData[x]},
													  {"headingName":legend[1],"headingVal":yObject[0].yAixsAvgData[x]},
													  {"headingName":legend[2],"headingVal":yObject[1].yAxisData[x]},
													  {"headingName":legend[3],"headingVal":yObject[1].yAixsAvgData[x]},
													  {"headingName":legend[4],"headingVal":yObject[2].yAxisData[x]},
													  {"headingName":legend[5],"headingVal":yObject[2].yAixsAvgData[x]}						  
													  ];
								
								toolTipManager.showToolTip(d3.event,"",(heading), false,yHeadingValueMap,d3.event.pageY,scaleHeight/2);	*/
								}
								
						  verticalLineRef.attr('display','block')
										 .attr('x1',xScale(x))
										 .attr('x2',xScale(x));
							})
							.on("mouseleave",function(){
							//	verticalLineRef.attr('display','none')
							//	toolTipManager.hideTooTip();
							});
	
		//vertical line here	

	var verticalLineRef = multiAxisMAinGroup.append('line')
								  .attr('y1',multiAxisAnalChart.top)
								  .attr('y2',scaleHeight)
								  .attr('stroke','#a7a7a7')
								  .attr('display','none');
	

		var yScale = [];
		var leftAxisMargin = 0,rightAxisMargin = scaleWidth,pixcelPerCharactor = 12,flag=0;
		for(var counter = 0;counter<yObject.length;counter++)
		{
			
			var largestStringLngth=0;
			for(var index =0 ;index<yObject[counter]["Y AxisData"].length;index++)
			{
				if(largestStringLngth<(yObject[counter]["Y AxisData"][index].toString()).length)
				{
					largestStringLngth = (yObject[counter]["Y AxisData"][index].toString()).length;
				}
			}
			
			largestStringLngth++;
			largestStringLngth = largestStringLngth*pixcelPerCharactor;
			
			var yMin = d3.min(yObject[counter]["Y AxisData"]);
			var yMax = d3.max(yObject[counter]["Y AxisData"]);
			
			if(yMax>0)
			{
				yMax = yMax*1.3;
			}
			else
			{
				yMax =yMax*.7;
			}
			if(yMin>0)
			{
				yMin = yMin* .5;
			}
			else
			{
				yMin = yMin * 1.5;
			}
			
			
			 yScale[counter]= d3.scale.linear()
							 .domain([yMin,yMax])
							 .range([scaleHeight,0]);
			
			
			if(counter%2==0)
			{
			leftAxisMargin  = leftAxisMargin + largestStringLngth;
					var yAxis = d3.svg.axis()
						  .scale(yScale[counter])
						  .orient("left")
						  .tickValues(function(){if(flag==0){return tickController.getTickArray(yMin,yMax,6)}
						  else
						  {
							return tickController.getTickArray(yMin,yMax,5)
						  }
						  });
		 
					multiAxisMAinGroup.append("g")
							.attr("class","y axis")
							.attr("transform","translate("+leftAxisMargin+","+0+")")
							.attr('fill','none')
				//			.style('display','none')
							.style('stroke-width',0.3)
							.style('stroke',yObject[counter]["Y AxisColor"])
							.call(yAxis)
							.selectAll('text')
							.attr('font-size',12)
							.attr('fill',yObject[counter]["Y AxisColor"]);

				
			}
			else
			{
				
				var yAxis = d3.svg.axis()
						  .scale(yScale[counter])
						  .orient("left")
						  .tickValues(function(){if(flag==0){flag=1;return tickController.getTickArray(yMin,yMax,6)}
						  else
						  {
							flag=0;
							return tickController.getTickArray(yMin,yMax,5)
						  }
						  });
		 
					  multiAxisMAinGroup.append("g")
							.attr("class","y axis")
							.attr("transform","translate("+rightAxisMargin+","+0+")")
							.attr('fill','none')
					//		.style('display','none')
							.style('stroke-width',0.3)
							.style('stroke',yObject[counter]["Y AxisColor"])
						//	.style('shape-rendering','crispEdges')
							.call(yAxis)
							.selectAll('text')
							.attr('font-size',12)
							.attr('fill',yObject[counter]["Y AxisColor"]);
				rightAxisMargin  = rightAxisMargin - (largestStringLngth);			
							
			}
		}
	//xAxis scale here
	var xAxisTimeIndex = [];
	for(var counter = 0;counter<xAxisData.length ;counter++)
	{
		xAxisTimeIndex[counter] = counter;
	}
		
	var xScale = d3.scale.linear()
						 .domain([0,xAxisData.length-1])
						 .range([leftAxisMargin,rightAxisMargin-rightAxisMargin*.01]);
	
	var largestStringLngth=0;
	for(var counter =0 ;counter<xAxisData.length;counter++)
	{
		if(largestStringLngth<(xAxisData[counter].toString()).length)
		{
			largestStringLngth = (xAxisData[counter].toString()).length;
		}
	}
		

	
	var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .tickValues(tickController.getXTickArray(0,(xAxisData.length),largestStringLngth, (rightAxisMargin-leftAxisMargin)));

	var xAxisGroup = multiAxisMAinGroup.append("g")
						.attr("class","x axis")
						.attr("transform","translate("+0+","+(scaleHeight)+")")
						.attr('fill','none')
						//.style('display','none')
						.call(xAxis)
						.selectAll('text')
						.attr('fill',"black")
						.attr('font-size',12)
						.text(function(d){return xAxisData[d]})
						
	// legend here

			

		var legendGroup = multiAxisMAinGroup.append('g')
								 .attr('class','legend')
								 .attr("transform", "translate(" + leftAxisMargin + "," +0+ ")")
		
		var legendSize = 15;
		var lineStroke = 3;
		var yPositionOfLegend = 0;
		var legendArray = [];
		for(var i= 0 ;i<yObject.length ; i++)
		{
			legendArray[i] = yObject[i]["Legend"];
		}
		
		var legendPositionArray = legendController.showHorizontalLegend(rightAxisMargin-leftAxisMargin,yPositionOfLegend,legendArray,legendSize);

		var legendRef = legendGroup.selectAll('.line')
									.data(legendPositionArray)
									.enter()
									.append('line')
									.attr('x1',function(d,i){ return legendPositionArray[i].x;})
									.attr('y1',function(d,i){return legendPositionArray[i].y;})
									.attr('x2',function(d,i){ return legendPositionArray[i].x + legendSize;})
									.attr('y2',function(d,i){return legendPositionArray[i].y;})
									.attr('stroke',function(d,i){return yObject[i]["Y AxisColor"]});
		var legendTextRef = legendGroup.selectAll('.text')
									.data(legendPositionArray)
									.enter()
									.append('text')
									.attr('x',function(d,i){return legendPositionArray[i].textXPos;})
									.attr('y',function(d,i){return legendPositionArray[i].y + lineStroke ;})
									.attr('font-family',fontFamily)
									.attr('font-size',14)
									.text(function(d,i){return legendArray[i];})
									//.style("fill",textStyleConfg["legendTextColor"]);				


								
	// line path here
	for(var counter = 0;counter<yObject.length;counter++)
	{
			var lineFunction = d3.svg.line()
							.x(function(d,i) {return xScale(xAxisTimeIndex[i]); })
							.y(function(d,i) {return yScale[counter](yObject[counter]["Y AxisData"][i]); })                       
		//					.interpolate("cardinal");
							
			var lineGraphRef = multiAxisMAinGroup.selectAll(".path")
									 .data([xAxisData])
									 .enter()
									 .append("path")
									 .attr("d", lineFunction)	  
									 .attr("stroke",yObject[counter]["Y AxisColor"])
									 .attr("fill", "none");
									 
			//transition here
			
		var totalLength = lineGraphRef.node().getTotalLength();

		lineGraphRef.attr("stroke-dasharray", function (d) {
		
			
				return totalLength + "," + totalLength;
		})
			.attr("stroke-dashoffset", totalLength)
			.transition()
			.duration(2000)
			.ease("linear")
			.attr("stroke-dashoffset", 0);
	
	}	
	for(var counter = 0;counter<yObject.length;counter++)
	{
		for(var nestedCounter = 0;nestedCounter<xAxisData.length;nestedCounter++)
		{
			var circleRef1 = multiAxisMAinGroup.append('circle')
										   .attr('cx',0)
										  .attr('cy',0)
										  .attr('r',3)
										  .attr('stroke',yObject[counter]["Y AxisColor"])
										  .attr('fill','white');
								circleRef1.transition().duration(2500)
										  .attr('cx',xScale(xAxisTimeIndex[nestedCounter]))
										  .attr('cy',yScale[counter](yObject[counter]["Y AxisData"][nestedCounter]))
	
										  
		}				
	}
	
	return svgElement;
	
}

function drawThreeDStackedBarChart(divId, threeDStackedBarsData, options, xAxisArray,fontFamily) {
	
	var colorArray = [];
	for(var i =0 ;i<threeDStackedBarsData.length ; i++)
	{
		colorArray[i] = threeDStackedBarsData[i].Color;
	}

	var cfg = {
			topMargin: 5,
			rightMargin: 30,
			bottomMargin: 0,
			leftMargin: 10,
			color: d3.scale.category20(),
			toolTipLabelForYAxis: "Profit(in Crores)",
			axisTextColor:'black',
			legendTextColor:'black'
		};

		if ('undefined' !== typeof options) {
			for (var i in options) {
				if ('undefined' !== typeof options[i]) {
					cfg[i] = options[i];
				}
			}
		}	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
		
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
			.attr('id','threeDStackBar')
			.attr("width", width)
			.attr("height", height);	

	var widthOfBars = (0.9 * width) / (threeDStackedBarsData[0].Data.length* 2);
	var spacingFactorInBars = 10;
	var rightMargin = 140;
	var ySpacingFactor = 5;		
	var newXSpacingInBars = (0.3*width) / threeDStackedBarsData.length;
	spacingFactorInBars=widthOfBars*.6;		
	var newWidthOfBars = (width) / (threeDStackedBarsData[0].Data.length* 2);
	widthOfBars = newWidthOfBars;

	var xSpacingInBars = newWidthOfBars + spacingFactorInBars;

	var maxArrayForBars = [];
	var sumOfMaxInEachBar = 0;
	var legendArray=[];
	var legendNameMap={};
	for(var k = 0 ; k < threeDStackedBarsData.length ; k++)
	{					
		var max = d3.max(threeDStackedBarsData[k].Data, function(d,i){ return d;});
		sumOfMaxInEachBar = sumOfMaxInEachBar + max;
		maxArrayForBars.push(max);	
		legendArray.push(threeDStackedBarsData[k].Key);	
		legendNameMap[threeDStackedBarsData[k].Key]="legend-"+k;	
	}

	var maxHeight =sumOfMaxInEachBar;
	var leftBarMargin = 0;
	var leftMargins	= 30;
	var padding = 0;
	var bottomMargins = 0;
	var spacingInHorizontalLines = 40;

	var sum = 1;				
	for(k=0;k<(''+maxHeight).length - 1;k++)
	{
		sum = sum+"0";				
	}		

	var lineFunction = d3.svg.line()
							  .x(function(d) { return d.x; })
							  .y(function(d) { return d.y; })
							 .interpolate("linear");


	var threeDBarXRegion=(threeDStackedBarsData[0].Data.length* xSpacingInBars) + widthOfBars/2;
	var xScale = d3.scale.linear()
			.domain([0, threeDStackedBarsData[0].Data.length])
			.range([widthOfBars/1.5,threeDBarXRegion ]);
			
		


	var yScale = d3.scale.linear()
			.domain([0, 1.55 * maxHeight])
			.range([height - 0.15 *height, 0]);             
	 
	var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")					
			.tickFormat(formatAsPercentage)
			.tickSize(0);

	var yAxis = d3.svg.axis()
			.scale(yScale)						
			.orient("left")
			.tickSize(0);;			

	var formatAsPercentage = d3.format("1");		

	var largestStringLngth=0;
		for(var counter =0 ;counter<xAxisArray.length;counter++)
		{
			if(largestStringLngth<(xAxisArray[counter].toString()).length)
			{
				largestStringLngth = (xAxisArray[counter].toString()).length;
			}
		}
	xAxis.tickValues(tickController.getXTickArray(0,(xAxisArray.length),largestStringLngth, (threeDBarXRegion-widthOfBars/1.5)));	
	//xAxis.tickValues(d3.range(0, xAxisArray.length , 1));
	yAxis.tickValues(d3.range(0, 1.5* maxHeight, ((1.5* maxHeight)/10)));

	var maxYScale =	maxHeight + 100*(''+maxHeight).length;			
	var nextY = yScale(1.5*maxHeight);			

	var leftTranslation;
	if(width<400){
		leftTranslation=50;
	}else{
		leftTranslation=threeDBarXRegion*0.02;
	}
	svgElement=svgElement.append("g")
			  .attr("transform","translate("+leftTranslation+",0)");

	threeDBarXRegion=threeDBarXRegion+threeDBarXRegion*.1;	
	function drawHorizontalLines(startX, startY, widthOfBars, maxHeight , nextY)
	{
		maxHeight = yScale(maxHeight);
		startY = yScale(startY);
		
		
		var scaleLine=[];				
				for(l=0; l<3; l++)
				{
					if(l==0)
					{
						
						x = startX-threeDBarXRegion*0.07;
						y = (startY-nextY) + 0.03 * width;
						
					}	
					else if(l==1)
					{
						x=startX-20;
						y=(startY-nextY);
					}
					else if(l==2)
					{
						x=threeDBarXRegion;
						y=(startY-nextY);														
					}
				
					scaleLine.push(JSON.parse('{"x":'+x+',"y":'+y+'}'));                      
				}
				return scaleLine;					
	}

	var startX= width  - width * 0.89;
	var startY= height - height * 0.90;					


	var svgContainer = svgElement.append("g")
								  .attr("transform","translate("+width*0.04+","+0+")")	;
	for(j=0;j<10;j++)
	{

		var lineGraph = svgContainer.append("path")
							.attr("d", lineFunction(drawHorizontalLines(startX, startY, widthOfBars, maxHeight, nextY)))
							//.attr("stroke", "blue")
							.attr("stroke-width", 0.5)
							.attr("fill", "none");	
		
		var lineGraphLength= lineGraph.node().getTotalLength();

							lineGraph
							  .attr("stroke-dasharray", lineGraphLength + " " + lineGraphLength)
							  .attr("stroke-dashoffset", lineGraphLength)
							  .transition()
							  .duration(2000)
							  .ease("linear")
							  .attr("stroke-dashoffset", 1)
							  .attr("stroke", "lightsteelblue")
							  .attr("stroke-width", 0.5)
							  .attr("fill", "none");

				nextY=nextY + (yScale(0) - yScale((1.5* maxHeight)/10));						
	}


	var startX= width  - width * 0.89;

	var startY = yScale(0);

	var topYSideOne = 0;
	var topYSideTwo = 0;
	var topYSideThree = 0;



	var elementLengthInData=threeDStackedBarsData[0].Data.length;
	var totalElementsType = threeDStackedBarsData.length;

	for(var q=0; q<elementLengthInData; q++){

	var startY1 = yScale(0); 
	var currentHeight=0;

	for(var w=0; w<totalElementsType; w++){

		var currentData = threeDStackedBarsData[w].Data;
		
		var lineGraph1 = svgContainer.append("path")	
						.attr("class","lineGraphClass " + legendNameMap[threeDStackedBarsData[w].Key])
						.attr("d", lineFunction(getSidesCordinates(startX+leftBarMargin, startY1, widthOfBars, currentData[q], 1, currentData[q], 1 )))			
						.attr('val',function(){
							var cordinateArray=getSidesCordinates(startX+leftBarMargin, startY1, widthOfBars, currentData[q], 1, currentData[q], 1);
							return cordinateArray[0].height;
						})
						.attr("stroke", "grey")
						.attr("fill", colorArray[w])
						.attr("xVal",threeDStackedBarsData[w].Key)		
						.on("mouseover",function(){
						   //toolTipManager.showToolTip(d3.event, null, null, false, cfg.toolTipLabelForYAxis + " :- " + d3.select(this).attr('val'));
						//   var yHeadingValueMap=[{"headingName":cfg.toolTipLabelForYAxis,"headingVal":d3.select(this).attr('val')}];
			
						//	toolTipManager.showToolTip(d3.event,"",(d3.select(this).attr('xVal')), false,yHeadingValueMap);
						})
						.on("mouseout", function (d, i) {
							var targetElement = d3.select(this);
							toolTipManager.hideTooTip();
						})
						.style("display","none");
			
		
		var lineGraph2 = svgContainer.append("path")
						.attr("class","lineGraphClass " + legendNameMap[threeDStackedBarsData[w].Key])
						.attr("d", lineFunction(getSidesCordinates(startX+leftBarMargin, startY1, widthOfBars,currentData[q], 2, currentData[q], 1 )))
						.attr('val',function(){
								var cordinateArray=getSidesCordinates(startX+leftBarMargin, startY1, widthOfBars, currentData[q], 2, currentData[q], 1 );
								return cordinateArray[0].height;
							})
							.attr("stroke", "white")
						.attr("fill", colorArray[w])
						.attr("stroke", "grey")
						.attr("xVal",threeDStackedBarsData[w].Key)		
						.on("mouseover",function(){
						   //toolTipManager.showToolTip(d3.event, null, null, false, cfg.toolTipLabelForYAxis + " :- " + d3.select(this).attr('val'));
						//   var yHeadingValueMap=[{"headingName":cfg.toolTipLabelForYAxis,"headingVal":d3.select(this).attr('val')}];
			
						//	toolTipManager.showToolTip(d3.event,"",(d3.select(this).attr('xVal')), false,yHeadingValueMap);
						})
						.on("mouseout", function (d, i) {

					//		var targetElement = d3.select(this);
					//		toolTipManager.hideTooTip();
						})
						.style("display","none");

		var lineGraph3 = svgContainer.append("path")
						.attr("class","lineGraphClass " + legendNameMap[threeDStackedBarsData[w].Key])
						.attr("d", lineFunction(getSidesCordinates(startX+leftBarMargin, startY1, widthOfBars, currentData[q], 3, currentData[q], 1 )))
						.attr('val',function(){
								var cordinateArray=getSidesCordinates(startX+leftBarMargin, startY1, widthOfBars, currentData[q], 3, currentData[q], 1 );
								return cordinateArray[0].height;
							})
							.attr("stroke", "grey")
						.attr("fill", colorArray[w])
						.attr("xVal",threeDStackedBarsData[w].Key)		
						.on("mouseover",function(){
						   //toolTipManager.showToolTip(d3.event, null, null, false, cfg.toolTipLabelForYAxis + " :- " + d3.select(this).attr('val'));
					//	   var yHeadingValueMap=[{"headingName":cfg.toolTipLabelForYAxis,"headingVal":d3.select(this).attr('val')}];
			
					//		toolTipManager.showToolTip(d3.event,"",(d3.select(this).attr('xVal')), false,yHeadingValueMap);
						})
						.on("mouseout", function (d, i) {

					//		var targetElement = d3.select(this);
					//		toolTipManager.hideTooTip();
						})
						.style("display","none");
			
			currentHeight+=currentData[q] ;
			startY1 = yScale(currentHeight) - ySpacingFactor * (w+1);						
			
	}			  
		
	leftBarMargin=leftBarMargin+xSpacingInBars;		
	startY1 = yScale(0);
	}


	var eleArray=$(".lineGraphClass").hide();
	for(var m=0; m<eleArray.length; m++){
		
		$(eleArray[m]).slideUp(m * 100).delay(m *40).fadeIn();					
	}

//	hideAxisPath(svgElement);

	function getSidesCordinates(x,y,width,height,sideno,heightOfBar, dataNumber){

			height = yScale(0)-yScale(height) ;
		
			var lineData=[];
		
			if(sideno==1){
				var factor=parseInt(width*.33) + 1;
				var xHit=0;
				var yHit=0;
				for(var i=0;i<5;i++){
							
				   if(i==0)
				   {
						y = y;
											
				   }
				   else if(i==1)
				   {
					   y = y - height;	
				   }
				   else if(i==2)
				   {
					   x=x+width;   
				   }
				   else if(i==3)
				   {
					   y=y+height;    
				   }     
					else if(i==4)
				   {
					  x=x-width;    
				   }
					
					var nextY=y;
					var nextX=x;
					   
					lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+',"height":'+heightOfBar+'}'));                      
				}                               
			}
		 else if(sideno==2){
			 
				//var factor = *(15/380);
				var factor=parseInt(width*.33) + 1;
				//alert(height);
				
				for(var i=0;i<4;i++){
							
				   if(i==0)
				   {								   
					   y = y;											   
				   }
				   else if(i==1)
				   {
					   x=x-factor;
					   y=y-factor;								 
				   }
				   else if(i==2)
				   { 								
					   y=y-height;									
				   }
				   else if(i==3)
				   {
					   x=x+factor;
					   y=y+factor;  
				   }     
					   
					var nextY=y;
					var nextX=x;
					lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+',"height":'+heightOfBar+'}'));  
				}                               
				
			}
			else if(sideno==3){
				
				var factor=parseInt(width*.33) + 1;
				
				for(var i=0;i<4;i++){
							
				   if(i==0)
				   {
						topYSideThree = y + height;
						y = y - height;
						//topYSideThree = y;		
				   }
				   else if(i==1)
				   {
					   x=x-factor;
					   y=y-factor;
						 
				   }
				   else if(i==2)
				   {
					   x=x+width;   
				   }
				   else if(i==3)
				   {
					   x=x+factor;
					   y=y+factor;    
				   }     
					   
					var nextY=y;
					var nextX=x;
					   
					lineData.push(JSON.parse('{"x":'+nextX+',"y":'+nextY+',"height":'+heightOfBar+'}')); 											   
				}                              							
			}					
			return lineData;						
		}


	function mMove(){

		 var m = d3.mouse(this);
		 console.log(m);
		 d3.select(this).select("title").text(yScale(m[1]));
	}


	var xAxisRef=svgContainer.append("g")
			.attr("class", "axis")
			.attr("transform", "translate("+startX+"," + (height - height * 0.15 + yScale(1.5 * maxHeight)) + ")")						
			.call(xAxis);
			
	xAxisRef.selectAll('text').text(function(d,i){
				
			 return xAxisArray[i];
			})
			.style("fill","black");


	var yAxisRef=svgElement.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + (width*0.08) + ","+ (yScale(1.5 * maxHeight))  +")")
			.call(yAxis);
	/*
	d3.selectAll('.axis text')
			.style("fill",textColor);;	   

	d3.selectAll('.axis path').attr('fill','none');	
	*/

	//y indication label
	var pixcelPerChar=6;
	var indexOfParaenthesis=yAxisRef.attr("transform").indexOf("(")+1;
	var indexOfComma=yAxisRef.attr("transform").indexOf(",");

	var yTotalPixcel=cfg["Y Label"].toString().length*pixcelPerChar;
	var yLabelTop=height/2+yTotalPixcel/2;

	var yLabelLeft;
	if(width<400){
		yLabelLeft=-parseInt(yAxisRef.attr("transform").substring(indexOfParaenthesis,indexOfComma))*1.5;
	}else{
		yLabelLeft=-parseInt(yAxisRef.attr("transform").substring(indexOfParaenthesis,indexOfComma))*0.7;
	}

	axisLabelController.appendLabel(cfg["Y Label"],yLabelLeft,yLabelTop,-90,yAxisRef,"black",350,fontFamily);	

	//x indication label
	var xTotalPixcel=cfg["X Label"].toString().length*pixcelPerChar;
	var xLabelLeft=threeDBarXRegion/2-xTotalPixcel;
	var xLabelTop=height*0.1;
	axisLabelController.appendLabel(cfg["X Label"],xLabelLeft,xLabelTop,0,xAxisRef,"black",350,fontFamily);	

	//title here
	var pixcelPerChar = 8;
	var leftIndicator = (width/2) - ((cfg.Title.length*pixcelPerChar)/2)
	var titleGroup = svgElement.append("g")
							   .attr('class','title')
		
	axisLabelController.appendLabel(cfg.Title,leftIndicator,height*0.03,0,titleGroup,"black",500,fontFamily);			   



	var legend = svgContainer.append("g")
		.attr("class", "legend")
		.attr("width", width)
		.attr("height", height)
		.attr('transform', 'translate(' +startX + ','+(height * 0.08)+')');

	  
	  var legendWidth = 0;
	  var legendHeight = 0;

	  if(width > 300)
	  {
		  legendWidth = 12;
		  legendHeight = 12;
	  }
	  else
	  {
		  legendWidth = 10;
		  legendHeight = 10;
	  }
	 
	  var maxLengthOfKeys = d3.max(threeDStackedBarsData, function(d,i){  return d.Key.length;});
	  
		
		
	   var newXCord=0;
	   var CordBean={
		   
			getX:function(){
				
				return newXCord;
			},
			setX:function(val){
				newXCord=val;
			}
	   }
	   
	   var legendPositionArray=legendController.getLegendPositionArray(legendArray,width,maxHeight*0.25);
		legend.selectAll('rect')
				.data(legendArray)
				.enter()
				.append("rect")
				.attr("x", function (d, i) {
					/*
					var moveToNextLine=isMoveLegendToNextLine(d.key,xPos,i);
			
					if(moveToNextLine.move){
						xPos=moveToNextLine.startPos;
					}else{
						xPos=moveToNextLine.startPos;
					}
					positionXArray.push(xPos);
					return xPos;
					*/
					return legendPositionArray[i].x;
			})
				.attr("y", function(d,i){
					/*
					var moveToNextLine=isMoveLegendToNextLine(d.key,xPos1,i);
			
					//var yPos=0;
					if(moveToNextLine.move){
						nextLineCounter++;
						yPos=nextLineCounter*nextLineSeparator;
						xPos1=moveToNextLine.startPos;
					}else{
						xPos1=moveToNextLine.startPos;
					}
					positionYArray.push(yPos);
					return yPos;
					*/
					return legendPositionArray[i].y;
				})
				.attr("width", legendWidth)
				.attr("height", legendHeight)
				.style("fill", function (d, i) {
				return colorArray[i];
			})
			.on("click", function (d) {
				var state = svgElement.selectAll("." + legendNameMap[d]).style("display");
				if (state == "none") {

					$("."+legendNameMap[d]).slideUp(400).delay(400).fadeIn();
					svgElement.selectAll(".legend-text."+legendNameMap[d]).style("text-decoration","none");
				  
				} else {

					var selectedPath = svgElement.selectAll("." + legendNameMap[d]);
					$("."+legendNameMap[d]).slideDown(400).delay(400).fadeOut();                              
					svgElement.selectAll(".legend-text."+legendNameMap[d]).style("text-decoration","line-through");
				}
			});	
			   
		
		legend.selectAll('text')
				.data(legendArray)
				.enter()
				.append("text")
				.attr("class",function(d){
					return "legend-text "+legendNameMap[d];
				})
				.attr("x", function (d, i) {
					/*
					var x=positionXArray[i]+textSeparator;
					return x;
					*/
					return legendPositionArray[i].textPos;
				})
				.attr("y",function(d,i){
					/*
					var y=positionYArray[i]+textSeparator-legendHeight;
					return y;
					*/
					return legendPositionArray[i].y+legendHeight;
				})
				.attr("width", legendWidth)
				.attr("height", legendHeight)
				.attr("font-size", 12)
			   //.attr("dx", "1.50em")
			   .attr("dy", ".08em")
				.text(function (d, i) {
				return d;
			});
			
	//set axistextColor
	//svgElement.selectAll(".axis").selectAll("text").style("fill",cfg.axisTextColor);

	//set legendColor
	//legend.selectAll("text").style("fill",cfg.legendTextColor);

	//set font here
	//setTextStyleAndSvgBackGround(svgElement);	
	return svgElement;
}


function drawBulletBarChart(divId,data)
{
	var title = data["Title"];
	var xLabel = data["X Axis Label"];
	var yLabel = data["Y Axis Label"];
	var yAxisData = data["Y Axis Data"];
	var data1 = data["X Axis Data1"];
	var data2 = data["X Axis Data2"];
	var colorOfBar1 = data["Color of Data1"];
	var colorOfBar2 = data["Color of Data2"];
	var fontFamily = data.fontFamily;
	
	var width =parseInt(d3.select("#"+divId).style("width"));
	var height=parseInt(d3.select("#"+divId).style("height")); 
	
	var divSelection = d3.select("#"+divId);
	var svgElement = divSelection.append('svg')
			.attr('id','bulletBarChart')
			.attr("width", width)
			.attr("height", height);
	
	var bulletAnalChart={left:width*0.1,right:width*0.1,bottom:height*0.15,top:height*0.15,chartSeparator:10,xScalePaddingTop:height*0.2,yScalePaddingLeft:width*0.1};
	var scaleWidth=width-bulletAnalChart.left-bulletAnalChart.right;
	var scaleHeight=height-bulletAnalChart.top-bulletAnalChart.bottom;
					

	var yAxisTimeIndex = [];
	for(var counter = 0;counter<yAxisData.length ;counter++)
	{
		yAxisTimeIndex[counter] = counter;
	}
	
	gridManager.init(svgElement, scaleHeight, scaleWidth, bulletAnalChart.left, bulletAnalChart.top);
	
	var bulletChartMainGroup = svgElement.append("g")
					   .attr('class','main-group')
					   .attr("transform", "translate(" + bulletAnalChart.left + "," + bulletAnalChart.top + ")")

	
							   
	var minData = d3.min(data1)<d3.min(data2)?d3.min(data1):d3.min(data2);
	var maxData = d3.max(data1)>d3.max(data2)?d3.max(data1):d3.max(data2);
	if(maxData == 0){
		maxData =maxData1 +  2;
	}
	else{
		if(maxData>0){
			maxData =maxData* 1.2;
		}else{
			maxData =maxData * 0.8;
		}
	}

	if(minData == 0){
		minData =minData -  2;
	}
	else{
		if(minData<0){
			minData =minData* 1.5;
		}else{
			minData =minData * 0.1;
		}
	}
				
				
	var xScaleLeft = d3.scale.linear()
						 .domain([maxData,minData])
						 .range([0,scaleWidth*.5]); 
	
		//x axis
	var leftXAxis = d3.svg.axis()
				.scale(xScaleLeft)
				.orient("bottom");
			//	.ticks(10);
	var leftAxisRef = bulletChartMainGroup.append("g")
							.attr('id','xAxis')
							.attr("class", "xAxis")
							.attr('fill',"none")
							.attr("transform", "translate("+0+"," + (scaleHeight+(bulletAnalChart.bottom*.3)) + ")")
							.call(leftXAxis);
				 leftAxisRef.selectAll('text')
							 .style('font-size',13)
					//		 .attr('font-family',fontFamily)
							 .attr('fill','black');
	var xScaleRight = d3.scale.linear()
						 .domain([minData,maxData])
						 .range([scaleWidth*.5,scaleWidth]); 
	
		//x axis
	var rightXAxis = d3.svg.axis()
				.scale(xScaleRight)
				.orient("bottom");
			//	.ticks(10);
	var rightAxisRef = bulletChartMainGroup.append("g")
							.attr('id','xAxis')
							.attr("class", "xAxis")
							.attr('fill',"none")
							.attr("transform", "translate("+0+"," + (scaleHeight+(bulletAnalChart.bottom*.3)) + ")")
							.call(rightXAxis);
				 rightAxisRef.selectAll('text')
							 .style('font-size',13)
					//		 .attr('font-family',fontFamily)
							 .attr('fill','black');

	var leftYScale = d3.scale.linear()
					.domain([0,yAxisData.length-1])
					.range([scaleHeight,0]);
	var leftYAxis = d3.svg.axis()
					.scale(leftYScale)
					.orient("left")
					.tickValues(yAxisTimeIndex);
					
	bulletChartMainGroup.append("g")
					.attr('id','yAxis')
					.attr("class", "yAxis")
					.attr('fill',"none")
					.attr("transform", "translate("+(0)+"," + 0 + ")")
					.call(leftYAxis)
					.selectAll('text')
					.style('font-size',13)
					.style('font-family',fontFamily)
					.attr('fill','black')
					.text(function(d,i){return yAxisData[d]});		
	var rightYScale = d3.scale.linear()
					.domain([0,yAxisData.length-1])
					.range([scaleHeight,0]);
	var rightYAxis = d3.svg.axis()
					.scale(rightYScale)
					.orient("left")
					.tickValues(yAxisTimeIndex);
					
	bulletChartMainGroup.append("g")
					.attr('id','yAxis')
					.attr("class", "yAxis")
					.attr('fill',"none")
					.attr("transform", "translate("+(scaleWidth+(bulletAnalChart.right*.5))+"," + 0 + ")")
					.call(rightYAxis)
					.selectAll('text')
					.style('font-size',13)
					.style('font-family',fontFamily)
					.attr('fill','black')
					.text(function(d,i){return yAxisData[d]});
	var barHeight = scaleHeight/data1.length*.5;	

	var leftRectRef = bulletChartMainGroup.selectAll(".rect")
										  .data(data1)
										  .enter()
										  .append("rect")
										  .attr("x",function(d,i){return xScaleLeft(minData)})
										  .attr("y",function(d,i){return leftYScale(i)-(barHeight/2)})
										  .attr("height",barHeight)
										  .attr("width",function(d,i){ return 0;})
										  .attr("fill",colorOfBar1);
							leftRectRef.transition()
									   .duration(1500)
									   .attr("x",function(d,i){return xScaleLeft(d)})
									    .attr("width",function(d,i){ return xScaleLeft(minData)-xScaleLeft(d)-2})
								//	   .attr("y",function(d,i){return leftYScale(i)-(barHeight/2)})
									   

	var rightRectRef = bulletChartMainGroup.selectAll(".rect")
										  .data(data2)
										  .enter()
										  .append("rect")
										  .attr("x",function(d,i){return xScaleRight(minData)+2})
										  .attr("y",function(d,i){return leftYScale(i)-(barHeight/2)})
										  .attr("height",barHeight)
										  .attr("width",function(d,i){ return 0;})
										  .attr("fill",colorOfBar2);
							rightRectRef.transition()
										.duration(1500)			  
										.attr("width",function(d,i){ return xScaleRight(d)-xScaleLeft(minData)-2});  

		//y inidcation label

	
	var pixcelPerChar=6;
	var yTotalPixcel=yLabel.length*pixcelPerChar;
	var yLabelTop=((scaleHeight/2)+yTotalPixcel/2);
	var yLabelLeft=-(bulletAnalChart.left)*.5;
	var yLabelLeft1=scaleWidth + (bulletAnalChart.left)*.7;
	
	axisLabelController.appendLabel(yLabel,yLabelLeft,yLabelTop,-90,bulletChartMainGroup,"black",350,fontFamily);
	axisLabelController.appendLabel(yLabel,yLabelLeft1,yLabelTop,-90,bulletChartMainGroup,"black",350,fontFamily);
	
	//x indication label
	var xLabelLength=xLabel.length*pixcelPerChar;
	var xLabelLeft=scaleWidth/2-xLabelLength/2;
	var xLabelTop= scaleHeight + (bulletAnalChart.bottom*.9);
	axisLabelController.appendLabel(xLabel,xLabelLeft,xLabelTop,0,bulletChartMainGroup,"black",350,fontFamily);
	
	//title here
	var pixcelPerChar = 8;
	var leftIndicator = (width/2) - ((title.length*pixcelPerChar)/2)
	var titleGroup = svgElement.append("g")
							   .attr('class','title')
		
	axisLabelController.appendLabel(title,leftIndicator,bulletAnalChart.top*.35,0,titleGroup,"black",500,fontFamily);
	
	return svgElement;
}