

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
    document.querySelector("#txDate").value = today;
    document.querySelector("#fdDate").value = today;

}

// function setMaxDate() {
// 	let today = new Date().toISOString().substr(0, 10);

// }

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
	
	
    Chart.defaults.maintainAspectRatio  =  'false';
    Chart.defaults.global.hover.mode = 'index';
    Chart.defaults.global.hover.intersect = 'true';

        
	var ctx = document.getElementById('chart');
	// myLineChart = new Chart(ctx, {
    if(window.myLineChart != undefined)
    window.myLineChart.destroy();
    window.myLineChart = new Chart(ctx, {
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
                    pointRadius: 0,
					pointDot: false,
				}, {
					data: movAvg14,
					label: "14 days moving average",
					borderColor: "#0000ff",
                    fill: false,
                    pointRadius: 0,
					pointDot: false,
				}],
			},
			options: {

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
					mode: 'index',
                    intersect: true,
                    position: 'nearest',
                    callbacks: {

                        footer: function(tooltipItem) {
                            document.querySelector("#txDate").value = tooltipItem[0].xLabel;
                            fetchRate(tooltipItem[0].xLabel);
                        }

                    },
				},
				elements: {
					point: {
						radius: 3
					}
                },
                // onHover: function(event,elements) {
                //     $("#chart").css("cursor", elements[0] ? "pointer" : "default");
                // },
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

    // if (firstPoint) {
    //     var label = myChart.data.labels[firstPoint._index];
    //     var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
    // }
    
}

 


function transact(transactDate, transactRate, transactAction, transactAmount){
    console.log(transactDate);

    switch(transactAction) {
        case 'deposit':
            console.log("You have deposited SGD "+transactAmount.toFix(4));
            transactionRecord.push(transactDate, 'deposit', transactAmount, 0, 0, transactAmount);
            break;
        case 'withdraw':
            console.log("You have withdrawn SGD "+transactAmount.toFix(4));
            transactionRecord.push(transactDate, 'withdraw', transactAmount, 0, 0, -transactAmount);
            break;
        case 'buy':
            console.log("You buy USD "+transactAmount.toFixed(4)+"with SGD "+(transactAmount*transactRate).toFixed(4));
            transactionRecord.push(transactDate, 'buy', transactAmount, transactRate, +transactAmount, -transactAmount*transactRate);
            break;
        case 'sell':
            console.log("You sell USD "+transactAmount.toFixed(4)+"for SGD "+(transactAmount*transactRate).toFixed(4));
            transactionRecord.push(transactDate, 'sell', transactAmount, transactRate, -transactAmount, +transactAmount*transactRate);
            break;
        default:
            break;
        }
    console.log('------');

}


var  datesArray  =   [];
var  ratesArray  =   [];
var  calScope  =  0;
var movAvg7 = [];
var movAvg14 = [];
var transactionTable = [];
var returnRate = 0;
var transactionRecord = []
//------------------
// placeholder data
var transDate = "YYYY-MM-DD";
var transRate = "9.9999"
var transMethod = "Buy/Sell"
var balanceUSD = "9,999,999.9999"
var balanceSGD = "9,999,999.9999"
var transactionRecord = [];
var balanceUSD = 0;
var balanceSGD = 0;

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
    });
    document.querySelector("input[name='depositBtn']").addEventListener("click", function() {
         var isValid = $("#adjustment-form").validate();
          if (isValid) {
              var ttDate = document.getElementById("fdDate").value;

              var ttRate = 0;
              var ttAction = 'deposit';
              var ttAmount = document.getElementById("fdAmount").value;
              transact(ttDate, ttRate, ttAction, ttAmount);
                $("#fdAmount").val("");

          };
    });
    document.querySelector("input[name='buyBtn']").addEventListener("click", function() {
         var isValid = $("#transaction-form").validate();
          if (isValid) {
              var ttDate = document.getElementById("txDate").value;
              var ttRate = document.getElementById("txRate").value;
              var ttAction = 'buy';
              var ttAmount = document.getElementById("txAmount").value;
              transact(ttDate, ttRate, ttAction, ttAmount);
                $("#txAmount").val("");
                

          };
    });
    document.querySelector("input[name='sellBtn']").addEventListener("click", function() {
         var isValid = $("#transaction-form").validate();
          if (isValid) {
              var ttDate = document.getElementById("txDate").value;
              var ttRate = document.getElementById("txRate").value;
              var ttAction = 'sell';
              var ttAmount = document.getElementById("txAmount").value;
              transact(ttDate, ttRate, ttAction, ttAmount);
                $("#txAmount").val("");
                

          };
    });

    document.querySelector("input[name='withdrawlBtn']").addEventListener("click", function() {
         var isValid = $("#adjustment-form").validate();
          if (isValid) {
              var ttDate = document.getElementById("fdDate").value;

              var ttRate = 0;
              var ttAction = 'withdraw';
               var ttAmount = document.getElementById("fdAmount").value;
              transact(ttDate, ttRate, ttAction, ttAmount);
                $("#fdAmount").val("");

          };
    });
$.validator.addMethod('positiveNumber',
    function (value) { 
        return Number(value) > 0;
    }, 'Enter a positive number.');           
                
$("#transaction-form").validate({
	rules: {
		txAmount: {
			required: true,
            number: true,
            positiveNumber: true,
		},
		txDate: {
			required: true,
		},
		txRate: {
			required: true,
		}
	},
	messages: {
		txAmount: {
			required: "Enter transaction amount.",
            number: "Enter a valid number.",
            positiveNumber: "Enter a positive value.",
		},
		txDate: {
			required: "Select a transaction date.",
		},
		txRate: {
			required: "Select a date with Rates record.",
		}
	},
	submitHandler: function() {
		return false;
	}
});
$("#adjustment-form").validate({
			rules: {
				fdDate: 'required',
				fdAmount: {
					required: true,
                    number: true,
                    positiveNumber: true,
				}
			},
			messages: {
				fdDate: 'This field is required',
				fdAmount: {
					required: 'Enter the transaction amount.',
                    number: 'Enter a valid transaction amount.',
                    positiveNumber: "Enter a positive value.",
                },
            },
			submitHandler: function() {
				return false;
			}
		});

 







});
        
