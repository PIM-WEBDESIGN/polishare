 var initialX=0;
 var initialY=0;
 var path='';
 var currentShape='';
 var selectedArea = '';
 var editingElementColor = "cyan";
 var spell="";	
 var textCounter=1;
 var lineCounter=1;
 var eclipseCounter=1;
 var rangeEditor = 1;

$(document).ready(function(){ 
   $("#textEditing").click(function() {
		currentShape='text';
   });
   
   $("#drawEclipse").click(function() {
		currentShape='eclipse';
   });
   $("#drawLine").click(function() {
		currentShape='line';
   });
   $("#drawRange").click(function() {
		currentShape='range';
   });	
   
   $(document).on('change','#editor-color',function()
   {   
		editingElementColor = $(this).val();
   });
	
	/*$(document).on('keydown',function(event){
		if(event.keyCode === 8){
			event.preventDefault();	
		}
   });*/
   
});	
function editor(chart)
{
	selectedArea=chart;//d3.select('.extent');
	selectedArea
    .on("mousedown", mousedown)
    .on("mouseup", mouseup)
	.on("keydown", function () { console.log("div key"); });

}



function mousedown() {
	eclipseCounter++;
	lineCounter++;
	textCounter++;
	rangeEditor++;
	spell = "";
	if(currentShape == "text"){
		
		//alert("hello");
		console.log(d3.mouse(this));
		//console.log($(this));
		 $(this).focus();
		 $(this).contentEditable = true;
		 //d3.mouse(this).contentEditable = true;
		
	}
	d3.selectAll('.brush').style('display','block');
    var m = d3.mouse(this);
	initialX=m[0];
		initialY=m[1];

    selectedArea.on("mousemove", mousemove);
}

function mousemove(){
 var m = d3.mouse(this);
   createShapes(currentShape,m);
    // createShapes('rangeline',m);
}

function mouseup() {
    selectedArea.on("mousemove", null);
	d3.selectAll('.brush').style('display','none');
}
  
	function createShapes(shape,currentPos){
    switch(shape){
	  case "eclipse":
	         createEclipse(currentPos);
			 break;
	  case "line":
	         createLine(currentPos);
			 break;		 
	  case "straight":
	        createStraightLine(currentPos);
			break;
	  case "range":
	      // alert(range);
	        createRangeLine(currentPos);
			break;
	}


}


function createEclipse(m){
	selectedArea.selectAll('#eclipsEditor'+eclipseCounter).remove();
    
	var middleX=(m[0]+initialX)/2;
	var middleY=(m[1]+((m[0]-initialX)*.20));
	
	var middleX1=(m[0]+initialX)/2;
	var middleY1=(m[1]-((m[0]-initialX)*.20));
	var pathArray=[[initialX-30,initialY-30],[middleX,middleY],[m[0],m[1]],[middleX1,middleY1]];
	//alert('mouseUp');
     path = selectedArea.append('path')
    .data([pathArray])
	.attr('id','eclipsEditor'+eclipseCounter)
	.attr('class','editorElement')
    .attr('d', d3.svg.line().interpolate('basis-closed'))
    .attr('stroke-weight', '4px')
	.attr('stroke-width',1.5)
	.attr('stroke', editingElementColor)
    .attr('fill', 'none')
	.on("click",function(){
			var curentClickPosition = d3.mouse(this);
			d3.selectAll('.crossButton').remove();
			var id = d3.select(this).attr("id");
			addDeleteButton(curentClickPosition[0],curentClickPosition[1],id);
	});

}


function createRangeLine(m){
 line = selectedArea.append("line")
	//	.attr('class','editorElement')
		.attr('class','rangeEditor'+rangeEditor)
        .attr("x1", initialX)
        .attr("y1", initialY)
        .attr("x2", m[0])
        .attr("y2", m[1])
		.style("stroke",editingElementColor)
		.style("stroke-width","1px")
		.on("click",function(){
			var curentClickPosition = d3.mouse(this);
			d3.selectAll('.crossButton').remove();
			var id = d3.select(this).attr("class");
			addDeleteButton(curentClickPosition[0],curentClickPosition[1],id);
		});
		//.on('drag',onDrag);
		
		var lineFunction = d3.svg.line()
           .x(function(d) { return d.x; })
           .y(function(d) { return d.y; })
          .interpolate("linear");


}


