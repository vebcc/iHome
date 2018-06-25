google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
let data;
let options;
let chart;
function actualtemp(){
    $.get('include/handlers.php?id=3&name=temp&value=out&onlycheck=1', function(result) {
        let atemp = result;
        atemp = atemp/100;
        $('#tempout1').html(atemp);
        data.setValue(0, 1, atemp);
        chart.draw(data, options);

    });
}

function drawChart() {
    $.get('include/handlers.php?id=3&name=temp&value=out&onlycheck=1', function(result) {
        let atemp = result;
        atemp = atemp/100;
        $('#tempout1').html(atemp);

        data = google.visualization.arrayToDataTable([ ['Label', 'Value'], ['Temp', atemp ], ]);
        options = { width: 400, height: 120, redFrom: 32, redTo: 40, yellowFrom:25, yellowTo: 32, greenFrom: 10, greenTo: 25, minorTicks: 5, max: 40 };
        chart = new google.visualization.Gauge(document.getElementById('chart_div')); chart.draw(data, options);
        setInterval(function() { actualtemp(); }, 10000);
    });
}

