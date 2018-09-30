google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(loaddata);

function loaddata(){
	var datatemp = new google.visualization.DataTable();
	datatemp.addColumn('string', 'czas');
	datatemp.addColumn('number', 'Pokój');
	datatemp.addColumn('number', 'Na Zewnątrz');

	var datahumi = new google.visualization.DataTable();
	datahumi.addColumn('string', 'czas');
	datahumi.addColumn('number', 'Pokój');
	datahumi.addColumn('number', 'Zewnątrz');

	var datasensor = new google.visualization.DataTable();
	datasensor.addColumn('string', 'czas');
	datasensor.addColumn('number', 'Zewnątrz');
	datasensor.addColumn('number', 'Nigdzie');

	var optionstemp = {
		title: 'Temperatura (°C)',
		hAxis: {title: 'Czas (h)',  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	};

	var optionshumi = {
		title: 'Wilgotność (%)',
		hAxis: {title: 'Czas (h)',  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	};

	var optionssensor = {
		title: 'Ruch na godzine (*)',
		hAxis: {title: 'Czas (h)',  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	};


	var charttemp = new google.visualization.AreaChart(document.getElementById('chart_div'));
	var charthumi = new google.visualization.AreaChart(document.getElementById('chart_div2'));
	var chartsensor = new google.visualization.AreaChart(document.getElementById('chart_div3'));

	drawtemp(datatemp, optionstemp, charttemp);
	drawhumi(datahumi, optionshumi, charthumi);
	drawsensor(datasensor, optionssensor, chartsensor);
}

function drawreftemp(datatemp, optionstemp, charttemp){
	$.get('include/dbhandler.php?id=7&gettemp=1', function(result) {
		var nowdate = new Date();
		var hour = nowdate.getHours()

		var adata = result.split(",");
		var dlug = (adata.length-1)/3;

		var ttime = new Array;
		var tmin = new Array;
		var tin = new Array;
		var ttime2 = new Array;
		var tmin2 = new Array;
		var tin2 = new Array;

		for(var i=0;i<dlug;i++){
			ttime[i]=adata[(i*3)+0];
			tmin[i]=adata[(i*3)+1];
			tin[i]=adata[(i*3)+2];
		}

		$.get('include/dbhandler.php?id=8&gettemp=1', function(result2) {
			var adata2 = result2.split(",");
			var dlug2 = (adata2.length-1)/3;

			for(var i=0;i<dlug2;i++){
				ttime2[i]=adata2[(i*3)+0];
				tmin2[i]=adata2[(i*3)+1];
				tin2[i]=adata2[(i*3)+2];
			}

			var printtime = parseInt(hour);
			for(var i=0;i<24;i++){
				printtime++;
				if(printtime>=24){
					printtime=0;
				}
				var temp1inner = 0;
				var temp2inner = 0;

				for(var te1=0;te1<ttime.length;te1++){
					if(printtime==parseInt(ttime[te1])){
						temp1inner=parseInt(tin[te1]);
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
				datatemp.addRow([timeout, temp1inner, temp2inner]);
				datatemp.setValue(i, 0, timeout);
				datatemp.setValue(i, 1, temp1inner);
				datatemp.setValue(i, 2, temp2inner);
			}
			charttemp.draw(datatemp, optionstemp);
		});
	});
}

function drawrefhumi(datahumi, optionshumi, charthumi){
	$.get('include/dbhandler.php?id=7&gethumi=1', function(result) {
		var nowdate = new Date();
		var hour = nowdate.getHours()

		var adata = result.split(",");
		var dlug = (adata.length-1)/3;

		var ttime = new Array;
		var tmin = new Array;
		var tin = new Array;
		var ttime2 = new Array;
		var tmin2 = new Array;
		var tin2 = new Array;

		for(var i=0;i<dlug;i++){
			ttime[i]=adata[(i*3)+0];
			tmin[i]=adata[(i*3)+1];
			tin[i]=adata[(i*3)+2];
		}

		$.get('include/dbhandler.php?id=8&gethumi=1', function(result2) {
			var adata2 = result2.split(",");
			var dlug2 = (adata2.length-1)/3;

			for(var i=0;i<dlug2;i++){
				ttime2[i]=adata2[(i*3)+0];
				tmin2[i]=adata2[(i*3)+1];
				tin2[i]=adata2[(i*3)+2];
			}

			var printtime = parseInt(hour);
			for(var i=0;i<24;i++){
				printtime++;
				if(printtime>=24){
					printtime=0;
				}
				var temp1inner = 0;
				var temp2inner = 0;

				for(var te1=0;te1<ttime.length;te1++){
					if(printtime==parseInt(ttime[te1])){

						temp1inner=parseInt(tin[te1]);
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
				datahumi.addRow([timeout, temp1inner, temp2inner]);
				datahumi.setValue(i, 0, timeout);
				datahumi.setValue(i, 1, temp1inner);
				datahumi.setValue(i, 2, temp2inner);
			}
			charthumi.draw(datahumi, optionshumi);
		});
	});
}

function drawtemp(datatemp, optionstemp, charttemp){
    $.get('include/dbhandler.php?id=7&gettemp=1', function(result) {
        var nowdate = new Date();
        var hour = nowdate.getHours()

        var adata = result.split(",");
        var dlug = (adata.length-1)/3;

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

        $.get('include/dbhandler.php?id=8&gettemp=1', function(result2) {
			var adata2 = result2.split(",");
			var dlug2 = (adata2.length-1)/3;

			for(var i=0;i<dlug2;i++){
				ttime2[i]=adata2[(i*3)+0];
				tmin2[i]=adata2[(i*3)+1];
				tin2[i]=adata2[(i*3)+2];
			}

			var printtime = parseInt(hour);
			for(var i=0;i<24;i++){
				printtime++;
				if(printtime>=24){
					printtime=0;
				}
				var temp1inner = 0;
				var temp2inner = 0;

				for(var te1=0;te1<ttime.length;te1++){
					if(printtime==parseInt(ttime[te1])){
						temp1inner=parseInt(tin[te1]);
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
				datatemp.addRow([timeout, temp1inner, temp2inner]);
			}
			charttemp.draw(datatemp, optionstemp);
			//setTimeout(function(){ drawtemp(datatemp, optionstemp, charttemp); }, 600000);
		});
	});
}

function drawhumi(datahumi, optionshumi, charthumi){
    $.get('include/dbhandler.php?id=7&gethumi=1', function(result) {
        var nowdate = new Date();
        var hour = nowdate.getHours()

        var adata = result.split(",");
        var dlug = (adata.length-1)/3;

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

        $.get('include/dbhandler.php?id=8&gethumi=1', function(result2) {
            var adata2 = result2.split(",");
            var dlug2 = (adata2.length-1)/3;

            for(var i=0;i<dlug2;i++){
                htime2[i]=adata2[(i*3)+0];
                hmin2[i]=adata2[(i*3)+1];
                hin2[i]=adata2[(i*3)+2];
            }

            var printtime = parseInt(hour);
            for(var i=0;i<24;i++){
                printtime++;
                if(printtime>=24){
                    printtime=0;
                }
                var humi1inner = 0;
                var humi2inner = 0;

                for(var te1=0;te1<htime.length;te1++){
                    if(printtime==parseInt(htime[te1])){
                        humi1inner=parseInt(hin[te1]);
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
                datahumi.addRow([timeout, humi1inner, humi2inner]);
            }
			charthumi.draw(datahumi, optionshumi);
			//setTimeout(function(){ drawhumi(datahumi, optionshumi, charthumi); }, 600000);
    	});
    });
}

function drawsensor(datasensor, optionssensor, chartsensor){
	$.get('include/dbhandler.php?id=8&getsensordata=1', function(result) {
		var nowdate = new Date();
		var hour = nowdate.getHours()

		var adata = result.split(",");
		var dlug = (adata.length-1)/3;

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

		$.get('include/dbhandler.php?id=7&getsensordata=1', function(result2) {
			var adata2 = result2.split(",");
			var dlug2 = (adata2.length-1)/3;

			for(var i=0;i<dlug2;i++){
				htime2[i]=adata2[(i*3)+0];
				hmin2[i]=adata2[(i*3)+1];
				hin2[i]=adata2[(i*3)+2];
			}

			var printtime = parseInt(hour);
			for(var i=0;i<24;i++){
				printtime++;
				if(printtime>=24){
					printtime=0;
				}
				var sensor1inner = 0;
				var sensor2inner = 0;

				for(var te1=0;te1<htime.length;te1++){
					if(printtime==parseInt(htime[te1])){
						sensor1inner=parseInt(hin[te1]);
						break;
					}
				}

				for(var te2=0;te2<htime2.length;te2++){
					if(printtime==parseInt(htime2[te2])){
						sensor2inner=parseInt(hin2[te2]);
						break;
					}
				}
				var timeout = printtime+" ";
				datasensor.addRow([timeout, sensor1inner, sensor2inner]);
			}
			chartsensor.draw(datasensor, optionssensor);
			//setTimeout(function(){ drawsensor(datasensor, optionssensor, chartsensor); }, 600000);
		});
	});
}

