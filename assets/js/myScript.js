

// Initialize date picker

function resetDatePicker(){
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#endDate").value = today;

    let lastMonth = moment(today);
    let lastMonth1 = lastMonth.subtract(1, 'month');
    let lastMonth2 = lastMonth1.format().substr(0, 10);

    document.querySelector("#startDate").value = lastMonth2;
}

function constructRatesTable(response){
    console.log(response);
}

function downloadFromAPI(startDate, endDate){
    let apiURL='https://eservices.mas.gov.sg/api/action/datastore/search.json';
    let searchDateStart = startDate;
    let searchDateEnd=endDate;
    axios.get(apiURL, {
      params: {
        'resource_id':'95932927-c8bc-4e7a-b484-68a66a24edfe',
        'limit':'10000',
        'fields':'end_of_day,usd_sgd',
        'between[end_of_day]':searchDateStart+','+searchDateEnd,
        'sort':'end_of_day asc'
      }
    }).then(function(response){
        constructRatesTable(response);
        
        // ----------------------------------------------------------------- **

    }
)}


$(document).ready(function() {



    resetDatePicker();
    downloadFromAPI('2020-01-01','2020-05-20');
        
   
})

    








// to retrieve value of date type - document.getElementById("startDate").value