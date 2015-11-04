console.log("called");

$(document).ready(function(){
	
	var flag = 0;	
// Instance the tour
var tour = new Tour({
	  name: "tour",
	//  steps :[],
  
  steps: [
  {
    element: "body",
    title: "ABOUT POLISHARE ",//1
    content: "POLISHARE is runtime charting tool , through which you can make any chart by just adding data and with POLISHARE you can share images and edited charts on twitter and POLISHARE  also provide feature of report generation in which you can add your chart/graphs also. So lets start a tour on how POLISHARE works .Select Any Chart , You want to use",
	placement:"top"
  },
  {
    element: "#barChart",
    title: "STEP 1",//2
    //content: "Click On Any Chart"
	content : "SELECTING A CHART. I have selected simple Bar Chart."
  }, 
  {
    element: "#dataCollector",
    title: "STEP 2",//3
    content: "Enter Data in all the fields Required For The Chart",
	placement:"top"
  }, 
  {
    element: "#nextToThemeManager",
    title: "STEP 3",//4
    content: "After you filled all the fields , Click on NEXT Button",
	placement:"top"
  }, 
  {
    element: "#themeManager",
    title: "STEP 4",//5
    content: "From this drop down list select any font family and Click on Make Chart Button",
	placement:"top"
  }, 
/*  {
    element: "#makeChart",
    title: "NOW MAKE A CHART",//6
    content: "Click on this button",
	placement:"bottom"
  },
*/ 
  {
    element: "#chartArea",
    title:"STEP 5",//6
    content: "HERE IS YOUR CHART . '\n' WANT TO DO MORE WITH THIS CHART , click NEXT button to see what we have for you"
  }, 
  {
    element: "#textEditing",
    title: "WANT TO ADD SOME TEXT TO CHART",//7
    content: "Click on this"
  }, 
  {
    element: "#drawEclipse",
    title: "WANT SOME SHAPES FOR HIGHLITING",//8
    content: "Click this for Ellipse"
  }, 
  {
    element: "#drawLine",
    title: "SHAPES CONTI....",//9
    content: "Click this for a single line"
	},
  {
    element: "#drawRange",
    title: "SHAPES CONTI....",//10
    content: "Click for Multiple lines"
  },
  {
    element: "#editor-color",
    title: "COLOR CHANGER", //11
    content: "WANT TO ADD SOME DIFFERENT COLORS TO THE TEXT AND LINES , Select this"
  }, 
  {
	element: "#nextBtnToDownload",
    title: "STEP 6", //12
    content: "WANT TO DOWNLOAD THIS , Click on this",
	placement : "top"	
  },
  {
    element: "#selectedImageType",
    title: "STEP 7", //13
    content: "Select the image type in which to download"
  }, 
  {
    element: "#downloadChart",
    title: "CONGRATULATION ! YOUR CHART IS READY FOR DOWNLOADING", //14
    content: "Click on END"
  }
],
  container: "body",
  keyboard: true,
  storage: window.localStorage,
  debug: true,
  backdrop: true,
  backdropContainer: 'body',
  backdropPadding: 0,
  redirect: true,
  orphan: false,
  duration: false,
  delay: false,
  basePath: "",
 template: "<div class='popover tour tourTolTip'>" +
    "<div class='arrow'></div>" +
	"<i class='fa fa-times-circle btn-close-toltip' ></i>"+
    "<h3 class='popover-title'>  </h3>"+
    "<div class='popover-content'> </div>" +
    "<div class='popover-navigation'>" +
        "<button class='btn btn-info' style='margin-right:10px;' data-role='prev'><i class='fa fa-angle-double-left'></i> "+
 		"prev</button>"+
        
        "<button class='btn btn-info' data-role='next'> "+ "Next <i class='fa fa-angle-double-right'></i> </button>"+
		
		 "<button class='btn btn-danger pull-right' data-role='end'>End tour</button>"+
    "</div>"+
    
    "</nav>"+
  "</div>",
afterGetState: function (key, value) {},
  afterSetState: function (key, value) {},
  afterRemoveState: function (key, value) {},
  onStart: function (tour) {},
  onEnd: function (tour) {
		if(flag == 11){
			$('#downloadChart').trigger('click');
		}
	  	//$('#downloadChart').trigger('click');
		//$('#homePage').trigger('click');
		$('#homePage').trigger('click');
	
  },
  onShow: function (tour) {},
  onShown: function (tour) {},
  onHide: function (tour) {},
  onHidden: function (tour) {},
 onNext: function (tour) {
	console.log(tour);
	var index = tour._current;
	
	switch(index){
		
		case 1:{
					$('#chartGridView').hide();
					$('#dataCollector').show();
					$('#barChart').trigger('click');
					$('#Title').val("SALARY OF JUNE");
					$('#XAxisData').val("MOHIT,GURJANT,RAJIV");
					$('#XAxisLabel').val("EMPLOYEES");
					$('#YAxisData').val("75,80,70");
					$('#YAxisLabel').val("THOUSANDS");
					$('#YAxisUnit').val("RS");
					$('#Color').val("#ff8000");
					flag++;
					break;
				}
		case 2:{
					flag++;
					//console.log("cliked");
					break;
			   }
		case 3 :{
					flag++;
					console.log("cliked");
					$('#nextToThemeManager').trigger('click');
					//$('#selectedFontFamily').trigger('click');
					$('#selectedFontFamily').show();
					$('#selectedFontFamily').trigger('mousedown'); 
					break;
				}	   
		case 4:{
					flag++;
					$('#selectedFontFamily').show().focus();
					$('#selectedFontFamily').trigger('mousedown'); 
					console.log("cliked");
					break;
				}
		case 5 :{
					flag++;
					$('#makeChart').trigger('click');
					break;
				}
		case 6 :{
						flag++;
						break;
				}			
		case 7 :{
					flag++;
					break;
				}
		case 8 :{
					flag++;
					break;
				}			
		case 9 :{
					flag++;
					break;
				}
		case 10 :{
					flag++;
					break;
				}
		case 11 :{
					flag++;
					if(flag == 11)
					$('#nextBtnToDownload').trigger('click');
					else
					break;
				}
	}				
  },
  onPrev: function (tour) {
	  console.log(tour);
  },
  /*duration:function(tour){
	  console.log(tour._duration);
  },
  */
  onPause: function (tour, duration) {},
  onResume: function (tour, duration) {},
  onRedirectError: function (tour) {}
  });
// Initialize the tour

$('#startTour').on('click',function(){
	//alert("tour started");
	tour.restart();
	//tour.init();
	//tour.start(true);
	
});

// Start the tour

$(document).on('click','.btn-close-toltip',function(){
	flag--;
	tour.end();
	//$('.tourTolTip').hide();
	
});
	
	
}); 

