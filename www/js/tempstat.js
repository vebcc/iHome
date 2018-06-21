google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([ ['Label', 'Value'], ['Temp', getset(3 ,"tempout", 1) ], ]);
    var options = { width: 400, height: 120, redFrom: 32, redTo: 40, yellowFrom:28, yellowTo: 32, minorTicks: 5, max: 40 };
    var chart = new google.visualization.Gauge(document.getElementById('chart_div')); chart.draw(data, options);
    setInterval(function() { data.setValue(0, 1, getset(3 ,"tempout", 1)); }, 13000);
}
