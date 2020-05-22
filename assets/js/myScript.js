// Initialize today variable
const today = new Date().toISOString().substr(0, 10);


// this is used to initialise or reset the date pickers on the page to default
function resetDatePicker() {
    $("#endDate").val(today);
    let lastMonth = (moment(today).subtract(1, 'month')).format().substr(0, 10);;
    $("#startDate").val(lastMonth);
    $("#txDate").val(today);
    $("#fdDate").val(today);
}


// function to retrieve the exchange rates with the date provided
// function is called when there is a change of value in the date pickers in the transaction entry form
function fetchRate(selectedDate) {
    let apiURL = 'https://eservices.mas.gov.sg/api/action/datastore/search.json';
    axios.get(apiURL, {
        params: {
            'resource_id': '95932927-c8bc-4e7a-b484-68a66a24edfe',
            'limit': '1',
            'fields': 'end_of_day,usd_sgd',
            'filters[end_of_day]': selectedDate,
        }
    }).then(function (response) {
        if (response.data.result.records.length == 0) {
            $("#txRate").val(""); // document.querySelector("#txRate").value = "";
        } else {
            $("#txRate").val(response.data.result.records[0].usd_sgd);
        }
    })
}

// function to retrieve the last transaction's exchange rate available.
// the info is used to populate the transaction entry form when intially loaded.
// this is to avoid situation here there is no exchange rates for today or when the info is not computed.
function fetchLastRates() {
    let apiURL = 'https://eservices.mas.gov.sg/api/action/datastore/search.json';
    axios.get(apiURL, {
        params: {
            'resource_id': '95932927-c8bc-4e7a-b484-68a66a24edfe',
            'limit': '1',
            'fields': 'end_of_day,usd_sgd',
            'sort': 'end_of_day desc',
        }
    }).then(function (response) {
        $("#txDate").val(response.data.result.records[0].end_of_day);
        document.querySelector("#txRate").value = response.data.result.records[0].usd_sgd;
    })
}

// a function that returns an array of the moving average of an Array provided between the number of days selected.
// The moving average is calculated by summing the number for today and past few days divided by the number of days to average.
function calMovingAvg(avgNumber, numArray) {
    let numCount = 0;
    let sumOfNum = 0;
    let avgOfNum = 0;
    let movAverageArray = [];
    for (let i in numArray) {
        numCount = 0;
        sumOfNum = 0;
        avgOfNum = 0;
        for (var j = (i - avgNumber + 1); j <= i; j++) {
            if (j >= 0) {
                numCount = numCount + 1;
                sumOfNum = sumOfNum + numArray[j];
            }
        }
        avgOfNum = sumOfNum / numCount;
        movAverageArray.push(Math.round(avgOfNum * 10000) / 10000);
    }
    return movAverageArray
}


