
var lastX, lastY;
var ctx;
var pencilcolor="red";
var penStrokeWidth=3;

//Returns contents of a canvas as a png based data url, with the specified
//background color
function canvasToImage(backgroundColor,canvasId)
{	
	var canvas=document.getElementById(canvasId);
	var context=canvas.getContext("2d");
	var compositeOperation;
	//cache height and width		
	var w = canvas.width;
	var h = canvas.height;

	var data;		

	if(backgroundColor)
	{
		//get the current ImageData for the canvas.
		data = context.getImageData(0, 0, w, h);
		
		//store the current globalCompositeOperation
		compositeOperation = context.globalCompositeOperation;

		//set to draw behind current content
		context.globalCompositeOperation = "destination-over";

		//set background color
		context.fillStyle = backgroundColor;

		//draw background / rect on entire canvas
		context.fillRect(0,0,w,h);
	}
	

	
	//get the image data from the canvas
	var imageData = canvas.toDataURL("image/png");
	/*
	if(backgroundColor)
	{
		//clear the canvas
		context.clearRect (0,0,w,h);

		//restore it with original / cached ImageData
		context.putImageData(data, 0,0);		

		//reset the globalCompositeOperation to what it was
		context.globalCompositeOperation = compositeOperation;
	}
	*/
	//return the Base64 encoded data url string
	
	//for download image automatically
	var rawImageData=imageData.replace("image/png", "image/octet-stream");
   // document.location.href=rawImageData;
	
	console.log("image  data "+imageData);
	return imageData;
	
}



/*
	working:it will copy svg on canvas
	requiiredInput: 1. container Id which have enclosed Svgs 
					2. target canvas Id
	
	Other Requirement: Each svg under the encolsed container should have ID
*/
function copyChartToCanvas(chartContainerId,canvasId,callback){
				
					
					var $container = $('#'+chartContainerId)
					,
					canvas=document.getElementById(canvasId),
					content = $container.html().trim();
					
					var ctx = canvas.getContext('2d');
					
					
					document.getElementById(canvasId).getContext("2d").clearRect ( 0 , 0 , $("#"+canvasId).width(), $("#"+canvasId).height() );
					
					var svgArray=$($container).find("svg");
					var currentImageYPos=0;
					
					/*
					for(var i=0;i<svgArray.length;i++){
						var svgId=	$(svgArray[i]).attr("id");
						
						(function(svgId){   //this is a closure which we use to ensure each iteration has the right version of the variable 'svg_xml'
							var svg_xml = (new XMLSerializer()).serializeToString(document.getElementById(svgId));
						
							console.log("id "+svgId);
							var img = new Image();
							img.src = "data:image/svg+xml;base64," + btoa(svg_xml);
							
							if(i == 0){
								currentImageYPos=0;
							}else{
								var previousSvgId=$(svgArray[i-1]).attr("id");
								var previousSvgHeight=$("#"+previousSvgId).height();
								
								currentImageYPos+=previousSvgHeight;
								
							}
							
							console.log("start po s "+currentImageYPos +" svg Id "+svgId);
							img.onload = function() {
								// after this, Canvas’ origin-clean is DIRTY
								ctx.drawImage(img, 0,currentImageYPos);
							}	
						})(svgId);          //on each iteration, pass in the current file to the closure so that it can be used within

					}
					*/
					(function (ondone) {
						var index = 0;
						nextStep();

						function nextStep() {
							if (index >(svgArray.length-1)) {
								//if (ondone){
									ondone();
									return;
								//}
							}else{
								var svgId=$(svgArray[index]).attr("id");
								var svg_xml = (new XMLSerializer()).serializeToString(document.getElementById(svgId));
							
								console.log("id "+svgId);
								var img = new Image();
								img.src = "data:image/svg+xml;base64," + btoa(svg_xml);
								
								if(index == 0){
									currentImageYPos=0;
								}else{
									var previousSvgId=$(svgArray[index-1]).attr("id");
									var previousSvgHeight=$("#"+previousSvgId).height();
									
									currentImageYPos+=previousSvgHeight;
									
								}
								
								console.log("start po s "+currentImageYPos +" svg Id "+svgId);
								index++;
								img.onload = function() {
									// after this, Canvas’ origin-clean is DIRTY
									ctx.drawImage(img, 0,currentImageYPos);
									nextStep();
								}	
							}
						}
					})(function () { var imageData=canvasToImage("white",canvasId);
						if(callback){
							callback(imageData);
						}
					});
					
				}
				

