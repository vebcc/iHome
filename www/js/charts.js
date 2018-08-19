google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawtemp);
google.charts.setOnLoadCallback(drawhumi);

function drawtemp(){
    $.get('include/dbhandler.php?id=6&gettemp=1', function(result) {
        var adata = result.split(",");
        var dlug = (adata.length-1)/3;

        //console.log(adata);
        //console.log(dlug);

        var ttime = new Array;
        var tmin = new Array;
        var tin = new Array;

        for(var i=0;i<dlug;i++){
            ttime[i]=adata[(i*3)+0];
            tmin[i]=adata[(i*3)+1];
            tin[i]=adata[(i*3)+2];
        }

        var ttime2 = new Array;
        var tmin2 = new Array;
        var tin2 = new Array;

        $.get('include/dbhandler.php?id=7&gettemp=1', function(result2) {
            var adata2 = result2.split(",");
            var dlug2 = (adata2.length-1)/3;
            //console.log(adata2);
            //console.log(dlug2);


            for(var i=0;i<dlug2;i++){
                ttime2[i]=adata2[(i*3)+0];
                tmin2[i]=adata2[(i*3)+1];
                tin2[i]=adata2[(i*3)+2];
            }

        //console.log(ttime);
        //console.log(tin);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'czas');
        data.addColumn('number', 'Pokój');
        data.addColumn('number', 'Na Zewnątrz');

        //data.addColumn('number', 'Temperatura Zewnątrz');
        console.log("dlugość" + ttime2.length);
        for(var i=0;i<ttime.length;i++){
            var dodaj=0;
            for(var x=0;x<ttime2.length;x++){
                if(ttime[i]==ttime2[x]){
                   dodaj = 1;
                    var wart2 = x;
                }
                //console.log(tin2[x]);
            }

            if(dodaj==0){
                data.addRow([ttime[i], parseInt(tin[i]), 0]);
            }else{
                data.addRow([ttime[i], parseInt(tin[i]), parseInt(tin2[wart2])]);
            }
        }


        var options = {
            title: 'Temperatura',
            hAxis: {title: 'Czas',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        });
    });
}

function drawhumi(){
    $.get('include/dbhandler.php?id=6&gethumi=1', function(result) {
        var adata = result.split(",");
        var dlug = (adata.length-1)/3;

        //console.log(adata);
        //console.log(dlug);

        var htime = new Array;
        var hmin = new Array;
        var hin = new Array;

        for(var i=0;i<dlug;i++){
            htime[i]=adata[(i*3)+0];
            hmin[i]=adata[(i*3)+1];
            hin[i]=adata[(i*3)+2];
        }

        var htime2 = new Array;
        var hmin2 = new Array;
        var hin2 = new Array;

        $.get('include/dbhandler.php?id=7&gethumi=1', function(result2) {
            var adata2 = result2.split(",");
            var dlug2 = (adata2.length-1)/3;
            //console.log(adata2);
            //console.log(dlug2);


            for(var i=0;i<dlug2;i++){
                htime2[i]=adata2[(i*3)+0];
                hmin2[i]=adata2[(i*3)+1];
                hin2[i]=adata2[(i*3)+2];
            }

        //console.log(htime);
        //console.log(hin);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'czas');
        data.addColumn('number', 'Pokój');
        data.addColumn('number', 'Zewnątrz');

        for(var i=0;i<htime.length;i++){
            var dodaj=0;
            for(var x=0;x<htime2.length;x++){
                if(htime[i]==htime2[x]){
                    dodaj = 1;
                    var wart2 = x;
                }
                //console.log(tin2[x]);
            }
            if(dodaj==0){
                data.addRow([htime[i], parseInt(hin[i]), 0]);
            }else{
                data.addRow([htime[i], parseInt(hin[i]), parseInt(hin2[wart2])]);
            }
        }


        var options = {
            title: 'Wilgotność',
            hAxis: {title: 'Czas',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
    });
    });
}

