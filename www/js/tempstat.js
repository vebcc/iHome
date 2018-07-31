google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawtempin);
//google.charts.setOnLoadCallback(drawwilgin);
google.charts.setOnLoadCallback(drawtempout);

var dane = [0,0];

function drawtempin(){
    $.get('include/handlers.php?id=1&name=tempwil&value=status&onlycheck=1', function(result) {
        console.log("nic");
        console.log(result);
        if(result=="0-0"){
            setTimeout(function() { drawtempin(); }, 1000);
        }else{
            dane = result.split("-");

            $('#tempin1').html(dane[1]);
            $('#wilgin1').html(dane[0]);

            var tempdane = parseInt(dane[1]);
            console.log("tempdane: " + tempdane);
            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Tempin', tempdane],
            ]);
            var options = {
                width: 400, height: 120,
                redFrom: 90, redTo: 100,
                yellowFrom:75, yellowTo: 90,
                minorTicks: 5
            };

            var chart = new google.visualization.Gauge(document.getElementById('chart_tempin'));
            chart.draw(data, options);
            google.charts.setOnLoadCallback(drawwilgin);
        }

    });

}

function drawwilgin(){
    var wilgdane = parseInt(dane[0]);
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['WilgIn', wilgdane],
    ]);
    var options = {
        width: 400, height: 120,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_wilgin'));
    chart.draw(data, options);

}

function drawtempout(){
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['TempOut', 20],
    ]);
    var options = {
        width: 400, height: 120,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_tempout'));
    chart.draw(data, options);

}









function actualtemp(){
    $.get('include/handlers.php?id=3&name=temp&value=out&onlycheck=1', function(result) {
        let atemp = result;
        atemp = atemp/100;
        $('#tempout1').html(atemp);
        data.setValue(0, 1, atemp);
        chart.draw(data, options);

    });


    $.get('include/handlers.php?id=1&name=tempwil&value=status&onlycheck=1', function(result) {
        if(result=="0-0"){
            checktemp();
        }else{
            console.log(result);
            var dane = result.split("-");

            $('#tempin1').html(dane[1]);
            $('#wilgin1').html(dane[0]);

            data2.setValue(0, 1, dane[0]);
            data3.setValue(0, 1, dane[1]);

            chart2.draw(data2, options2);
            chart3.draw(data3, options3);


        }
    });
}

function drawChart1() {
    $.get('include/handlers.php?id=3&name=temp&value=out&onlycheck=1', function(result) {
        let atemp = result;
        atemp = atemp/100;
        $('#tempout1').html(atemp);

        data = google.visualization.arrayToDataTable([ ['Label', 'Value'], ['Temp', atemp ], ]);
        options = { width: 400, height: 120, redFrom: 32, redTo: 40, yellowFrom:25, yellowTo: 32, greenFrom: 10, greenTo: 25, minorTicks: 5, max: 40 };
        chart = new google.visualization.Gauge(document.getElementById('chart_div'));
        chart.draw(data, options);
    });

    $.get('include/handlers.php?id=1&name=tempwil&value=status&onlycheck=1', function(result) {
        if(result=="0-0"){
            checktemp();
        }else{
            console.log(result);
            var dane = result.split("-");

            data2 = google.visualization.arrayToDataTable([ ['Label', 'Value'], ['TempIn', dane[1] ], ]);
            options2 = { width: 400, height: 120, redFrom: 32, redTo: 40, yellowFrom:25, yellowTo: 32, greenFrom: 10, greenTo: 25, minorTicks: 5, max: 40 };
            chart2 = new google.visualization.Gauge(document.getElementById('chart_tempin'));
            chart2.draw(data2, options2);
            //setInterval(function() { checktemp(); }, 10000);

            data3 = google.visualization.arrayToDataTable([ ['Label', 'Value'], ['TempOut', dane[0] ], ]);
            options3 = { width: 400, height: 120, redFrom: 32, redTo: 40, yellowFrom:25, yellowTo: 32, greenFrom: 10, greenTo: 25, minorTicks: 5, max: 100 };
            chart3 = new google.visualization.Gauge(document.getElementById('chart_wilgin'));
            chart3.draw(data3, options3);
            //setInterval(function() { checktemp(); }, 10000);
        }
    });
    setInterval(function() { actualtemp(); }, 1000);
}

function checktemp(){

}