function createLine(m){
d3.selectAll('#textEditor'+textCounter).remove();
 line = selectedArea.append("line")
    .attr('id','textEditor'+textCounter)
		.attr('class','editorElement')
        .attr("x1", initialX)
        .attr("y1", initialY)
        .attr("x2", m[0])
        .attr("y2", m[1])
		.style("stroke",editingElementColor)
		.attr('stroke-width',1.5)
		.style("stroke-width","1px")
		.on("click",function(){
			var curentClickPosition = d3.mouse(this);
			d3.selectAll('.crossButton').remove();
			var id = d3.select(this).attr("id");
			addDeleteButton(curentClickPosition[0],curentClickPosition[1],id);
		});
		//.on('drag',onDrag);
		
		var lineFunction = d3.svg.line()
           .x(function(d) { return d.x; })
           .y(function(d) { return d.y; })
          .interpolate("linear");


}


function createStraightLine(m){
d3.selectAll('.baseLine').remove();
 line = selectedArea.append("line")
		.attr('class','editorElement')
        .attr("x1", initialX)
        .attr("y1", initialY)
        .attr("x2", m[0])
        .attr("y2", initialY)
		.attr("stroke",editingElementColor);
		//.on('drag',onDrag);
		
		var lineFunction = d3.svg.line()
           .x(function(d) { return d.x; })
           .y(function(d) { return d.y; })
          .interpolate("linear");


}


$('body').keypress(function(e){
	//	console.log("pppppp");
		if(currentShape=='text'){
		
		  var chrCode=e.which || e.keyCode;
		  var key=String.fromCharCode(chrCode);
		  console.log(chrCode +"::"+e.keyCode);
		  if(chrCode==13){
			spell="";
			textCounter++;
			 initialY+=14;
		  }
		  else if(chrCode==8){
		   spell=spell.substring(0,spell.length-1);
		  }
		  else{
		  spell=spell.concat(key);
		  }
		  selectedArea.select('#workingID'+textCounter).remove();
		  d3.select("#chartArea svg")
		 //  selectedArea
		  .append('text')
		  .attr('fill',editingElementColor)
		  .attr('x',initialX)
		  .attr('y',initialY)
		  .attr('id','workingID'+textCounter)
		  .text(spell)
		  .style("fill",editingElementColor)
		  .style("color",editingElementColor)
		  .style("font-size","12px")
		  .style("stroke-width","1px");
	   }
	   console.log(spell);
});


$('body').keydown(function(e){
  //  console.log("ddddddddddddddd");
	if(currentShape=='text'){
		  if(e.which==8){
		   spell=spell.substring(0,spell.length-1);
		   selectedArea.select('#workingID'+textCounter).remove();
		   d3.select("#chartArea svg")
		 //  selectedArea
		  .append('text')
		  .attr('fill',editingElementColor)
		  .attr('x',initialX)
		  .attr('y',initialY)
		  .attr('id','workingID'+textCounter)
		  .text(spell)
		  .style("fill",editingElementColor)
		  .style("color",editingElementColor)
		  .style("font-size","12px")
		  .style("stroke-width","1px");
		  }
	 console.log(spell);	  
  }
});

function addDeleteButton(x,y,id)
{
	selectedArea.append("image")
				.attr("x",x)
				.attr("y",y-10)
				.attr("class",'crossButton')
				.attr("width",15)
				.attr("height",15)
				.attr("xlink:href","img/cross.png")
				.on("click",function(){
					d3.selectAll('.crossButton').remove();
					d3.select("#"+id).remove();
					d3.selectAll("."+id).remove();
				});
}
/*
$(document).ready(function(){
	console.log("s"+$("#chartArea"));
	$('#chartArea').on('keydown','svg',function(){
		console.log("sssss");
	});

});
*/

