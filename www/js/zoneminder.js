function getevent(id){
    var zmeventlink = "http://cloud.maslowski.it/zm/index.php?view=event&eid="+id+"&filter[terms][0][attr]=MonitorId&filter[terms][0][op]=%3D&filter[terms][0][val]=1&sort_field=Id&sort_asc=0&page=1";
    return zmeventlink;
}

$.get('include/settings.php?name=zmlogin', function(result) {
        var login = result;
		$.get('include/settings.php?name=zmpass', function(result) {
        	var mainpass = result;
			$.get('include/settings.php?name=zmlimit', function(result) {
        		var zmlimit = result;

				$('#cam_1').html('<img class="cam_1_img" src="http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=1&scale=100&maxfps=5&buffer=1000&user='+login+'&pass='+mainpass+'">');
				$('#cam_1_mini').html('<img src="http://cloud.maslowski.it/zm/cgi-bin/nph-zms?mode=jpeg&monitor=1&scale=50&maxfps=5&buffer=1000&user='+login+'&pass='+mainpass+'">');

				$('#events_1').load("http://cloud.maslowski.it/zm/index.php?view=events&page=1&filter[terms][0][attr]=MonitorId&filter[terms][0][op]=%3D&filter[terms][0][val]=1&sort_field=Id&sort_asc=0&limit="+zmlimit+"&username="+login+"&password="+mainpass+"&action=login #contentTable", function() {
    				$('#contentTable').addClass('table table-bordered');
    				for(var i=0;i<zmlimit;i++){
        				var zmdivid = i+2;
        				var zmresid = $('#contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId > a').html();
        				zmresid = zmresid.substring(0, zmresid.length-1);
        				$('#contentTable > tbody > tr:nth-child('+zmdivid+') > td.colId').html("<a href='"+getevent(zmresid)+"'>"+zmresid+"</a>");
    				}
				});

    		});
    	});
    });
