var settings = {
  "url": "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=95932927-c8bc-4e7a-b484-68a66a24edfe&limit=100&fields=end_of_day,usd_sgd&between%5Bend_of_day%5D=2020-01-01,2020-03-31&sort=end_of_day asc",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});