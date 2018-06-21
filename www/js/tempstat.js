google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    $('#tempout1').load('include/handlers.php?id=3&name=temp&value=out');

    setTimeout(function() {
        var divtemp = document.getElementById("tempout1");
        var atemp = divtemp.innerHTML;
        atemp = atemp/100;
        document.getElementById("tempout1").innerHTML = atemp;

        //console.log("atemp" + atemp);
        var data = google.visualization.arrayToDataTable([ ['Label', 'Value'], ['Temp', atemp ], ]);
        var options = { width: 400, height: 120, redFrom: 32, redTo: 40, yellowFrom:28, yellowTo: 32, minorTicks: 5, max: 40 };
        var chart = new google.visualization.Gauge(document.getElementById('chart_div')); chart.draw(data, options);
        setInterval(function() { data.setValue(0, 1, atemp); }, 13000);
    }, 1500);
}
