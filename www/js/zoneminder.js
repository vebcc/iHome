function getevent(id){ //zwraca link camery po podaniu id kamery
    var zmeventlink = "http://cloud.maslowski.it/zm/index.php?view=event&eid="+id+"&filter[terms][0][attr]=MonitorId&filter[terms][0][op]=%3D&filter[terms][0][val]=1&sort_field=Id&sort_asc=0&page=1";
    return zmeventlink;
}

function zmloadcam(camlogin, campass){ // funkcja wyswietlajaca kamery

	$('#cam_1').html('<img class="cam_img" id="cam_1_img" src="http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=1&scale=100&maxfps=5&buffer=1000&user='+camlogin+'&pass='+campass+'">');
	$('#cam_1_mini').html('<img class="cam_mini_img" src="http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=1&scale=50&maxfps=5&buffer=1000&user='+camlogin+'&pass='+campass+'">');


	$('#cam_2').html('<img class="cam_img" id="cam_2_img" src="http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=3&scale=100&maxfps=5&buffer=1000&user='+camlogin+'&pass='+campass+'">');
	$('#cam_2_mini').html('<img class="cam_mini_img" src="http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=3&scale=50&maxfps=5&buffer=1000&user='+camlogin+'&pass='+campass+'">');

	$.get( 'http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=1&scale=100&maxfps=5&buffer=1000&user='+camlogin+'&pass='+campass, function(result) {
		$('#cam_1').html('<img class="cam_img" src="images/offline.jpg">');
		$('#cam_1_mini').html('<img class="cam_mini_img" src="images/offline.jpg">');
	});
	$.get( 'http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=3&scale=100&maxfps=5&buffer=1000&user='+camlogin+'&pass='+campass, function(result) {
		$('#cam_2').html('<img class="cam_img" src="images/offline.jpg">');
		$('#cam_2_mini').html('<img class="cam_mini_img" src="images/offline.jpg">');
	});


}

function zmloadevent(eventlogin, eventpass, eventlimit){ // funkcja wyswietlajaca zdarzenia (eventy) kamer
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

function zmload(what){ // funkcja ladujaca ustawienia i funkcje ladujace kamery i eventy
	$.get('include/settings.php?name=zmlogin', function(result) {
		var login = result;
		$.get('include/settings.php?name=zmpass', function(result) {
			var mainpass = result;
			$.get('include/settings.php?name=zmlimit', function(result) {
				var zmlimit = result;
				if(what=="cam"){
					zmloadcam(login, mainpass);
				}else if(what=="event"){
					zmloadevent(login, mainpass, zmlimit);
				}
			});
		});
	});
}

function zmlastevent(cam_id, cam_limit){
	//console.log("zmlimit: " + cam_limit);
	for(var i=2;i<parseInt(cam_limit)+2;i++){
		var adata = $("#events_"+cam_id+" > #contentTable > tbody > tr:nth-child("+i+") > td.colTime").html();
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
				console.log("kalwyn: "+kalwyn);
				console.log("timemax: "+timemax);
				console.log("mtimenow: "+mtimenow);
				console.log("mtimeevent: "+mtimeevent);
			}
		}
	}
}

//setTimeout(function(){ zmload("cam"); }, 100);
setTimeout(function(){ zmload("event"); }, 100);
//setInterval(function(){ zmload("cam"); }, 60000);
setInterval(function(){ zmload("event"); }, 10000);


