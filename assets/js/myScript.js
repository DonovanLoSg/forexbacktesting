

// Initialize date picker
function fetchRate(selectedDate) {
	let  apiURL = 'https://eservices.mas.gov.sg/api/action/datastore/search.json';
	axios.get(apiURL,   {      
		params:  {        
			'resource_id': '95932927-c8bc-4e7a-b484-68a66a24edfe',
			        'limit': '1',
			'fields': 'end_of_day,usd_sgd',
			        'filters[end_of_day]': selectedDate,
		}    
	}).then(function(response) { 
        if (response.data.result.records.length == 0) {
            document.querySelector("#txRate").value = "";
        } else {
            document.querySelector("#txRate").value = response.data.result.records[0].usd_sgd;
        }
	})
}

function fetchLastRate() {
	let  apiURL = 'https://eservices.mas.gov.sg/api/action/datastore/search.json';
	axios.get(apiURL,   {      
		params:  {        
			'resource_id': '95932927-c8bc-4e7a-b484-68a66a24edfe',
			 'limit': '1',
			'fields': 'end_of_day,usd_sgd',
			 'sort': 'end_of_day desc',
		}    
	}).then(function(response) {  
        document.querySelector("#txDate").value = response.data.result.records[0].end_of_day;
        document.querySelector("#txRate").value = response.data.result.records[0].usd_sgd;
	})
}

function resetDatePicker() {
	let today = new Date().toISOString().substr(0, 10);
	document.querySelector("#endDate").value = today;
	let lastMonth = moment(today);
	let lastMonth1 = lastMonth.subtract(1, 'month');
	let lastMonth2 = lastMonth1.format().substr(0, 10);
	document.querySelector("#startDate").value = lastMonth2;
}

function  calMovingAvg(calScope, calArray)  {
	var  jcount  =  0;    
	var  jsum  =  0;    
	var  javg  =  0;    
	var  i;    
	var  movAverageArray = [];    
	for  (i  in  calArray)  {        
		jcount  =  0;        
		jsum  =  0;        
		javg  =  0;        
		for  (var  j  =  i - calScope + 1;  j <= i;  j++)  {            
			if  (j  >=  0)  {                
				jcount  =  jcount  +  1;                
				jsum  =  jsum  +  calArray[j];            
			}        
		}        
		javg  =  jsum  /  jcount;        
		movAverageArray.push(Math.round(javg * 10000) / 10000);    
	}    
	return  movAverageArray
}

function  drawChart(ratesTable)  { 
	datesArray.length = 0;
	ratesArray.length = 0;
	var  record;    
	for  (record  of  ratesTable)  {        
		datesArray.push(record["end_of_day"]);        
		ratesArray.push(Math.round(parseFloat(record["usd_sgd"]) * 10000) / 10000);    
	}        
	let  movAvg7  =  calMovingAvg(7, ratesArray);
	let  movAvg14  =  calMovingAvg(14, ratesArray);    
	Chart.defaults.global.hover.mode  =  'nearest';    
	Chart.defaults.global.legend.display  =  true;    
    Chart.defaults.maintainAspectRatio  =  'false';


        
	var ctx = document.getElementById('chart');
	myLineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: datesArray,
				datasets: [{
					data: ratesArray,
					label: "US$1 = S$",
					borderColor: "#ff0000",
					fill: true,
					pointRadius: 3,
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
				}, {
					data: movAvg7,
					label: "7 days moving average",
					borderColor: "#00ff00",
					fill: false,
					pointDot: false,
				}, {
					data: movAvg14,
					label: "14 days moving average",
					borderColor: "#0000ff",
					fill: false,
					pointDot: false,
				}],
			},
			options: {
				events: ['click'],
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Currency Exchange Rates - S$ per unit of US$',
					position: 'bottom',
					fontSize: 20
				},
				// Tooltip Element
				tooltips: {
					enabled: true,
					mode: 'label',
					position: 'nearest',
				},
				elements: {
					point: {
						radius: 3
					}
				},
				scales: {
					xAxes: [{
						type: 'time',
							time: {
								unit: 'day'
							}
						}]
					}
				}
            }
        )
	};
	

function downloadFromAPI(startDate, endDate) {
     $("#loadingMessage").show();
     
	let  apiURL = 'https://eservices.mas.gov.sg/api/action/datastore/search.json';
	let  searchDateStart = startDate;
	let  searchDateEnd = endDate;
	axios.get(apiURL,   {      
		params:  {        
			'resource_id': '95932927-c8bc-4e7a-b484-68a66a24edfe',
			        'limit': '10000',
			'fields': 'end_of_day,usd_sgd',
			        'between[end_of_day]': searchDateStart + ',' + searchDateEnd,
			        'sort': 'end_of_day asc'      
		}    
	}).then(function(response) {        
		var ratesTable = {};
        ratesTable  =  response.data.result['records'];        
         $("#loadingMessage").hide();
		drawChart(ratesTable);
		// ----------------------------------------------------------------- **
	})
}

function populateTable(transactionTable) {
	console.table(transactionTable);
}

function clickHandler(evt) {
    var firstPoint = myChart.getElementAtEvent(evt)[0];

    if (firstPoint) {
        var label = myChart.data.labels[firstPoint._index];
        var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
    }
    console.log(firstPoint);
}


var  datesArray  =   [];
var  ratesArray  =   [];
var  calScope  =  0;
var movAvg7 = [];
var movAvg14 = [];
var transactionTable = [];
var returnRate = 0;
//------------------
// placeholder data
var transDate = "YYYY-MM-DD";
var transRate = "9.9999"
var transMethod = "Buy/Sell"
var balanceUSD = "9,999,999.9999"
var balanceSGD = "9,999,999.9999"
var transactionRecord = [transDate, transRate, transMethod, balanceUSD, balanceSGD]
var i;
for (i = 0; i < 50; i++) {
	transactionTable.push(transactionRecord);
}
//-------------------
$(document).ready(function() {
	resetDatePicker();
	downloadFromAPI($("#startDate").val(), $("#endDate").val());
	document.querySelector("#startDate").addEventListener("change", function() {
		downloadFromAPI($("#startDate").val(), $("#endDate").val());
    });
    document.querySelector("#endDate").addEventListener("change", function() {
		downloadFromAPI($("#startDate").val(), $("#endDate").val());
	});
    fetchLastRate();
    document.querySelector("#txDate").addEventListener("change", function() {
		fetchRate(document.querySelector("#txDate").value);
    });
    document.querySelector("#chart").addEventListener("click", function(evt) {
          var activePoints = myLineChart.getElementsAtEvent(evt);
         console.log(activePoints);
    });



   

    // => activePoints is an array of points on the canvas that are at the same position as the click event.



});
        
