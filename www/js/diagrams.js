google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawtemp);
google.charts.setOnLoadCallback(drawhumi);

function drawtemp(){
    $.get('include/dbhandler.php?id=6&gettemp=1', function(result) {

        var nowdate = new Date();
        var hour = nowdate.getHours()
        //console.log("Date: " + nowdate);
        //console.log("Hours: " + hour);

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
        //console.log("dlugość" + ttime2.length);
        var printtime = parseInt(hour);
        for(var i=0;i<24;i++){
            printtime++;
            //console.log("printtime: " + printtime);
            if(printtime>=24){
                printtime=0;
            }
            var temp1inner = 0;
            var temp2inner = 0;

            for(var te1=0;te1<ttime.length;te1++){
                if(printtime==parseInt(ttime[te1])){

                    temp1inner=parseInt(tin[te1]);
                    //console.log("te1 :" + te1 + " printtime : " + printtime + " ttime : " + ttime[te1] + " temp: " + temp1inner);
                    break;
                }
            }

            for(var te2=0;te2<ttime2.length;te2++){
                if(printtime==parseInt(ttime2[te2])){
                    temp2inner=parseInt(tin2[te2]);
                    break;
                }
            }
            var timeout = printtime+" ";
            data.addRow([timeout, temp1inner, temp2inner]);
        }




        var options = {
            title: 'Temperatura (°C)',
            hAxis: {title: 'Czas (h)',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        });
    });
}



function drawhumi(){
    $.get('include/dbhandler.php?id=6&gethumi=1', function(result) {
        var nowdate = new Date();
        var hour = nowdate.getHours()

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

            var printtime = parseInt(hour);
            for(var i=0;i<24;i++){
                printtime++;
                //console.log("printtime: " + printtime);
                if(printtime>=24){
                    printtime=0;
                }
                var humi1inner = 0;
                var humi2inner = 0;

                for(var te1=0;te1<htime.length;te1++){
                    if(printtime==parseInt(htime[te1])){

                        humi1inner=parseInt(hin[te1]);
                        //console.log("humi1inner: " + humi1inner + "hin: " + hin[te1]);
                        break;
                    }
                }

                for(var te2=0;te2<htime2.length;te2++){
                    if(printtime==parseInt(htime2[te2])){
                        humi2inner=parseInt(hin2[te2]);
                        break;
                    }
                }

                var timeout = printtime+" ";
                data.addRow([timeout, humi1inner, humi2inner]);
            }





        var options = {
            title: 'Wilgotność (%)',
            hAxis: {title: 'Czas (h)',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
    });
    });
}

