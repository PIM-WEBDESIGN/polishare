var simpleJSON ={
     "donutChart" :  {"Title" : ["Last 15 day's temperature readings","string","string"],
					  "Dount key":["Agnitio,IBM,Facebook","array","string"],
					  "Dount Data":["12000,8850,10000","array","int"],
					  "Color":["#e67a77,#95d7bb,#aec785","array","string","colorTag"],
					  "Factor":["Cost","string","string"],
					  "Legend Orient":["left","string","string"],
					  "multiValueValidation" : ["Dount key","Dount Data","Color"],
					  "singleValueValidation" : ["Legend Orient"]
					  },
     "pieChart"   :  {"Title" : ["Last 15 day's temperature readings","string","string"],
					  "Pie key":["Agnitio,IBM,Facebook","array","string"],
					  "Pie Data":["12000,8850,10000","array","int"],
					  "Color":["#e67a77,#95d7bb,#aec785","array","string","colorTag"],
					  "Factor":["Cost","string","string"],
					  "Legend Orient":["left","string","string"],
					  "multiValueValidation" : ["Pie key","Pie Data","Color"],
					  "singleValueValidation" : ["Legend Orient"]
					  },
	"threeDPieChart":  {"Title" : ["Last 15 day's temperature readings","string","string"],
						"Pie Data" : ["231,123,184,155,55","array","int"],
						"Pie Key": ["Excellent,Above Avg.,Average,Below Avg.,Poor","array","string"],
						"Color" : ["pink,#95d7bb,#fcb322,#e67a77,#aec785","array","string","colorTag"],
						"Unit" : ["%","string","string"],
						"Factor" :["Students","string","string"],
						"multiValueValidation" : ["Pie Key","Pie Data","Color"]
					  },
	"threeDDountChart":  {"Title" : ["Last 15 day's temperature readings","string","string"],
						"Dount Data" : ["231,123,184,155,55","array","int"],
						"Dount key": ["Excellent,Above Avg.,Average,Below Avg.,Poor","array","string"],
						"Color" : ["pink,#95d7bb,#fcb322,#e67a77,#aec785","array","string","colorTag"],
						"Unit" : ["%","string","string"],
						"Factor" :["Students","string","string"],
						"multiValueValidation" : ["Dount key","Dount Data","Color"]
					  },				  
	 "barChart"   :  {
	                  "Title" : ["Last 15 day's temperature readings","string","string"],
					  "X Axis Data":["1'Mar,2'Mar,3'Mar,4'Mar,5'Mar,6'Mar,7'Mar,8'Mar","array","string"],
					  "X Axis Label":["Month","string","string"],
					  "Y Axis Data":["18,25,42,25,20,35,45,20","array","int"],
					  "Y Axis Label":["Temperature","string","string"],
					  "Y Axis Unit":["'\u00B0'+'C'","string","string"],
					  "Color":["#e67a77","string","string","colorTag"],
					  "multiValueValidation" : ["X Axis Data","Y Axis Data"],
					  "singleValueValidation" : ["Color"]
					  },	
    "threeDBarChart" :{
					  "Title" : ["Last 15 day's temperature readings","string","string"],
					  "X Axis Data":["1'Mar,2'Mar,3'Mar,4'Mar,5'Mar,6'Mar,7'Mar,8'Mar","array","string"],
					  "X Axis Label":["Month","string","string"],
					  "Y Axis Data":["18,25,42,25,20,35,45,20","array","int"],
					  "Y Axis Label":["Temperature","string","string"],
					  "Y Axis Unit":["'\u00B0'+'C'","string","string"],
					  "Color" :["#597090","string","string","colorTag"],
					  "multiValueValidation" : ["X Axis Data","Y Axis Data"],
					  "singleValueValidation" : ["Color"]
	                 },					  
    "comparisonChart" : {
						"Title" : ["Last 16 Year Data , Estimated v/s Actual Profit","string","string"],
						"Y Axis Label" : ["Profit","string","string"],
						"Y Axis Unit" : ["Million","string","string"],
						"Y Axis EstimateData" : ["300,270,200,230,180","array","int"],
						"Y Axis EstimateData Unit" : ["Estimated","string","string"],
						"Y Axis ActualData" : ["320,250,230,270,140","array","int"],
						"Y Axis ActualData Unit" : ["Actual","string","string"],
						"X Axis Label" : ["Years","string","string"],
						"X Axis Data" : ["2010,2011,2012,2013,2014","array","string"],
						"multiValueValidation" : ["Y Axis EstimateData","Y Axis ActualData","X Axis Data"]
					    //"singleValueValidation" : ["Color"]
					  },
	"threeDComparisonChart" :{
						"Title" : ["Last 16 Year Data , Estimated v/s Actual Profit","string","string"],
						"Y Axis Label" : ["Profit","string","string"],
						"Y Axis Unit" : ["Million","string","string"],
						"Y Axis EstimateData" : ["300,270,200,230,180","array","int"],
						"YbAxis EstimateData Unit" : ["Estimated","string","string"],
						"Y Axis ActualData" : ["320,250,230,270,140","array","int"],
						"Y Axis ActualData Unit" : ["Actual","string","string"],
						"X Axis Label" : ["Years","string","string"],
						"X Axis Data" : ["2010,2011,2012,2013,2014","array","string"],
						"Legend Array" : ["Estimate Data,Actual Data","array","string"],
						"multiValueValidation" : ["Y Axis EstimateData","Y Axis ActualData","X Axis Data"]
					    //"singleValueValidation" : ["Color"]
					 },				  
	"funnelChart" : {
						"Title" : ["Last 15 day's temperature readings","string","string"],
						"Funnel Data" : ["50,40,30,20","array","int"],
						"Funnel Key" : ["Product A,Product B,Product C,Product D","array","string"],
						"Color" : ["#76aaa0,#e97953,#fcca7a,#597090","array","string","colorTag"],
						"Label":["Consumption","string","string"],
						"Unit":["%","string","string"],
						"multiValueValidation" : ["Funnel Data","Funnel Key","Color"]
					    //"singleValueValidation" : ["Color"]
					 },
	"threeDPyramidSliceChart" : {"Title" : ["Last 15 day's temperature readings","string","string"],
					              "Color" : ["#fffc00,#ffb400,#2ca02c,#d62728,#9467bd,#5fe9e4,#3e99f0","array","string","colorTag"],
								  "Pyramid Data" : ["200,155,110,130,240,270,185","array","int"],
								  "Pyramid Key" : ["Ford,Mercedes,Volkswagon,Ferrari,BMW,RENUALT,HYUNDAI","array","string"],
								  "Unit" : ["B$","string","string"],
								  "multiValueValidation" : ["Pyramid Data","Pyramid Key","Color"]
					              //"singleValueValidation" : ["Color"]
							   },
		"bulletBarChart" : {	
						"Title" : ["Sales Comparisons Chart Of Last 8 Years","string","string"],
						"Y Axis Label" : ["Year","string","string"],
						"Y Axis Data" : ["2000,2001,2002,2003,2004,2005,2006,2007,2008","array","string"],
						"X Axis Label" : ["Population","string","string"],
						"X Axis Data1" : ["23,45,56,43,23,55,33,22,55","array","int"],
						"Color of Data1" :["#9467bd","string","string","colorTag"],
						"X Axis Data2" : ["33,15,46,43,53,25,23,32,15","array","int"],
						"Color of Data2" :["#9467bd","string","string","colorTag"],
						"multiValueValidation" : ["Y Axis Data","X Axis Data1","X Axis Data2"],
						"singleValueValidation" : ["Color of Data1","Color of Data2"]
						}
	
	
	};

