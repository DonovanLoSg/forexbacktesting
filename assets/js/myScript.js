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
let apiURL='https://eservices.mas.gov.sg/api/action/datastore/search.json'
let searchDateStart='2020-01-01'
let searchDateEnd='2020-03-31'

let rates=[]

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
        let ratesTable = response.data.result['records'];
        $("#result").text(ratesTable);

    })
  })
})


