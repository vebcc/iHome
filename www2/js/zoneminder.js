function getevent(id){ //zwraca link camery po podaniu id kamery
    var zmeventlink = "http://cloud.maslowski.it/zm/index.php?view=event&eid="+id+"&filter[terms][0][attr]=MonitorId&filter[terms][0][op]=%3D&filter[terms][0][val]=1&sort_field=Id&sort_asc=0&page=1";
    return zmeventlink;
}

function zmlastevent(cam_id, cam_limit, info){
	//console.log("zmlimit: " + cam_limit);
	for(var i=2;i<parseInt(cam_limit)+2;i++){
        //var adata = $("#events_"+cam_id+" > #contentTable > tbody > tr:nth-child("+i+") > td.colTime").html();
        var adata = $("#eventlog > #contentTable > tbody > tr:nth-child("+i+") > td.colTime").html();
		var resdata = adata.split(" ");
		var restimedata = resdata[1].split(":");
		var resdatat = resdata[0].split("/");
		restimedata[3] = resdatat[1];
		var atime = new Date();
		var atimenow = new Array;
		atimenow[0] = atime.getHours();
		atimenow[1] = atime.getMinutes();
		atimenow[2] = atime.getSeconds();
		atimenow[3] = atime.getDay();
		restimedata[0] = parseInt(restimedata[0]);
		restimedata[1] = parseInt(restimedata[1]);
		restimedata[2] = parseInt(restimedata[2]);
		restimedata[3] = parseInt(restimedata[3]);
		var timemax = 60*60*24;
		var mtimenow = atimenow[2]+((atimenow[1]+(atimenow[0]*60))*60);
		var mtimeevent = restimedata[2]+((restimedata[1]+(restimedata[0]*60))*60);
		$("#events_"+cam_id+" > #contentTable > tbody > tr:nth-child("+i+")").removeClass('lastevent');
		if(atimenow[3]==restimedata[3]){
			if((mtimenow-mtimeevent)<=600){
				$("#events_"+cam_id+" > #contentTable > tbody > tr:nth-child("+i+")").addClass('lastevent');
			}
		}else if((atimenow[3]-1)==restimedata[3]){
			var kalwyn = timemax-mtimeevent+mtimenow;
			if(kalwyn<=600){
			   	$("#events_"+cam_id+" > #contentTable > tbody > tr:nth-child("+i+")").addClass('lastevent');
			}
		}
    }
    console.log(info);
}

function zmloadevent(eventlogin, eventpass, eventlimit, param, info){ // funkcja wyswietlajaca zdarzenia (eventy) kamer
    if(param==0){
        $('#eventlog').load("http://cloud.maslowski.it/zm/?view=events&page=1&sort_field=StartTime&sort_asc=&limit="+eventlimit+"&username="+eventlogin+"&password="+eventpass+"&action=login #contentTable", function() {
            $('#eventlog > #contentTable').addClass('table table-bordered');
            for(var i=0;i<eventlimit;i++){
                var zmdivid = i+2;
                var zmresid = $('#eventlog > #contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId > a').html();
                zmresid = zmresid.substring(0, zmresid.length-1);
                $('#eventlog > #contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId').html("<a href='#' onclick=\"window.open('"+getevent(zmresid)+"', 'IHome-Events', 'height=800,width=800');\">"+zmresid+" </a>");
            }
            zmlastevent(2, eventlimit, info);
        });
    }else{
        $('#events_2').load("http://cloud.maslowski.it/zm/index.php?view=events&page=1&filter[terms][0][attr]=MonitorId&filter[terms][0][op]=%3D&filter[terms][0][val]=1&sort_field=Id&sort_asc=0&limit="+eventlimit+"&username="+eventlogin+"&password="+eventpass+"&action=login #contentTable", function() {
            $('#events_2 > #contentTable').addClass('table table-bordered');
            for(var i=0;i<eventlimit;i++){
                var zmdivid = i+2;
                var zmresid = $('#events_2 > #contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId > a').html();
                zmresid = zmresid.substring(0, zmresid.length-1);
                $('#events_2 > #contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId').html("<a href='#' onclick=\"window.open('"+getevent(zmresid)+"', 'IHome-Events', 'height=800,width=800');\">"+zmresid+" </a>");
            }
            zmlastevent(2, eventlimit);
        });
    
        $('#events_3').load("http://cloud.maslowski.it/zm/index.php?view=events&page=1&filter[terms][0][attr]=MonitorId&filter[terms][0][op]=%3D&filter[terms][0][val]=3&sort_field=Id&sort_asc=0&limit="+eventlimit+"&username="+eventlogin+"&password="+eventpass+"&action=login #contentTable", function() {
            $('#events_3 > #contentTable').addClass('table table-bordered');
            for(var i=0;i<eventlimit;i++){
                var zmdivid = i+2;
                var zmresid = $('#events_3 > #contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId > a').html();
                //zmresid = zmresid.substring(0, zmresid.length-1);
                $('#events_3 > #contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId').html("<a href='#' onclick=\"window.open('"+getevent(zmresid)+"', 'IHome-Events', 'height=800,width=800');\">"+zmresid+" </a>");
                //te
            }
            zmlastevent(3, eventlimit);
        });
    }
}

function zmload(what, param, info){ // funkcja ladujaca ustawienia i funkcje ladujace kamery i eventy
	$.get('include/settings.php?name=zmlogin', function(result) {
		var login = result;
		$.get('include/settings.php?name=zmpass', function(result) {
			var mainpass = result;
			$.get('include/settings.php?name=zmlimit', function(result) {
				var zmlimit = result;
				if(what=="cam"){
					//zmloadcam(login, mainpass, param, info);
				}else if(what=="event"){
					zmloadevent(login, mainpass, zmlimit, param, info);
				}
			});
		});
	});
}


zmload("event", 0, "Loader - zoneminder_events");
setInterval(function(){ zmload("event", 0, "Reloader - zoneminder_events"); }, 10000);

