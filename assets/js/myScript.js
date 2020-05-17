// Test Script for jQuery
// var settings = {
//   "url": "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=95932927-c8bc-4e7a-b484-68a66a24edfe&limit=100&fields=end_of_day,usd_sgd&between%5Bend_of_day%5D=2020-01-01,2020-03-31&sort=end_of_day%20asc",
//   "method": "GET",
//   "timeout": 0,
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// Test Script for axios

var datesArray = [];
var ratesArray = [];
var movAverageArray = [];
var calScope = 0;

function calMovingAvg(calScope,calArray) {
    console.log('000000', calScope,'000000')
    var jcount = 0;
    var jsum = 0;
    var javg = 0;
    var i;
    var movAverageArray=[];
    for (i in calArray) {
        jcount = 0;
        jsum = 0;
        javg = 0;
        for (var j = i-calScope+1; j<=i; j++) {
            console.log(j);
            if (j >= 0) {
                jcount = jcount + 1;
                console.log(jcount);
                jsum = jsum + calArray[j];
                console.log(jsum);
            }
        }
        javg = jsum / jcount;
        movAverageArray.push(Math.round(javg*10000)/10000);
    }
    return movAverageArray
}



function drawChart(ratesTable) {

    var record;
    for (record of ratesTable) {
        datesArray.push(record["end_of_day"]);
        ratesArray.push(Math.round(parseFloat(record["usd_sgd"])*10000)/10000);
    }
    
    let MovAvg7 = calMovingAvg(7,ratesArray);
    console.log(ratesArray);

    let MovAvg14 = calMovingAvg(14,ratesArray);
    console.log(ratesArray);



    Chart.defaults.global.hover.mode = 'nearest';
    Chart.defaults.global.legend.display = true;
    Chart.defaults.maintainAspectRatio = 'false';

    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: datesArray,
            datasets: [{ 
                data: ratesArray,
                label: "USD-SGD",
                borderColor: "#ff0000",
                fill: true,
                pointRadius: 3,
            },{
                data: MovAvg7,
                label: "7 days Moving average",
                borderColor: "#00ff00",
                fill: false,

            },{
                data: MovAvg14,
                label: "14 days average 10",
                borderColor: "#0000ff",
                fill: false,
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Currency Exchange Rates - S$ per unit of US$',
                position: 'bottom',
                fontSize: 20
            },
            tooltips: {
                mode: 'nearest'
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        }
    });


}






let apiURL='https://eservices.mas.gov.sg/api/action/datastore/search.json'
let searchDateStart='2020-01-01'
let searchDateEnd='2020-03-31'

let ratesTable=[]


$(function(){
  $('#search-btn').click(function(){
    axios.get(apiURL, {
      params: {
        'resource_id':'95932927-c8bc-4e7a-b484-68a66a24edfe',
        'limit':'10000',
        'between[end_of_day]':searchDateStart+','+searchDateEnd,
        'sort':'end_of_day asc'
      }
    }).then(function(response){
        console.log(response.data.result['total']);
        ratesTable = response.data.result['records'];
        drawChart(ratesTable);

    })
  })
})