function postImage(imageData) {
						
						var	media = imageData.toString("base64").substring(22)
						var message = "Test Message";
						var method='POST';
						var uri = "http://www.4thdimension.io/twitterMedia/" + message ;
						$.ajax({
							url: uri,
							dataType: "json",
							type: method,
							data:media,
							contentType: 'application/octet-stream',
							success: function(data) {
								console.log("succcess");
								window.open("http://www.4thdimension.io/sessions/connect","_blank");
								console.log("done"+data);
							},
							error: function(data) {
							//	window.open("http://192.168.1.243:3080/sessions/connect","_blank");
								console.log('error ' + data);
							}
						});
					}				
$(document).ready(function(){
				
		/*
		function oAuthConfig() {
 
					  var oAuthConfig = UrlFetchApp.addOAuthService("twitter");
					  oAuthConfig.setAccessTokenUrl("http://api.twitter.com/oauth/access_token");
					  oAuthConfig.setRequestTokenUrl("http://api.twitter.com/oauth/request_token");
					  oAuthConfig.setAuthorizationUrl("http://api.twitter.com/oauth/authorize");
					 
					  oAuthConfig.setConsumerKey("key");
					  oAuthConfig.setConsumerSecret("secret");
					 
					}
					 
					
	
				
				$("#twitterImg").click(function(){
					window.open("")
					postImage();
				})
				
				
				 var mousePressed=false;	
				 function InitThis() {
						//  ctx = document.getElementById('myCanvas').getContext("2d");
						var canvasid='#canvas2';
						ctx = document.getElementById('canvas2').getContext("2d");
						$(canvasid).mousedown(function (e) {
							mousePressed = true;
							Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
						});

						$(canvasid).mousemove(function (e) {
							if (mousePressed) {
								Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
							}
						});

						$(canvasid).mouseup(function (e) {
							mousePressed = false;
						});
						
						$(canvasid).mouseleave(function (e) {
							mousePressed = false;
						});
				}

				function Draw(x, y, isDown) {
						if (isDown) {
							ctx.beginPath();
							ctx.strokeStyle =pencilcolor;// $('#selColor').val();
							ctx.lineWidth =penStrokeWidth;// $('#selWidth').val();
							ctx.lineJoin = "round";
							ctx.moveTo(lastX, lastY);
							ctx.lineTo(x, y);
							ctx.closePath();
							ctx.stroke();
						}
						lastX = x; lastY = y;
				}
					
				function clearArea() {
					// Use the identity matrix while clearing the canvas
					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				}
				
				
				
				
				//$('#canvas2').attr("width",width);
				//$('#canvas2').attr("height",height);
				
				InitThis();
				var container = document.getElementById('historicalDataChart');
				   // init(container, 500, 400, 'black');
					
					
					
				


			$('#isEditableArena').click(function() {
				var $this = $(this);
				// $this will contain a reference to the checkbox   
				if ($this.is(':checked')) {
					
					var width=$("#historicalDataChart").width()+50;
					var height=$("#historicalDataChart").outerHeight();
					
					var canvasObj=document.getElementById("canvas2");
					canvasObj.width=width;
					canvasObj.height=height;	
					
					$('#canvas2').show();
					
					$("#historicalDataChart").css("display","none");
					//$('#canvas2').css("visibility","visible");
					//copy  chart to  canvas
					copyChartToCanvas('testHistoric','canvas2');
					
					
					
					
				} else {
						//$('#canvas2').css("visibility","hidden");
						
						//$("canvas").remove();
						
						$('#canvas2').hide();
						
						$("#historicalDataChart").css("display","block");
						
						//$('#canvas2').hide(function(){
							//$(".chartLink[name='historicalDataChart']").trigger("click");
							//$("#historicalDataChart").css("display","block");
						//});
						
				}
			});
			
			
			$("#saveImageBtn").click(function(){
				var img=document.getElementById("canvasImg");
				var url=img.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
				window.open(url);
				
			});
			
			$('#penstrokewidth').change(function() {
			//alert($('select option:selected').val());
				penStrokeWidth=$('select option:selected').val();
			
			});
			
			$('#pencolor').click(function(e){
					$('#colorPicker').unbind('colorchange');
					console.log("offset is:"+$('.beanish-color'));
					$("#colorPicker").jqxColorPicker({
						width: 200,
						height: 180
					});
					$("#colorpickerbox").css('left',e.offSetX +'px');
					$('#colorpickerbox').show();
					$('#colorPicker').bind('colorchange', function (event)
					{ 
						var cCode='#'+$("#colorPicker").jqxColorPicker('getColor').hex;
						$('.fa-pencil-color').css('color',cCode);
						pencilcolor=cCode;
					
					});
			  
			});
			
			$('.clear-editing').click(function(){
				clearArea();
			
			});
			
			









*/





});