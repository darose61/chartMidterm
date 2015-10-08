window.addEventListener('onload',init());

function init(){
	$.ajax({
		url: 'data/data.json',
		type: 'GET',
		failure: function(err){
			return console.log ("Could not get the data");
		},
		success: function(data) {
			//console.log(data);
	// on page load, build the charts
	buildLineChart(data);
	buildBarChart(data);
	buildaverageBarChart(data);
	// buildPieChart();
	//setChartDefaults();
	buildDoughnutChart(data);
}
});
}


function buildDoughnutChart(data){

	// need to get the total count of each value
	var goodCount = 0;
	var badCount = 0;
	
	for(var i=0;i<data.length;i++){
		if(data[i].points<=26) goodCount++;
		else if (data[i].points>26) badCount++;
	}	

	// let's call a function to render these counts on the page
	renderCounts(goodCount,badCount);

	// data is an array of objects
	// each holds the value and color of a segment of the chart
	var data = [
	{
		value: goodCount,
		color:"#217F6D",
		label: "26 and Under"
	},
	{
		value: badCount,
		color: "#32BFA4",
		label: "Over 26"
	}	
	]

	//Options
	var options = {
		segmentShowStroke : false,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"		 
	} 
	var ctx = document.getElementById("doughnutChart").getContext("2d");
	
	// now, create the donought chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myDoughnutChart = new Chart(ctx).Doughnut(data,options);	
	var chartLegend = myDoughnutChart.generateLegend();
	$('#doughnutChartLegend').append(chartLegend);
}


function buildBarChart(data){
	// need to get the count for how often each occurs on each day
	var goodDaysArray = getBarCount(data,"goodDay");
	var badDaysArray = getBarCount(data,"badDay")

	// chart data
	// see http://www.chartjs.org/docs/#line-chart-data-structure
	var data = {
			// the labels we want on our chart
	    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    datasets: [
	    		// dataset/bar 1
	        {
	            label: "26 and under",
	            fillColor: "#217F6D",
	            data: goodDaysArray
	        },
	        // dataset/bar 2
	        {
	            label: "over 26",
	            fillColor: "#32BFA4",
	            data: badDaysArray
	        }
	    ],
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	};

	// optional chart options
	var options = {
		barShowStroke : false // set the stroke to 0
	};

	// get the context of the canvas we're putting the chart in
	var ctx = document.getElementById("barChart").getContext("2d");
	// creates the line chat
	var myBarChart = new Chart(ctx).Bar(data, options);
	// create the legend
	var chartLegend = myBarChart.generateLegend();
	// append it above the chart
	$('#barChartLegend').append(chartLegend);

}

