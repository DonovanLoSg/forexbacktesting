

// Initialize date picker

let today = new Date().toISOString().substr(0, 10);
document.querySelector("#endDate").value = today;

let lastMonth = moment(today);
let lastMonth1 = lastMonth.subtract(1, 'month');
let lastMonth2 = lastMonth1.format().substr(0, 10);

document.querySelector("#startDate").value = lastMonth2;