// a function that draw teh chart with exchange rates information provided by MAS API.
// this function is called when the page is loaded or the selected date range changes.
let datesArray = [];
let ratesArray = [];
function drawChart(ratesTable) {
    
    // breaking the 2D array augument into different Arrays.
    let shortTerm = 7;
    let longTerm = 14;
    let shortTermMovAvgLabel = "7 days moving average";
    let longTermMovAvgLabel = "14 days moving average";
    datesArray.length = 0; // empty datesArray
    ratesArray.length = 0; // empty ratesArray
    var record;
    for (record of ratesTable) {
        datesArray.push(record["end_of_day"]);
        ratesArray.push(Math.round(parseFloat(record["usd_sgd"]) * 10000) / 10000);
    }
    let shortTermMovAvg = calMovingAvg(shortTerm, ratesArray);
    let longTermMovAvg = calMovingAvg(longTerm, ratesArray);

    // intializing the variables of the charts
    Chart.defaults.maintainAspectRatio = 'false';
    Chart.defaults.global.hover.mode = 'index';
    Chart.defaults.global.hover.intersect = 'true';
    var ctx = $('#chart');
    if (window.myLineChart != undefined)
        window.myLineChart.destroy();
    window.myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesArray,
            datasets: [{
                data: ratesArray,
                label: "US$1 = S$",
                borderColor: 'rgb(255, 0, 0)',
                fill: true,
                pointRadius: 3,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }, {
                data: shortTermMovAvg,
                label: shortTermMovAvgLabel,
                borderColor: 'rgb(0, 255, 0)',
                fill: false,
                pointRadius: 0,
                pointDot: false,
            }, {
                data: longTermMovAvg,
                label: longTermMovAvgLabel,
                borderColor: "#rgb(0, 0, 255)",
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
            tooltips: {
                enabled: true,
                mode: 'index',
                intersect: true,
                position: 'nearest',
                callbacks: {
                    footer: function (tooltipItem) {
                        // resetting the date picker in the transacton entry form
                        $("#txDate").val(tooltipItem[0].xLabel)
                        // resetting the date picker in the transacton entry form
                         fetchRate(tooltipItem[0].xLabel);
                    }

                },
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
    })
};

// retreive exchange rates between the stat date and end date.
// After retrieval, it will call teh draw chart function
function downloadFromAPI(startDate, endDate) {
    
    // using loading image
    $("#loadingMessage").show();

    // consuming API
    let apiURL = 'https://eservices.mas.gov.sg/api/action/datastore/search.json';
    axios.get(apiURL, {
        params: {
            'resource_id': '95932927-c8bc-4e7a-b484-68a66a24edfe',
            'limit': '10000',
            'fields': 'end_of_day,usd_sgd',
            'between[end_of_day]': startDate + ',' + endDate,
            'sort': 'end_of_day asc'
        }
    }).then(function (response) {
        var ratesTable = {};
        ratesTable = response.data.result['records'];
        $("#loadingMessage").hide();
        drawChart(ratesTable);
        // ----------------------------------------------------------------- **
    })
}

// function populateTable(transactionTable) {
//     console.table(transactionTable);
// }

// function clickHandler(evt) {
//     var firstPoint = myChart.getElementAtEvent(evt)[0];

// if (firstPoint) {
//     var label = myChart.data.labels[firstPoint._index];
//     var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
// }

// }




function transact(transactDate, transactRate, transactAction, transactAmount) {
    console.log(transactDate);

    switch (transactAction) {
    case 'deposit':
        console.log("You have deposited SGD " + transactAmount.toFix(4));
        transactionRecord.push(transactDate, 'deposit', transactAmount, 0, 0, transactAmount, "You have deposited SGD" + transactAmount.toFix(4));
        break;
    case 'withdraw':
        console.log("You have withdrawn SGD " + transactAmount.toFix(4));
        transactionRecord.push(transactDate, 'withdraw', transactAmount, 0, 0, -transactAmount);
        break;
    case 'buy':
        console.log("You buy USD " + transactAmount.toFixed(4) + "with SGD " + (transactAmount * transactRate).toFixed(4));
        transactionRecord.push(transactDate, 'buy', transactAmount, transactRate, +transactAmount, -transactAmount * transactRate);
        break;
    case 'sell':
        console.log("You sell USD " + transactAmount.toFixed(4) + "for SGD " + (transactAmount * transactRate).toFixed(4));
        transactionRecord.push(transactDate, 'sell', transactAmount, transactRate, -transactAmount, +transactAmount * transactRate);
        break;
    default:
        break;
    }
    console.log('------');

}



var transactionTable = [];
var returnRate = 0;
var transactionRecord = []

var transactionRecord = [];
var balanceUSD = 0;
var balanceSGD = 0;


var ttAction = '';
var ttAmount = 0.0;
var ttRate = 0;
var ttDate = '';


$(document).ready(function () {

    // Initializing
    
    resetDatePicker();
    downloadFromAPI($("#startDate").val(), $("#endDate").val());

    // event handler for two date pickers controlling the chart
    $("#startDate").change(function(){
        downloadFromAPI($("#startDate").val(), $("#endDate").val());
    });
    $("#endDAte").change(function(){
        downloadFromAPI($("#startDate").val(), $("#endDate").val());
    })

    // populating the date picker in the transaction entry form
    fetchLastRates();

    // event handlers for tansaction entry form
    $("#txDate").change(function(){
        fetchRate($("#txDate").val());

    });

    // event handlers for handling Buy button
    document.querySelector("input[name='buyBtn']").addEventListener("click", function() {
        ttAction = 'buy';
        ttDate = $("txDate").val();
        ttRate = parseFloat($("#txRate").val());
        ttAmount = parseFloat($("txAmount").val());

        var isValid = $("#transaction-form").validate();
        if (isValid) {
            console.log('clicked buy button');
            //     transact(ttDate, ttRate, ttAction, ttAmount);
            //     $("#txAmount").val("");
        };
        return false;
    });

    // event handlers for handling Sell button
    document.querySelector("input[name='sellBtn']").addEventListener("click", function() {
        ttAction = 'sell';
        ttDate = $("txDate").val();
        ttRate = parseFloat($("#txRate").val());
        ttAmount = parseFloat($("txAmount").val());

        var isValid = $("#transaction-form").validate();
        if (isValid) {
            console.log('clicked sell button');
            //     transact(ttDate, ttRate, ttAction, ttAmount);
            //     $("#txAmount").val("");
        };
        return false;
    });



        
    // event handlers for handling Deposit button   
    document.querySelector("input[name='depositBtn']").addEventListener("click", function() {
        ttAction = 'deposit';
        ttDate = $("fdDate").val();
        ttRate = 0;
        ttAmount = parseFloat($("fdAmount").val());

        var isValid = $("#adjustment-form").validate();
        if (isValid) {
            console.log('clicked deposit button');
            //     transact(ttDate, ttRate, ttAction, ttAmount);
            //     $("#txAmount").val("");
        };
        return false;

    });
    
    
    
    
        
    // event handlers for handling Withdraw button   
     document.querySelector("input[name='withdrawBtn']").addEventListener("click", function() {
        ttAction = 'withdraw';
        ttDate = $("fdDate").val();
        ttRate = 0;
        ttAmount = parseFloat($("fdAmount").val());
        
        var isValid = $("#adjustment-form").validate();
        if (isValid) {
            console.log('clicked withdraw button');
            //     transact(ttDate, ttRate, ttAction, ttAmount);
            //     $("#txAmount").val("");
        };
        return false;
    })

    // jQuery validator for transaction entry form
    ttRate = $("txRate").val();
    $("#transaction-form").validate({
        rules: {
            txAmount: {
                required: true,
                number: true,
                positiveNumber: true,
                // sufficientSGD: {
                //     required: true,
                //     rates: ttRate,
                //     action: ttAction,
                //     amount: ttAmount
                // },
                // sufficientUSD: {
                //     required: true,
                //     action: ttAction,
                //     amount: ttAmount
                // }
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
                // sufficientSGD: "Insufficient SGD fund balance.",
                // sufficientUSD: "Insufficient USD fund balance."
            },
            txDate: {
                required: "Select a transaction date.",
            },
            txRate: {
                required: "Select a date with Rates record.",
            }
        },
        submitHandler: function () {
            return false;
        }
    });

    // jQuery validator for fund adjustment form
    $("#adjustment-form").validate({
        rules: {
            fdDate: 'required',
            fdAmount: {
                required: true,
                number: true,
                positiveNumber: true,
                // sufficientToWithdraw: {
                //     required: true,
                //     action: ttAction,
                //     amount: ttAmount
                // },
            }
        },
        messages: {
            fdDate: 'This field is required',
            fdAmount: {
                required: 'Enter the transaction amount.',
                number: 'Enter a valid transaction amount.',
                positiveNumber: 'Enter a positive value.',
                // sufficientToWithdraw: 'Insufficient SGD fund.'
            },
        },
        submitHandler: function () {
            return false;
        }
    });

    // jQuery validator's methods
    $.validator.addMethod('positiveNumber', function (value) {
        return Number(value) > 0;
    }, 'Enter a positive number.');

    $.validator.addMethod('sufficientToWithdraw', function (value, action) {
        console.log(value, action);
        if (action == 'withdraw') {
            return Number(value) < balanceSGD;
        }
    }, 'Insufficient SGD fund balance.');

    $.validator.addMethod('sufficientSGD', function (value, rates, action) {
        console.log(action);
        if (action == "buy") {
            if (Number(value) * Number(rates) <= balanceSGD) {
                return true
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, 'Insufficient SGD fund balance.');

    $.validator.addMethod('sufficientUSD', function (value, action) {
        if (action == "sell") {
            return (Number(value) < balanceUSD)
        } else return true;
    }, 'Insufficient USD fund balance.');

});