function getBarCount(data,value){
	// need to return an array where we track how many occurrences of the value happen on any day
	// wednesday will be [0] in array, Saturday is [6] in array

	// empty array to hold counts; each initiall set to 0
	var dayArray = [0,0,0,0,0,0,0]; 

	// loop through the data; is value under 26 or over 26
	for(var i=0;i<data.length;i++){
		var dailyPoints = data[i].points;

		if(value == 'goodDay'){
			if(dailyPoints>26) continue;
		}
		if(value == 'badDay'){
			if(dailyPoints<=26) continue;
		}		
		// if the currentStatus is not equal to the value we're looking for, can continue to next element
		//if(dailyPoints>26) continue; 
		
		var currentDay = data[i].day;
		// else let's check what day it happened on
		switch(currentDay){
			case("Sunday"):
				// increment the wednesday field in goodArray
				dayArray[0] = dayArray[0]+1;
				break;
			case("Monday"):
				// increment the Monday field in goodArray
				dayArray[1] = dayArray[1]+1;
				break;
			case("Tuesday"):
				// increment the Tuesday field in goodArray
				dayArray[2] = dayArray[2]+1;
				break;
			case("Wednesday"):
				// increment the Wednesday field in goodArray
				dayArray[3] = dayArray[3]+1;
				break;
			case("Thursday"):
				// increment the Thursday field in goodArray
				dayArray[4] = dayArray[4]+1;
				break;
			case("Friday"):
				// increment the wednesday field in goodArray
				dayArray[5] = dayArray[5]+1;
				break;
			case("Saturday"):
				// increment the Saturday field in goodArray
				dayArray[6] = dayArray[6]+1;
				break;																								
		}
	}
	// 	for(var i=0;i<data.length;i++){
	// 	var dailyPointsOver = data[i].points;

	// 	// if the currentStatus is not equal to the value we're looking for, can continue to next element
	// 	if(dailyPointsOver<=26) continue; 
		
	// 	var currentDay1 = data[i].day;
	// 	// else let's check what day it happened on
	// 	switch(currentDay){
	// 		case("Sunday"):
	// 			// increment the wednesday field in goodArray
	// 			badArray[0] = badArray[0]+1;
	// 			break;
	// 		case("Monday"):
	// 			// increment the Monday field in goodArray
	// 			badArray[1] = badArray[1]+1;
	// 			break;
	// 		case("Tuesday"):
	// 			// increment the Tuesday field in goodArray
	// 			badArray[2] = badArray[2]+1;
	// 			break;
	// 		case("Wednesday"):
	// 			// increment the Wednesday field in goodArray
	// 			badArray[3] = badArray[3]+1;
	// 			break;
	// 		case("Thursday"):
	// 			// increment the Thursday field in goodArray
	// 			badArray[4] = badArray[4]+1;
	// 			break;
	// 		case("Friday"):
	// 			// increment the wednesday field in goodArray
	// 			badArray[5] = badArray[5]+1;
	// 			break;
	// 		case("Saturday"):
	// 			// increment the Saturday field in goodArray
	// 			badArray[6] = badArray[6]+1;
	// 			break;																								
	// 	}
	// }

	return dayArray;
	//console.log(goodArray);
}

function renderCounts(goodCount,badCount){
	document.getElementById('goodCount').innerHTML = goodCount;
	document.getElementById('badCount').innerHTML = badCount;

}

function buildLineChart(data){
	
	// need 3 arrays:
	// 1. one that holds the day values for cooked
	// 2. one that holds the day values for bought
	// 3. one that holds the labels
	var chartData = computeLineValues(data);

	// now, can use that data to build the line chart
	var data = {
		// chart labels; we created them above
    labels: chartData.labelArray,
    // an array of datasets to plot
    datasets: [
    		// dataset 1
        {
            label: "Hours of Sleep",
            strokeColor: "#217F6D",
            pointColor: "#217F6D",
            pointStrokeColor: "#fff",
            pointHighlightStroke: "#217F6D",
            // the data values that actually get plotted
            data: chartData.sleepArray
        },
        // dataset 2
        {
            label: "Active Hours",
            strokeColor: "#C4E8DC",
            pointColor: "#C4E8DC",
            pointStrokeColor: "#fff",
            pointHighlightStroke: "#C4E8DC",
            // the data values that actually get plotted
            data: chartData.activeArray
        }
    ],
	  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"    
	};	

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#line-chart-chart-options
	var options = {
		datasetStroke : false,
		datasetFill : false
	}

	// NOW, we actually create the chart
	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("lineChart").getContext("2d");
	
	// now, create the line chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myLineChart = new Chart(ctx).Line(data, options);	
	// create the legend
	var chartLegend = myLineChart.generateLegend();
	// append it above the chart
	$('#lineChartLegend').append(chartLegend);
}


function computeLineValues(data){

	// object that holds 3 empty arrays
	// we will add to the arrays as we loop through the data
	var obj = {
		activeArray: [],
		sleepArray: [],
		labelArray: []
	}


	for (var i=0;i<data.length;i++){

		obj.activeArray[i] = data[i].hoursActive;
		obj.sleepArray[i] = data[i].hoursOfSleep;
		obj.labelArray[i] = data[i].day;

	}

	// for (var j=1;j<data.length;j++){
	// 	obj.sleepArray[j] = data[j].hoursOfSleep;
	// }

	// return the object that holds the arrays
	return obj;
}