var nestedJSON = {
	 "basicLineChart" : {"Title":["Sold Quantity in Last 10 Month ","string","string"],
					  "X Axis Data":["Jan'14,Feb'14,Mar'14,Apr'14,May'14,Jun'14,Jul'14,Aug'14,Sept'14,Oct'14","array","string"],
					  "Y Axis Factor":["Sold Quantity","string","string"],
					  "Y LabelColor":["red","string","string","colorTag"],
					  "X Axis Factor":["Indexes(in whole number)","string","string"],
					  "X LabelColor" : ["green","string","string","colorTag"],
					  "nestedDataKey" : {"Name":["Venture","string","string"],
										"Shape":["square","string","string"],
										"Color":["#4fb6f2","string","string","colorTag"],
										"Data":["33340,62304,67214,6734,90734,12034,43240","array","int"]},
					  "multiValueValidation" : ["X Axis Data","Data"],
					  "singleValueValidation" : ["X LabelColor","Y LabelColor","Color","Shape"]
					  //"No of Line" : ["please enter"]
					  
					  },
	 "roundedThreeDBarChart" :{ "Title" : ["Foreign Visitors Rate","string","string"],
							"X AxisLabel" : ["Country","string","string"],
							"Y AxisLabel" : ["Visit(in Millons)","string","string"],
							"Unit" : ["%","string","string"],	
							"nestedDataKey" : {"X Axis Tick":["India","string","string"],
										"Data":["4400","string","int"],
										"Color":["#4fb6f2","string","string","colorTag"]},
						"singleValueValidation" : ["Data","Color"]
						//	"singleValueValidation" : ["Color"]										
					  },
     "multiAxisChart" : { "Title" : ["V/S Chart","string","string"],
						  "X AxisData" : ["Jan,Feb,Mar,Apr,May,June,July","array","string"],
						  "Unit" : ["Student's","string","string"],
						  "nestedDataKey" : {"Y AxisData":["210,280,270,320,350","array","int"],
										"Legend" : ["Class Avg","string","string"],
										"Y AxisColor":["#4fb6f2","string","string","colorTag"]},
						  "multiValueValidation" : ["X AxisData","Y AxisData"],
						  "singleValueValidation" : ["Legend","Y AxisColor"]
						},
	 "threeDStackBar" : { "Title": ["Sale Comparision Of Companies In Respective Year","string","string"],
						  "X Label": ["Year","string","string"],
						  "X AxisData" : ["1994,1995,1996,1997,1998,1999,2000,2001,2002,2003","array","string"],
						  "Y Label" :["Sales(in Crores)","string","string"],
						 "nestedDataKey" : {"Key":["Barclays","string","string"],
											"Data" : ["15,80,120,180,50,65,30,109,210,13,123,210","array","int"],
											"Color":["#4fb6f2","string","string","colorTag"]
											},
						 "multiValueValidation" : ["X AxisData","Data"],
						 "singleValueValidation" : ["Color"]
						}
}	