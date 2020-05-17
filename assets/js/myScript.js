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
    

function drawChart(ratesTable) {

    var record;
    for (record of ratesTable) {
        datesArray.push(record["end_of_day"]);
        ratesArray.push(record["usd_sgd"]);
    }
    


    

    Chart.defaults.global.hover.mode = 'nearest';
    Chart.defaults.global.legend = false;
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
        }
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