function buildaverageBarChart(data){
	
	//need to get the average points eaten on any given day
	var averagePoints = getBarCount2(data);

	console.log(averagePoints);

	// chart data
	var data = {
			// the labels we want on our chart
	    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    datasets: [
	    		// dataset/bar 1
	        {
	            label: "Average Points",
	            fillColor: "#32BFA4",
	            data: averagePoints
	        },
	      
	    ],
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	};

	// optional chart options
	var options = {
		barShowStroke : false, // set the stroke to 0
		barValueSpacing : 30
	};

	// get the context of the canvas we're putting the chart in
	var ctx = document.getElementById("averageBarChart").getContext("2d");
	// creates the line chat
	var myBarChart2 = new Chart(ctx).Bar(data, options);
	// create the legend
	var chartLegend2 = myBarChart2.generateLegend();
	// append it above the chart
	$('#barChartLegend2').append(chartLegend2);

}

function getBarCount2(data){
	var averageArray = [0,0,0,0,0,0,0];
	// var sundayArray = [0,0,0,0,0,0,0];
	// var mondayArray = [0,0,0,0,0,0,0];
	// var tuesdayArray = [0,0,0,0,0,0,0];
	// var wednesdayArray = [0,0,0,0,0,0,0];
	// var thursdayArray = [0,0,0,0,0,0,0];
	// var fridayArray = [0,0,0,0,0,0,0];
	// var saturdayArray = [0,0,0,0,0,0,0];
	var sundaySum = 0;
	var mondaySum = 0;
	var tuesdaySum = 0;
	var wednesdaySum = 0;
	var thursdaySum = 0;
	var fridaySum = 0;
	var saturdaySum = 0;
	var sundayCount = 0;
	var mondayCount = 0;
	var tuesdayCount = 0;
	var wednesdayCount = 0;
	var thursdayCount = 0;
	var fridayCount = 0;
	var saturdayCount = 0;


	for (var i=0; i<data.length; i++){
		
		var dailyData = data[i];
		if (dailyData.day == "Sunday"){
			sundaySum+=dailyData.points;
			sundayCount++;
		} else if (dailyData.day == "Monday"){
			mondaySum+=dailyData.points;
			mondayCount++;
		} else if (dailyData.day == "Tuesday"){
			tuesdaySum+=dailyData.points;
			tuesdayCount++;
		} else if (dailyData.day == "Wednesday"){
			wednesdaySum+=dailyData.points;
			wednesdayCount++;
		} else if (dailyData.day == "Thursday"){
			thursdaySum+=dailyData.points;
			thursdayCount++;
		} else if (dailyData.day == "Friday"){
			fridaySum+=dailyData.points;
			fridayCount++;
		} else if (dailyData.day == "Saturday"){
			saturdaySum+=dailyData.points;
			saturdayCount++;
		}
	} 



	// for (var i = 0; i < sundayArray.length; i++){
	// 			sundaySum+=sundayArray[i];
	// 		}
	// var sundayAverage = sundaySum/sundayArray.length;
	// averageArray.push(sundayAverage);

	// for (var i = 0; i < mondayArray.length; i++){
	// 			mondaySum+=mondayArray[i];
	// 		}
	// var mondayAverage = mondaySum/mondayArray.length;
	// averageArray.push(mondayAverage);

	// for (var i = 0; i < tuesdayArray.length; i++){
	// 			tuesdaySum+=tuesdayArray[i];
	// 		}
	// var tuesdayAverage = tuesdaySum/tuesdayArray.length;
	// averageArray.push(tuesdayAverage);

	// for (var i = 0; i < wednesdayArray.length; i++){
	// 			wednesdaySum+=wednesdayArray[i];
	// 		}
	// var wednesdayAverage = wednesdaySum/wednesdayArray.length;
	// averageArray.push(wednesdayAverage);

	// for (var i = 0; i < thursdayArray.length; i++){
	// 			thursdaySum+=thursdayArray[i];
	// 		}
	// var thursdayAverage = thursdaySum/thursdayArray.length;
	// averageArray.push(thursdayAverage);

	// for (var i = 0; i < fridayArray.length; i++){
	// 			fridaySum+=fridayArray[i];
	// 		}
	// var fridayAverage = fridaySum/fridayArray.length;
	// averageArray.push(fridayAverage);

	// for (var i = 0; i < saturdayArray.length; i++){
	// 			saturdaySum+=saturdayArray[i];
	// 		}
	// var saturdayAverage = saturdaySum/saturdayArray.length;
	// averageArray.push(saturdayAverage);

	
	

	// for (var i=0; i<data.length; i++){
	// 	if (dailyData == "Sunday"){
	// 		sundayArray.push(data.points);
	// 	}
	// 	var sundaySum = 0;
	// 		for (var i = 0; i < sundayArray.length; i++){
	// 			sundaySum+=sundayArray[i];
	// 		}
	// 	var sundayAverage = sundaySum/sundayArray.length;
	// 	averageArray.push(sundayAverage);
	// }
	
	// for (var i=0; i<data.length; i++){
	// 	if (dailyData == "Monday"){
	// 		mondayArray.push(data.points);
	// 	}
	// 	var mondaySum = 0;
	// 		for (var i = 0; i < mondayArray.length; i++){
	// 			mondaySum+=mondayArray[i];
				
	// 		}
	// 	var mondayAverage = mondaySum/mondayArray.length;
	// 	averageArray.push(mondayAverage);
	// }

	// for (var i=0; i<data.length; i++){
	// 	if (dailyData == "Tuesday"){
	// 		tuesdayArray.push(data.points);
	// 	}
	// 	var tuesdaySum = 0;
	// 		for (var i = 0; i < tuesdayArray.length; i++){
	// 			tuesdaySum+=tuesdayArray[i];
				
	// 		}
	// 	var tuesdayAverage = tuesdaySum/tuesdayArray.length;
	// 	averageArray.push(tuesdayAverage);
	// }

	// for (var i=0; i<data.length; i++){
	// 	if (dailyData == "Wednesday"){
	// 		wednesdayArray.push(data.points);
	// 	}
	// 	var wednesdaySum = 0;
	// 		for (var i = 0; i < wednesdayArray.length; i++){
	// 		wednesdaySum+=wednesdayArray[i];
				
	// 		}
	// 	var wednesdayAverage = wednesdaySum/wednesdayArray.length;
	// 	averageArray.push(wednesdayAverage);
	// }

	// for (var i=0; i<data.length; i++){
	// 	if (dailyData == "Thursday"){
	// 		thursdayArray.push(data.points);
	// 	}
	// 	var thursdaySum = 0;
	// 		for (var i = 0; i < thursdayArray.length; i++){
	// 			thursdaySum+=thursdayArray[i];
				
	// 		}
	// 	var thursdayAverage = thursdaySum/thursdayArray.length;
	// 	averageArray.push(thursdayAverage);
	// }

	// for (var i=0; i<data.length; i++){
	// 	if (dailyData == "Friday"){
	// 		fridayArray.push(data.points);
	// 	}
	// 	var fridaySum = 0;
	// 		for (var i = 0; i < fridayArray.length; i++){
	// 			fridaySum+=fridayArray[i];
				
	// 		}
	// 	var fridayAverage = fridaySum/fridayArray.length;
	// 	averageArray.push(fridayAverage);
	// }

	// for (var i=0; i<data.length; i++){
	// 	if (dailyData == "Saturday"){
	// 		saturdayArray.push(data.points);
	// 	}
	// 	var saturdaySum = 0;
	// 		for (var i = 0; i < saturdayArray.length; i++){
	// 			saturdaySum+=saturdayArray[i];
				
	// 		}
	// 	var saturdayAverage = saturdaySum/saturdayArray.length;
	// 	averageArray.push(saturdayAverage);
	// }

	averageArray[0] = sundaySum/sundayCount;
	averageArray[1] = mondaySum/mondayCount;
	averageArray[2] = tuesdaySum/tuesdayCount;
	averageArray[3] = wednesdaySum/wednesdayCount;
	averageArray[4] = thursdaySum/thursdayCount;
	averageArray[5] = fridaySum/fridayCount;
	averageArray[6] = saturdaySum/saturdayCount;

	return averageArray;

		//get count of how many Mondays, Tuesdays, Wednesdays, etc are present
		//add all daily points that are present on a specific day
		//divide by the total occurances of that day (ie 200 points over teh course of 6 tuesdays = 200/6)

}






// QUESTIONS: 
// 1) Why is graph showing equal values in bars 
// 2) How can I make the bar chart label = Tu, sept 3, 2015 (etc...show day of the week in addition to date)











// see http://www.chartjs.org/docs/#line-chart-introduction
// 
